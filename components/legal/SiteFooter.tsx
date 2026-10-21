import Link from 'next/link'
import '@/styles/legal.css'

const LINKS = [
  { href: '/impressum', label: 'Legal Notice' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
] as const

export default function SiteFooter() {
  return (
    <footer className="site-legal-bar">
      <nav aria-label="Legal">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href}>{link.label}</Link>
        ))}
      </nav>
      <span>© 2026 LMG Media</span>
    </footer>
  )
}
