import { NextResponse, type NextRequest } from 'next/server'
import { createPasswordReset, findUserByEmail } from '@/lib/auth/db'
import { isRateLimited, recordFailure } from '@/lib/auth/rate-limit'
import { generateResetToken, hashResetToken } from '@/lib/auth/reset-token'
import { normalizeEmail } from '@/lib/auth/validation'
import { appUrl, sendMail } from '@/lib/mail/send'
import { passwordResetEmail } from '@/lib/mail/templates'

// Always answers 200 with the same body whether or not the email has an
// account, so the form can't be used to discover registered addresses. Every
// request counts against the login limiter (5 per 15 min per ip|email) so the
// endpoint can't be used to flood someone's inbox either.

const RESET_TTL_MS = 60 * 60 * 1000 // 1 hour

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

  const email = normalizeEmail((body as Record<string, unknown> | null)?.email)
  if (!email) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const ip = clientIp(req)
  if (isRateLimited(ip, email)) {
    return NextResponse.json(
      { error: 'Too many attempts. Please wait 15 minutes and try again.' },
      { status: 429 },
    )
  }
  recordFailure(ip, email)

  const user = findUserByEmail(email)
  if (user) {
    const token = generateResetToken()
    createPasswordReset(user.id, hashResetToken(token), new Date(Date.now() + RESET_TTL_MS))
    const link = appUrl(`/reset-password?token=${token}`)
    try {
      await sendMail(passwordResetEmail(user.email, link))
    } catch (err) {
      console.error('[reset-request] failed to send email:', err)
      return NextResponse.json(
        { error: 'We could not send the email right now. Please try again in a few minutes.' },
        { status: 502 },
      )
    }
  }

  return NextResponse.json({ ok: true })
}
