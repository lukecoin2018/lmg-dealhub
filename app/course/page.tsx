import type { Metadata } from 'next'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth/session'
import { allModules } from '@/lib/course/moduleData'
import CourseHeader from '@/components/course/landing/CourseHeader'
import CourseFooter from '@/components/course/landing/CourseFooter'
import { dmSans } from '@/components/course/landing/fonts'
import {
  ArrowRightIcon,
  LockIcon,
  FlagIcon,
  PricingIcon,
  PitchingIcon,
  ContractsIcon,
  RenewalsIcon,
} from '@/components/course/landing/icons'
import '@/styles/course-landing.css'

// /course landing page — port of handoff/reference/course-page.html (design
// authority; see handoff/CLAUDE_CODE_BRIEF.md). Styles: styles/course-landing.css.
// Sits outside the (lesson) route group on purpose: the lesson pages keep their
// own fixed-height shell + header in app/course/(lesson)/layout.tsx.

const COVER_SRC = '/images/playbook-cover.webp'

export const metadata: Metadata = {
  title: 'Brand Partnership Playbook · LMG Media',
  description:
    'The Complete Brand Partnership Playbook — 10-module video course by LMG Media on the business side of being a creator. Module 1 is free, no account required.',
}

const PILLARS = [
  { tint: 'pink', Icon: PricingIcon, title: 'Pricing', line: 'Know your worth and put a number on it — before the brand does.' },
  { tint: 'gold', Icon: PitchingIcon, title: 'Pitching', line: 'Find the right brands, then reach them with a pitch that gets answered.' },
  { tint: 'blue', Icon: ContractsIcon, title: 'Contracts', line: 'Usage, terms and the clauses that quietly cost creators money.' },
  { tint: 'pink', Icon: RenewalsIcon, title: 'Renewals', line: 'Turn one deal into a partnership that renews — at a higher rate.' },
] as const

