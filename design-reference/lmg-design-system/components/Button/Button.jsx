/* global React */
// LMG Media — Button
// Reusable button atom. Maps to .lmg-btn / .lmg-btn-* in components.css.
export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  children,
  onClick,
  type = 'button',
  className = '',
  style,
}) {
  const cls = [
    'lmg-btn',
    `lmg-btn-${variant}`,
    size !== 'md' ? `lmg-btn-${size}` : '',
    className,
  ].filter(Boolean).join(' ');
  const isz = size === 'lg' ? 20 : size === 'sm' ? 16 : 18;
  return (
    <button type={type} className={cls} onClick={onClick} style={style}>
      {icon && <i data-lucide={icon} className="lmg-icon" style={{ width: isz, height: isz }} />}
      {children}
      {iconRight && <i data-lucide={iconRight} className="lmg-icon" style={{ width: isz, height: isz }} />}
    </button>
  );
}
