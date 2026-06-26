const components = [
  {
    num: 1,
    label: 'Core deliverables',
    detail: 'Guaranteed each month — e.g. 2 Reels, 4 Story sets, 1 long-form. Consistent enough that both sides can plan around them.',
    tag: 'Foundation',
  },
  {
    num: 2,
    label: 'Standing usage rights',
    detail: 'Granted once for the whole term — organic use for the duration. Paid advertising is a priced add-on, never an assumption.',
    tag: 'Foundation',
  },
  {
    num: 3,
    label: 'Non-sponsored mentions',
    detail: 'Naturally using the product in your regular content — not a formal deliverable, but what makes the partnership feel authentic to your audience.',
    tag: 'Authenticity',
  },
  {
    num: 4,
    label: 'Add-ons priced separately',
    detail: 'Launch posts, events, whitelisting — agreed up front so nothing needs re-negotiating awkwardly mid-deal.',
    tag: 'Pricing',
  },
  {
    num: 5,
    label: 'Quarterly review',
    detail: 'A month-three checkpoint to assess, adjust, and discuss renewal — before the term runs out, so renewal feels natural instead of like a fresh negotiation.',
    tag: 'Key',
  },
]

export default function RetainerStructure() {
  return (
    <div className="rs-wrap">
      <p className="rs-eyebrow">Arrive with a structure — don't negotiate it live</p>
      <div className="rs-list">
        {components.map(c => (
          <div key={c.num} className={`rs-item${c.num === 5 ? ' rs-item--key' : ''}`}>
            <div className="rs-num-col">
              <span className="rs-num">{c.num}</span>
            </div>
            <div className="rs-body">
              <div className="rs-head">
                <strong className="rs-label">{c.label}</strong>
                <span className={`rs-tag rs-tag--${c.tag.toLowerCase()}`}>{c.tag}</span>
              </div>
              <p className="rs-detail">{c.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="rs-footer">Category exclusivity: price it in — it's real lost opportunity, and it isn't free. The Contract Builder's "Brand Ambassador" type handles the paperwork.</p>
    </div>
  )
}
