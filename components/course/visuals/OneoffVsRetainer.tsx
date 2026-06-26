import React from 'react'

const rows = [
  {
    label: 'Income',
    oneoff: 'Only as good as your next pitch',
    retainer: 'Shows up every month, pitching or not',
  },
  {
    label: 'Planning',
    oneoff: 'Can\'t plan — one quiet month = a problem',
    retainer: 'Plan your business months ahead',
  },
  {
    label: 'Selection',
    oneoff: 'Say yes to deals that don\'t fit',
    retainer: 'Say no to bad fits — which makes you more valuable',
  },
  {
    label: 'The math',
    oneoff: '25 one-offs/year = job without benefits',
    retainer: '3 retainers = predictable business',
    isOutcome: true,
  },
]

export default function OneoffVsRetainer() {
  return (
    <div className="ovr-wrap">
      <p className="ovr-eyebrow">The line between a hustle and a business</p>
      <div className="ovr-grid">
        <div className="ovr-col-head ovr-col-head--oneoff">One-offs — "a job"</div>
        <div className="ovr-col-head ovr-col-head--retainer">Retainers — "a business"</div>
        {rows.map(r => (
          <React.Fragment key={r.label}>
            <div className={`ovr-cell ovr-cell--oneoff${r.isOutcome ? ' ovr-cell--outcome' : ''}`}>
              <span className="ovr-row-label">{r.label}</span>
              <span className="ovr-text">{r.oneoff}</span>
            </div>
            <div className={`ovr-cell ovr-cell--retainer${r.isOutcome ? ' ovr-cell--outcome' : ''}`}>
              <span className="ovr-text">{r.retainer}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
      <p className="ovr-footer">The biggest shift is mental: three retainers stops the desperate yes — which is the loop the most successful creators are quietly running.</p>
    </div>
  )
}
