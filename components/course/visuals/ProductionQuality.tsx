const levers = [
  {
    num: 1,
    label: 'Lighting',
    impact: 'Biggest visible difference',
    guidance: 'Natural light (golden hour or a big window) is the gold standard. Ring light or LED panel as a fallback. Never the built-in flash or a single harsh overhead.',
  },
  {
    num: 2,
    label: 'Audio',
    impact: 'Where creators quietly lose viewers',
    guidance: 'Bad audio makes a beautiful shot feel amateur. A cheap lav or shotgun mic transforms it instantly — test before committing to a full shoot.',
  },
  {
    num: 3,
    label: 'Composition',
    impact: '"Intentional" vs. "snapshot"',
    guidance: 'Rule of thirds over dead-center. Watch your background — clutter reads as careless. Varied angles for visual rhythm.',
  },
  {
    num: 4,
    label: 'Brand integration',
    impact: 'Landing vs. getting scrolled past',
    guidance: 'Not the stiff product-to-camera pose. Product woven into your real style, so the viewer thinks "useful" before they realize it\'s an ad.',
  },
]

export default function ProductionQuality() {
  return (
    <div className="pq-wrap">
      <p className="pq-eyebrow">Four levers — in the order they actually matter</p>
      <div className="pq-list">
        {levers.map(l => (
          <div key={l.num} className="pq-item">
            <div className="pq-num-col">
              <span className="pq-num">{l.num}</span>
            </div>
            <div className="pq-body">
              <div className="pq-head">
                <strong className="pq-label">{l.label}</strong>
                <span className="pq-impact">{l.impact}</span>
              </div>
              <p className="pq-guidance">{l.guidance}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pq-principle">
        <span className="pq-principle-label">Principle</span>
        <span className="pq-principle-text">Intentional beats expensive — every single time.</span>
      </div>
    </div>
  )
}
