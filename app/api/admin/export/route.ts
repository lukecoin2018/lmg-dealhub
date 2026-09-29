import { NextResponse, type NextRequest } from 'next/server'
import { getAdminUser } from '@/lib/auth/admin'
import { listUsers } from '@/lib/auth/db'

// CSV of users for the admin. ?status=pending|access narrows it to match the
// dashboard filter; anything else exports everyone. Non-admins get a 404.

function csvCell(value: string | number | null): string {
  const s = value === null ? '' : String(value)
  // Quote when needed, and neutralise spreadsheet formula injection (=, +, -, @).
  const guarded = /^[=+\-@]/.test(s) ? `'${s}` : s
  return /[",\r\n]/.test(guarded) ? `"${guarded.replace(/"/g, '""')}"` : guarded
}

export async function GET(req: NextRequest) {
  const admin = await getAdminUser()
  if (!admin) {
    return new NextResponse(null, { status: 404 })
  }

  const status = req.nextUrl.searchParams.get('status')
  const rows = listUsers().filter((u) =>
    status === 'pending' ? u.has_access === 0 : status === 'access' ? u.has_access === 1 : true,
  )

  const lines = [
    ['email', 'signed_up_utc', 'last_login_utc', 'has_access'].join(','),
    ...rows.map((u) =>
      [csvCell(u.email), csvCell(u.created_at), csvCell(u.last_login_at), csvCell(u.has_access ? 'yes' : 'no')].join(','),
    ),
  ]

  const date = new Date().toISOString().slice(0, 10)
  const suffix = status === 'pending' ? '-awaiting' : status === 'access' ? '-with-access' : ''
  return new NextResponse(lines.join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="users${suffix}-${date}.csv"`,
      'Cache-Control': 'no-store',
    },
  })
}
