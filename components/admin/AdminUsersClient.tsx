'use client'

import { useMemo, useRef, useState } from 'react'

interface AdminUser {
  id: number
  email: string
  hasAccess: number
  createdAt: string // sqlite "YYYY-MM-DD HH:MM:SS" (UTC)
}

const CARD: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid #E5E0D5',
  borderRadius: 16,
  boxShadow: '0 2px 6px rgba(20,18,12,0.06), 0 1px 2px rgba(20,18,12,0.04)',
  overflow: 'hidden',
}

const TH: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '.13em',
  textTransform: 'uppercase',
  color: '#78716C',
  textAlign: 'left',
  padding: '10px 16px',
  borderBottom: '1px solid #E5E0D5',
  whiteSpace: 'nowrap',
}

const TD: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 500,
  padding: '12px 16px',
  borderBottom: '1px solid #F1EEE7',
  verticalAlign: 'middle',
}

function formatDate(sqliteUtc: string): string {
  const d = new Date(sqliteUtc.replace(' ', 'T') + 'Z')
  if (Number.isNaN(d.getTime())) return sqliteUtc
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

type View = 'all' | 'pending' | 'access'

const PILL_BASE: React.CSSProperties = {
  fontSize: 12.5,
  fontWeight: 700,
  borderRadius: 999,
  padding: '6px 13px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  border: '1px solid #E5E0D5',
  background: '#FFFFFF',
  color: '#78716C',
}

const PILL_ACTIVE: React.CSSProperties = {
  ...PILL_BASE,
  background: '#1C1917',
  borderColor: '#1C1917',
  color: '#FFFFFF',
  cursor: 'default',
}

export default function AdminUsersClient({ initialUsers }: { initialUsers: AdminUser[] }) {
  const [users, setUsers] = useState(initialUsers)
  const [query, setQuery] = useState('')
  const [view, setView] = useState<View>('all')
  const [pendingId, setPendingId] = useState<number | null>(null)
  const [armedId, setArmedId] = useState<number | null>(null) // revoke awaiting confirm
  const [error, setError] = useState<string | null>(null)
  const [resetId, setResetId] = useState<number | null>(null) // reset link in flight
  const [sentId, setSentId] = useState<number | null>(null) // reset link just sent
  const disarmTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sentTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const total = users.length
  const withAccess = users.filter((u) => u.hasAccess === 1).length
  const pendingCount = total - withAccess

  // Awaiting-approval users first (that's the job of this page), then newest
  // first within each group. initialUsers already arrives newest-first.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return users
      .filter((u) => (view === 'all' ? true : view === 'pending' ? u.hasAccess === 0 : u.hasAccess === 1))
      .filter((u) => !q || u.email.includes(q))
      .sort((a, b) => a.hasAccess - b.hasAccess)
  }, [users, query, view])

  function disarm() {
    if (disarmTimer.current) clearTimeout(disarmTimer.current)
    disarmTimer.current = null
    setArmedId(null)
  }

  async function setAccess(user: AdminUser, target: 0 | 1) {
    disarm()
    setPendingId(user.id)
    setError(null)
    try {
      const res = await fetch('/api/admin/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, hasAccess: target }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        setError(data?.error ?? `Update failed (${res.status}). Reload and try again.`)
        return
      }
      const data = (await res.json()) as { user: { id: number; hasAccess: number } }
      setUsers((prev) =>
        prev.map((u) => (u.id === data.user.id ? { ...u, hasAccess: data.user.hasAccess } : u)),
      )
    } catch {
      setError('Network error. Reload and try again.')
    } finally {
      setPendingId(null)
    }
  }

  async function sendResetLink(user: AdminUser) {
    if (resetId !== null || pendingId !== null) return
    disarm()
    setResetId(user.id)
    setError(null)
    try {
      const res = await fetch('/api/admin/reset-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        setError(data?.error ?? `Could not send (${res.status}). Reload and try again.`)
        return
      }
      if (sentTimer.current) clearTimeout(sentTimer.current)
      setSentId(user.id)
      sentTimer.current = setTimeout(() => setSentId(null), 4000)
    } catch {
      setError('Network error. Reload and try again.')
    } finally {
      setResetId(null)
    }
  }

  function handleClick(user: AdminUser) {
    if (pendingId !== null) return
    if (user.hasAccess === 0) {
      void setAccess(user, 1) // granting needs no confirmation
      return
    }
    // Revoking: first click arms, second click (within 3s) executes.
    if (armedId === user.id) {
      void setAccess(user, 0)
    } else {
      disarm()
      setArmedId(user.id)
      disarmTimer.current = setTimeout(() => setArmedId(null), 3000)
    }
  }

  return (
    <div>
      {pendingCount > 0 && (
        <div
          className="flex flex-wrap items-center justify-between gap-3"
          style={{
            background: '#FFF4B0',
            border: '1px solid #F2DF7A',
            borderRadius: 12,
            padding: '11px 14px',
            marginBottom: 14,
            fontSize: 14,
            fontWeight: 600,
            color: '#5C4A00',
          }}
        >
          <span>
            <strong style={{ fontWeight: 800 }}>{pendingCount}</strong>
            {` user${pendingCount === 1 ? '' : 's'} waiting for approval`}
          </span>
          {view !== 'pending' && (
            <button type="button" onClick={() => setView('pending')} style={{ ...PILL_BASE, background: '#1C1917', borderColor: '#1C1917', color: '#fff' }}>
              Show only these
            </button>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3" style={{ marginBottom: 14 }}>
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter by status">
          {([
            ['all', `All (${total})`],
            ['pending', `Awaiting (${pendingCount})`],
            ['access', `With access (${withAccess})`],
          ] as [View, string][]).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={view === key}
              onClick={() => setView(key)}
              style={view === key ? PILL_ACTIVE : PILL_BASE}
            >
              {label}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by email…"
          aria-label="Filter users by email"
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: '#1C1917',
            background: '#FFFFFF',
            border: '1px solid #E5E0D5',
            borderRadius: 10,
            padding: '8px 12px',
            outline: 'none',
            width: 230,
            maxWidth: '100%',
          }}
        />
      </div>

      {error && (
        <div
          role="alert"
          style={{
            fontSize: 13.5,
            fontWeight: 600,
            color: '#B3261E',
            background: '#FBEAE9',
            border: '1px solid #F0C9C5',
            borderRadius: 12,
            padding: '10px 14px',
            marginBottom: 12,
          }}
        >
          {error}
        </div>
      )}

      <div style={CARD}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={TH}>Email</th>
                <th style={TH}>Signed up</th>
                <th style={TH}>Access</th>
                <th style={{ ...TH, textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ ...TD, color: '#78716C', borderBottom: 'none' }}>
                    {total === 0
                      ? 'No users yet.'
                      : view === 'pending' && !query
                        ? 'Nobody is waiting for approval.'
                        : 'No users match that filter.'}
                  </td>
                </tr>
              )}
              {filtered.map((u, i) => {
                const last = i === filtered.length - 1
                const armed = armedId === u.id
                const pending = pendingId === u.id
                return (
                  <tr key={u.id}>
                    <td style={{ ...TD, ...(last && { borderBottom: 'none' }), fontWeight: 600, wordBreak: 'break-all' }}>
                      {u.email}
                    </td>
                    <td style={{ ...TD, ...(last && { borderBottom: 'none' }), color: '#78716C', whiteSpace: 'nowrap' }}>
                      {formatDate(u.createdAt)}
                    </td>
                    <td style={{ ...TD, ...(last && { borderBottom: 'none' }) }}>
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: '.08em',
                          textTransform: 'uppercase',
                          borderRadius: 999,
                          padding: '4px 10px',
                          whiteSpace: 'nowrap',
                          ...(u.hasAccess === 1
                            ? { color: '#E63F82', background: '#FFD9E7' }
                            : { color: '#78716C', background: '#F4F3EF' }),
                        }}
                      >
                        {u.hasAccess === 1 ? 'Access' : 'No access'}
                      </span>
                    </td>
                    <td style={{ ...TD, ...(last && { borderBottom: 'none' }), textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <button
                        type="button"
                        onClick={() => sendResetLink(u)}
                        disabled={resetId !== null || pendingId !== null}
                        title={`Email ${u.email} a link to choose a new password`}
                        style={{
                          fontSize: 12.5,
                          fontWeight: 700,
                          borderRadius: 999,
                          padding: '6px 12px',
                          marginRight: 8,
                          cursor: resetId !== null || pendingId !== null ? 'default' : 'pointer',
                          background: 'transparent',
                          ...(sentId === u.id
                            ? { color: '#1E6B3A', border: '1px solid #BFE3C9' }
                            : { color: '#78716C', border: '1px solid #E5E0D5' }),
                          opacity: resetId === u.id ? 0.6 : 1,
                        }}
                      >
                        {resetId === u.id ? 'Sending…' : sentId === u.id ? 'Link sent ✓' : 'Reset link'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleClick(u)}
                        onBlur={() => { if (armed) disarm() }}
                        disabled={pendingId !== null || resetId !== null}
                        style={{
                          fontSize: 12.5,
                          fontWeight: 700,
                          borderRadius: 999,
                          padding: '6px 14px',
                          cursor: pendingId !== null || resetId !== null ? 'default' : 'pointer',
                          whiteSpace: 'nowrap',
                          opacity: pending ? 0.6 : 1,
                          ...(u.hasAccess === 0
                            ? { color: '#fff', background: '#FF4D94', border: '1px solid #FF4D94' }
                            : armed
                              ? { color: '#fff', background: '#B3261E', border: '1px solid #B3261E' }
                              : { color: '#78716C', background: 'transparent', border: '1px solid #E5E0D5' }),
                        }}
                      >
                        {pending ? 'Saving…' : u.hasAccess === 0 ? 'Grant' : armed ? 'Confirm revoke?' : 'Revoke'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
