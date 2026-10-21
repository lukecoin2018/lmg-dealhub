import Link from 'next/link'

// Footer for the /course landing page. Legal links point at this site.
// "Apply to work with us" is omitted: representation is not offered yet.
// "For Influencers" pointed at the agency site, not the free course, so it is omitted too.

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
          <Link href="/impressum">Legal Notice</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <span>© 2026 LMG Media</span>
        </nav>
      </div>
    </footer>
  )
}
