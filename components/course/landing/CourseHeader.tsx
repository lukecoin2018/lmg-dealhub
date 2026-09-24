import Link from 'next/link'
import { getSession } from '@/lib/auth/session'

// Sticky brand header (reference §2.1), shared by the /course landing page, the
// lesson shell (app/course/(lesson)/layout.tsx) and the auth pages.
// Server component: reads the session (JWT only, no DB hit — display only, the
// access gate lives in proxy.ts) so the Log in pill becomes email + Log out when
// signed in.
//
// variant="landing" (default): ← lmg.media · Log in · "Start Module 1 — free".
// variant="compact": the same without the Module 1 pill, for pages where the
//   visitor is already inside the course or mid sign-up. The auth pill stays
//   visible on small screens here since it is the only action left.
// authPill={false}: drop the Log in / Log out pill (e.g. on /login itself).

export default async function CourseHeader({
  variant = 'landing',
  authPill = true,
}: {
  variant?: 'landing' | 'compact'
  authPill?: boolean
} = {}) {
  const session = await getSession()
  const compact = variant === 'compact'

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
              <span className="site-nav__user" title={session.email}>{session.email}</span>
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
