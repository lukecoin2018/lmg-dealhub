const formats = [
  {
    format: 'Feed post',
    rule: 'Disclose in caption before the "more" cutoff — within the first 125 characters.',
    example: '#ad or #sponsored at the start, not buried in hashtags.',
  },
  {
    format: 'Stories',
    rule: 'Every frame, not just the first — viewers land anywhere.',
    example: 'A text sticker on every slide. "Paid Partnership" tag supplements, never replaces.',
  },
  {
    format: 'Reels & TikTok',
    rule: 'Caption + verbally or visually in the first 30 seconds.',
    example: 'Say it out loud and show it on screen in the opening.',
  },
  {
    format: 'Affiliate links',
    rule: '"May earn a commission" — even without direct payment.',
    example: 'Required regardless of whether you were paid a flat fee.',
  },
  {
    format: 'Gifted product',
    rule: 'Still requires disclosure — gifted ≠ free speech.',
    example: '#gifted or "[Brand] sent me this" clearly visible.',
  },
]

export default function FtcDisclosure() {
  return (
    <div className="ftc-wrap">
      <div className="ftc-principle">
        <span className="ftc-principle-label">The principle</span>
        <strong className="ftc-principle-text">"Clear and conspicuous" — impossible to miss</strong>
        <p className="ftc-principle-sub">
          #ad, #sponsored, #partner ✓ &nbsp;·&nbsp; #collab, #sp, vague "thanks [brand]" ✗
        </p>
      </div>
      <p className="ftc-eyebrow">Format by format</p>
      <div className="ftc-table">
        {formats.map(f => (
          <div key={f.format} className="ftc-row">
            <div className="ftc-format">{f.format}</div>
            <div className="ftc-rule-col">
              <p className="ftc-rule">{f.rule}</p>
              <p className="ftc-example">{f.example}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="ftc-footer">Platform tags like "Paid Partnership" supplement your disclosure — they never replace it. Use both.</p>
    </div>
  )
}
