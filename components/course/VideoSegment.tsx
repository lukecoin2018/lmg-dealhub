'use client'

import type { Segment } from '@/lib/course/moduleData'

interface VideoSegmentProps {
  segment: Segment
  isComplete: boolean
  onToggleComplete: (id: string) => void
}

export default function VideoSegment({ segment, isComplete, onToggleComplete }: VideoSegmentProps) {
  return (
    <div className="segment-block" id={segment.id}>
      <p className="segment-eyebrow">{segment.eyebrow}</p>
      <h2 className="segment-title">{segment.title}</h2>

      {/* Video slot — swap videoEmbed from null to an embed URL/iframe string to go live */}
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
            <div className="video-placeholder-icon">
              {/* Play triangle */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4.5L15.5 10 7 15.5V4.5Z" fill="currentColor" opacity="0.5" />
              </svg>
            </div>
            <span className="video-placeholder-title">In Production</span>
            <span className="video-placeholder-sub">Being filmed now — check back soon</span>
          </div>
        )}
      </div>

      <p className="segment-summary">{segment.summary}</p>

      <div className="segment-footer">
        <span className="segment-duration">{segment.duration}</span>
        <button
          className={`btn-complete${isComplete ? ' done' : ''}`}
          onClick={() => onToggleComplete(segment.id)}
          type="button"
        >
          {isComplete ? (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7L5.5 10.5L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Completed
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Mark complete
            </>
          )}
        </button>
      </div>
    </div>
  )
}