export default async function CoursePage() {

  // Lock state mirrors the access gate in proxy.ts: modules 2–10 need a
  // logged-in user with has_access = 1, read fresh from the DB (never the JWT).
  const user = await getCurrentUser()
  const hasAccess = user?.has_access === 1

  const featured = allModules[0]
  const laterModules = allModules.slice(1)
  const capstone = allModules[allModules.length - 1]

  return (
    <div className={`course-landing course-landing--page ${dmSans.variable}`}>
      <CourseHeader />

      <main>
        {/* Hero */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap">
            <div className="hero__copy">
              <p className="eyebrow">The Playbook · For creators</p>
              <h1 id="hero-title" className="hero__title">
                The business side of being a creator, taught <span className="serif-i">properly</span>.
              </h1>
              <p className="hero__lead">
                Pricing, pitching, contracts, renewals — the system behind every professional partnership. Whether you work with us, with another agency, or on your own, this is the foundation.
              </p>
              <p className="hero__sub">
                Ten modules, taught on video, built from the same playbooks we use on real deals. Module 1 and the rate calculator are free — no account, no card, no catch.
              </p>
              <div className="hero__actions">
                <Link className="btn btn--pink" href="/course/module-1">
                  <span>Start Module 1 — free</span>
                  <ArrowRightIcon />
                </Link>
                <Link className="hero__secondary" href="/login">Already working with us? It&apos;s still yours →</Link>
              </div>
              <p className="hero__meta">
                <span>10 modules</span><span className="dot">·</span>
                <span>50 videos</span><span className="dot">·</span>
                <span>10 workbooks</span><span className="dot">·</span>
                <span className="free">Module 1 free, no account</span>
              </p>
            </div>

            <div className="hero__art">
              <div className="hero__shape" aria-hidden="true" />
              <div className="hero__glow" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element -- the full-resolution cover, served as-is */}
              <img
                className="hero__cover"
                src={COVER_SRC}
                alt="Cover of The Complete Brand Partnership Playbook"
                width={520}
                height={674}
                fetchPriority="high"
              />
              <Link className="hero__chip" href={`/course/${featured.slug}`}>
                <span className="hero__chip-num">{featured.number}</span>
                <span>
                  <span className="hero__chip-label">Module {featured.number} · Live now</span><br />
                  <span className="hero__chip-title">{featured.title}</span>
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="pillars" aria-labelledby="pillars-title">
          <div className="wrap">
            <div className="pillars__head">
              <h2 id="pillars-title">The system behind every professional partnership</h2>
              <span className="pillars__note">What the ten modules cover</span>
            </div>
            <div className="pillars__grid">
              {PILLARS.map(({ tint, Icon, title, line }) => (
                <article className="pillar" key={title}>
                  <span className={`pillar__icon pillar__icon--${tint}`}><Icon /></span>
                  <h3>{title}</h3>
                  <p>{line}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Journey */}
        <section className="journey" aria-labelledby="journey-title">
          <div className="wrap">
            <div className="journey__head">
              <div className="journey__head-copy">
                <p className="eyebrow">The journey</p>
                <h2 id="journey-title">Ten modules. One guided path.</h2>
                <p>From your first brand deal to scaling a partnership business. Begin at the beginning — the course builds in order.</p>
              </div>
              <p className="journey__lock">
                <LockIcon />
                <span>Modules 2–10 unlock in order</span>
              </p>
            </div>

            <Link className="feature" href={`/course/${featured.slug}`}>
              <span className="feature__num">{featured.number}</span>
              <span className="feature__body">
                <span className="feature__live">Start here · Free · Live now</span>
                <span className="feature__title">{featured.title}</span>
                <span className="feature__desc">How the creator–brand economy actually works, where the money flows, and where you fit in.</span>
              </span>
              <span className="btn btn--white">
                <span>Enter Module {featured.number}</span>
                <ArrowRightIcon />
              </span>
            </Link>

            {/* Modules 2–10 from lib/course/moduleData.ts. Real links: the access
                gate (proxy.ts) routes each click to signup / pending / content.
                Lock icon only when the module is locked for this user. Completed
                state is not tracked server-side yet (lesson progress lives in
                localStorage) — when it is, add `module__num--done` to the ring. */}
            <ul className="modules">
              {laterModules.map((m) => {
                const isCapstone = m === capstone
                const locked = !hasAccess
                return (
                  <li key={m.slug}>
                    <Link className="module" href={`/course/${m.slug}`}>
                      <span className="module__num">{m.number}</span>
                      <span className="module__body">
                        <span className="module__label">
                          Module {String(m.number).padStart(2, '0')}{isCapstone ? ' · Capstone' : ''}
                        </span>
                        <span className="module__title">{m.title}</span>
                      </span>
                      {locked && (
                        <>
                          <LockIcon className="module__lock" />
                          <span className="visually-hidden">(locked)</span>
                        </>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <p className="capstone">
              <span className="capstone__flag"><FlagIcon /></span>
              <span><strong>Capstone complete.</strong> A partnership business that protects and scales itself.</span>
            </p>
          </div>
        </section>

        {/* Why */}
        <section className="why" aria-labelledby="why-title">
          <div className="wrap">
            <div className="why__copy">
              <p className="eyebrow">Why this one</p>
              <h2 id="why-title">Built from the playbooks we use on real deals.</h2>
              <p>Every creator we work with knows this business. The Playbook is where that starts — whoever ends up handling your deals.</p>
            </div>
            <div className="stats">
              <div className="stat">
                <span className="stat__num">50</span>
                <span className="stat__title">Videos, taught on camera</span>
                <span className="stat__desc">Across ten modules — the same material we use when we take a deal to the table.</span>
              </div>
              <div className="stat stat--gold">
                <span className="stat__num">10</span>
                <span className="stat__title">Workbooks you keep</span>
                <span className="stat__desc">One per module, so what you work through in the videos leaves with you.</span>
              </div>
              <div className="stat stat--blue">
                <span className="stat__num">Free</span>
                <span className="stat__title">Module 1 + rate calculator</span>
                <span className="stat__desc">No account, no card, no catch. Decide whether it&apos;s for you before you sign up.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="closing" aria-labelledby="closing-title">
          <div className="wrap">
            <div className="closing__band">
              <div className="closing__copy">
                <span className="closing__kicker">Start Module 1</span>
                <h2 id="closing-title" className="closing__title">Begin at the beginning.</h2>
                <p className="closing__desc">The Partnership Landscape is free and open. Watch it, work the workbook, and the course opens up from there.</p>
              </div>
              <div className="closing__action">
                <Link className="btn btn--white" href="/course/module-1">
                  <span>Start Module 1 — free</span>
                  <ArrowRightIcon />
                </Link>
                <span className="closing__note">No account required for Module 1</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CourseFooter />
    </div>
  )
}
