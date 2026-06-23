import type { ReactNode } from 'react'

export const metadata = {
  title: 'Brand Partnership Playbook · LMG Media',
  description: 'The Complete Brand Partnership Playbook — 10-module course by LMG Media',
}

export default function CourseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-[var(--color-bg-primary)]">
      {/* LMG course header — standalone, no DealHub chrome */}
      <header className="shrink-0 flex items-center h-14 px-6 border-b border-[var(--color-border)]">
        <span className="text-lg font-bold tracking-tight">
          <span style={{ color: '#FF4D94' }}>LMG</span>
          <span className="text-[var(--color-text-secondary)] font-normal mx-1.5">·</span>
          <span style={{ color: '#FFD700' }}>Brand Partnership Playbook</span>
        </span>
      </header>
      {children}
    </div>
  )
}
