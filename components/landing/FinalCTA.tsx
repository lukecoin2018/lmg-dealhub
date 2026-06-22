'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#FFD700]/20 via-[#FF4D94]/20 to-[#3AAFF4]/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FFD700] to-[#FF4D94] rounded-2xl mb-8 animate-pulse">
          <Sparkles className="w-10 h-10 text-black" />
        </div>

        {/* Headline */}
        <h2 className="text-5xl sm:text-6xl font-bold mb-6">
          Stop{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF4D94] to-[#3AAFF4]">
            Undervaluing
          </span>
          {' '}Your Work
        </h2>

        {/* Subheadline */}
        <p className="text-xl sm:text-2xl text-gray-300 mb-12 leading-relaxed">
          Join 1,000+ creators who stopped guessing and started getting paid fairly
        </p>

        {/* CTA Button */}
        <Link 
          href="/login"
          className="inline-flex items-center space-x-3 px-10 py-5 bg-[#FFD700] text-black font-bold rounded-lg text-lg hover:bg-[#FFD700]/90 transition-all hover:scale-105 group"
        >
          <span>Get Started Free</span>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Small print */}
        <p className="text-sm text-gray-500 mt-6">
          No credit card required • Free forever • Upgrade anytime
        </p>
      </div>
    </section>
  )
}
