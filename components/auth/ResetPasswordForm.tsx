'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { blurField, ERROR_STYLE, focusField, INPUT_STYLE, LABEL_STYLE, SUBMIT_STYLE } from './formStyles'

// New password form for the emailed reset link. On success the server sets a
// session cookie, so we can send the user straight into the app.

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (pending) return
    setError(null)

    const form = new FormData(e.currentTarget)
    const password = String(form.get('password') ?? '')
    const confirm = String(form.get('confirm') ?? '')
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setPending(true)
    try {
      const res = await fetch('/api/auth/reset-confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = (await res.json().catch(() => null)) as { error?: string; next?: string } | null
      if (res.ok) {
        router.push(data?.next ?? '/course')
        router.refresh()
        return
      }
      setError(data?.error ?? 'Something went wrong. Please try again.')
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ marginBottom: 18 }}>
        <label htmlFor="reset-password" style={LABEL_STYLE}>New password</label>
        <input
          id="reset-password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          placeholder="At least 8 characters"
          style={INPUT_STYLE}
          onFocus={focusField}
          onBlur={blurField}
        />
      </div>

      <div style={{ marginBottom: 22 }}>
        <label htmlFor="reset-confirm" style={LABEL_STYLE}>Confirm new password</label>
        <input
          id="reset-confirm"
          name="confirm"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          placeholder="Repeat the new password"
          style={INPUT_STYLE}
          onFocus={focusField}
          onBlur={blurField}
        />
      </div>

      {error && (
        <div role="alert" style={ERROR_STYLE}>
          {error}{' '}
          {error.includes('expired') && (
            <Link href="/forgot-password" style={{ color: '#B3261E', fontWeight: 800 }}>Request a new link</Link>
          )}
        </div>
      )}

      <button type="submit" disabled={pending} style={SUBMIT_STYLE(pending)}>
        {pending ? 'Saving…' : 'Set new password'}
      </button>
    </form>
  )
}
