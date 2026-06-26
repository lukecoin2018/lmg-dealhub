const niches = [
  { label: 'Finance / Tech / B2B', rate: 'Premium rates', note: 'High buying power, high-value products' },
  { label: 'Health / Parenting / Home', rate: 'Strong rates', note: 'Dedicated, action-taking audiences' },
  { label: 'Lifestyle / Fashion / Beauty', rate: 'Competitive', note: 'High volume, requires differentiation' },
]

const erTiers = [
  { range: '2–3%', label: 'Average', variant: 'avg' },
  { range: '3–5%', label: 'Good',    variant: 'good' },
  { range: '5%+',  label: 'Excellent', variant: 'exc' },
]

export default function PricingLevers() {
  return (
    <div className="pl-wrap">
      <p className="pl-eyebrow">Two factors that move your baseline rate</p>
      <div className="pl-levers">

        {/* Lever 1: Niche */}
        <div className="pl-lever">
          <div className="pl-lever-head">
            <span className="pl-lever-num">01</span>
            <strong className="pl-lever-title">Niche</strong>
          </div>
          <p className="pl-lever-sub">Specialisation beats breadth — a focused audience commands a premium over a general one of the same size.</p>
          <div className="pl-niche-list">
            {niches.map(n => (
              <div key={n.label} className="pl-niche-row">
                <span className="pl-niche-label">{n.label}</span>
                <span className="pl-niche-rate">{n.rate}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lever 2: Engagement */}
        <div className="pl-lever pl-lever--er">
          <div className="pl-lever-head">
            <span className="pl-lever-num">02</span>
            <strong className="pl-lever-title">Engagement</strong>
          </div>
          <p className="pl-lever-sub">The number from Module 1 — this is where it finally sets your price. Above average means above baseline, full stop.</p>
          <div className="pl-er-tiers">
            {erTiers.map(t => (
              <div key={t.label} className={`pl-er-tier pl-er-tier--${t.variant}`}>
                <span className="pl-er-val">{t.range}</span>
                <span className="pl-er-label">{t.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
