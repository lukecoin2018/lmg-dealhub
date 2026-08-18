import { NextResponse, type NextRequest } from 'next/server'
import { getAdminUser } from '@/lib/auth/admin'
import { findUserById, setUserAccess } from '@/lib/auth/db'

// Grant/revoke a user's has_access flag. Admin is re-verified server-side on
// every call; non-admins get a bare 404 (same as the page — don't advertise).

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

  const { userId, hasAccess } = (body ?? {}) as Record<string, unknown>
  if (typeof userId !== 'number' || !Number.isInteger(userId) || (hasAccess !== 0 && hasAccess !== 1)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!findUserById(userId)) {
    return NextResponse.json({ error: 'No such user.' }, { status: 400 })
  }

  const updated = setUserAccess(userId, hasAccess)!
  return NextResponse.json({
    ok: true,
    user: { id: updated.id, email: updated.email, hasAccess: updated.has_access },
  })
}
