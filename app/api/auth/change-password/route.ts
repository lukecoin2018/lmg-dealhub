import { NextResponse, type NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { setUserPassword } from '@/lib/auth/db'
import { clearFailures, isRateLimited, recordFailure } from '@/lib/auth/rate-limit'
import { getCurrentUser } from '@/lib/auth/session'
import { validatePassword } from '@/lib/auth/validation'

// Logged-in user sets a new password after proving the current one. Wrong
// current-password attempts count against the same ip|email limiter as login,
// so a stolen session cookie can't be used to brute-force the password.

function clientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Please log in again.' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { currentPassword, newPassword: rawNew } = (body ?? {}) as Record<string, unknown>
  if (typeof currentPassword !== 'string' || currentPassword.length === 0) {
    return NextResponse.json({ error: 'Please enter your current password.' }, { status: 400 })
  }

  const newPassword = validatePassword(rawNew)
  if (!newPassword) {
    return NextResponse.json(
      { error: 'New password must be at least 8 characters (max 72).' },
      { status: 400 },
    )
  }
  if (newPassword === currentPassword) {
    return NextResponse.json(
      { error: 'New password must be different from your current one.' },
      { status: 400 },
    )
  }

  const ip = clientIp(req)
  if (isRateLimited(ip, user.email)) {
    return NextResponse.json(
      { error: 'Too many attempts. Please wait 15 minutes and try again.' },
      { status: 429 },
    )
  }

  const valid = await bcrypt.compare(currentPassword, user.password_hash)
  if (!valid) {
    recordFailure(ip, user.email)
    return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 400 })
  }

  clearFailures(ip, user.email)
  setUserPassword(user.id, await bcrypt.hash(newPassword, 12))
  return NextResponse.json({ ok: true })
}
