/* global React */
// LMG Media — Badge / pill
// Maps to .lmg-badge in components.css. Use tone for audience color-coding.
export function Badge({ tone = 'neutral', icon, children, className = '', style }) {
  const toneCls = { neutral: '', yellow: 'yellow', pink: 'pink', blue: 'blue', dark: 'dark', outline: 'outline' }[tone] || '';
  const cls = ['lmg-badge', toneCls, className].filter(Boolean).join(' ');
  return (
    <span className={cls} style={style}>
      {icon && <i data-lucide={icon} style={{ width: 13, height: 13 }} />}
      {children}
    </span>
  );
}
