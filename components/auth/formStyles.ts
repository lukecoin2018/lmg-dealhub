// Shared field styles for the auth forms (login/signup/change password).
// Fixed light palette to match the course design.

export const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  fontSize: 16, // ≥16px so iPhone Safari doesn't zoom on focus
  fontWeight: 500,
  color: '#1C1917',
  background: '#FFFFFF',
  border: '1px solid #E5E0D5',
  borderRadius: 12,
  padding: '13px 14px',
  outline: 'none',
  transition: 'border-color 160ms ease, box-shadow 160ms ease',
}

export const LABEL_STYLE: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  color: '#78716C',
  marginBottom: 7,
}

export const ALERT_STYLE: React.CSSProperties = {
  fontSize: 13.5,
  fontWeight: 600,
  lineHeight: 1.45,
  borderRadius: 12,
  padding: '11px 14px',
  marginBottom: 18,
}

export const ERROR_STYLE: React.CSSProperties = {
  ...ALERT_STYLE,
  color: '#B3261E',
  background: '#FBEAE9',
  border: '1px solid #F0C9C5',
}

export const SUCCESS_STYLE: React.CSSProperties = {
  ...ALERT_STYLE,
  color: '#1E6B3A',
  background: '#E6F4EA',
  border: '1px solid #BFE3C9',
}

export const SUBMIT_STYLE = (pending: boolean): React.CSSProperties => ({
  width: '100%',
  background: '#FF4D94',
  color: '#fff',
  border: 'none',
  borderRadius: 12,
  padding: '15px 20px',
  fontSize: 15,
  fontWeight: 800,
  letterSpacing: '-.01em',
  cursor: pending ? 'default' : 'pointer',
  opacity: pending ? 0.65 : 1,
  boxShadow: '0 14px 30px rgba(255,77,148,.28)',
  transition: 'opacity 160ms ease',
})

export function focusField(e: React.FocusEvent<HTMLInputElement>) {
  e.currentTarget.style.borderColor = '#FF4D94'
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,77,148,.14)'
}

export function blurField(e: React.FocusEvent<HTMLInputElement>) {
  e.currentTarget.style.borderColor = '#E5E0D5'
  e.currentTarget.style.boxShadow = 'none'
}
