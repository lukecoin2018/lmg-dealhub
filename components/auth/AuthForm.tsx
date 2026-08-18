'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'

// Shared login/signup form. Server does the real validation; this only handles
// UX (pending state, inline errors). Fixed light palette to match the course
// design — intentionally unaffected by the dashboard dark-mode class.

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  fontSize: 16, // ≥16px so iPhone Safari doesn't zoom on focus
  fontWeight: 500,
  color: '#1C1917',
  background: '#FFFFFF',
  border: '1px solid #E5E0D5',
  borderRadius: 12,
  padding: '13px 14px',
  outline: 'none',
  transition: 'border-color 160ms ease, box-shadow 160ms ease',
}

const LABEL_STYLE: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  color: '#78716C',
  marginBottom: 7,
}

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

    if (mode === 'signup' && password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setPending(true)
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (res.ok) {
        // Only allow same-site relative destinations from ?next=
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
          onFocus={(e) => { e.currentTarget.style.borderColor = '#FF4D94'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,77,148,.14)' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E0D5'; e.currentTarget.style.boxShadow = 'none' }}
        />
      </div>

      <div style={{ marginBottom: 22 }}>
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
          onFocus={(e) => { e.currentTarget.style.borderColor = '#FF4D94'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,77,148,.14)' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E0D5'; e.currentTarget.style.boxShadow = 'none' }}
        />
      </div>

      {error && (
        <div
          role="alert"
          style={{
            fontSize: 13.5,
            fontWeight: 600,
            lineHeight: 1.45,
            color: '#B3261E',
            background: '#FBEAE9',
            border: '1px solid #F0C9C5',
            borderRadius: 12,
            padding: '11px 14px',
            marginBottom: 18,
          }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        style={{
          width: '100%',
          background: '#FF4D94',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          padding: '15px 20px',
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: '-.01em',
          cursor: pending ? 'default' : 'pointer',
          opacity: pending ? 0.65 : 1,
          boxShadow: '0 14px 30px rgba(255,77,148,.28)',
          transition: 'opacity 160ms ease',
        }}
      >
        {pending
          ? (mode === 'signup' ? 'Creating account…' : 'Logging in…')
          : (mode === 'signup' ? 'Create account' : 'Log in')}
      </button>
    </form>
  )
}
