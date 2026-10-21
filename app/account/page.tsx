import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/session'
import AuthShell from '@/components/auth/AuthShell'
import AccountProfileForm from '@/components/auth/AccountProfileForm'
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
      title={<>Your <em style={{ fontStyle: 'italic' }}>account</em></>}
      subtitle={user.name ? `${user.name} · ${user.email}` : `Signed in as ${user.email}.`}
      footer={
        <Link href={user.has_access === 1 ? '/course' : '/pending'} style={linkStyle}>
          ← Back to the Playbook
        </Link>
      }
    >
      <AccountProfileForm
        initialName={user.name}
        initialOptIn={user.pro_launch_opt_in === 1}
        initialOptInAt={user.pro_launch_opt_in_at}
      />
      <h2
        style={{
          fontFamily: "var(--font-playfair, 'Playfair Display', Georgia, serif)",
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: '-.015em',
          margin: '28px 0 16px',
        }}
      >
        Password
      </h2>
      <ChangePasswordForm />
    </AuthShell>
  )
}
