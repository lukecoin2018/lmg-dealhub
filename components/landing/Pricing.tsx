'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out DealHub",
      features: [
        "3 rate calculations/month",
        "5 negotiation responses/month",
        "1 contract/month",
        "Track 3 active deals",
        "Basic brand database"
      ],
      cta: "Start Free",
      highlighted: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "For serious creators building a business",
      features: [
        "Unlimited calculations",
        "Unlimited negotiations",
        "Unlimited contracts",
        "Unlimited deal tracking",
        "Full brand database",
        "Save history & analytics",
        "Priority support",
        "Early access to new features"
      ],
      cta: "Start Pro Trial",
      highlighted: true
    }
  ]

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f0f14] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF4D94]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Start Free,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FF4D94]">
              Upgrade When You're Ready
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            No credit card required • Cancel anytime
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative ${plan.highlighted ? 'md:scale-105' : ''}`}
            >
              {/* Highlighted badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-[#FFD700] to-[#FF4D94] text-black px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Glow effect for highlighted */}
              {plan.highlighted && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 to-[#FF4D94]/20 rounded-3xl blur-2xl" />
              )}

              <div className={`relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f14] border ${plan.highlighted ? 'border-[#FFD700]/30' : 'border-white/10'} rounded-3xl p-8 h-full flex flex-col`}>
                {/* Plan Name */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-2">/{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlighted ? 'bg-[#FFD700]/20' : 'bg-white/10'}`}>
                        <Check className={`w-3 h-3 ${plan.highlighted ? 'text-[#FFD700]' : 'text-gray-400'}`} />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link 
                  href="/login"
                  className={`block w-full py-4 rounded-lg font-bold text-center transition-all ${
                    plan.highlighted 
                      ? 'bg-[#FFD700] text-black hover:bg-[#FFD700]/90 hover:scale-105' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-400">
            Need a custom plan for your agency or team?{' '}
            <a href="#" className="text-[#FFD700] hover:underline">Contact us</a>
          </p>
        </div>
      </div>
    </section>
  )
}
