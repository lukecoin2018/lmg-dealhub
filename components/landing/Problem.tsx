'use client'

import { XCircle } from 'lucide-react'

export default function Problem() {
  const problems = [
    {
      title: "Accepting $1,500 when you should charge $3,800",
      description: "Without data, you're guessing. Brands know this and lowball you."
    },
    {
      title: "Signing contracts that screw you over",
      description: "Perpetual rights, no usage limits, payment on completion only—sound familiar?"
    },
    {
      title: "Losing track of deals and missing payments",
      description: "Scattered emails, forgotten deadlines, and brands ghosting on invoices."
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f1420]">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            You're Leaving{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D94] to-[#FFD700]">
              Money on the Table
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Every day, creators accept deals that undervalue their work
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="group relative"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D94]/20 to-[#FFD700]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              
              <div className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 hover:border-[#FF4D94]/30 transition-all">
                <div className="w-16 h-16 bg-[#FF4D94]/10 rounded-xl flex items-center justify-center mb-6">
                  <XCircle className="w-8 h-8 text-[#FF4D94]" />
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-white">
                  {problem.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
