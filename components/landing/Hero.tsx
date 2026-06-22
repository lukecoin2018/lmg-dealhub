'use client'

import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FF4D94]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#3AAFF4]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">Join 1,000+ creators building sustainable businesses</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Stop Losing Thousands on{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF4D94] to-[#3AAFF4]">
              Lowball Brand Deals
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-gray-300 mb-10 leading-relaxed">
            Calculate fair rates, negotiate like a pro, and protect every deal—all in one platform
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link 
              href="/login"
              className="w-full sm:w-auto px-8 py-4 bg-[#FFD700] text-black font-bold rounded-lg text-lg hover:bg-[#FFD700]/90 transition-all hover:scale-105 flex items-center justify-center space-x-2 group"
            >
              <span>Start Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button 
              className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold rounded-lg text-lg hover:bg-white/10 transition-all flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>See How It Works</span>
            </button>
          </div>

          {/* Hero Visual Placeholder */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f14] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
              <div className="aspect-video bg-[#0f0f14] rounded-lg flex items-center justify-center border border-white/5">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#FFD700] to-[#FF4D94] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Play className="w-10 h-10 text-black" />
                  </div>
                  <p className="text-gray-400">Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}