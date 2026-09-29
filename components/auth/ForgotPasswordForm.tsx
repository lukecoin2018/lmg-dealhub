'use client'

import { useState, type FormEvent } from 'react'
import { blurField, ERROR_STYLE, focusField, INPUT_STYLE, LABEL_STYLE, SUBMIT_STYLE, SUCCESS_STYLE } from './formStyles'

// Asks for an email and requests a reset link. The server answers the same
// way whether or not the address has an account, and so does this form.

export default function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null)
  const [sentTo, setSentTo] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (pending) return
    setError(null)

    const email = String(new FormData(e.currentTarget).get('email') ?? '').trim()
    setPending(true)
    try {
      const res = await fetch('/api/auth/reset-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSentTo(email)
        return
      }
      const data = (await res.json().catch(() => null)) as { error?: string } | null
      setError(data?.error ?? 'Something went wrong. Please try again.')
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setPending(false)
    }
  }

  if (sentTo) {
    return (
      <div role="status" style={{ ...SUCCESS_STYLE, marginBottom: 0 }}>
        If <strong>{sentTo}</strong> has an account, a reset link is on its way. Check your inbox
        (and spam folder). The link works for 1 hour.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ marginBottom: 22 }}>
        <label htmlFor="forgot-email" style={LABEL_STYLE}>Email</label>
        <input
          id="forgot-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="you@example.com"
          style={INPUT_STYLE}
          onFocus={focusField}
          onBlur={blurField}
        />
      </div>

      {error && (
        <div role="alert" style={ERROR_STYLE}>
          {error}
        </div>
      )}

      <button type="submit" disabled={pending} style={SUBMIT_STYLE(pending)}>
        {pending ? 'Sending…' : 'Send reset link'}
      </button>
    </form>
  )
}
