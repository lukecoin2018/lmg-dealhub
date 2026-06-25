'use client'

import { Clock } from 'lucide-react'
import type { Segment } from '@/lib/course/moduleData'

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

function durationToTimecode(duration: string): string {
  const m = parseInt(duration)
  return isNaN(m) ? '00:00' : `${String(m).padStart(2, '0')}:00`
}

function renderWithHighlight(text: string, highlight?: string) {
  if (!highlight) return <>{text}</>
  const idx = text.indexOf(highlight)
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span className="pq-hl">{highlight}</span>
      {text.slice(idx + highlight.length)}
    </>
  )
}

interface VideoSegmentProps {
  segment: Segment
  index: number
  isComplete: boolean
  onToggleComplete: (id: string) => void
}

export default function VideoSegment({ segment, index, isComplete, onToggleComplete }: VideoSegmentProps) {
  const numeral = ROMAN[index] ?? String(index + 1)
  const timecode = durationToTimecode(segment.duration)
  const displayIndex = String(index + 1).padStart(2, '0')
  const chapterRef = `Ebook · Ch ${segment.eyebrow.replace(/^Chapter\s*/i, '')}`

  return (
    <article className="segment-block" id={segment.id}>

      {/* Segment header: oversized numeral + kicker + title */}
      <div className="seg-head">
        <span className="seg-index" aria-hidden="true">{displayIndex}</span>
        <div className="seg-headtext">
          <div className="seg-kicker">
            <span className="sk-ey">{segment.eyebrow}</span>
            <span className="sk-rule" aria-hidden="true" />
            <span className="sk-chap">{chapterRef}</span>
          </div>
          <h2 className="segment-title">{segment.title}</h2>
        </div>
      </div>

      {/* Video slot — swap videoEmbed from null to an embed URL to go live */}
      <div className="segment-video">
        {segment.videoEmbed ? (
          <iframe
            src={segment.videoEmbed}
            title={segment.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="video-placeholder">
            <div className="vp-grain" aria-hidden="true" />
            <div className="vp-glow" aria-hidden="true" />
            <div className="vp-wm" aria-hidden="true">{numeral}</div>

            <div className="vp-center">
              <div className="play-ring" aria-hidden="true">
                <span className="play-tri" />
              </div>
              <div className="vp-status">
                <span className="vp-live" />
                In production
              </div>
              <p className="vp-sub">
                Being filmed now — you'll be notified the moment it's live.
              </p>
            </div>

            <div className="vp-bar" aria-hidden="true">
              <span className="vp-time">00:00</span>
              <span className="vp-track"><i /></span>
              <span className="vp-time">{timecode}</span>
              <span className="vp-lmg">LMG Media</span>
            </div>
          </div>
        )}
      </div>

      {/* Teaching text */}
      <div className="teach">
        <p>{segment.summary}</p>

        {segment.pullQuote && (
          <div className="pullquote">
            <span className="pq-mark" aria-hidden="true">"</span>
            <p>{renderWithHighlight(segment.pullQuote.text, segment.pullQuote.highlight)}</p>
          </div>
        )}

        {segment.factors && segment.factors.length > 0 && (
          <div className="factors">
            {segment.factors.map((f, i) => (
              <span key={f} className="factor">
                <span className="fn">{i + 1}</span>
                {f}
              </span>
            ))}
          </div>
        )}

        {segment.dataNote && (
          <div className="data-note">
            <span className="dn-formula">{segment.dataNote.formula}</span>
            <span className="dn-vr" aria-hidden="true" />
            <span className="dn-txt">{segment.dataNote.description}</span>
          </div>
        )}

        {segment.benchmarks && segment.benchmarks.length > 0 && (
          <div className="bench">
            {segment.benchmarks.map(b => (
              <div key={b.label} className={`bench-b ${b.variant ?? 'avg'}`}>
                <span className="bv">{b.value}</span>
                <span className="bl">{b.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer: mark complete + duration */}
      <div className="seg-foot">
        <button
          className={`mark${isComplete ? ' done' : ''}`}
          onClick={() => onToggleComplete(segment.id)}
          type="button"
        >
          <span className="tick">
            {isComplete && (
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5L5 9.5L11 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <span className="mark-do">Mark segment complete</span>
          <span className="mark-done">Completed</span>
        </button>

        <span className="seg-runtime">
          <Clock size={14} />
          {segment.duration}
        </span>
      </div>

    </article>
  )
}
