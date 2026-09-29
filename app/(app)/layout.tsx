import type { ReactNode } from 'react'
import CourseHeader from '@/components/course/landing/CourseHeader'
import { dmSans } from '@/components/course/landing/fonts'
import Sidebar from '@/components/layout/Sidebar'
import { allModules } from '@/lib/course/moduleData'
import '@/styles/course-landing.css'
import '@/styles/app-shell.css'

// App shell for the authenticated DealHub routes (/dashboard, /calculator,
// /negotiate, /contracts, /deals, /brands — all gated in proxy.ts). Same brand
// header, tokens and fonts as the /course landing page; `(app)` is a route
// group, so URLs are unchanged.
//
// The shell lives here rather than in DashboardLayout because the header is a
// server component (it reads the session) and most app pages are client
// components. `course-landing` wraps the header only: its element resets
// (h1–h3, p, a, img) are unlayered and would override the Tailwind utilities the
// tool pages are written in.
export default function AppLayout({ children }: { children: ReactNode }) {
  // Only what the sidebar's "next module" card needs — keeps the lesson copy out
  // of the client bundle.
  const courseModules = allModules.map(m => ({
    number: m.number,
    slug: m.slug,
    title: m.title,
    segmentIds: m.segments.map(s => s.id),
  }))

  return (
    <div className={`app-shell ${dmSans.variable}`}>
      <div className="course-landing app-shell__header">
        <CourseHeader variant="app" />
      </div>
      <div className="app-shell__body">
        <Sidebar courseModules={courseModules} />
        <main className="app-shell__main">{children}</main>
      </div>
    </div>
  )
}
