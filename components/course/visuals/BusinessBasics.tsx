export default function BusinessBasics() {
  return (
    <div className="bb-wrap">
      <p className="bb-eyebrow">Two moves that separate a creator from a business</p>
      <div className="bb-cards">
        <div className="bb-card bb-card--llc">
          <div className="bb-card-icon">🏛️</div>
          <strong className="bb-card-title">Form an LLC</strong>
          <p className="bb-card-when">When: ~$20K+ in annual partnership revenue</p>
          <p className="bb-card-detail">
            Insulates your personal assets from lawsuits and business debt. Costs a few hundred dollars and a couple of hours through an accountant or formation service.
          </p>
          <div className="bb-card-action">
            <span className="bb-action-label">First step today</span>
            <span className="bb-action-text">Open a separate bank account for business income and expenses.</span>
          </div>
        </div>
        <div className="bb-card bb-card--tax">
          <div className="bb-card-icon">📊</div>
          <strong className="bb-card-title">Handle taxes proactively</strong>
          <p className="bb-card-when">Set aside: 25–30% of every payment</p>
          <p className="bb-card-detail">
            You owe income and self-employment tax. A separate savings account for that 25–30% means no April surprises. Track business expenses — they reduce what you owe.
          </p>
          <div className="bb-card-action">
            <span className="bb-action-label">Consider</span>
            <span className="bb-action-text">Quarterly estimated payments to avoid penalties as revenue grows.</span>
          </div>
        </div>
      </div>
      <p className="bb-footer">Educational, not legal or tax advice — a qualified accountant or attorney pays back the investment several times over.</p>
    </div>
  )
}
