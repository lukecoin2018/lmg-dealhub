import { NextResponse, type NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { findUserByEmail } from '@/lib/auth/db'
import { clearFailures, isRateLimited, recordFailure } from '@/lib/auth/rate-limit'
import { createSessionToken, sessionCookieOptions, SESSION_COOKIE } from '@/lib/auth/session'
import { normalizeEmail } from '@/lib/auth/validation'

const INVALID = 'Invalid email or password.'

// Compared against when the email has no account, so response timing doesn't
// reveal whether an address is registered. Computed once at module load.
const DUMMY_HASH = bcrypt.hashSync('lmg-timing-equalizer', 12)

function clientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { email: rawEmail, password } = (body ?? {}) as Record<string, unknown>

  const email = normalizeEmail(rawEmail)
  if (!email || typeof password !== 'string' || password.length === 0) {
    return NextResponse.json({ error: INVALID }, { status: 400 })
  }

  const ip = clientIp(req)
  if (isRateLimited(ip, email)) {
    return NextResponse.json(
      { error: 'Too many attempts. Please wait 15 minutes and try again.' },
      { status: 429 },
    )
  }

  const user = findUserByEmail(email)
  const valid = await bcrypt.compare(password, user?.password_hash ?? DUMMY_HASH)

  if (!user || !valid) {
    recordFailure(ip, email)
    return NextResponse.json({ error: INVALID }, { status: 401 })
  }

  clearFailures(ip, email)
  const token = await createSessionToken(user)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions())
  return res
}
