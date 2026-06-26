export default function QuoteRange() {
  return (
    <div className="qr-callout">
      <p className="qr-eyebrow">Quote a range — not a single number</p>
      <div className="qr-row">
        <div className="qr-side qr-side--weak">
          <span className="qr-tag qr-tag--weak">Single number</span>
          <p className="qr-text">"My rate is $1,500."</p>
          <p className="qr-sub">Sounds like you're asking permission. Leaves no room to move.</p>
        </div>
        <div className="qr-arrow" aria-hidden="true">→</div>
        <div className="qr-side qr-side--strong">
          <span className="qr-tag qr-tag--strong">Range</span>
          <p className="qr-text">"A single Reel typically runs <em>$1,500–$2,000</em>, depending on usage rights and timeline."</p>
          <p className="qr-sub">Anchors the brand at your real value. Gives you room to flex without seeming arbitrary.</p>
        </div>
      </div>
      <div className="qr-floor">
        <span className="qr-floor-label">Private floor</span>
        <p className="qr-floor-note">Underneath the range is one number you never share — your minimum below which the deal simply doesn't make sense. Know it cold before any conversation. It's the line that tells you when to walk away.</p>
      </div>
    </div>
  )
}
