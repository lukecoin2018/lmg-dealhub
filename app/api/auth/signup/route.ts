import { NextResponse, type NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { createUser, findUserByEmail } from '@/lib/auth/db'
import { createSessionToken, sessionCookieOptions, SESSION_COOKIE } from '@/lib/auth/session'
import { normalizeEmail, validatePassword } from '@/lib/auth/validation'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { email: rawEmail, password: rawPassword } = (body ?? {}) as Record<string, unknown>

  const email = normalizeEmail(rawEmail)
  if (!email) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }
  const password = validatePassword(rawPassword)
  if (!password) {
    return NextResponse.json(
      { error: 'Password must be at least 8 characters (max 72).' },
      { status: 400 },
    )
  }

  if (findUserByEmail(email)) {
    return NextResponse.json(
      { error: 'An account with this email already exists. Try logging in.' },
      { status: 409 },
    )
  }

  const passwordHash = await bcrypt.hash(password, 12)

  let user
  try {
    user = createUser(email, passwordHash)
  } catch (err: unknown) {
    // UNIQUE constraint race between the check above and the insert
    if (err instanceof Error && err.message.includes('UNIQUE')) {
      return NextResponse.json(
        { error: 'An account with this email already exists. Try logging in.' },
        { status: 409 },
      )
    }
    throw err
  }

  const token = await createSessionToken(user)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions())
  return res
}
