import type { ReactNode } from 'react'
import CourseHeader from '@/components/course/landing/CourseHeader'
import SiteFooter from '@/components/legal/SiteFooter'
import { dmSans } from '@/components/course/landing/fonts'
import '@/styles/course-landing.css'
import '@/styles/legal.css'

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`course-landing legal-page min-h-screen flex flex-col ${dmSans.variable}`} style={{ background: '#FAFAF8', color: '#1C1917' }}>
      <CourseHeader variant="compact" />
      <main className="legal-doc flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
