import { NextResponse, type NextRequest } from 'next/server'
import { getAdminUser } from '@/lib/auth/admin'
import { deleteUser, findUserById } from '@/lib/auth/db'

// Permanently remove a user (and their reset tokens). Admins can't delete
// themselves — that would strand the session. Non-admins get a bare 404.

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
  if (userId === admin.id) {
    return NextResponse.json({ error: "You can't delete your own account." }, { status: 400 })
  }

  const user = findUserById(userId)
  if (!user) {
    return NextResponse.json({ error: 'No such user.' }, { status: 400 })
  }

  deleteUser(user.id)
  return NextResponse.json({ ok: true, id: user.id })
}
