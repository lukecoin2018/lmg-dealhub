import Link from 'next/link'
import { getSession } from '@/lib/auth/session'

// Sticky brand header for the /course landing page (reference §2.1).
// Server component: reads the session (JWT only, no DB hit — display only, the
// access gate lives in proxy.ts) so the Log in pill becomes email + Log out when
// signed in, mirroring components/auth/HeaderAuth.tsx on the lesson pages.

export default async function CourseHeader() {
  const session = await getSession()

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
        <nav className="site-nav" aria-label="Site">
          <a className="site-nav__back" href="https://lmg.media/for-influencers">← lmg.media</a>
          {session ? (
            <>
              <span className="site-nav__user" title={session.email}>{session.email}</span>
              <form action="/api/auth/logout" method="post" className="site-nav__logout">
                <button type="submit" className="btn btn--outline">Log out</button>
              </form>
            </>
          ) : (
            <Link className="btn btn--outline" href="/login">Log in</Link>
          )}
          <Link className="btn btn--pink btn--sm" href="/course/module-1">Start Module 1 — free</Link>
        </nav>
      </div>
    </header>
  )
}
