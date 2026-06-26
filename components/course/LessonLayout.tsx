'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Play, Layers, Clock, BookOpen, CheckCircle, PenLine, ArrowRight } from 'lucide-react'
import type { ModuleData, Segment } from '@/lib/course/moduleData'
import VideoSegment from './VideoSegment'
import RevenueStreamsGrid from './visuals/RevenueStreamsGrid'
import EngagementCallout from './visuals/EngagementCallout'
import EngagementRateViz from './visuals/EngagementRateViz'
import CourseRoadmap from './visuals/CourseRoadmap'
import ThreeChannels from './visuals/ThreeChannels'
import OutreachSteps from './visuals/OutreachSteps'
import MediaKitCallout from './visuals/MediaKitCallout'
import '@/styles/lesson.css'

interface LessonLayoutProps {
  data: ModuleData
}

const STORAGE_KEY_PREFIX = 'lmg-lesson-progress-v1-'

export default function LessonLayout({ data }: LessonLayoutProps) {
  const storageKey = STORAGE_KEY_PREFIX + data.slug

  // PHASE 2: replace with a per-user API call so progress syncs to their account.
  // The segment IDs in data.segments[].id are the stable keys for that API.
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const [mounted, setMounted] = useState(false)
  const [activeId, setActiveId] = useState<string>('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) setCompleted(JSON.parse(raw))
    } catch {
      // ignore parse errors
    }
    setMounted(true)
  }, [storageKey])

  // Scroll-spy: highlights the rail item for the segment currently in view
  useEffect(() => {
    const scroll = scrollRef.current
    if (!scroll) return
    const observers: IntersectionObserver[] = []
    data.segments.forEach(seg => {
      const el = document.getElementById(seg.id)
      if (!el) return
      const obs = new IntersectionObserver(
        entries => {
          entries.forEach(en => {
            if (en.isIntersecting) setActiveId(seg.id)
          })
        },
        { root: scroll, rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [data.segments])

  const scrollToSegment = useCallback((id: string) => {
    const scroll = scrollRef.current
    const el = document.getElementById(id)
    if (!el || !scroll) return
    const elTop = el.getBoundingClientRect().top
    const scrollTop = scroll.getBoundingClientRect().top
    scroll.scrollBy({ top: elTop - scrollTop - 32, behavior: 'smooth' })
  }, [])

  function toggleComplete(id: string) {
    setCompleted(prev => {
      const isCompleting = !prev[id]
      const next = { ...prev, [id]: isCompleting }
      try { localStorage.setItem(storageKey, JSON.stringify(next)) } catch { /* noop */ }
      if (isCompleting) {
        const idx = data.segments.findIndex(s => s.id === id)
        if (idx > -1 && idx < data.segments.length - 1) {
          setTimeout(() => scrollToSegment(data.segments[idx + 1].id), 200)
        }
      }
      return next
    })
  }

  const completedCount = mounted ? data.segments.filter(s => completed[s.id]).length : 0

  const totalMinutes = data.segments.reduce((sum, s) => {
    const m = parseInt(s.duration)
    return sum + (isNaN(m) ? 0 : m)
  }, 0)

  const moduleNum = String(data.number).padStart(2, '0')

  function getVisual(seg: Segment): React.ReactNode {
    switch (seg.visualId) {
      case 'revenue-streams':    return <RevenueStreamsGrid />
      case 'engagement-callout': return <EngagementCallout />
      case 'engagement-rate':    return <EngagementRateViz />
      case 'course-roadmap':     return <CourseRoadmap currentModule={data.number} />
      case 'three-channels':     return <ThreeChannels />
      case 'outreach-steps':     return <OutreachSteps />
      case 'media-kit-callout':  return <MediaKitCallout />
      default:                   return null
    }
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
        <span>Module {moduleNum} — {data.title}</span>
      </nav>

      {/* Single scroll container */}
      <div className="lesson-scroll" ref={scrollRef}>

        {/* Hero — full width */}
        <section className="lesson-hero">
          <div
            className="lesson-hero-photo"
            style={{ backgroundImage: `url('${data.heroImage}')` }}
          />
          <div className="lesson-hero-overlay" />
          <div className="lesson-hero-content">
            <div className="lesson-hero-eyebrow-row">
              <span className="lesson-hero-badge">Module {moduleNum}</span>
              <span className="lesson-hero-dot" />
              <span>The Brand Partnership Playbook</span>
            </div>
            <h1 className="lesson-hero-title">{data.title}</h1>
            <p className="lesson-hero-copy">{data.heroCopy}</p>
            <div className="lesson-hero-actions">
              <button
                className="btn-begin"
                type="button"
                onClick={() => scrollToSegment(data.segments[0]?.id ?? '')}
              >
                <Play size={16} />
                Begin Module
              </button>
              <div className="lesson-hero-meta">
                <span className="lesson-hero-meta-item">
                  <Layers size={15} />
                  {data.segments.length} segments
                </span>
                <span className="lesson-hero-meta-dot" />
                <span className="lesson-hero-meta-item">
                  <Clock size={15} />
                  {totalMinutes} min
                </span>
                <span className="lesson-hero-meta-dot" />
                <span className="lesson-hero-meta-item">
                  <BookOpen size={15} />
                  Ebook + workbook
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile-only sticky progress bar — hidden on desktop, shown ≤1080px */}
        {(() => {
          // Active segment for the context label; fall back to first segment before any scroll
          const activeSeg = data.segments.find(s => s.id === activeId) ?? data.segments[0]
          return (
            <div className="rail-mobile-bar" aria-label="Module progress">
              <div className="rmb-dots" role="list">
                {data.segments.map((seg, i) => {
                  const isDone = mounted && !!completed[seg.id]
                  const isActive = activeId === seg.id
                  let cls = 'rmb-dot'
                  if (isDone) cls += ' done'
                  else if (isActive) cls += ' active'
                  return (
                    <button
                      key={seg.id}
                      role="listitem"
                      className={cls}
                      onClick={() => scrollToSegment(seg.id)}
                      type="button"
                      aria-label={`${isDone ? 'Completed: ' : ''}Segment ${i + 1} — ${seg.title}`}
                    />
                  )
                })}
              </div>
              {activeSeg && (
                <p className="rmb-active-label">
                  <span className="rmb-eyebrow">{activeSeg.eyebrow}</span>
                  {activeSeg.title}
                </p>
              )}
              {mounted && (
                <span className="rmb-count">
                  <b>{completedCount}</b>/{data.segments.length}
                </span>
              )}
            </div>
          )
        })()}

        {/* Two-column body */}
        <div className="lesson-body">

          {/* Progress rail */}
          <aside className="lesson-rail">
            <p className="rail-kicker">Your path</p>
            <h2 className="rail-title">In this module</h2>
            <ol className="rail-items">
              {data.segments.map((seg, i) => {
                const isDone = mounted && !!completed[seg.id]
                const isActive = activeId === seg.id
                let cls = 'rail-item'
                if (isActive && !isDone) cls += ' active'
                if (isDone) cls += ' done'
                return (
                  <li key={seg.id}>
                    <button
                      className={cls}
                      onClick={() => scrollToSegment(seg.id)}
                      type="button"
                    >
                      <span className="rail-num">
                        <span className="num-txt">{String(i + 1).padStart(2, '0')}</span>
                      </span>
                      <span className="rail-label">
                        <span className="rail-seg">{seg.eyebrow}</span>
                        <span className="rail-name">{seg.title}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
            <div className="rail-foot">
              <div className="rail-foot-count">
                {mounted ? (
                  <><b>{completedCount}</b> of {data.segments.length} complete</>
                ) : (
                  <span style={{ opacity: 0 }}>0 of {data.segments.length} complete</span>
                )}
              </div>
              <div className="rail-foot-label">Mark each segment as you finish.</div>
            </div>
          </aside>

          {/* Main content */}
          <main className="lesson-main">

            {/* Module intro lead */}
            {data.moduleIntro && (
              <div className="module-intro">
                <p className="lead">{data.moduleIntro}</p>
              </div>
            )}

            {/* Segments */}
            <div className="lesson-segments">
              {data.segments.map((seg, i) => (
                <VideoSegment
                  key={seg.id}
                  segment={seg}
                  index={i}
                  isComplete={mounted ? !!completed[seg.id] : false}
                  onToggleComplete={toggleComplete}
                  visual={getVisual(seg)}
                />
              ))}
            </div>

            {/* Ebook — Go deeper */}
            <div className="lesson-ebook">
              <div className="ebook-text">
                <div className="ebook-eyebrow">Go deeper</div>
                <h2>The full landscape, in writing.</h2>
                <p>
                  The videos give you the picture. The companion ebook gives you the depth — every
                  income model broken down, real rate benchmarks, and the negotiation language to
                  use them.
                </p>
                <ul className="ebook-features">
                  <li>
                    <CheckCircle size={16} />
                    All six income models, with example rates
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    Rate benchmarks by follower tier and niche
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    Scripts for the five pricing conversations
                  </li>
                </ul>
                <a
                  href={`/course/${data.ebookSlug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ebook-cta"
                >
                  <BookOpen size={16} />
                  Read the ebook
                </a>
              </div>

              <div className="ebook-cover">
                <div className="ebook-book">
                  <div
                    className="ebook-book-img"
                    style={{ backgroundImage: `url('${data.ebookCover}')` }}
                  />
                  <div className="ebook-book-wash" />
                  <div className="ebook-book-content">
                    <span className="ebook-book-kicker">Module {data.number} · Companion</span>
                    <div className="ebook-book-title">{data.title}</div>
                    <div className="ebook-book-sub">The Brand Partnership Playbook</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Workbook CTA */}
            <div className="lesson-workbook">
              <div className="workbook-eyebrow">
                <PenLine size={14} />
                Put it into practice
              </div>
              <h2>Turn the lesson into your plan.</h2>
              <p>
                The interactive workbook walks you through your engagement-rate number, your current
                income mix, and the one model you'll add next — in about fifteen minutes.
              </p>
              <div className="workbook-actions">
                <a
                  href={`/course/${data.workbookSlug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-workbook-cta"
                >
                  Open the workbook
                  <ArrowRight size={16} />
                </a>
                <span className="workbook-meta">
                  <Clock size={13} />
                  ~15 minutes · saves as you go
                </span>
              </div>
            </div>

            {/* Next module card */}
            {data.nextModule && (
              <div className="lesson-nextmod">
                <div className="nextmod-label">Up next</div>
                <div className="nm-card">
                  <div className="nm-body">
                    <div className="nm-eyebrow">
                      <b>Module {String(data.nextModule.number).padStart(2, '0')}</b>
                      &nbsp;·&nbsp;
                      The Brand Partnership Playbook
                    </div>
                    <h3>{data.nextModule.title}</h3>
                    <p>
                      You know the landscape. Now learn how to get on the radar of the brands
                      worth partnering with — and make them come to you.
                    </p>
                    <Link href={`/course/${data.nextModule.slug}`} className="nm-next">
                      <span className="nm-arrow">
                        <ArrowRight size={18} />
                      </span>
                      Start Module {data.nextModule.number}
                    </Link>
                  </div>
                  <div
                    className="nm-photo"
                    style={{ backgroundImage: `url('${data.nextModule.coverImage}')` }}
                  >
                    <span className="nm-chip">Module {data.nextModule.number}</span>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  )
}
