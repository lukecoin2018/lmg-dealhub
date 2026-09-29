import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/session'
import AuthShell from '@/components/auth/AuthShell'
import ChangePasswordForm from '@/components/auth/ChangePasswordForm'

export const metadata = {
  title: 'Your Account · Brand Partnership Playbook',
  robots: { index: false, follow: false },
}

const linkStyle: React.CSSProperties = { color: '#FF4D94', fontWeight: 700, textDecoration: 'none' }

export default async function AccountPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login?next=/account')

  return (
    <AuthShell
      eyebrow="Your account"
      title={<>Change your <em style={{ fontStyle: 'italic' }}>password</em></>}
      subtitle={`Signed in as ${user.email}.`}
      footer={
        <Link href={user.has_access === 1 ? '/course' : '/pending'} style={linkStyle}>
          ← Back to the Playbook
        </Link>
      }
    >
      <ChangePasswordForm />
    </AuthShell>
  )
}
