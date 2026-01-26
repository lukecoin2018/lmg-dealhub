import DashboardLayout from '@/components/layout/DashboardLayout'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { FileText, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function ContractsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: contracts } = await supabase
    .from('contracts')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Contracts</h1>
            <p className="text-text-secondary mt-1">Manage your generated contracts</p>
          </div>
          <Link
            href="/contracts/generate"
            className="flex items-center gap-2 bg-brand-yellow text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
          >
            <Plus className="w-5 h-5" />
            Generate Contract
          </Link>
        </div>

        {/* Contracts List */}
        {contracts && contracts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {contracts.map((contract) => (
              <div
                key={contract.id}
                className="bg-bg-secondary border border-border-color rounded-xl p-6 hover:border-brand-blue transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">{contract.brand_name}</h3>
                      <p className="text-sm text-text-secondary mt-1">
                        ${Number(contract.deal_amount).toLocaleString()} • {contract.deliverables}
                      </p>
                      <p className="text-xs text-text-tertiary mt-2">
                        Created {new Date(contract.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-bg-tertiary text-text-secondary text-xs rounded-full capitalize">
                    {contract.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-bg-secondary border border-border-color rounded-xl">
            <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mb-6">
              <FileText className="w-10 h-10 text-brand-blue" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">No contracts yet</h3>
            <p className="text-text-secondary mb-6">Generate your first contract to get started</p>
            <Link
              href="/contracts/generate"
              className="flex items-center gap-2 bg-brand-yellow text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
            >
              <Plus className="w-5 h-5" />
              Generate Contract
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}