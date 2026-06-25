/* global React, useApp, Wordmark, Icon, Button */
const { useEffect: useEffectH, useState: useStateH } = React;

function Header() {
  const { theme, setTheme, lang, setLang, setModal } = useApp();
  const [scrolled, setScrolled] = useStateH(false);
  useEffectH(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`lmg-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="lmg-header-inner">
        <a href="index.html" className="lmg-header-logo" aria-label="LMG Media">
          <Wordmark size={20} />
        </a>
        <nav className="lmg-nav">
          <a href="index.html#influencers">For Influencers</a>
          <a href="index.html#brands">For Brands</a>
          <a href="resources.html">Resources</a>
          <a href="insights.html">Insights</a>
          <a href="index.html#about">About</a>
        </nav>
        <div className="lmg-header-right">
          <button className="lmg-icon-btn" aria-label="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <Icon name={theme === 'dark' ? 'moon' : 'sun'} size={18} />
          </button>
          <button className="lmg-link-btn" onClick={() => setModal('brand')}>Sign In</button>
          <Button variant="primary" size="sm" onClick={() => setModal('brand')}>Get Started</Button>
          <div className="lmg-lang">
            <Icon name="globe" size={16} />
            <button onClick={() => setLang('EN')} className={lang === 'EN' ? 'active' : ''}>EN</button>
            <span className="sep">|</span>
            <button onClick={() => setLang('ES')} className={lang === 'ES' ? 'active' : ''}>ES</button>
          </div>
        </div>
      </div>
    </header>
  );
}

window.Header = Header;
