import { NextResponse, type NextRequest } from 'next/server'
import { getAdminUser } from '@/lib/auth/admin'
import { findUserById } from '@/lib/auth/db'
import { issuePasswordReset } from '@/lib/auth/password-reset'

// Admin sends a user the same one-hour reset link the forgot-password form
// would. The admin never sees the link or a password. Non-admins get a bare
// 404, matching the rest of /api/admin.

export async function POST(req: NextRequest) {
  const admin = await getAdminUser()
  if (!admin) {
    return new NextResponse(null, { status: 404 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { userId } = (body ?? {}) as Record<string, unknown>
  if (typeof userId !== 'number' || !Number.isInteger(userId)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const user = findUserById(userId)
  if (!user) {
    return NextResponse.json({ error: 'No such user.' }, { status: 400 })
  }

  try {
    await issuePasswordReset(user)
  } catch (err) {
    console.error(`[admin] reset link to ${user.email} failed:`, err)
    return NextResponse.json(
      { error: `Could not send the email to ${user.email}. Check the mail settings and try again.` },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true, email: user.email })
}
