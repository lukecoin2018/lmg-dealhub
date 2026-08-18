import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAdminUser } from '@/lib/auth/admin'
import { listUsers } from '@/lib/auth/db'
import AdminUsersClient from '@/components/admin/AdminUsersClient'

export const metadata = {
  title: 'Admin · LMG',
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  const admin = await getAdminUser()
  if (!admin) notFound() // 404, not a redirect — don't advertise this route

  const users = listUsers().map((u) => ({
    id: u.id,
    email: u.email,
    hasAccess: u.has_access,
    createdAt: u.created_at,
  }))

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF8', color: '#1C1917' }}>
      <header
        className="flex items-center justify-between gap-4 h-14 px-6"
        style={{ borderBottom: '1px solid #E5E0D5', background: '#FAFAF8' }}
      >
        <Link href="/course" className="text-lg font-bold tracking-tight" style={{ textDecoration: 'none' }}>
          <span style={{ color: '#FF4D94' }}>LMG</span>
          <span style={{ color: '#9C9589', fontWeight: 400, margin: '0 6px' }}>·</span>
          <span style={{ color: '#FFD700' }}>Admin</span>
        </Link>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: '#78716C' }}>{admin.email}</span>
      </header>

      <main className="px-6 py-10" style={{ maxWidth: 860, margin: '0 auto' }}>
        <h1
          style={{
            fontFamily: "var(--font-playfair, 'Playfair Display', Georgia, serif)",
            fontWeight: 700,
            fontSize: 30,
            letterSpacing: '-.015em',
            margin: '0 0 18px',
          }}
        >
          User access
        </h1>
        <AdminUsersClient initialUsers={users} />
      </main>
    </div>
  )
}
