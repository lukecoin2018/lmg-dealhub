// Server-side validation for auth inputs. Keep in sync with any client-side hints.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function normalizeEmail(email: unknown): string | null {
  if (typeof email !== 'string') return null
  const normalized = email.trim().toLowerCase()
  if (normalized.length < 5 || normalized.length > 254) return null
  if (!EMAIL_RE.test(normalized)) return null
  return normalized
}

// 72 bytes is the bcrypt input limit; anything longer is silently truncated by the algorithm.
export function validatePassword(password: unknown): string | null {
  if (typeof password !== 'string') return null
  if (password.length < 8) return null
  if (Buffer.byteLength(password, 'utf8') > 72) return null
  return password
}
