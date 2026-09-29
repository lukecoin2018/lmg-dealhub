'use client'

import { useState, type FormEvent } from 'react'
import { blurField, ERROR_STYLE, focusField, INPUT_STYLE, LABEL_STYLE, SUBMIT_STYLE, SUCCESS_STYLE } from './formStyles'

// Change-password form for /account. Server re-checks the current password;
// this only handles the confirm-match check, pending state and messages.

export default function ChangePasswordForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (pending) return
    setError(null)
    setSuccess(false)

    const formEl = e.currentTarget
    const form = new FormData(formEl)
    const currentPassword = String(form.get('currentPassword') ?? '')
    const newPassword = String(form.get('newPassword') ?? '')
    const confirmPassword = String(form.get('confirmPassword') ?? '')

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.')
      return
    }

    setPending(true)
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      if (res.ok) {
        formEl.reset()
        setSuccess(true)
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

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ marginBottom: 18 }}>
        <label htmlFor="current-password" style={LABEL_STYLE}>Current password</label>
        <input
          id="current-password"
          name="currentPassword"
          type="password"
          required
          autoComplete="current-password"
          placeholder="Your current password"
          style={INPUT_STYLE}
          onFocus={focusField}
          onBlur={blurField}
        />
      </div>

      <div style={{ marginBottom: 18 }}>
        <label htmlFor="new-password" style={LABEL_STYLE}>New password</label>
        <input
          id="new-password"
          name="newPassword"
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
        <label htmlFor="confirm-password" style={LABEL_STYLE}>Confirm new password</label>
        <input
          id="confirm-password"
          name="confirmPassword"
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
          {error}
        </div>
      )}
      {success && (
        <div role="status" style={SUCCESS_STYLE}>
          Password updated. Use the new one next time you log in.
        </div>
      )}

      <button type="submit" disabled={pending} style={SUBMIT_STYLE(pending)}>
        {pending ? 'Saving…' : 'Update password'}
      </button>
    </form>
  )
}
