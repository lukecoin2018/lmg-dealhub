'use client'

import { Star } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Before DealHub I was accepting $800 for campaigns I should've charged $2,400 for. Now I negotiate confidently with data. Increased my rates by 60%.",
      author: "Sarah",
      role: "42k lifestyle creator",
      avatar: "S"
    },
    {
      quote: "The contract generator saved me from a brand that wanted perpetual rights for a one-time fee. Worth it for that alone.",
      author: "Mike",
      role: "68k tech creator",
      avatar: "M"
    },
    {
      quote: "Finally a tool that understands the creator business. The negotiation responses are perfect—professional but not desperate.",
      author: "Jessica",
      role: "35k beauty creator",
      avatar: "J"
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Trusted by Creators Who{' '}
            <span className="text-[#FFD700]">Know Their Worth</span>
          </h2>
          <p className="text-xl text-gray-400">
            Join thousands of creators getting paid fairly
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group"
            >
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f14] border border-white/10 rounded-2xl p-8 hover:border-[#FFD700]/30 transition-all h-full flex flex-col">
                {/* Stars */}
                <div className="flex space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 leading-relaxed mb-8 flex-1">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#FF4D94] rounded-full flex items-center justify-center text-black font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
