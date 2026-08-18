import { getCurrentUser } from './session'
import type { UserRow } from './db'

// Admin = email listed in the ADMIN_EMAILS env var (comma-separated,
// case-insensitive). Independent of has_access — being an admin is a deploy-time
// config decision, not a DB row. Unset/empty var means nobody is admin.

export function isAdminEmail(email: string): boolean {
  const raw = process.env.ADMIN_EMAILS
  if (!raw) return false
  const admins = raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
  return admins.includes(email.trim().toLowerCase())
}

/**
 * Session + fresh DB read + admin check. Call this at the top of every admin
 * page and every admin mutation — never trust anything client-side.
 * Returns null for logged-out visitors AND logged-in non-admins; callers
 * should respond with a 404 (not a redirect) so the route isn't advertised.
 */
export async function getAdminUser(): Promise<UserRow | null> {
  const user = await getCurrentUser()
  if (!user || !isAdminEmail(user.email)) return null
  return user
}
