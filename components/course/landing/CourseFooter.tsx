// Footer for the /course landing page (reference §2.7).

export default function CourseFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="site-footer__brand">
          {/* eslint-disable-next-line @next/next/no-img-element -- real logo asset, served as-is */}
          <img className="site-footer__logo lmg-logo--ink" src="/images/lmg-logo.png" alt="LMG Media" width={52} height={33} />
          <span className="site-footer__tag">Where Quality Brands Meet Iconic Influence</span>
        </div>
        <nav className="site-footer__nav" aria-label="Footer">
          <a href="https://lmg.media/for-influencers">For Influencers</a>
          <a href="https://lmg.media/for-influencers/apply">Apply to work with us</a>
          <a href="https://lmg.media/privacy-policy">Privacy</a>
          <span>© 2026 LMG Media</span>
        </nav>
      </div>
    </footer>
  )
}
