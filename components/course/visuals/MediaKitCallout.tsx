export default function MediaKitCallout() {
  return (
    <div className="mk-callout">
      <p className="mk-eyebrow">Lead with engagement, not just size</p>
      <div className="mk-row">
        <div className="mk-side mk-side--weak">
          <span className="mk-tag mk-tag--weak">Weak opener</span>
          <p className="mk-text">"50,000 followers"</p>
        </div>
        <div className="mk-divider" aria-hidden="true">→</div>
        <div className="mk-side mk-side--strong">
          <span className="mk-tag mk-tag--strong">Strong opener</span>
          <p className="mk-text">
            "50,000 followers, <em>6.8% engagement</em>, audience{' '}
            <em>82% women 25–40</em> actively shopping for sustainable products"
          </p>
        </div>
      </div>
      <p className="mk-note">
        The first is a number. The second tells a brand their exact customer is already here —
        and that framing is your edge at any size.
      </p>
    </div>
  )
}
