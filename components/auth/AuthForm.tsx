'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { blurField, CHECK_INPUT_STYLE, CHECK_ROW_STYLE, ERROR_STYLE, focusField, INPUT_STYLE, LABEL_STYLE, SUBMIT_STYLE } from './formStyles'

// Shared login/signup form. Server does the real validation; this only handles
// UX (pending state, inline errors). Fixed light palette to match the course
// design — intentionally unaffected by the dashboard dark-mode class.

export default function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (pending) return
    setError(null)

    const form = new FormData(e.currentTarget)
    const email = String(form.get('email') ?? '')
    const password = String(form.get('password') ?? '')
    const name = String(form.get('name') ?? '').trim()
    // Checkbox is optional and posts only when ticked. Absence means no.
    const proLaunchOptIn = form.get('proLaunchOptIn') === 'on'

    if (mode === 'signup' && !name) {
      setError('Please enter your name.')
      return
    }
    if (mode === 'signup' && password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setPending(true)
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          mode === 'signup' ? { email, password, name, proLaunchOptIn } : { email, password },
        ),
      })
      if (res.ok) {
        // New accounts wait for approval, so sign-up always lands on the pending
        // page (the confirmation). Login still honours a same-site ?next=.
        if (mode === 'signup') {
          router.push('/pending')
          router.refresh()
          return
        }
        const next = new URLSearchParams(window.location.search).get('next')
        const dest = next && next.startsWith('/') && !next.startsWith('//') ? next : '/course'
        router.push(dest)
        router.refresh() // re-render server components (header indicator) with the new cookie
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
      {mode === 'signup' && (
        <div className="auth-pair">
          <div>
            <label htmlFor="auth-name" style={LABEL_STYLE}>Name</label>
            <input
              id="auth-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              maxLength={80}
              placeholder="Your name"
              style={INPUT_STYLE}
              onFocus={focusField}
              onBlur={blurField}
            />
          </div>
          <div>
            <label htmlFor="auth-email" style={LABEL_STYLE}>Email</label>
            <input
              id="auth-email"
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
        </div>
      )}

      {mode === 'login' && (
      <div style={{ marginBottom: 18 }}>
        <label htmlFor="auth-email" style={LABEL_STYLE}>Email</label>
        <input
          id="auth-email"
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
      )}

      <div style={{ marginBottom: mode === 'signup' ? 18 : 22 }}>
        <label htmlFor="auth-password" style={LABEL_STYLE}>Password</label>
        <input
          id="auth-password"
          name="password"
          type="password"
          required
          minLength={mode === 'signup' ? 8 : undefined}
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          placeholder={mode === 'signup' ? 'At least 8 characters' : 'Your password'}
          style={INPUT_STYLE}
          onFocus={focusField}
          onBlur={blurField}
        />
      </div>

      {mode === 'signup' && (
        <label style={CHECK_ROW_STYLE}>
          <input
            id="auth-pro-launch"
            name="proLaunchOptIn"
            type="checkbox"
            defaultChecked={false}
            style={CHECK_INPUT_STYLE}
          />
          <span>Tell me by email when the Pro version launches.</span>
        </label>
      )}

      {error && (
        <div role="alert" style={ERROR_STYLE}>
          {error}
        </div>
      )}

      <button type="submit" disabled={pending} style={SUBMIT_STYLE(pending)}>
        {pending
          ? (mode === 'signup' ? 'Creating account…' : 'Logging in…')
          : (mode === 'signup' ? 'Create account' : 'Log in')}
      </button>
    </form>
  )
}
