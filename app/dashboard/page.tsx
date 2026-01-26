import DashboardLayout from '@/components/layout/DashboardLayout'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { 
  Calculator, 
  MessageSquare, 
  FileText, 
  Briefcase, 
  DollarSign,
  Clock,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  const { data: deals } = await supabase
    .from('deals')
    .select('*')
    .eq('user_id', user?.id)

  const activeDeals = deals?.filter(d => 
    d.status === 'confirmed' || d.status === 'in_progress'
  ) || []

  const totalIncome = deals?.reduce((sum, deal) => sum + Number(deal.amount), 0) || 0
  const paidIncome = deals?.reduce((sum, deal) => 
    sum + (deal.payment_status === 'paid' ? Number(deal.amount) : 0), 0
  ) || 0

  const upcomingDeadlines = deals?.filter(d => 
    d.deadline && new Date(d.deadline) > new Date()
  ).sort((a, b) => 
    new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime()
  ).slice(0, 3) || []

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary mt-1">Welcome back! Here's your business overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Active Deals */}
          <div className="bg-bg-secondary border border-border-color rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-brand-yellow/10 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-brand-yellow" />
              </div>
            </div>
            <p className="text-3xl font-bold text-text-primary">{activeDeals.length}</p>
            <p className="text-sm text-text-secondary mt-1">Active Deals</p>
          </div>

          {/* Total Income */}
          <div className="bg-bg-secondary border border-border-color rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-brand-pink/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-brand-pink" />
              </div>
            </div>
            <p className="text-3xl font-bold text-text-primary">${totalIncome.toLocaleString()}</p>
            <p className="text-sm text-text-secondary mt-1">Total Value</p>
          </div>

          {/* Paid Income */}
          <div className="bg-bg-secondary border border-border-color rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <p className="text-3xl font-bold text-text-primary">${paidIncome.toLocaleString()}</p>
            <p className="text-sm text-text-secondary mt-1">Received</p>
          </div>

          {/* Upcoming */}
          <div className="bg-bg-secondary border border-border-color rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-brand-blue" />
              </div>
            </div>
            <p className="text-3xl font-bold text-text-primary">{upcomingDeadlines.length}</p>
            <p className="text-sm text-text-secondary mt-1">Upcoming Deadlines</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/calculator"
              className="bg-bg-secondary border border-border-color rounded-xl p-6 hover:border-brand-yellow transition-all group"
            >
              <Calculator className="w-8 h-8 text-brand-yellow mb-3" />
              <h3 className="font-semibold text-text-primary group-hover:text-brand-yellow transition-colors">Calculate Rate</h3>
              <p className="text-sm text-text-secondary mt-1">Get your fair rate estimate</p>
            </Link>

            <Link
              href="/negotiate"
              className="bg-bg-secondary border border-border-color rounded-xl p-6 hover:border-brand-pink transition-all group"
            >
              <MessageSquare className="w-8 h-8 text-brand-pink mb-3" />
              <h3 className="font-semibold text-text-primary group-hover:text-brand-pink transition-colors">Negotiate Deal</h3>
              <p className="text-sm text-text-secondary mt-1">Craft perfect responses</p>
            </Link>

            <Link
              href="/contracts/generate"
              className="bg-bg-secondary border border-border-color rounded-xl p-6 hover:border-brand-blue transition-all group"
            >
              <FileText className="w-8 h-8 text-brand-blue mb-3" />
              <h3 className="font-semibold text-text-primary group-hover:text-brand-blue transition-colors">Generate Contract</h3>
              <p className="text-sm text-text-secondary mt-1">Create professional contracts</p>
            </Link>

            <Link
              href="/deals/new"
              className="bg-bg-secondary border border-border-color rounded-xl p-6 hover:border-green-500 transition-all group"
            >
              <Briefcase className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="font-semibold text-text-primary group-hover:text-green-500 transition-colors">New Deal</h3>
              <p className="text-sm text-text-secondary mt-1">Track a new campaign</p>
            </Link>
          </div>
        </div>

        {/* Recent Activity & Upcoming Deadlines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Deadlines */}
          <div className="bg-bg-secondary border border-border-color rounded-xl p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Upcoming Deadlines</h2>
            {upcomingDeadlines.length > 0 ? (
              <div className="space-y-4">
                {upcomingDeadlines.map((deal) => (
                  <div key={deal.id} className="flex items-center justify-between py-3 border-b border-border-color last:border-0">
                    <div>
                      <p className="font-medium text-text-primary">{deal.deal_name}</p>
                      <p className="text-sm text-text-secondary">{deal.brand_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-brand-blue">
                        {new Date(deal.deadline!).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-text-tertiary">{deal.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-secondary text-center py-8">No upcoming deadlines</p>
            )}
          </div>

          {/* Recent Deals */}
          <div className="bg-bg-secondary border border-border-color rounded-xl p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Recent Deals</h2>
            {deals && deals.length > 0 ? (
              <div className="space-y-4">
                {deals.slice(0, 3).map((deal) => (
                  <div key={deal.id} className="flex items-center justify-between py-3 border-b border-border-color last:border-0">
                    <div>
                      <p className="font-medium text-text-primary">{deal.deal_name}</p>
                      <p className="text-sm text-text-secondary">{deal.brand_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-brand-yellow">
                        ${Number(deal.amount).toLocaleString()}
                      </p>
                      <p className="text-xs text-text-tertiary capitalize">{deal.status.replace('_', ' ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-text-secondary mb-4">No deals yet</p>
                <Link 
                  href="/deals/new"
                  className="inline-block bg-brand-yellow text-black px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-all"
                >
                  Create Your First Deal
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}