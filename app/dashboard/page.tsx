import DashboardLayout from '@/components/layout/DashboardLayout'
import { Badge } from '@/components/ui/Badge'
import {
  Calculator,
  MessageSquare,
  FileText,
  Briefcase,
  DollarSign,
  Clock,
  CheckCircle,
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Dashboard</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">Welcome back! Here's your business overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="premium-card p-5 hover:scale-105 transition-transform duration-200">
            <div className="w-10 h-10 bg-brand-yellow/10 rounded-xl flex items-center justify-center mb-3">
              <Briefcase className="w-5 h-5 text-brand-yellow" />
            </div>
            <p className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">0</p>
            <p className="text-sm text-[var(--color-text-secondary)]">Active Deals</p>
          </div>

          <div className="premium-card p-5 hover:scale-105 transition-transform duration-200">
            <div className="w-10 h-10 bg-brand-pink/10 rounded-xl flex items-center justify-center mb-3">
              <DollarSign className="w-5 h-5 text-brand-pink" />
            </div>
            <p className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">$0</p>
            <p className="text-sm text-[var(--color-text-secondary)]">Total Value</p>
          </div>

          <div className="premium-card p-5 hover:scale-105 transition-transform duration-200">
            <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center mb-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">$0</p>
            <p className="text-sm text-[var(--color-text-secondary)]">Received</p>
          </div>

          <div className="premium-card p-5 hover:scale-105 transition-transform duration-200">
            <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-brand-blue" />
            </div>
            <p className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">0</p>
            <p className="text-sm text-[var(--color-text-secondary)]">Upcoming Deadlines</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/calculator" className="premium-card p-6 hover:scale-105 transition-all duration-200 group block">
              <Calculator className="w-8 h-8 text-brand-yellow mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Calculate Rate</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Get your fair rate estimate</p>
            </Link>

            <Link href="/negotiate" className="premium-card p-6 hover:scale-105 transition-all duration-200 group block">
              <MessageSquare className="w-8 h-8 text-brand-pink mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Negotiate Deal</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Craft perfect responses</p>
            </Link>

            <Link href="/contracts/generate" className="premium-card p-6 hover:scale-105 transition-all duration-200 group block">
              <FileText className="w-8 h-8 text-brand-blue mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Generate Contract</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Create professional contracts</p>
            </Link>

            <Link href="/deals" className="premium-card p-6 hover:scale-105 transition-all duration-200 group block">
              <Briefcase className="w-8 h-8 text-green-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">New Deal</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Track a new campaign</p>
            </Link>
          </div>
        </div>

        {/* Recent Activity & Upcoming Deadlines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="premium-card p-6">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">Upcoming Deadlines</h2>
            <div className="text-center py-12">
              <Clock className="w-12 h-12 mx-auto mb-3 text-[var(--color-text-tertiary)] opacity-50" />
              <p className="text-[var(--color-text-tertiary)]">No upcoming deadlines</p>
              <p className="text-sm text-[var(--color-text-tertiary)] mt-1">You're all caught up!</p>
            </div>
          </div>

          <div className="premium-card p-6">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">Recent Deals</h2>
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 mx-auto mb-3 text-[var(--color-text-tertiary)] opacity-50" />
              <p className="text-[var(--color-text-tertiary)]">No deals yet</p>
              <p className="text-sm text-[var(--color-text-tertiary)] mt-1">Start by creating your first deal</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
