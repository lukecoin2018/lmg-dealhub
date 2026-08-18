import Link from 'next/link'
import AuthForm from '@/components/auth/AuthForm'
import AuthShell from '@/components/auth/AuthShell'

export const metadata = {
  title: 'Create Account · Brand Partnership Playbook',
}

const linkStyle: React.CSSProperties = { color: '#FF4D94', fontWeight: 700, textDecoration: 'none' }

export default function SignupPage() {
  return (
    <AuthShell
      eyebrow="Get started"
      title={<>Create your <em style={{ fontStyle: 'italic' }}>account</em></>}
      subtitle="One login for the course and the creator dashboard."
      footer={
        <>Already have an account? <Link href="/login" style={linkStyle}>Log in</Link></>
      }
    >
      <AuthForm mode="signup" />
    </AuthShell>
  )
}
