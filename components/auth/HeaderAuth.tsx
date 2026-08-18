import Link from 'next/link'
import { getSession } from '@/lib/auth/session'

// Server component: small logged-in indicator for the course header.
// Uses getSession() (JWT only) — display-only, no gating, so no DB hit here.

export default async function HeaderAuth() {
  const session = await getSession()

  if (!session) {
    return (
      <Link
        href="/login"
        style={{
          fontSize: 12.5,
          fontWeight: 700,
          color: '#78716C',
          textDecoration: 'none',
          border: '1px solid #E5E0D5',
          borderRadius: 999,
          padding: '6px 14px',
          whiteSpace: 'nowrap',
        }}
      >
        Log in
      </Link>
    )
  }

  return (
    <span className="flex items-center gap-3" style={{ minWidth: 0 }}>
      {/* Email hidden on small screens — the brand title needs the room; Log out alone signals the state */}
      <span
        className="hidden sm:inline-block"
        style={{
          fontSize: 12.5,
          fontWeight: 600,
          color: '#78716C',
          maxWidth: 180,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        title={session.email}
      >
        {session.email}
      </span>
      <form action="/api/auth/logout" method="post" style={{ display: 'inline-flex' }}>
        <button
          type="submit"
          style={{
            fontSize: 12.5,
            fontWeight: 700,
            color: '#78716C',
            background: 'transparent',
            border: '1px solid #E5E0D5',
            borderRadius: 999,
            padding: '6px 14px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Log out
        </button>
      </form>
    </span>
  )
}
