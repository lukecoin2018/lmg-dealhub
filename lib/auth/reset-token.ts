import { createHash, randomBytes } from 'node:crypto'

// Reset tokens: 32 random bytes, URL-safe. Only the SHA-256 hex hash is stored
// (lib/auth/db.ts), so a leaked database can't be used to forge reset links.

export function generateResetToken(): string {
  return randomBytes(32).toString('base64url')
}

export function hashResetToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}
