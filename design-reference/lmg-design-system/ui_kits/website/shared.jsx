/* global React */
const { useState, useEffect, useRef, createContext, useContext } = React;

/* ─── App context (theme + lang + modal) ─── */
const AppCtx = createContext(null);
function AppProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('EN');
  const [modal, setModal] = useState(null); // null | 'brand' | 'influencer'
  const [toast, setToast] = useState(null);
  useEffect(() => {
    document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : '';
  }, [theme]);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3200); };
  return (
    <AppCtx.Provider value={{ theme, setTheme, lang, setLang, modal, setModal, showToast }}>
      {children}
      {toast && <div className="lmg-toast">{toast}</div>}
    </AppCtx.Provider>
  );
}
const useApp = () => useContext(AppCtx);

/* ─── Wordmark ─── */
function Wordmark({ size = 22 }) {
  return (
    <img
      src="../../assets/lmg-logo.png"
      alt="LMG Media"
      className="lmg-wordmark-img"
      style={{ height: `${size * 1.8}px`, display: 'block' }}
    />
  );
}

/* ─── Icon (Lucide) ─── */
function Icon({ name, size = 18, color, className = '', ...rest }) {
  const ref = useRef();
  useEffect(() => {
    if (window.lucide && ref.current) window.lucide.createIcons({ icons: window.lucide.icons, attrs: {}, nameAttr: 'data-lucide' });
  });
  return <i ref={ref} data-lucide={name} className={`lmg-icon ${className}`} style={{ width: size, height: size, color }} {...rest}></i>;
}

/* ─── Button ─── */
function Button({ variant = 'primary', size = 'md', icon, iconRight, children, onClick, type = 'button', className = '', style = {} }) {
  const cls = `lmg-btn lmg-btn-${variant} ${size !== 'md' ? `lmg-btn-${size}` : ''} ${className}`;
  return (
    <button type={type} className={cls} onClick={onClick} style={style}>
      {icon && <Icon name={icon} size={size === 'lg' ? 20 : 18} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'lg' ? 20 : 18} />}
    </button>
  );
}

/* ─── Eyebrow / label ─── */
function Eyebrow({ children, color, className = '' }) {
  return <div className={`lmg-eyebrow ${className}`} style={{ color }}>{children}</div>;
}

/* ─── Field ─── */
function Field({ label, children }) {
  return <label className="lmg-field"><span>{label}</span>{children}</label>;
}

Object.assign(window, { AppCtx, AppProvider, useApp, Wordmark, Icon, Button, Eyebrow, Field });
