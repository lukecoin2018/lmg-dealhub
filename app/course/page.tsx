import Link from 'next/link'
import { ArrowRight, Unlock, Lock, Flag } from 'lucide-react'

const upcomingModules = [
  { n: 2,  label: 'Module 02',             title: 'Finding & Attracting Brands' },
  { n: 3,  label: 'Module 03',             title: 'Vetting Opportunities' },
  { n: 4,  label: 'Module 04',             title: 'Know Your Worth · Pricing' },
  { n: 5,  label: 'Module 05',             title: 'The Perfect Pitch' },
  { n: 6,  label: 'Module 06',             title: 'Negotiating Like a Pro' },
  { n: 7,  label: 'Module 07',             title: 'Contracts & Legal' },
  { n: 8,  label: 'Module 08',             title: 'Delivering Results & Reporting' },
  { n: 9,  label: 'Module 09',             title: 'Building Long-Term Partnerships' },
  { n: 10, label: 'Module 10 · Capstone',  title: 'Protect & Scale' },
]

export default function CoursePage() {
  return (
    <div className="flex-1 overflow-y-auto" style={{ background: '#FAFAF8' }}>
      <style>{`
        @keyframes lmg-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(255,77,148,.5); }
          70%  { box-shadow: 0 0 0 8px rgba(255,77,148,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,77,148,0); }
        }
        .lmg-pulse { animation: lmg-pulse 2.2s infinite; }
      `}</style>

      {/* Two-column grid on lg+; single column stacked on mobile */}
      <div className="lg:grid lg:grid-cols-2 lg:min-h-full">

        {/* ── Left col: Hero ──────────────────────────────────── */}
        <section className="px-6 pt-14 pb-10 max-w-[448px] mx-auto lg:max-w-none lg:px-12 lg:pt-16 lg:pb-20">

          <div className="flex items-center gap-3 mb-6">
            <span style={{ display: 'inline-block', width: 26, height: 1.5, background: '#FF4D94', opacity: .55, flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#FF4D94' }}>
              The Complete Course
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: 'clamp(40px, 10vw, 52px)',
            lineHeight: 1.0,
            letterSpacing: '-.015em',
            color: '#1C1917',
            margin: '0 0 20px',
            textWrap: 'balance',
          } as React.CSSProperties}>
            The Complete Brand Partnership <em style={{ fontStyle: 'italic' }}>Playbook</em>
          </h1>

          <p style={{ fontSize: 16, lineHeight: 1.55, color: '#78716C', fontWeight: 500, margin: '0 0 34px', maxWidth: '34ch' }}>
            <strong style={{ color: '#1C1917', fontWeight: 700 }}>10 modules</strong>
            {' '}· Free &amp; open access. A guided path from your first brand deal to scaling a partnership business.
          </p>

          <Link
            href="/course/module-1"
            className="flex items-center justify-between gap-4 w-full"
            style={{
              background: '#FF4D94',
              color: '#fff',
              textDecoration: 'none',
              padding: '18px 22px',
              borderRadius: 16,
              boxShadow: '0 14px 30px rgba(255,77,148,.32)',
              marginBottom: 16,
            }}
          >
            <span className="flex flex-col gap-1 text-left">
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.13em', textTransform: 'uppercase', opacity: .82 }}>
                Start Module 1
              </span>
              <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-.01em', lineHeight: 1.1 }}>
                The Partnership Landscape
              </span>
            </span>
            <span style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(255,255,255,.18)',
              display: 'grid', placeItems: 'center', flexShrink: 0,
            }}>
              <ArrowRight size={21} />
            </span>
          </Link>

          <div className="flex items-center gap-2" style={{ fontSize: 12.5, color: '#78716C' }}>
            <Unlock size={14} style={{ color: '#3AAFF4', flexShrink: 0 }} />
            Begin at the beginning — the course builds in order.
          </div>
        </section>

        {/* ── Right col: Trail ────────────────────────────────── */}
        <section
          className="px-6 pb-16 max-w-[448px] mx-auto lg:max-w-none lg:px-12 lg:pt-14"
          style={{ borderLeft: '1px solid #E5E0D5' } as React.CSSProperties}
        >
          {/* On mobile this border-left is invisible (single column); on lg it becomes the divider */}

          {/* Mobile-only top rule to separate sections */}
          <div className="lg:hidden" style={{ borderTop: '1px solid #E5E0D5', marginBottom: 28 }} />

          <div className="flex items-baseline justify-between" style={{ marginBottom: 30 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#78716C' }}>
              The Journey
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#1C1917' }}>10 Modules</span>
          </div>

          {/* Trail */}
          <div className="relative" style={{ paddingLeft: 8 }}>

            {/* Spine — dashed vertical line */}
            <div style={{
              position: 'absolute',
              left: 25, top: 18, bottom: 30, width: 2,
              background: 'repeating-linear-gradient(to bottom, #E5E0D5 0 6px, transparent 6px 12px)',
              zIndex: 1,
            }} />

            {/* Module 1 — active, linked */}
            <div className="relative" style={{ paddingLeft: 62, marginBottom: 8 }}>
              <div style={{
                position: 'absolute', left: -2, top: 0, zIndex: 2,
                width: 56, height: 56, borderRadius: '50%',
                background: '#FF4D94', color: '#fff',
                display: 'grid', placeItems: 'center',
                fontFamily: 'inherit', fontWeight: 800, fontSize: 22,
                boxShadow: '0 0 0 6px rgba(255,77,148,.16), 0 10px 24px rgba(255,77,148,.3)',
              }}>
                1
              </div>
              <Link
                href="/course/module-1"
                style={{
                  display: 'block', textDecoration: 'none', color: 'inherit',
                  background: '#fff',
                  border: '1.5px solid #FF4D94',
                  borderRadius: 18,
                  padding: '20px 20px 18px',
                  boxShadow: '0 16px 36px rgba(28,25,23,.1)',
                  marginBottom: 30,
                }}
              >
                <div className="flex items-center gap-2" style={{ marginBottom: 10 }}>
                  <span
                    className="lmg-pulse"
                    style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF4D94', flexShrink: 0 }}
                  />
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.13em', textTransform: 'uppercase', color: '#FF4D94' }}>
                    Start here · Live now
                  </span>
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700, fontSize: 25, lineHeight: 1.08,
                  letterSpacing: '-.01em', margin: '0 0 8px', color: '#1C1917',
                }}>
                  The Partnership Landscape
                </h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.5, color: '#78716C', margin: '0 0 16px' }}>
                  How the creator–brand economy actually works, where the money flows, and where you fit in.
                </p>
                <span className="flex items-center gap-2" style={{ fontSize: 14, fontWeight: 800, color: '#FF4D94' }}>
                  Enter Module 1 <ArrowRight size={17} />
                </span>
              </Link>
            </div>

            {/* Modules 2–10 — upcoming, display-only */}
            {upcomingModules.map(({ n, label, title }) => (
              <div key={n} className="relative" style={{ paddingLeft: 62, minHeight: 54, marginBottom: 8 }}>
                <div style={{
                  position: 'absolute', left: 0, top: 0, zIndex: 2,
                  width: 52, height: 52, borderRadius: '50%',
                  border: '2px solid #E5E0D5',
                  background: '#FAFAF8', color: '#78716C',
                  display: 'grid', placeItems: 'center',
                  fontFamily: 'inherit', fontWeight: 800, fontSize: 18,
                }}>
                  {n}
                </div>
                <div style={{ paddingTop: 5 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#A8A096', marginBottom: 3 }}>
                    {label}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap" style={{ fontSize: 16.5, fontWeight: 700, letterSpacing: '-.01em', color: '#5C544D' }}>
                    {title}
                    <span style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: '#F5F2EC',
                      display: 'grid', placeItems: 'center', flexShrink: 0,
                    }}>
                      <Lock size={12} style={{ color: '#A8A096' }} />
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Trail end */}
            <div className="relative" style={{ paddingLeft: 62, marginTop: 4 }}>
              <div style={{
                position: 'absolute', left: 10, top: 2, zIndex: 2,
                width: 34, height: 34, borderRadius: '50%',
                border: '2px solid #E5E0D5', background: '#FAFAF8',
                display: 'grid', placeItems: 'center',
              }}>
                <Flag size={15} style={{ color: '#FFD700' }} />
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#78716C', paddingTop: 7 }}>
                <strong style={{ color: '#1C1917', fontWeight: 800 }}>Capstone complete.</strong>
                {' '}A partnership business that protects and scales itself.
              </p>
            </div>

          </div>
        </section>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #E5E0D5', padding: '26px 26px 40px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15 }}>
          <span style={{ color: '#FF4D94', fontWeight: 800 }}>LMG</span>
          {' · '}
          <span style={{ color: '#FFD700', fontWeight: 700 }}>Brand Partnership Playbook</span>
        </div>
        <p style={{ fontSize: 11.5, color: '#78716C', margin: '10px 0 0', letterSpacing: '.02em' }}>
          Where Quality Brands Meet Iconic Influence
        </p>
      </footer>
    </div>
  )
}
