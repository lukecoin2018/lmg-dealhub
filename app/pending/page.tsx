import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowRight, Hourglass } from 'lucide-react'
import { getCurrentUser } from '@/lib/auth/session'

export const metadata = {
  title: 'Access Pending · Brand Partnership Playbook',
}

export default async function PendingPage() {
  // Fresh DB read: the moment access is granted, this page stops showing.
  const user = await getCurrentUser()
  if (!user) redirect('/signup')
  if (user.has_access === 1) redirect('/course')

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAFAF8', color: '#1C1917' }}>
      <header
        className="shrink-0 flex items-center h-14 px-6"
        style={{ borderBottom: '1px solid #E5E0D5', background: '#FAFAF8' }}
      >
        <Link href="/course" className="text-lg font-bold tracking-tight" style={{ textDecoration: 'none' }}>
          <span style={{ color: '#FF4D94' }}>LMG</span>
          <span style={{ color: '#9C9589', fontWeight: 400, margin: '0 6px' }}>·</span>
          <span style={{ color: '#FFD700' }}>Brand Partnership Playbook</span>
        </Link>
      </header>

      <main className="flex-1 flex justify-center px-6" style={{ paddingTop: 'clamp(40px, 10vh, 110px)', paddingBottom: 60 }}>
        <div style={{ width: '100%', maxWidth: 460 }}>
          <div className="flex items-center gap-3" style={{ marginBottom: 14 }}>
            <span style={{ display: 'inline-block', width: 26, height: 1.5, background: '#FF4D94', opacity: .55, flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#FF4D94' }}>
              Almost there
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display', Georgia, serif)",
              fontWeight: 700,
              fontSize: 'clamp(32px, 8vw, 42px)',
              lineHeight: 1.05,
              letterSpacing: '-.015em',
              margin: '0 0 14px',
              textWrap: 'balance',
            } as React.CSSProperties}
          >
            Your account is <em style={{ fontStyle: 'italic' }}>created</em>
          </h1>

          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: '#78716C', fontWeight: 500, margin: '0 0 28px' }}>
            Access is granted by the team — you&apos;ll be able to enter the full course and the
            creator dashboard once you&apos;re approved. No action needed on your side.
          </p>

          <div
            className="flex items-center gap-3"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E0D5',
              borderRadius: 16,
              padding: '16px 18px',
              marginBottom: 28,
              boxShadow: '0 2px 6px rgba(20,18,12,0.06)',
            }}
          >
            <span
              style={{
                width: 38, height: 38, borderRadius: '50%',
                background: '#FFF4B0', display: 'grid', placeItems: 'center', flexShrink: 0,
              }}
            >
              <Hourglass size={17} style={{ color: '#E6B800' }} />
            </span>
            <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#52504A', fontWeight: 600 }}>
              Signed in as <strong style={{ color: '#1C1917' }}>{user.email}</strong> — approval
              usually doesn&apos;t take long.
            </span>
          </div>

          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.13em', textTransform: 'uppercase', color: '#78716C', margin: '0 0 12px' }}>
            In the meantime
          </p>

          <Link
            href="/course/module-1"
            className="flex items-center justify-between gap-4"
            style={{
              background: '#FF4D94',
              color: '#fff',
              textDecoration: 'none',
              padding: '15px 20px',
              borderRadius: 14,
              boxShadow: '0 14px 30px rgba(255,77,148,.28)',
              marginBottom: 12,
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: '-.01em',
            }}
          >
            Module 1 is free — start it now
            <ArrowRight size={18} style={{ flexShrink: 0 }} />
          </Link>

          <Link
            href="/course"
            style={{
              display: 'inline-block',
              fontSize: 13.5,
              fontWeight: 700,
              color: '#78716C',
              textDecoration: 'none',
              padding: '6px 2px',
            }}
          >
            ← Back to the course overview
          </Link>
        </div>
      </main>
    </div>
  )
}
