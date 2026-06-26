export default function GracefulDecline() {
  return (
    <div className="gd-wrap">
      <p className="gd-eyebrow">A template that works almost everywhere</p>
      <div className="gd-template">
        <div className="gd-template-label">Decline template</div>
        <blockquote className="gd-quote">
          <p>"Thanks so much for thinking of me — I appreciate you reaching out. After looking at the details, this isn't quite the right fit for my business right now.</p>
          <p className="gd-reason">[The usage rights structure doesn't work for me at this rate.]</p>
          <p>I'd love to stay in touch, though — if something different comes up down the line, please don't hesitate to reach out."</p>
        </blockquote>
      </div>
      <div className="gd-rules">
        <div className="gd-rule">
          <span className="gd-rule-icon gd-rule-icon--do">✓</span>
          <span className="gd-rule-text">Appreciate being considered, name the mismatch briefly, leave the door open</span>
        </div>
        <div className="gd-rule">
          <span className="gd-rule-icon gd-rule-icon--dont">✗</span>
          <span className="gd-rule-text">Over-explain, apologize for your rates, or lecture</span>
        </div>
      </div>
      <p className="gd-footer">The contact you're frustrated with today may resurface at a much better brand in two years. Keep it short, professional, gracious.</p>
    </div>
  )
}
