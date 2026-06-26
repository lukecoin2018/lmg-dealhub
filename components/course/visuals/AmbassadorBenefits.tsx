const panels = [
  {
    side: "Brand's side",
    accent: 'blue',
    items: [
      { label: 'Lower cost', detail: 'Skip the onboarding cost every quarter — they already know your voice, audience, and reliability.' },
      { label: 'Better performance', detail: 'Repeated exposure compounds: the audience starts to genuinely associate the brand with you.' },
    ],
  },
  {
    side: 'Your side',
    accent: 'pink',
    items: [
      { label: 'Income stability', detail: 'Monthly certainty replaces month-to-month uncertainty — you can plan.' },
      { label: 'More leverage at renewal', detail: 'You\'ve proven your value, so the rate-increase conversation is far stronger than pitching cold.' },
    ],
  },
  {
    side: 'The credibility flywheel',
    accent: 'yellow',
    items: [
      { label: 'First ambassadorship → credential', detail: 'Named ambassadorships on your media kit signal you\'re the kind of creator brands invest in long-term.' },
      { label: 'Compound effect', detail: 'Each partnership helps land the next one, at a higher rate. The flywheel builds on itself.' },
    ],
  },
]

export default function AmbassadorBenefits() {
  return (
    <div className="ab-wrap">
      <p className="ab-eyebrow">Why long-term works — for both sides</p>
      <div className="ab-panels">
        {panels.map(p => (
          <div key={p.side} className={`ab-panel ab-panel--${p.accent}`}>
            <div className={`ab-panel-head ab-panel-head--${p.accent}`}>{p.side}</div>
            <div className="ab-items">
              {p.items.map(item => (
                <div key={item.label} className="ab-item">
                  <strong className="ab-item-label">{item.label}</strong>
                  <p className="ab-item-detail">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="ab-footer">One-offs still have a place — for cash-flow gaps, testing new categories. The point: your base layer should be recurring. Build the floor first.</p>
    </div>
  )
}
