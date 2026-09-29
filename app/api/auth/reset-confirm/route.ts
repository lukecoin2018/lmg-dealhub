import { NextResponse, type NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { consumePasswordReset, findUserById, findValidPasswordReset, setUserPassword, touchLastLogin } from '@/lib/auth/db'
import { createSessionToken, sessionCookieOptions, SESSION_COOKIE } from '@/lib/auth/session'
import { validatePassword } from '@/lib/auth/validation'
import { hashResetToken } from '@/lib/auth/reset-token'

// Token from the emailed link + new password. On success the token is
// consumed and the user is logged in straight away (session cookie set).

const INVALID_LINK = 'This reset link is invalid or has expired. Please request a new one.'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { token, password: rawPassword } = (body ?? {}) as Record<string, unknown>
  if (typeof token !== 'string' || token.length < 20 || token.length > 200) {
    return NextResponse.json({ error: INVALID_LINK }, { status: 400 })
  }

  const password = validatePassword(rawPassword)
  if (!password) {
    return NextResponse.json(
      { error: 'Password must be at least 8 characters (max 72).' },
      { status: 400 },
    )
  }

  const reset = findValidPasswordReset(hashResetToken(token))
  const user = reset ? findUserById(reset.user_id) : undefined
  if (!reset || !user) {
    return NextResponse.json({ error: INVALID_LINK }, { status: 400 })
  }

  setUserPassword(user.id, await bcrypt.hash(password, 12))
  consumePasswordReset(reset.id)
  touchLastLogin(user.id)

  const session = await createSessionToken(user)
  const res = NextResponse.json({ ok: true, next: user.has_access === 1 ? '/course' : '/pending' })
  res.cookies.set(SESSION_COOKIE, session, sessionCookieOptions())
  return res
}
