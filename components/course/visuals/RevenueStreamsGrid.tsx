const streams = [
  {
    name: 'Sponsored Content',
    description: "A post, reel, or story featuring a brand’s product or message.",
    model: 'Flat fee · per piece',
  },
  {
    name: 'Affiliate',
    description: 'Commission earned on every sale driven through your unique link.',
    model: '5–30% commission',
  },
  {
    name: 'Ambassadorships',
    description: 'A long-term relationship — recurring deliverables, recurring income.',
    model: '6–12 months · recurring',
  },
  {
    name: 'Gifting',
    description: 'Product in exchange for content. Fine early on; your time has a price.',
    model: 'Product only',
  },
  {
    name: 'Licensing',
    description: 'Brands pay to reuse your content in ads, emails, and other placements.',
    model: 'Add-on fee',
  },
  {
    name: 'Co-creation',
    description: 'You build a product or collection together — upfront fee plus ongoing royalties.',
    model: 'Fee + royalties',
  },
]

export default function RevenueStreamsGrid() {
  return (
    <div className="rs-grid">
      <p className="rs-eyebrow">The six revenue streams</p>
      <div className="rs-cards">
        {streams.map((s, i) => (
          <div key={s.name} className="rs-card">
            <span className="rs-num">{String(i + 1).padStart(2, '0')}</span>
            <strong className="rs-name">{s.name}</strong>
            <p className="rs-desc">{s.description}</p>
            <span className="rs-model">{s.model}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
