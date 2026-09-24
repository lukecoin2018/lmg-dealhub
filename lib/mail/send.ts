// Outbound email via Resend's REST API. Config comes from env:
//   RESEND_API_KEY  — from resend.com; when unset, emails are logged to the
//                     server console instead of sent (local dev / tests).
//   MAIL_FROM       — e.g. "LMG Media <noreply@lmg.media>"; the domain must be
//                     verified in Resend.
//   ADMIN_NOTIFY_EMAILS — optional comma-separated recipients for new-signup
//                     notices; defaults to ADMIN_EMAILS.
//   APP_URL         — public origin used to build links, e.g.
//                     https://creators.lmg.media (no trailing slash).

export interface MailMessage {
  to: string
  subject: string
  html: string
  text: string
}

export function appUrl(path: string): string {
  const base = (process.env.APP_URL ?? 'http://localhost:3000').replace(/\/$/, '')
  return `${base}${path}`
}

export async function sendMail(msg: MailMessage): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.MAIL_FROM ?? 'LMG Media <onboarding@resend.dev>'

  if (!apiKey) {
    console.log(`[mail] RESEND_API_KEY not set — would send to ${msg.to}: ${msg.subject}\n${msg.text}`)
    return
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to: [msg.to], subject: msg.subject, html: msg.html, text: msg.text }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Resend responded ${res.status}: ${detail}`)
  }
}
