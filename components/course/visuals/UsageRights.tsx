const deliverables = [
  { format: 'Stories (set of frames)', multiplier: '0.5–0.7×', note: 'Lighter format, shorter shelf life' },
  { format: 'Feed post / Static', multiplier: '1×', note: 'Your baseline — anchor everything else to this' },
  { format: 'Reels / Video', multiplier: '1.5–2×', note: 'Reach, editing skill, and longer-lasting views' },
]

const addOns = [
  {
    item: 'Paid advertising usage',
    value: '+50–100%',
    note: 'Brand runs your content as paid ads. Creator content outperforms brand ads — they know it.',
  },
  {
    item: 'Whitelisting',
    value: '+30% → 1.5–2×',
    note: 'Ads run from your handle, with your credibility attached. Higher spend = higher rate.',
  },
  {
    item: 'Exclusivity',
    value: 'Negotiate per deal',
    note: "Agreeing not to work with competitors is real income you're giving up. Define 'competitor' in writing.",
  },
  {
    item: 'Usage duration',
    value: '30d / 90d / 1yr / ∞',
    note: 'Longer window = higher fee. "Perpetual" should be priced like selling an asset — or declined.',
  },
]

export default function UsageRights() {
  return (
    <div className="ur-wrap">
      <p className="ur-eyebrow">What you're actually selling — and what to charge for it</p>

      <div className="ur-section">
        <p className="ur-section-title">Deliverable multipliers</p>
        <div className="ur-deliverables">
          {deliverables.map(d => (
            <div key={d.format} className={`ur-del-row${d.multiplier === '1×' ? ' ur-del-row--base' : ''}`}>
              <span className="ur-del-format">{d.format}</span>
              <span className="ur-del-mult">{d.multiplier}</span>
              <span className="ur-del-note">{d.note}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="ur-section ur-section--addons">
        <p className="ur-section-title ur-section-title--addons">
          Where most creators undervalue themselves
        </p>
        <div className="ur-addons">
          {addOns.map(a => (
            <div key={a.item} className="ur-addon">
              <div className="ur-addon-top">
                <strong className="ur-addon-item">{a.item}</strong>
                <span className="ur-addon-value">{a.value}</span>
              </div>
              <p className="ur-addon-note">{a.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
