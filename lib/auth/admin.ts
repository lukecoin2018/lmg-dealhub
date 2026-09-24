import { getCurrentUser } from './session'
import type { UserRow } from './db'

// Admin = email listed in the ADMIN_EMAILS env var (comma-separated,
// case-insensitive). Independent of has_access — being an admin is a deploy-time
// config decision, not a DB row. Unset/empty var means nobody is admin.

function parseList(raw: string | undefined): string[] {
  if (!raw) return []
  return raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export function adminEmails(): string[] {
  return parseList(process.env.ADMIN_EMAILS)
}

export function isAdminEmail(email: string): boolean {
  return adminEmails().includes(email.trim().toLowerCase())
}

/**
 * Where "new signup" notifications go: ADMIN_NOTIFY_EMAILS if set (comma-
 * separated), otherwise every admin. Empty means don't notify.
 */
export function notifyEmails(): string[] {
  const explicit = parseList(process.env.ADMIN_NOTIFY_EMAILS)
  return explicit.length > 0 ? explicit : adminEmails()
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
