const seasons = [
  { campaign: 'Holiday', pitchWindow: 'Aug – Sep', campaignRuns: 'Nov – Dec', note: 'Wait until November and you\'ve missed it entirely.' },
  { campaign: 'Back-to-School', pitchWindow: 'Jun – Jul', campaignRuns: 'Aug – Sep', note: 'Plan backward from the first week of school.' },
  { campaign: 'Summer', pitchWindow: 'Jan – Feb', campaignRuns: 'May – Jun', note: 'Brands lock summer budgets earlier than creators expect.' },
  { campaign: "Mother's & Father's Day", pitchWindow: 'Feb – Mar / Apr', campaignRuns: 'May / Jun', note: 'Roughly two months ahead for each.' },
]

export default function PitchTiming() {
  return (
    <div className="pt-wrap">
      <div className="pt-rule-banner">
        <span className="pt-rule-num">8–10 weeks</span>
        <span className="pt-rule-text">before the campaign runs — the sweet spot where budgets are live and decisions are being made</span>
      </div>
      <p className="pt-eyebrow">Seasonal pitch windows</p>
      <div className="pt-grid">
        {seasons.map(s => (
          <div key={s.campaign} className="pt-card">
            <strong className="pt-campaign">{s.campaign}</strong>
            <div className="pt-dates">
              <div className="pt-date-row">
                <span className="pt-date-label">Pitch in</span>
                <span className="pt-date-val pt-date-val--pitch">{s.pitchWindow}</span>
              </div>
              <div className="pt-date-row">
                <span className="pt-date-label">Campaign runs</span>
                <span className="pt-date-val">{s.campaignRuns}</span>
              </div>
            </div>
            <p className="pt-note">{s.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
