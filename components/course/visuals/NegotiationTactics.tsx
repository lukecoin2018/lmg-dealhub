const tactics = [
  {
    num: 1,
    label: 'Anchor high',
    detail: 'Open 15–20% above your target. Standard practice — it gives you room to concede and still land on your real number.',
    isKey: false,
  },
  {
    num: 2,
    label: 'Trade variables, don\'t drop price',
    detail: '"Over budget"? Change what they get — fewer deliverables, a shorter usage window, no exclusivity. Price is the last lever you touch, not the first.',
    isKey: true,
  },
  {
    num: 3,
    label: 'Bundle to grow the deal',
    detail: '"One post is $2,000; three over two months is $5,400." Better per-post rate for them, sustained visibility, and you held your positioning while growing the total.',
    isKey: false,
  },
  {
    num: 4,
    label: 'Add value instead of shrinking it',
    detail: 'An extra Story, a longer window, BTS footage, a testimonial — things that cost you little but feel substantial, keeping your core rate intact.',
    isKey: false,
  },
  {
    num: 5,
    label: 'Use silence',
    detail: 'State your rate, give one brief reason it\'s fair, then stop talking. Most creators panic in the pause and discount themselves before the brand even responds. Don\'t.',
    isKey: false,
  },
]

export default function NegotiationTactics() {
  return (
    <div className="nt-wrap">
      <p className="nt-eyebrow">Five tactics — none of them "lower your price and hope"</p>
      <div className="nt-list">
        {tactics.map(t => (
          <div key={t.num} className={`nt-item${t.isKey ? ' nt-item--key' : ''}`}>
            <div className="nt-num-col">
              <span className="nt-num">{t.num}</span>
            </div>
            <div className="nt-body">
              <div className="nt-head-row">
                <strong className="nt-label">{t.label}</strong>
                {t.isKey && <span className="nt-key-badge">Most important</span>}
              </div>
              <p className="nt-detail">{t.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
