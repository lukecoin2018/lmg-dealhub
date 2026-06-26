const steps = [
  {
    label: 'Day 0',
    action: 'Send your pitch',
    detail: 'Six-part email, timed to the right seasonal window.',
    terminal: false,
  },
  {
    label: '+5–7 days',
    action: 'Follow-up 1',
    detail: 'Brief and warm. Reference the original — keep it in the same thread.',
    terminal: false,
  },
  {
    label: '+5–7 days',
    action: 'Follow-up 2',
    detail: '"I\'d love to stay on your radar for future campaigns." Short. Then stop.',
    terminal: true,
  },
]

export default function FollowupCadence() {
  return (
    <div className="fc-wrap">
      <p className="fc-eyebrow">Follow-up on a plan — not a mood</p>
      <div className="fc-timeline">
        {steps.map((s, i) => (
          <div key={i} className={`fc-step${s.terminal ? ' fc-step--terminal' : ''}`}>
            <div className="fc-connector-col">
              <div className={`fc-dot${s.terminal ? ' fc-dot--terminal' : ''}`} />
              {i < steps.length - 1 && <div className="fc-line" />}
            </div>
            <div className="fc-content">
              <div className="fc-time">{s.label}</div>
              <strong className="fc-action">{s.action}</strong>
              <p className="fc-detail">{s.detail}</p>
              {s.terminal && (
                <div className="fc-stop">
                  <span className="fc-stop-badge">Stop here</span>
                  <span className="fc-stop-note">Pushing past two follow-ups works against you. Add them back to your list and try again in 6–12 months.</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="fc-reframe">A non-response almost always means no budget right now — not a rejection. None of it is personal, and all of it can change.</p>
    </div>
  )
}
