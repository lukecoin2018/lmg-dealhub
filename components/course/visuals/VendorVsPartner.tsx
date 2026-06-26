import React from 'react'

const rows = [
  {
    label: 'Delivery',
    vendor: 'Delivers something average',
    partner: 'Delivers to a standard the brand brags about',
  },
  {
    label: 'Post-publish',
    vendor: 'Hits publish and goes silent',
    partner: 'Optimizes the first hour, then reports',
  },
  {
    label: 'Reporting',
    vendor: 'Brand never sees the impact',
    partner: 'Sends a performance report — without being asked',
  },
  {
    label: 'Outcome',
    vendor: 'Gets replaced',
    partner: 'Gets retained and referred',
    isOutcome: true,
  },
]

export default function VendorVsPartner() {
  return (
    <div className="vvp-wrap">
      <p className="vvp-eyebrow">The line between a one-off payment and recurring income</p>
      <div className="vvp-grid">
        <div className="vvp-col-head vvp-col-head--vendor">Vendor</div>
        <div className="vvp-col-head vvp-col-head--partner">Partner</div>
        {rows.map(r => (
          <React.Fragment key={r.label}>
            <div className={`vvp-cell vvp-cell--vendor${r.isOutcome ? ' vvp-cell--outcome' : ''}`}>
              <span className="vvp-row-label">{r.label}</span>
              <span className="vvp-text">{r.vendor}</span>
            </div>
            <div className={`vvp-cell vvp-cell--partner${r.isOutcome ? ' vvp-cell--outcome' : ''}`}>
              <span className="vvp-text">{r.partner}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
      <p className="vvp-footer">The gap isn't talent or follower count — it's a handful of habits most creators never build.</p>
    </div>
  )
}
