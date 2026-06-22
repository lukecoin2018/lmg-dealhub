import Hero from '@/components/landing/Hero'
import Problem from '@/components/landing/Problem'
import HowItWorks from '@/components/landing/HowItWorks'
import Features from '@/components/landing/Features'
import Testimonials from '@/components/landing/Testimonials'
import Pricing from '@/components/landing/Pricing'
import FinalCTA from '@/components/landing/FinalCTA'
import Footer from '@/components/landing/Footer'
import LandingNav from '@/components/landing/LandingNav'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
      <LandingNav />
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  )
}