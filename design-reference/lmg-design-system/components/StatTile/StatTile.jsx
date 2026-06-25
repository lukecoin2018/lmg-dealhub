/* global React */
// LMG Media — StatTile
// Signature stat callout. Maps to .lmg-stat in components.css. Blue = data.
export function StatTile({ value, label, tone = 'blue' }) {
  const toneCls = { blue: 'blue', pink: 'pink', yellow: 'yellow' }[tone] || 'blue';
  return (
    <div className={`lmg-stat ${toneCls}`}>
      <div className="num">{value}</div>
      <div className="lbl">{label}</div>
    </div>
  );
}
