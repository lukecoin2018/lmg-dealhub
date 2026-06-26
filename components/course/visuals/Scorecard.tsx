const CRITERIA = [
  'Values alignment',
  'Authentic recommendation',
  'Audience benefit',
  'Long-term brand fit',
  'Company credibility',
  'Content potential',
]

const deals = [
  {
    name: 'Cookware Brand',
    type: 'Obvious Yes',
    typeVariant: 'yes' as const,
    verdict: '29 / 30',
    verdictNote: 'Say yes fast — and price it well.',
    scores: [5, 5, 5, 5, 5, 4],
    trap: false,
  },
  {
    name: 'Detox Tea Brand',
    type: 'Tempting Trap',
    typeVariant: 'trap' as const,
    verdict: 'NO',
    verdictNote: 'Deal-breakers failed. Double the rate is the bait.',
    scores: [2, 1, 3, 2, 3, 3],
    trap: true,
  },
  {
    name: 'Meal-Kit Company',
    type: 'Maybe — Done Right',
    typeVariant: 'maybe' as const,
    verdict: '21 / 30',
    verdictNote: 'Not yet. Test the product first, then decide.',
    scores: [4, 3, 4, 4, 3, 3],
    trap: false,
  },
]

function ScoreDot({ value, isTrap, isCritical }: { value: number; isTrap: boolean; isCritical: boolean }) {
  const danger = isTrap && isCritical && value <= 2
  return (
    <span className={`sc-dot sc-dot--${value}${danger ? ' sc-dot--danger' : ''}`}>
      {value}
    </span>
  )
}

export default function Scorecard() {
  return (
    <div className="sc-wrap">
      <p className="sc-eyebrow">Deal scorecard — 6 criteria, scored 1–5 (max 30)</p>
      <div className="sc-table">
        {/* Header */}
        <div className="sc-header-row">
          <div className="sc-criteria-col sc-col-label">Criteria</div>
          {deals.map(d => (
            <div key={d.name} className={`sc-deal-col${d.trap ? ' sc-deal-col--trap' : ''}`}>
              <span className={`sc-type-badge sc-type-badge--${d.typeVariant}`}>{d.type}</span>
              <span className="sc-deal-name">{d.name}</span>
            </div>
          ))}
        </div>
        {/* Rows */}
        {CRITERIA.map((c, ci) => {
          const isCritical = ci < 2
          return (
            <div key={c} className={`sc-row${isCritical ? ' sc-row--critical' : ''}`}>
              <div className="sc-criteria-col">
                {isCritical && <span className="sc-db-pip" aria-label="Deal-breaker" />}
                {c}
              </div>
              {deals.map(d => (
                <div key={d.name} className={`sc-deal-col${d.trap ? ' sc-deal-col--trap' : ''}`}>
                  <ScoreDot value={d.scores[ci]} isTrap={d.trap} isCritical={isCritical} />
                </div>
              ))}
            </div>
          )
        })}
        {/* Verdict row */}
        <div className="sc-verdict-row">
          <div className="sc-criteria-col sc-verdict-label">Total / Verdict</div>
          {deals.map(d => (
            <div key={d.name} className={`sc-deal-col sc-verdict-cell${d.trap ? ' sc-deal-col--trap' : ''}`}>
              <span className={`sc-verdict sc-verdict--${d.typeVariant}`}>{d.verdict}</span>
              <p className="sc-verdict-note">{d.verdictNote}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="sc-rule">A low score on either of the first two criteria (marked <span className="sc-db-pip-inline" />) is a no regardless of the total. A tempting fee never overrides a values failure.</p>
    </div>
  )
}
