import { createPasswordReset, type UserRow } from './db'
import { generateResetToken, hashResetToken } from './reset-token'
import { appUrl, sendMail } from '@/lib/mail/send'
import { passwordResetEmail } from '@/lib/mail/templates'

export const RESET_TTL_MS = 60 * 60 * 1000 // 1 hour

/**
 * Create a single-use reset token for the user and email them the link.
 * Shared by the public forgot-password form and the admin "Send reset link"
 * action. Throws if the email can't be sent (the token is still stored, and
 * is retired by the next request anyway).
 */
export async function issuePasswordReset(user: UserRow): Promise<void> {
  const token = generateResetToken()
  createPasswordReset(user.id, hashResetToken(token), new Date(Date.now() + RESET_TTL_MS))
  await sendMail(passwordResetEmail(user.email, appUrl(`/reset-password?token=${token}`)))
}
