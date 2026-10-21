'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  blurField,
  CHECK_INPUT_STYLE,
  CHECK_ROW_STYLE,
  ERROR_STYLE,
  focusField,
  INPUT_STYLE,
  LABEL_STYLE,
  SUBMIT_STYLE,
  SUCCESS_STYLE,
} from './formStyles'

function formatConsent(iso: string | null): string | null {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function AccountProfileForm({
  initialName,
  initialOptIn,
  initialOptInAt,
}: {
  initialName: string | null
  initialOptIn: boolean
  initialOptInAt: string | null
}) {
  const router = useRouter()
  const [name, setName] = useState(initialName ?? '')
  const [optIn, setOptIn] = useState(initialOptIn)
  const [optInAt, setOptInAt] = useState(initialOptInAt)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (pending) return
    setError(null)
    setSuccess(false)
    setPending(true)
    try {
      const res = await fetch('/api/account/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, proLaunchOptIn: optIn }),
      })
      const data = (await res.json().catch(() => null)) as {
        error?: string
        name?: string | null
        proLaunchOptIn?: boolean
        proLaunchOptInAt?: string | null
      } | null
      if (!res.ok) {
        setError(data?.error ?? 'Something went wrong. Please try again.')
        return
      }
      setName(data?.name ?? '')
      setOptIn(data?.proLaunchOptIn === true)
      setOptInAt(data?.proLaunchOptInAt ?? null)
      setSuccess(true)
      router.refresh()
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setPending(false)
    }
  }

  const consented = formatConsent(optIn ? optInAt : null)

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ marginBottom: 18 }}>
        <label htmlFor="account-name" style={LABEL_STYLE}>Name</label>
        <input
          id="account-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={80}
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={INPUT_STYLE}
          onFocus={focusField}
          onBlur={blurField}
        />
      </div>

      <label style={CHECK_ROW_STYLE}>
        <input
          id="account-pro-launch"
          name="proLaunchOptIn"
          type="checkbox"
          checked={optIn}
          onChange={(e) => setOptIn(e.target.checked)}
          style={CHECK_INPUT_STYLE}
        />
        <span>
          Tell me by email when the Pro version launches.
          {consented && (
            <span style={{ display: 'block', marginTop: 4, fontSize: 12.5, fontWeight: 500, color: '#78716C' }}>
              Opted in {consented}.
            </span>
          )}
        </span>
      </label>

      {error && (
        <div role="alert" style={ERROR_STYLE}>
          {error}
        </div>
      )}
      {success && (
        <div role="status" style={SUCCESS_STYLE}>
          Saved.
        </div>
      )}

      <button type="submit" disabled={pending} style={SUBMIT_STYLE(pending)}>
        {pending ? 'Saving…' : 'Save'}
      </button>
    </form>
  )
}
