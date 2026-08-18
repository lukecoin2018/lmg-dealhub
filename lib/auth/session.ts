import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { findUserById, type UserRow } from './db'

// Session model: JWT in an httpOnly cookie, 30-day expiry. The token carries
// userId/email/hasAccess for display convenience, but hasAccess in the token is
// ADVISORY ONLY — anything that gates content must call getCurrentUser(), which
// re-reads has_access from the DB so an admin toggle takes effect without re-login.
//
// FUTURE (not built): password reset slots in beside this file — a
// password_resets table (user_id, token_hash, expires_at) plus
// /api/auth/reset-request and /api/auth/reset-confirm routes. Email
// verification would ride the same mail infrastructure when it exists.

export const SESSION_COOKIE = 'lmg_session'
const SESSION_MAX_AGE_S = 30 * 24 * 60 * 60 // 30 days

export interface SessionPayload {
  userId: number
  email: string
  hasAccess: boolean
}

function secretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET
  if (!secret) {
    throw new Error('SESSION_SECRET env var is not set — refusing to sign/verify sessions')
  }
  return new TextEncoder().encode(secret)
}

export async function createSessionToken(user: UserRow): Promise<string> {
  return new SignJWT({ email: user.email, hasAccess: user.has_access === 1 })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(String(user.id))
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_S}s`)
    .sign(secretKey())
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE_S,
  }
}

/** Verify the session cookie. JWT only — no DB hit. Fine for display (header email). */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ['HS256'] })
    if (!payload.sub || typeof payload.email !== 'string') return null
    return {
      userId: Number(payload.sub),
      email: payload.email,
      hasAccess: payload.hasAccess === true,
    }
  } catch {
    return null // expired, tampered, or signed with an old secret
  }
}

/**
 * Session + fresh DB read. THE seam for gating: use this (never the raw token)
 * wherever has_access matters. Also where a future entitlements model
 * (course access ⊂ dashboard access) plugs in without touching callers.
 */
export async function getCurrentUser(): Promise<UserRow | null> {
  const session = await getSession()
  if (!session) return null
  return findUserById(session.userId) ?? null
}
