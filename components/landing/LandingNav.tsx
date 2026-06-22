'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function LandingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              <span className="text-white">Deal</span>
              <span className="text-[#FFD700]">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </a>
            <Link 
              href="/login" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/login" 
              className="px-6 py-2.5 bg-[#FFD700] text-black font-semibold rounded-lg hover:bg-[#FFD700]/90 transition-all"
            >
              Start Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0f0f14] border-t border-white/5">
          <div className="px-4 py-4 space-y-4">
            <a 
              href="#features" 
              className="block text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="block text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#pricing" 
              className="block text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <Link 
              href="/login" 
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/login" 
              className="block px-6 py-2.5 bg-[#FFD700] text-black font-semibold rounded-lg text-center hover:bg-[#FFD700]/90 transition-all"
            >
              Start Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}