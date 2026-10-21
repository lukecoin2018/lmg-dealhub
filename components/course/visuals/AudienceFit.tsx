const rows = [
  {
    label: 'What it is',
    demo: 'Age, location, gender, interests',
    psycho: 'Attitudes, values, lifestyle',
  },
  {
    label: 'Where to read it',
    demo: 'Your audience data from Module 1',
    psycho: 'Your comments and DMs — what they care about, the problems they’re solving, what they ask you to recommend',
  },
  {
    label: 'If it doesn’t match',
    demo: 'Not an automatic no — have an honest conversation with the brand and adjust expectations together',
    psycho: 'A deal can look perfect on paper and still be wrong. Your audience feels the mismatch, even if they can’t name it',
  },
]

export default function AudienceFit() {
  return (
    <div className="af-wrap">
      <p className="af-eyebrow">Audience fit — check both layers</p>
      <div className="af-grid">
        <div className="af-col-head af-col-head--demo">Layer 1 · Demographics</div>
        <div className="af-col-head af-col-head--psycho">Layer 2 · Psychographics</div>
        {rows.map(r => (
          <div key={r.label} className="af-row">
            <div className="af-cell af-cell--demo">
              <span className="af-row-label">{r.label}</span>
              <span className="af-text">{r.demo}</span>
            </div>
            <div className="af-cell af-cell--psycho">
              <span className="af-row-label">{r.label}</span>
              <span className="af-text">{r.psycho}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="af-footer">The second layer is where the real money is: a deal that fits psychographically performs better — and performance is what gets you rebooked, referred, and paid more.</p>
    </div>
  )
}
