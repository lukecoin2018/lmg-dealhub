'use client'

import { useMemo, useRef, useState } from 'react'

interface AdminUser {
  id: number
  email: string
  hasAccess: number
  createdAt: string // sqlite "YYYY-MM-DD HH:MM:SS" (UTC)
  lastLoginAt: string | null
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

function parseSqlite(sqliteUtc: string): Date {
  return new Date(sqliteUtc.replace(' ', 'T') + 'Z')
}

function formatDate(sqliteUtc: string): string {
  const d = parseSqlite(sqliteUtc)
  if (Number.isNaN(d.getTime())) return sqliteUtc
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// "Just now", "3h ago", "2d ago", then a short date past two weeks.
function formatRelative(sqliteUtc: string): string {
  const d = parseSqlite(sqliteUtc)
  if (Number.isNaN(d.getTime())) return sqliteUtc
  const mins = Math.max(0, Math.round((Date.now() - d.getTime()) / 60000))
  if (mins < 2) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  if (days < 14) return `${days}d ago`
  return formatDate(sqliteUtc)
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

export default function AdminUsersClient({ initialUsers, adminId }: { initialUsers: AdminUser[]; adminId: number }) {
  const [users, setUsers] = useState(initialUsers)
  const [query, setQuery] = useState('')
  const [view, setView] = useState<View>('all')
  const [pendingId, setPendingId] = useState<number | null>(null)
  const [armed, setArmed] = useState<{ id: number; action: 'revoke' | 'delete' } | null>(null) // awaiting confirm
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
    setArmed(null)
  }

  function arm(id: number, action: 'revoke' | 'delete') {
    disarm()
    setArmed({ id, action })
    disarmTimer.current = setTimeout(() => setArmed(null), 3000)
  }

  const busy = pendingId !== null || resetId !== null

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
    if (armed?.id === user.id && armed.action === 'revoke') {
      void setAccess(user, 0)
    } else {
      arm(user.id, 'revoke')
    }
  }

  async function removeUser(user: AdminUser) {
    disarm()
    setPendingId(user.id)
    setError(null)
    try {
      const res = await fetch('/api/admin/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        setError(data?.error ?? `Delete failed (${res.status}). Reload and try again.`)
        return
      }
      setUsers((prev) => prev.filter((u) => u.id !== user.id))
    } catch {
      setError('Network error. Reload and try again.')
    } finally {
      setPendingId(null)
    }
  }

  function handleDeleteClick(user: AdminUser) {
    if (busy) return
    if (armed?.id === user.id && armed.action === 'delete') {
      void removeUser(user)
    } else {
      arm(user.id, 'delete')
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
                <th style={TH}>Last login</th>
                <th style={TH}>Access</th>
                <th style={{ ...TH, textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ ...TD, color: '#78716C', borderBottom: 'none' }}>
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
                const revokeArmed = armed?.id === u.id && armed.action === 'revoke'
                const deleteArmed = armed?.id === u.id && armed.action === 'delete'
                const pending = pendingId === u.id
                const isSelf = u.id === adminId
                return (
                  <tr key={u.id}>
                    <td style={{ ...TD, ...(last && { borderBottom: 'none' }), fontWeight: 600, wordBreak: 'break-all' }}>
                      {u.email}
                    </td>
                    <td style={{ ...TD, ...(last && { borderBottom: 'none' }), color: '#78716C', whiteSpace: 'nowrap' }}>
                      {formatDate(u.createdAt)}
                    </td>
                    <td
                      style={{ ...TD, ...(last && { borderBottom: 'none' }), color: u.lastLoginAt ? '#78716C' : '#B8B2A6', whiteSpace: 'nowrap' }}
                      title={u.lastLoginAt ? parseSqlite(u.lastLoginAt).toLocaleString() : 'Has not logged in since signing up'}
                    >
                      {u.lastLoginAt ? formatRelative(u.lastLoginAt) : 'Never'}
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
                        disabled={busy}
                        title={`Email ${u.email} a link to choose a new password`}
                        style={{
                          fontSize: 12.5,
                          fontWeight: 700,
                          borderRadius: 999,
                          padding: '6px 12px',
                          marginRight: 8,
                          cursor: busy ? 'default' : 'pointer',
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
                        onBlur={() => { if (revokeArmed) disarm() }}
                        disabled={busy}
                        style={{
                          fontSize: 12.5,
                          fontWeight: 700,
                          borderRadius: 999,
                          padding: '6px 14px',
                          cursor: busy ? 'default' : 'pointer',
                          whiteSpace: 'nowrap',
                          opacity: pending ? 0.6 : 1,
                          ...(u.hasAccess === 0
                            ? { color: '#fff', background: '#FF4D94', border: '1px solid #FF4D94' }
                            : revokeArmed
                              ? { color: '#fff', background: '#B3261E', border: '1px solid #B3261E' }
                              : { color: '#78716C', background: 'transparent', border: '1px solid #E5E0D5' }),
                        }}
                      >
                        {pending ? 'Saving…' : u.hasAccess === 0 ? 'Grant' : revokeArmed ? 'Confirm revoke?' : 'Revoke'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(u)}
                        onBlur={() => { if (deleteArmed) disarm() }}
                        disabled={busy || isSelf}
                        aria-label={deleteArmed ? `Confirm delete ${u.email}` : `Delete ${u.email}`}
                        title={isSelf ? "You can't delete your own account" : `Delete ${u.email}`}
                        style={{
                          fontSize: 12.5,
                          fontWeight: 700,
                          borderRadius: 999,
                          padding: deleteArmed ? '6px 12px' : '6px 10px',
                          marginLeft: 8,
                          cursor: busy || isSelf ? 'default' : 'pointer',
                          whiteSpace: 'nowrap',
                          opacity: isSelf ? 0.35 : 1,
                          ...(deleteArmed
                            ? { color: '#fff', background: '#B3261E', border: '1px solid #B3261E' }
                            : { color: '#B3261E', background: 'transparent', border: '1px solid #F0C9C5' }),
                        }}
                      >
                        {deleteArmed ? 'Confirm delete?' : '✕'}
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
