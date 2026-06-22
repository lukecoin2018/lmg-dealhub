'use client'

import { Calculator, MessageSquare, FileText, LayoutDashboard, Building2, TrendingUp } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Calculator,
      title: "Smart Rate Calculator",
      description: "Fair rates based on engagement, content type, usage rights, and exclusivity",
      color: "#FFD700"
    },
    {
      icon: MessageSquare,
      title: "Negotiation Assistant",
      description: "Professional email responses for every situation—copy, paste, send",
      color: "#FF4D94"
    },
    {
      icon: FileText,
      title: "Contract Generator",
      description: "Creator-friendly contracts customized for your exact deal",
      color: "#3AAFF4"
    },
    {
      icon: LayoutDashboard,
      title: "Deal Pipeline",
      description: "Track every campaign from pitch to payment",
      color: "#FFD700"
    },
    {
      icon: Building2,
      title: "Brand Database",
      description: "Remember which brands pay well and which ones ghost",
      color: "#FF4D94"
    },
    {
      icon: TrendingUp,
      title: "Income Overview",
      description: "See your revenue, active deals, and upcoming deadlines",
      color: "#3AAFF4"
    }
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f1420]">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Everything You Need to Run Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF4D94] to-[#3AAFF4]">
              Creator Business
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            All the tools professional creators use to protect their income and grow sustainably
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div 
                key={index}
                className="group relative"
              >
                {/* Hover glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{ backgroundColor: `${feature.color}10` }}
                />

                <div className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all h-full">
                  {/* Icon */}
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: feature.color }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
