const prepItems = [
  {
    num: 1,
    label: 'Market context',
    sub: 'Knowledge is leverage',
    detail:
      'Know what creators with your stats, niche, and engagement actually charge. Creator communities and rate-sharing groups are gold here. The more you know what\'s normal, the harder you are to lowball.',
    isKey: false,
  },
  {
    num: 2,
    label: 'Performance proof',
    sub: 'Your leverage made concrete',
    detail:
      '"My last three sponsored posts averaged 9% engagement and drove around 500 clicks." Show the receipts — don\'t ask brands to imagine your value.',
    isKey: false,
  },
  {
    num: 3,
    label: 'Your floor',
    sub: 'The walk-away minimum',
    detail:
      'The absolute minimum you set in Module 4. Knowing it cold gives you the nerve to walk away — and the willingness to walk is the single greatest source of power in any negotiation.',
    isKey: true,
  },
]

export default function NegotiationPrep() {
  return (
    <div className="np-wrap">
      <p className="np-eyebrow">Lock these down before you reply</p>
      <div className="np-list">
        {prepItems.map(item => (
          <div key={item.num} className={`np-item${item.isKey ? ' np-item--key' : ''}`}>
            <div className="np-left">
              <span className="np-num">{item.num}</span>
              {item.isKey && <span className="np-key-badge">Key</span>}
            </div>
            <div className="np-body">
              <div className="np-head">
                <strong className="np-label">{item.label}</strong>
                <span className="np-sub">{item.sub}</span>
              </div>
              <p className="np-detail">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="np-footer">Prepared, not hopeful — you negotiate from strength, not from your back foot.</p>
    </div>
  )
}
