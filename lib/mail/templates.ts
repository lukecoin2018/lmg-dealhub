import type { MailMessage } from './send'

// Plain, brand-coloured transactional emails. Kept as simple table-free HTML
// so they render the same in Gmail, Apple Mail and Outlook.

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
}

function layout(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#FAFAF8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1C1917;">
  <div style="max-width:520px;margin:0 auto;padding:40px 24px;">
    <div style="font-size:20px;font-weight:700;letter-spacing:-.01em;margin-bottom:28px;">
      <span style="color:#FF4D94;">LMG</span> <span style="color:#9C9589;font-weight:400;">·</span> Brand Partnership Playbook
    </div>
    <div style="background:#FFFFFF;border:1px solid #E5E0D5;border-radius:16px;padding:28px;">
      <h1 style="font-size:22px;line-height:1.25;margin:0 0 14px;">${title}</h1>
      ${bodyHtml}
    </div>
    <p style="font-size:12px;color:#9C9589;margin:22px 0 0;">Sent by LMG Media · creators.lmg.media</p>
  </div>
</body></html>`
}

function button(href: string, label: string): string {
  return `<p style="margin:22px 0;"><a href="${href}" style="display:inline-block;background:#FF4D94;color:#fff;text-decoration:none;font-weight:700;font-size:15px;padding:13px 22px;border-radius:12px;">${label}</a></p>`
}

const P = 'font-size:15px;line-height:1.6;color:#52504A;margin:0 0 14px;'

export function passwordResetEmail(to: string, link: string): MailMessage {
  const safeLink = escapeHtml(link)
  return {
    to,
    subject: 'Reset your Playbook password',
    text: `Someone asked to reset the password for ${to} on the Brand Partnership Playbook.

Open this link to choose a new password (it expires in 1 hour):
${link}

If you didn't ask for this, you can ignore this email — your password stays the same.`,
    html: layout(
      'Reset your password',
      `<p style="${P}">Someone asked to reset the password for <strong>${escapeHtml(to)}</strong>. Click below to choose a new one. The link expires in 1 hour.</p>
       ${button(safeLink, 'Choose a new password')}
       <p style="${P}">If you didn&#39;t ask for this, ignore this email and your password stays the same.</p>
       <p style="font-size:12px;line-height:1.5;color:#9C9589;margin:18px 0 0;word-break:break-all;">Or paste this into your browser:<br>${safeLink}</p>`,
    ),
  }
}

export function newSignupEmail(to: string, signupEmail: string, adminLink: string, pendingCount: number): MailMessage {
  const safeLink = escapeHtml(adminLink)
  const waiting = pendingCount === 1 ? '1 user is waiting for access.' : `${pendingCount} users are waiting for access.`
  return {
    to,
    subject: `New signup: ${signupEmail}`,
    text: `${signupEmail} just created an account on the Brand Partnership Playbook and is waiting for approval.

${waiting}

Grant access here:
${adminLink}`,
    html: layout(
      'New signup',
      `<p style="${P}"><strong>${escapeHtml(signupEmail)}</strong> just created an account and is waiting for approval.</p>
       <p style="${P}">${waiting}</p>
       ${button(safeLink, 'Open the admin dashboard')}
       <p style="font-size:12px;line-height:1.5;color:#9C9589;margin:18px 0 0;word-break:break-all;">${safeLink}</p>`,
    ),
  }
}
