import DashboardLayout from '@/components/layout/DashboardLayout'
import { Building2, Plus } from 'lucide-react'

export default function BrandsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Brands</h1>
            <p className="text-text-secondary mt-1">Your brand database and contact history</p>
          </div>
          <button className="flex items-center gap-2 bg-brand-yellow text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all">
            <Plus className="w-5 h-5" />
            Add Brand
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-16 bg-bg-secondary border border-border-color rounded-xl">
          <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mb-6">
            <Building2 className="w-10 h-10 text-brand-blue" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">No brands yet</h3>
          <p className="text-text-secondary mb-6">Start building your brand database</p>
          <button className="flex items-center gap-2 bg-brand-yellow text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all">
            <Plus className="w-5 h-5" />
            Add Brand
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
