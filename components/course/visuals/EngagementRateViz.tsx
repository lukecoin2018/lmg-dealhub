import Link from 'next/link'

const tiers = [
  { range: '2–3%', label: 'Average',   variant: 'avg' },
  { range: '3–5%', label: 'Good',      variant: 'good' },
  { range: '5%+',  label: 'Excellent', variant: 'exc' },
]

export default function EngagementRateViz() {
  return (
    <div className="er-viz">
      <p className="er-eyebrow">Calculate your number</p>
      <div className="er-formula">
        <span className="er-term">(Likes + Comments)</span>
        <span className="er-op">÷</span>
        <span className="er-term">Followers</span>
        <span className="er-op">×</span>
        <span className="er-term">100</span>
        <span className="er-eq">=</span>
        <span className="er-result">ER %</span>
      </div>
      <div className="er-tiers">
        {tiers.map(t => (
          <div key={t.label} className={`er-tier er-tier--${t.variant}`}>
            <span className="er-tier-val">{t.range}</span>
            <span className="er-tier-label">{t.label}</span>
          </div>
        ))}
      </div>
      <Link href="/calculator" className="er-cta">
        Open the rate calculator →
      </Link>
    </div>
  )
}
