const channels = [
  {
    label: 'Direct Outreach',
    direction: 'You go to them',
    description: 'You research, build the list, warm up the relationship, and initiate contact.',
  },
  {
    label: 'Platforms & Networks',
    direction: 'A platform connects you',
    description: 'Influencer platforms and affiliate networks match you with brands looking for creators.',
  },
  {
    label: 'Inbound Discovery',
    direction: 'They come to you',
    description: 'Brands find you through your content, bio, and online presence — and reach out first.',
  },
]

export default function ThreeChannels() {
  return (
    <div className="tc-wrap">
      <p className="tc-eyebrow">Three ways a brand opportunity reaches you</p>
      <div className="tc-cards">
        {channels.map((c, i) => (
          <div key={c.label} className="tc-card">
            <span className="tc-num">{String(i + 1).padStart(2, '0')}</span>
            <strong className="tc-name">{c.label}</strong>
            <span className="tc-dir">{c.direction}</span>
            <p className="tc-desc">{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
