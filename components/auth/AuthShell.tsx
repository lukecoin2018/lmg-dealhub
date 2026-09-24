import type { ReactNode } from 'react'
import CourseHeader from '@/components/course/landing/CourseHeader'
import { dmSans } from '@/components/course/landing/fonts'
import '@/styles/course-landing.css'

// Shared page shell for /login and /signup — course light/editorial palette,
// fixed light regardless of the dashboard dark-mode class. Uses the compact
// brand header (no Module 1 pill); /login hides the Log in pill as well.

export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
  authPill = true,
}: {
  authPill?: boolean
  eyebrow: string
  title: ReactNode
  subtitle: string
  children: ReactNode
  footer: ReactNode
}) {
  return (
    <div
      className={`course-landing min-h-screen flex flex-col ${dmSans.variable}`}
      style={{ background: '#FAFAF8', color: '#1C1917' }}
    >
      <CourseHeader variant="compact" authPill={authPill} />

      <main className="flex-1 flex justify-center px-6" style={{ paddingTop: 'clamp(40px, 9vh, 96px)', paddingBottom: 60 }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div className="flex items-center gap-3" style={{ marginBottom: 14 }}>
            <span style={{ display: 'inline-block', width: 26, height: 1.5, background: '#FF4D94', opacity: .55, flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#FF4D94' }}>
              {eyebrow}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display', Georgia, serif)",
              fontWeight: 700,
              fontSize: 'clamp(32px, 8vw, 40px)',
              lineHeight: 1.05,
              letterSpacing: '-.015em',
              margin: '0 0 10px',
              textWrap: 'balance',
            } as React.CSSProperties}
          >
            {title}
          </h1>

          <p style={{ fontSize: 15, lineHeight: 1.55, color: '#78716C', fontWeight: 500, margin: '0 0 28px' }}>
            {subtitle}
          </p>

          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E0D5',
              borderRadius: 16,
              padding: 'clamp(20px, 5vw, 28px)',
              boxShadow: '0 8px 24px rgba(20,18,12,0.06), 0 2px 6px rgba(20,18,12,0.04)',
            }}
          >
            {children}
          </div>

          <p style={{ fontSize: 13.5, color: '#78716C', fontWeight: 500, textAlign: 'center', marginTop: 22 }}>
            {footer}
          </p>
        </div>
      </main>
    </div>
  )
}
