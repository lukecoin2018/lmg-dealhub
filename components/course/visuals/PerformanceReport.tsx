const parts = [
  {
    num: 1,
    label: 'Headline',
    job: 'One forward-up-able summary line',
    example: '"The Reel reached 47,000 impressions at 7.2% engagement, both above benchmarks."',
    note: 'Make it the kind of line your contact can paste straight into a message to their boss.',
  },
  {
    num: 2,
    label: 'Metrics',
    job: 'The specific numbers',
    example: 'Impressions, reach, engagement rate. Call out saves and shares as strong signals. Link clicks and code uses. Screenshots are fine.',
    note: null,
  },
  {
    num: 3,
    label: 'Context',
    job: 'Honest comparison',
    example: 'Compare to your typical content. If something underperformed, say so — brands value honest analysis over hidden bad news.',
    note: null,
  },
  {
    num: 4,
    label: 'Qualitative layer',
    job: 'Where you sound like a strategist',
    example: '"Several people asked where it\'s stocked in the UK — might be worth a regional page."',
    note: 'Market research they genuinely can\'t get anywhere else. This is what separates you from a vendor.',
  },
]

export default function PerformanceReport() {
  return (
    <div className="pr-wrap">
      <div className="pr-timing">
        <span className="pr-timing-label">When to send</span>
        <strong className="pr-timing-val">48–72 hours after the reporting window closes</strong>
        <span className="pr-timing-sub">Unprompted. This is the habit almost nobody builds.</span>
      </div>
      <p className="pr-eyebrow">Four parts — short, clean, decisive</p>
      <div className="pr-parts">
        {parts.map(p => (
          <div key={p.num} className="pr-part">
            <div className="pr-part-left">
              <span className="pr-part-num">{p.num}</span>
            </div>
            <div className="pr-part-body">
              <div className="pr-part-head">
                <strong className="pr-part-label">{p.label}</strong>
                <span className="pr-part-job">{p.job}</span>
              </div>
              <p className="pr-part-example">{p.example}</p>
              {p.note && <p className="pr-part-note">{p.note}</p>}
            </div>
          </div>
        ))}
      </div>
      <div className="pr-cta-hint">
        <span className="pr-cta-label">Close with</span>
        <span className="pr-cta-text">"Happy to share full insights on a call, and to talk about what we could do next."</span>
        <span className="pr-cta-note">That one line turns a finished deal into a conversation about the next one.</span>
      </div>
    </div>
  )
}
