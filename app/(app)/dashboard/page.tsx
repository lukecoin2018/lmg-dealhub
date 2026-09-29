import DashboardLayout from '@/components/layout/DashboardLayout'
import {
  Calculator,
  MessageSquare,
  FileText,
  Briefcase,
  DollarSign,
  Clock,
  CheckCircle,
  Plus,
} from 'lucide-react'
import Link from 'next/link'

// The deals page opens its "New deal" modal when it sees ?new=1
const NEW_DEAL_HREF = '/deals?new=1'

const stats = [
  { label: 'Active deals', value: '0', icon: Briefcase, tint: 'gold' },
  { label: 'Total value', value: '$0', icon: DollarSign, tint: 'pink' },
  { label: 'Received', value: '$0', icon: CheckCircle, tint: 'green' },
  { label: 'Upcoming deadlines', value: '0', icon: Clock, tint: 'blue' },
]

const quickActions = [
  { title: 'Calculate rate', desc: 'Get your fair rate estimate', href: '/calculator', icon: Calculator, tint: 'gold' },
  { title: 'Negotiate deal', desc: 'Craft perfect responses', href: '/negotiate', icon: MessageSquare, tint: 'pink' },
  { title: 'Generate contract', desc: 'Create professional contracts', href: '/contracts/generate', icon: FileText, tint: 'green' },
  { title: 'New deal', desc: 'Track a new campaign', href: '/deals', icon: Briefcase, tint: 'blue' },
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="course-landing dash">
        {/* Welcome Header */}
        <div className="dash__head">
          <div>
            <h1>Dashboard</h1>
            <p className="dash__welcome">Welcome back! Here&apos;s your business overview.</p>
          </div>
          <Link className="btn btn--pink btn--sm" href={NEW_DEAL_HREF}>
            <Plus aria-hidden="true" />
            New deal
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="dash__grid">
          {stats.map(({ label, value, icon: Icon, tint }) => (
            <div key={label} className="dash-card">
              <span className={`pillar__icon tint--${tint}`}>
                <Icon aria-hidden="true" />
              </span>
              <p className="dash-card__num">{value}</p>
              <p className="dash-card__label">{label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <section className="dash__section">
          <h2>Quick actions</h2>
          <div className="dash__grid">
            {quickActions.map(({ title, desc, href, icon: Icon, tint }) => (
              <Link key={title} href={href} className="dash-card">
                <Icon className={`dash-card__icon stroke--${tint}`} strokeWidth={1.8} aria-hidden="true" />
                <h3>{title}</h3>
                <p className="dash-card__desc">{desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Upcoming Deadlines & Recent Deals */}
        <div className="dash__panels">
          <section className="dash-card dash-panel">
            <div className="dash-panel__head">
              <h2>Upcoming deadlines</h2>
              <Link className="dash-panel__all" href="/deals">View all →</Link>
            </div>
            <div className="dash-empty">
              <span className="dash-empty__icon tint--blue">
                <Clock aria-hidden="true" />
              </span>
              <p className="dash-empty__title">No upcoming deadlines</p>
              <p className="dash-empty__next">You&apos;re all caught up.</p>
            </div>
          </section>

          <section className="dash-card dash-panel">
            <div className="dash-panel__head">
              <h2>Recent deals</h2>
              <Link className="dash-panel__all" href="/deals">View all →</Link>
            </div>
            <div className="dash-empty">
              <span className="dash-empty__icon tint--pink">
                <Briefcase aria-hidden="true" />
              </span>
              <p className="dash-empty__title">No deals yet</p>
              <p className="dash-empty__next">
                <Link href={NEW_DEAL_HREF}>Create your first deal →</Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  )
}
