import Link from 'next/link'
import AuthShell from '@/components/auth/AuthShell'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'

export const metadata = {
  title: 'Reset Password · Brand Partnership Playbook',
  robots: { index: false, follow: false },
}

const linkStyle: React.CSSProperties = { color: '#FF4D94', fontWeight: 700, textDecoration: 'none' }

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      authPill={false}
      eyebrow="Forgot your password?"
      title={<>Let&apos;s get you <em style={{ fontStyle: 'italic' }}>back in</em></>}
      subtitle="Enter your email and we'll send you a link to choose a new password."
      footer={
        <>Remembered it? <Link href="/login" style={linkStyle}>Log in</Link></>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  )
}
