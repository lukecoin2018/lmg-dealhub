import type { ReactNode } from 'react'
import CourseHeader from '@/components/course/landing/CourseHeader'
import { dmSans } from '@/components/course/landing/fonts'
import '@/styles/course-landing.css'

export const metadata = {
  title: 'Brand Partnership Playbook · LMG Media',
  description: 'The Complete Brand Partnership Playbook — 10-module course by LMG Media',
}

// Lesson shell: the same brand header as the /course landing page over a
// fixed-height, internally scrolling lesson body. `course-landing` (without
// `--page`) scopes the header's tokens/styles only — lesson typography stays
// with styles/lesson.css. Fixed light palette, not affected by global dark mode.
export default function CourseLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`course-landing flex flex-col h-screen ${dmSans.variable}`} style={{ background: '#FAFAF8' }}>
      <CourseHeader />
      {children}
    </div>
  )
}
