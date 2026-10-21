// Server-side validation for auth inputs. Keep in sync with any client-side hints.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function normalizeEmail(email: unknown): string | null {
  if (typeof email !== 'string') return null
  const normalized = email.trim().toLowerCase()
  if (normalized.length < 5 || normalized.length > 254) return null
  if (!EMAIL_RE.test(normalized)) return null
  return normalized
}

// Display name collected at sign-up. Empty is allowed only when `required` is
// false (accounts that predate the field). Invalid input is a string error.
export function parseName(
  name: unknown,
  required: boolean,
): { ok: true; value: string | null } | { ok: false; error: string } {
  if (typeof name !== 'string') {
    return required ? { ok: false, error: 'Please enter your name.' } : { ok: true, value: null }
  }
  const trimmed = name.trim().replace(/\s+/g, ' ')
  if (!trimmed) {
    return required ? { ok: false, error: 'Please enter your name.' } : { ok: true, value: null }
  }
  if (trimmed.length > 80) {
    return { ok: false, error: 'Name must be 80 characters or fewer.' }
  }
  if (/[\u0000-\u001F\u007F]/.test(trimmed) || !/[\p{L}\p{N}]/u.test(trimmed)) {
    return { ok: false, error: 'Please enter a valid name.' }
  }
  return { ok: true, value: trimmed }
}

// Only an explicit boolean true is consent. Missing, "false", or "on" is not.
export function parseOptIn(value: unknown): boolean {
  return value === true
}

// 72 bytes is the bcrypt input limit; anything longer is silently truncated by the algorithm.
export function validatePassword(password: unknown): string | null {
  if (typeof password !== 'string') return null
  if (password.length < 8) return null
  if (Buffer.byteLength(password, 'utf8') > 72) return null
  return password
}
