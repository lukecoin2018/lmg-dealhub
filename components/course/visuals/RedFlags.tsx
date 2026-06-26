const flags = [
  {
    num: 1,
    label: 'Payment red flags',
    signals: [
      "Won't discuss payment until after content is made",
      'Asks you to pay them (scam — walk immediately)',
      'Net-90+ with no flexibility',
      'Refuses any upfront payment from a new partnership',
    ],
  },
  {
    num: 2,
    label: '"Exposure" as currency',
    signals: [
      '"Think of the exposure" — established brands know this doesn\'t pay bills',
      'The only exception: very early career, specific and substantial placement, never vague',
    ],
  },
  {
    num: 3,
    label: 'Structural exploitation',
    signals: [
      'Ten posts + full usage + year-long exclusivity + total creative control — at one-post pricing',
      'When the math simply doesn\'t add up: decline or restructure',
    ],
  },
  {
    num: 4,
    label: 'Refusal to put it in writing',
    signals: [
      '"Let\'s keep it casual" = inexperienced or planning to change terms later',
      'The Contract Builder takes 15 minutes. No contract, no work.',
    ],
  },
  {
    num: 5,
    label: 'Pressure tactics',
    signals: [
      '"Decide today" / "other creators are waiting" / "take it or leave it"',
      'Real opportunities give you time to think. Manufactured urgency makes you skip the steps that protect you.',
    ],
  },
]

export default function RedFlags() {
  return (
    <div className="rf-wrap">
      <p className="rf-eyebrow">Five red flags — and the skill that ties them together</p>
      <div className="rf-list">
        {flags.map(f => (
          <div key={f.num} className="rf-item">
            <div className="rf-num-col">
              <span className="rf-num">{f.num}</span>
            </div>
            <div className="rf-body">
              <strong className="rf-label">{f.label}</strong>
              <ul className="rf-signals">
                {f.signals.map((s, i) => (
                  <li key={i} className="rf-signal">{s}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="rf-pattern">
        <span className="rf-pattern-label">Pattern recognition</span>
        <span className="rf-pattern-text">One flag might be a bad week. Two or three together is a pattern — and patterns don't reverse themselves.</span>
      </div>
    </div>
  )
}
