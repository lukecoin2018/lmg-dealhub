const systems = [
  {
    num: 1,
    label: 'Pipeline habit',
    cadence: '90 min · weekly',
    detail: 'Same day, same time every week: add brands, prep outreach, send pitches. Three pitches a week beats twenty in one frantic month.',
  },
  {
    num: 2,
    label: 'Quarterly review',
    cadence: '1 hr · 4× per year',
    detail: 'Revenue by deal type, what renewed, where your time actually went. Spot trends before they become problems.',
  },
  {
    num: 3,
    label: 'Reinvestment',
    cadence: '10–15% of revenue',
    detail: 'Gear, an accountant, education, time-saving software. It compounds — better work earns better rates.',
  },
  {
    num: 4,
    label: 'Creator community',
    cadence: 'Give before you ask',
    detail: 'Peers refer you, share rate intel, and pass along work they can\'t take. Abundance, not rivalry — the generous get helped most.',
  },
  {
    num: 5,
    label: 'Boundaries',
    cadence: 'Communicate consistently',
    detail: 'Working hours, 24-hour response policy, minimum project sizes. Brands respect what you communicate consistently — and learn to work within it.',
  },
]

export default function FiveSystems() {
  return (
    <div className="fs-wrap">
      <p className="fs-eyebrow">Five systems — none of them run on willpower</p>
      <div className="fs-list">
        {systems.map(s => (
          <div key={s.num} className="fs-item">
            <div className="fs-num-col">
              <span className="fs-num">{s.num}</span>
            </div>
            <div className="fs-body">
              <div className="fs-head">
                <strong className="fs-label">{s.label}</strong>
                <span className="fs-cadence">{s.cadence}</span>
              </div>
              <p className="fs-detail">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="fs-footer">The business runs because the systems run — week after week, motivated or not.</p>
    </div>
  )
}
