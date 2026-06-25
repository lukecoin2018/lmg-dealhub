/* global React */
// LMG Media — ServiceCard
// The workhorse audience-color-coded service card. Maps to .lmg-svc-card.
// Set audience to 'brand' (blue) or 'influencer' (pink).
export function ServiceCard({
  audience = 'brand',
  pill,
  photo,
  icon,
  title,
  description,
  features = [],
  moreCount,
  primaryLabel = 'Get Started',
  secondaryLabel = 'Learn More',
  onPrimary,
  onSecondary,
}) {
  const cls = `lmg-svc-card ${audience === 'influencer' ? 'audience-influencer' : ''}`;
  return (
    <div className={cls}>
      <div className="lmg-svc-photo" style={{ backgroundImage: photo ? `url(${photo})` : undefined }}>
        {pill && <span className="lmg-pill">{pill}</span>}
      </div>
      <div className="lmg-svc-body">
        <div className="lmg-svc-head">
          {icon && (
            <span className="lmg-svc-badge">
              <i data-lucide={icon} style={{ width: 22, height: 22 }} />
            </span>
          )}
          <h3 className="lmg-svc-title">{title}</h3>
        </div>
        {description && <p className="lmg-svc-desc">{description}</p>}
        {features.length > 0 && (
          <div className="lmg-svc-features">
            <div className="lbl">Key Features:</div>
            <ul>
              {features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        )}
        {moreCount ? <a className="lmg-svc-more" href="#">+{moreCount} more features</a> : null}
        <div className="lmg-svc-ctas">
          <button className="lmg-btn lmg-btn-primary" onClick={onPrimary}>{primaryLabel}</button>
          <button className="lmg-btn lmg-btn-outline" onClick={onSecondary}>{secondaryLabel}</button>
        </div>
      </div>
    </div>
  );
}
