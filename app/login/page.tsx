import Link from 'next/link'
import AuthForm from '@/components/auth/AuthForm'
import AuthShell from '@/components/auth/AuthShell'

export const metadata = {
  title: 'Log In · Brand Partnership Playbook',
}

const linkStyle: React.CSSProperties = { color: '#FF4D94', fontWeight: 700, textDecoration: 'none' }

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title={<>Log in to your <em style={{ fontStyle: 'italic' }}>Playbook</em></>}
      subtitle="Pick up right where you left off."
      footer={
        <>New here? <Link href="/signup" style={linkStyle}>Create an account</Link></>
      }
    >
      <AuthForm mode="login" />
    </AuthShell>
  )
}
