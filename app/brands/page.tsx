import DashboardLayout from '@/components/layout/DashboardLayout'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { Building2, Plus, Star } from 'lucide-react'
import Link from 'next/link'

export default async function BrandsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: brands } = await supabase
    .from('brands')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

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

        {/* Brands List */}
        {brands && brands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="bg-bg-secondary border border-border-color rounded-xl p-6 hover:border-brand-blue transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-brand-blue" />
                  </div>
                  {brand.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
                      <span className="text-sm font-medium text-text-primary">{brand.rating}</span>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-text-primary mb-2">{brand.brand_name}</h3>
                {brand.contact_email && (
                  <p className="text-sm text-text-secondary mb-2">{brand.contact_email}</p>
                )}
                {brand.past_rate && (
                  <p className="text-sm text-brand-yellow font-medium">
                    Past Rate: ${Number(brand.past_rate).toLocaleString()}
                  </p>
                )}
                {brand.payment_speed && (
                  <span className="inline-block mt-3 px-2 py-1 bg-bg-tertiary text-text-tertiary text-xs rounded capitalize">
                    {brand.payment_speed} payer
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </DashboardLayout>
  )
}