export default function EngagementCallout() {
  return (
    <div className="ec-callout">
      <div className="ec-row">
        <div className="ec-stat ec-stat--hi">
          <span className="ec-pct">6%</span>
          <span className="ec-label">engagement rate</span>
        </div>
        <div className="ec-vs" aria-hidden="true">vs</div>
        <div className="ec-stat ec-stat--lo">
          <span className="ec-pct">1%</span>
          <span className="ec-label">engagement rate</span>
        </div>
      </div>
      <p className="ec-note">
        Same follower count. Very different rate — because brands pay for an audience that{' '}
        <em>responds</em>, not one that scrolls past.
      </p>
    </div>
  )
}
