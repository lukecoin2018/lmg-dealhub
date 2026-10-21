import Link from 'next/link'
import { Bell, BookOpen } from 'lucide-react'
import { getCurrentUser, getSession } from '@/lib/auth/session'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

// Sticky brand header (reference §2.1), shared by the /course landing page, the
// lesson shell (app/course/(lesson)/layout.tsx) and the auth pages.
// Server component. Reads the session, then the user row when someone is signed
// in, so the account pill can show their saved name (email if they have none).
// The access gate itself lives in proxy.ts.
//
// variant="landing" (default): ← lmg.media · Log in · "Start Module 1 — free".
// variant="compact": the same without the Module 1 pill, for pages where the
//   visitor is already inside the course or mid sign-up. The auth pill stays
//   visible on small screens here since it is the only action left.
// authPill={false}: drop the Log in / Log out pill (e.g. on /login itself).
// variant="app": the authenticated DealHub shell (app/(app)/layout.tsx). Brand
//   reads "DealHub" and links to /dashboard; the nav is ← lmg.media · Course ·
//   theme toggle · notifications · account pill (name, or email if unset, + avatar).

export default async function CourseHeader({
  variant = 'landing',
  authPill = true,
}: {
  variant?: 'landing' | 'compact' | 'app'
  authPill?: boolean
} = {}) {
  const session = await getSession()
  const user = session ? await getCurrentUser() : null
  const displayName = user?.name?.trim() || null
  const accountLabel = displayName || session?.email || ''
  const accountInitial = accountLabel.charAt(0).toUpperCase()
  const compact = variant === 'compact'

  if (variant === 'app') {
    return (
      <header className="site-header">
        <div className="wrap">
          <Link className="brand" href="/dashboard" aria-label="LMG Media — DealHub">
            {/* eslint-disable-next-line @next/next/no-img-element -- real logo asset, served as-is */}
            <img className="brand__logo lmg-logo--ink" src="/images/lmg-logo.png" alt="" width={64} height={41} />
            <span className="brand__divider" aria-hidden="true" />
            <span className="brand__course">
              Deal<span className="serif-i">Hub</span>
            </span>
          </Link>
          <nav className="site-nav site-nav--compact site-nav--app" aria-label="Site">
            <a className="site-nav__back" href="https://lmg.media">← lmg.media</a>
            <Link className="btn btn--outline" href="/course">
              <BookOpen aria-hidden="true" />
              Course
            </Link>
            <span className="site-nav__divider" aria-hidden="true" />
            <div className="site-nav__tools">
              <ThemeToggle />
              <button type="button" className="site-nav__icon-btn" aria-label="Notifications">
                <Bell aria-hidden="true" />
              </button>
            </div>
            <Link className="site-nav__account" href="/account" title={session?.email ?? 'Account settings'} aria-label="Account settings">
              {accountLabel && <span className="site-nav__account-email">{accountLabel}</span>}
              <span className="site-nav__avatar" aria-hidden="true">
                {accountInitial}
              </span>
            </Link>
          </nav>
        </div>
      </header>
    )
  }

  return (
    <header className="site-header">
      <div className="wrap">
        <Link className="brand" href="/course" aria-label="LMG Media — Brand Partnership Playbook">
          {/* eslint-disable-next-line @next/next/no-img-element -- real logo asset, served as-is */}
          <img className="brand__logo lmg-logo--ink" src="/images/lmg-logo.png" alt="" width={64} height={41} />
          <span className="brand__divider" aria-hidden="true" />
          <span className="brand__course">
            Brand Partnership <span className="serif-i">Playbook</span>
          </span>
        </Link>
        <nav className={compact ? 'site-nav site-nav--compact' : 'site-nav'} aria-label="Site">
          <a className="site-nav__back" href="https://lmg.media/for-influencers">← lmg.media</a>
          {authPill && (session ? (
            <>
              <Link className="site-nav__user" href="/account" title={session.email}>{accountLabel}</Link>
              <form action="/api/auth/logout" method="post" className="site-nav__logout">
                <button type="submit" className="btn btn--outline">Log out</button>
              </form>
            </>
          ) : (
            <Link className="btn btn--outline" href="/login">Log in</Link>
          ))}
          {!compact && (
            <Link className="btn btn--pink btn--sm" href="/course/module-1">Start Module 1 — free</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
