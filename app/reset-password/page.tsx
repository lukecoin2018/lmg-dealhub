import Link from 'next/link'
import AuthShell from '@/components/auth/AuthShell'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'
import { ERROR_STYLE } from '@/components/auth/formStyles'

export const metadata = {
  title: 'Choose a New Password · Brand Partnership Playbook',
  robots: { index: false, follow: false },
}

const linkStyle: React.CSSProperties = { color: '#FF4D94', fontWeight: 700, textDecoration: 'none' }

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>
}) {
  const { token: raw } = await searchParams
  const token = typeof raw === 'string' ? raw : ''

  return (
    <AuthShell
      authPill={false}
      eyebrow="Almost done"
      title={<>Choose a new <em style={{ fontStyle: 'italic' }}>password</em></>}
      subtitle="Pick something you'll remember — at least 8 characters."
      footer={
        <>Link not working? <Link href="/forgot-password" style={linkStyle}>Request a new one</Link></>
      }
    >
      {token ? (
        <ResetPasswordForm token={token} />
      ) : (
        <div role="alert" style={{ ...ERROR_STYLE, marginBottom: 0 }}>
          This page needs the link from your reset email. Open the email and click the button, or
          request a new link below.
        </div>
      )}
    </AuthShell>
  )
}
