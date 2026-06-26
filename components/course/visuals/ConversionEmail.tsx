const parts = [
  {
    num: 1,
    label: 'Lead with the result',
    job: 'Remind them it worked',
    example: '"The Reel hit 7.2% engagement and drove 480 site clicks, both above our projections."',
    note: 'The fresh data is why you send this within a week — before it\'s forgotten.',
  },
  {
    num: 2,
    label: 'Show genuine enthusiasm',
    job: 'Sound invested, not transactional',
    example: '"I really enjoyed working with the team, and the response was strong — people are still commenting and asking where to buy."',
    note: null,
  },
  {
    num: 3,
    label: 'Propose the next stage',
    job: 'A shape, not a vague "more deals"',
    example: '"I\'d love to explore an ongoing partnership — something like 2–3 pieces a month over the next quarter, to build sustained visibility."',
    note: 'Specific enough to feel real, open enough to negotiate.',
  },
  {
    num: 4,
    label: 'Suggest a next step',
    job: 'Ask for a conversation, not a yes',
    example: '"Could we set up a 20-minute call next week to talk through what this could look like?"',
    note: 'A far easier thing for a brand to agree to. If not ready for a retainer, propose a test phase: three campaigns, then decide.',
  },
]

export default function ConversionEmail() {
  return (
    <div className="ce-wrap">
      <div className="ce-timing">
        <span className="ce-timing-label">When to send</span>
        <strong className="ce-timing-val">Within one week of a strong post</strong>
        <span className="ce-timing-sub">When the brand is happy, the data is fresh, and you're top of mind.</span>
      </div>
      <p className="ce-eyebrow">Four parts — short, warm, decisive</p>
      <div className="ce-parts">
        {parts.map(p => (
          <div key={p.num} className="ce-part">
            <div className="ce-part-left">
              <span className="ce-part-num">{p.num}</span>
            </div>
            <div className="ce-part-body">
              <div className="ce-part-head">
                <strong className="ce-part-label">{p.label}</strong>
                <span className="ce-part-job">{p.job}</span>
              </div>
              <p className="ce-part-example">{p.example}</p>
              {p.note && <p className="ce-part-note">{p.note}</p>}
            </div>
          </div>
        ))}
      </div>
      <div className="ce-bottom">
        <span className="ce-bottom-text">Most creators never send this email. You will — and that's how a one-time check becomes a monthly one.</span>
      </div>
    </div>
  )
}
