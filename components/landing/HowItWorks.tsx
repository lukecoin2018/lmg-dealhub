'use client'

import { Calculator, MessageSquare, FileText, LayoutDashboard } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Calculate Your Worth",
      description: "Know your fair rate based on engagement, not followers",
      icon: Calculator,
      color: "#FFD700"
    },
    {
      number: "02",
      title: "Negotiate Confidently",
      description: "Get professional responses to every brand objection",
      icon: MessageSquare,
      color: "#FF4D94"
    },
    {
      number: "03",
      title: "Protect Yourself",
      description: "Generate customized contracts in 10 minutes",
      icon: FileText,
      color: "#3AAFF4"
    },
    {
      number: "04",
      title: "Track Everything",
      description: "Manage deals, payments, and deadlines in one place",
      icon: LayoutDashboard,
      color: "#FFD700"
    }
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#3AAFF4]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Headline */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            One Platform,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3AAFF4] to-[#FFD700]">
              Complete Control
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From rate calculation to getting paid, we've got you covered
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div 
                key={index}
                className="group"
              >
                <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f14] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
                  {/* Step Number */}
                  <div className="text-6xl font-bold text-white/5 absolute top-4 right-4">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 relative z-10"
                    style={{ backgroundColor: `${step.color}15` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: step.color }} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Screenshot Placeholder */}
                  <div className="aspect-video bg-[#0a0a0a] rounded-lg border border-white/5 flex items-center justify-center">
                    <Icon className="w-12 h-12 text-white/10" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
