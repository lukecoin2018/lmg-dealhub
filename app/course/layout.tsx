import type { ReactNode } from 'react'
import HeaderAuth from '@/components/auth/HeaderAuth'

export const metadata = {
  title: 'Brand Partnership Playbook · LMG Media',
  description: 'The Complete Brand Partnership Playbook — 10-module course by LMG Media',
}

export default function CourseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen" style={{ background: '#FAFAF8' }}>
      {/* LMG course header — standalone, no DealHub chrome. Fixed light palette — not affected by global dark-mode theme. */}
      <header className="shrink-0 flex items-center justify-between gap-4 h-14 px-6" style={{ borderBottom: '1px solid #E5E0D5', background: '#FAFAF8' }}>
        <span className="text-lg font-bold tracking-tight" style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <span style={{ color: '#FF4D94' }}>LMG</span>
          <span style={{ color: '#9C9589', fontWeight: 400, margin: '0 6px' }}>·</span>
          <span style={{ color: '#FFD700' }}>Brand Partnership Playbook</span>
        </span>
        <HeaderAuth />
      </header>
      {children}
    </div>
  )
}
