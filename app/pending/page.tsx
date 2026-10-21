import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { getCurrentUser } from '@/lib/auth/session'
import CourseHeader from '@/components/course/landing/CourseHeader'
import { dmSans } from '@/components/course/landing/fonts'
import '@/styles/course-landing.css'

export const metadata = {
  title: "You're signed up · Brand Partnership Playbook",
}

export default async function PendingPage() {
  // Fresh DB read: the moment access is granted, this page stops showing.
  const user = await getCurrentUser()
  if (!user) redirect('/signup')
  if (user.has_access === 1) redirect('/course')

  const name = user.name?.trim() || null

  return (
    <div className={`course-landing min-h-screen flex flex-col ${dmSans.variable}`} style={{ background: '#FAFAF8', color: '#1C1917' }}>
      <CourseHeader variant="compact" />

      <main className="flex-1 flex justify-center px-6" style={{ paddingTop: 'clamp(40px, 10vh, 110px)', paddingBottom: 60 }}>
        <div style={{ width: '100%', maxWidth: 460 }}>
          <div className="flex items-center gap-3" style={{ marginBottom: 14 }}>
            <span style={{ display: 'inline-block', width: 26, height: 1.5, background: '#FF4D94', opacity: .55, flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#FF4D94' }}>
              You&apos;re signed up
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
            {name ? <>Thanks, <em style={{ fontStyle: 'italic' }}>{name}</em></> : <>Thanks for signing <em style={{ fontStyle: 'italic' }}>up</em></>}
          </h1>

          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: '#78716C', fontWeight: 500, margin: '0 0 10px' }}>
            Your account is being reviewed. You&apos;ll get access soon.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: '#78716C', fontWeight: 500, margin: '0 0 28px' }}>
            Module 1 is free to watch right now.
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
              marginBottom: 16,
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: '-.01em',
            }}
          >
            Watch Module 1
            <ArrowRight size={18} style={{ flexShrink: 0 }} />
          </Link>

          <p style={{ fontSize: 13.5, lineHeight: 1.5, color: '#78716C', fontWeight: 600, margin: 0 }}>
            Signed in as <strong style={{ color: '#1C1917' }}>{user.email}</strong>
          </p>
        </div>
      </main>
    </div>
  )
}
