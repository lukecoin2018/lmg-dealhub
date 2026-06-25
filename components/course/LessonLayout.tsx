'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { ModuleData } from '@/lib/course/moduleData'
import VideoSegment from './VideoSegment'
import '@/styles/lesson.css'

interface LessonLayoutProps {
  data: ModuleData
}

const STORAGE_KEY_PREFIX = 'lmg-lesson-progress-v1-'

export default function LessonLayout({ data }: LessonLayoutProps) {
  const storageKey = STORAGE_KEY_PREFIX + data.slug

  // PHASE 2: replace this useState + localStorage hook with a per-user API call
  // (e.g. fetchUserProgress(userId, data.slug)) so progress syncs to their account.
  // The segment IDs in data.segments[].id are the stable keys for that API.
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) setCompleted(JSON.parse(raw))
    } catch {
      // ignore parse errors
    }
    setMounted(true)
  }, [storageKey])

  function toggleComplete(id: string) {
    setCompleted(prev => {
      const next = { ...prev, [id]: !prev[id] }
      try { localStorage.setItem(storageKey, JSON.stringify(next)) } catch { /* noop */ }
      return next
    })
  }

  const completedCount = mounted
    ? data.segments.filter(s => completed[s.id]).length
    : 0

  function scrollToSegment(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="lesson-root">
      {/* Subnav */}
      <nav className="lesson-subnav">
        <Link href="/course">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Course
        </Link>
        <span style={{ color: 'var(--neutral-300)' }}>·</span>
        <span>Module {String(data.number).padStart(2, '0')} — {data.title}</span>
      </nav>

      <div className="lesson-body">
        {/* Progress rail */}
        <aside className="lesson-rail">
          <p className="rail-heading">Your Path</p>
          <p className="rail-counter">
            {mounted ? (
              <><strong>{completedCount}</strong> of {data.segments.length} complete</>
            ) : (
              <span style={{ opacity: 0 }}>0 of {data.segments.length} complete</span>
            )}
          </p>
          <ul className="rail-items">
            {data.segments.map(seg => (
              <li key={seg.id}>
                <button
                  className={`rail-item${mounted && completed[seg.id] ? ' done' : ''}`}
                  onClick={() => scrollToSegment(seg.id)}
                  type="button"
                >
                  <span className="rail-item-dot">
                    {mounted && completed[seg.id] && (
                      <svg className="rail-item-dot-check" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="rail-item-label">
                    <span className="rail-eyebrow">{seg.eyebrow}</span>
                    {seg.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main scroll */}
        <main className="lesson-main">
          {/* Hero */}
          <section className="lesson-hero">
            <div
              className="lesson-hero-photo"
              style={{ backgroundImage: `url('${data.coverImage}')` }}
            />
            <div className="lesson-hero-overlay" />
            <div className="lesson-hero-content">
              <span className="lesson-hero-eyebrow">Module {String(data.number).padStart(2, '0')}</span>
              <span className="lesson-hero-module">The Complete Brand Partnership Playbook</span>
              <h1 className="lesson-hero-title">{data.title}</h1>
              <p className="lesson-hero-copy">{data.heroCopy}</p>
            </div>
          </section>

          {/* Segments */}
          <div className="lesson-segments">
            {data.segments.map((seg, i) => (
              <div key={seg.id}>
                <VideoSegment
                  segment={seg}
                  isComplete={mounted ? !!completed[seg.id] : false}
                  onToggleComplete={toggleComplete}
                />
                {i < data.segments.length - 1 && <hr className="segment-divider" style={{ marginTop: 48 }} />}
              </div>
            ))}
          </div>

          {/* Go deeper / workbook CTAs */}
          <div className="lesson-cta-row">
            <a href={`/course/${data.ebookSlug}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <div className="lesson-cta-card ebook">
                <div className="cta-icon">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect x="3" y="2" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 7H13M7 10.5H13M7 14H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="cta-label">Go deeper</p>
                  <p className="cta-title">Module {data.number} Ebook</p>
                  <p className="cta-sub">The full written companion — seven pages of frameworks, examples, and reference material.</p>
                </div>
                <div className="cta-action">
                  <span className="btn-cta-ebook">
                    Read the ebook
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>

            <a href={`/course/${data.workbookSlug}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <div className="lesson-cta-card workbook">
                <div className="cta-icon">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4 16L8 12L12 14L18 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 7H18V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="cta-label">Turn the lesson into your plan</p>
                  <p className="cta-title">Module {data.number} Workbook</p>
                  <p className="cta-sub">Interactive exercises that apply this module directly to your partnership business — live calculators, self-assessments, and action steps.</p>
                </div>
                <div className="cta-action">
                  <span className="btn-cta-workbook">
                    Open the workbook
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          </div>

          {/* Next module handoff */}
          {data.nextModule && (
            <div className="lesson-next">
              <div>
                <p className="next-label">Up next</p>
                <p className="next-title">{data.nextModule.title}</p>
                <p className="next-num">Module {String(data.nextModule.number).padStart(2, '0')}</p>
              </div>
              <Link href={`/course/module-${data.nextModule.number}-ebook`} className="btn-next-module">
                Go to Module {data.nextModule.number}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
