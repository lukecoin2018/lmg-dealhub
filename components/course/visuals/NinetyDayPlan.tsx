const phases = [
  {
    range: 'Days 1–30',
    label: 'Foundation',
    color: 'blue',
    tasks: [
      'Lock in your numbers — rate, range, floor',
      'Finalize your media kit',
      'Build your target list to 20–30 brands',
      'Put the weekly pipeline habit on the calendar',
      'Send your first three pitches',
    ],
  },
  {
    range: 'Days 31–60',
    label: 'Deals in motion',
    color: 'pink',
    tasks: [
      'At least one real negotiation underway',
      'A contract generated for a live deal',
      'A brief and shot list on your sponsored content',
      'A performance report on every post',
    ],
  },
  {
    range: 'Days 61–90',
    label: 'Scale the model',
    color: 'yellow',
    tasks: [
      'Send a retainer conversion email',
      'Build an ambassadorship proposal',
      'Set your quarterly check-in dates',
      'Run your first quarterly review',
    ],
  },
]

export default function NinetyDayPlan() {
  return (
    <div className="ndp-wrap">
      <p className="ndp-eyebrow">Your 90-day plan — inspiration into income</p>
      <div className="ndp-phases">
        {phases.map((p, i) => (
          <div key={p.range} className={`ndp-phase ndp-phase--${p.color}`}>
            <div className={`ndp-phase-head ndp-phase-head--${p.color}`}>
              <span className="ndp-range">{p.range}</span>
              <strong className="ndp-label">{p.label}</strong>
            </div>
            <ul className="ndp-tasks">
              {p.tasks.map((t, j) => (
                <li key={j} className="ndp-task">
                  <span className="ndp-check">□</span>
                  {t}
                </li>
              ))}
            </ul>
            {i < phases.length - 1 && <div className="ndp-connector" />}
          </div>
        ))}
      </div>
      <div className="ndp-close">
        <span className="ndp-close-text">The only variable: whether you actually do it, consistently, for ninety days.</span>
      </div>
    </div>
  )
}
