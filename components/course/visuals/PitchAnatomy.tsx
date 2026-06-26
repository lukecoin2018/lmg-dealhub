const parts = [
  {
    label: 'Subject line',
    job: 'Get opened',
    example: '"Partnership Proposal: Reaching 50,000 Engaged Home-Design Enthusiasts"',
    note: 'Specific and value-focused — never "Collaboration Opportunity."',
  },
  {
    label: 'Opening',
    job: 'Prove you did your research',
    example: '2–3 sentences referencing something specific and recent: a launch, a campaign, a shared value.',
    note: 'This is your Module 2 research paying off. Proves the email isn\'t mass-blasted.',
  },
  {
    label: 'Value proposition',
    job: 'Lead with engagement, not followers',
    example: '"50K followers · 6.8% engagement · 82% women 25–40 shopping eco"',
    note: 'One tight paragraph. Demographics and ER from Module 1 — not a raw count.',
  },
  {
    label: 'Alignment',
    job: 'Make the strategic case',
    example: '"73% of my audience said they want to switch but can\'t find a brand they trust."',
    note: 'The specific overlap between your audience\'s need and their product — ideally with a number.',
  },
  {
    label: 'Content ideas',
    job: 'Make it feel real and imminent',
    example: 'Two or three concrete concepts: a swap series, a myth-busting Reel, a before/after.',
    note: 'Specifics make the partnership feel close. Shows you\'ve already thought it through.',
  },
  {
    label: 'CTA + signature',
    job: 'One clear, low-pressure next step',
    example: '"Fifteen minutes next week?" + media kit attached + clean signature with handles.',
    note: 'One ask. Not three. Make the reply easy.',
  },
]

export default function PitchAnatomy() {
  return (
    <div className="pa-wrap">
      <p className="pa-eyebrow">The six parts — each one earns the next</p>
      <ol className="pa-list">
        {parts.map((p, i) => (
          <li key={p.label} className="pa-part">
            <div className="pa-left">
              <span className="pa-num">{i + 1}</span>
            </div>
            <div className="pa-body">
              <div className="pa-head-row">
                <strong className="pa-label">{p.label}</strong>
                <span className="pa-job">{p.job}</span>
              </div>
              <p className="pa-example">{p.example}</p>
              <p className="pa-note">{p.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
