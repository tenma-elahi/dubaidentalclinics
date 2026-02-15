'use client'

import { Metadata } from 'next'
import { useState, useEffect } from 'react'
import clinicsData from '../data/clinics.json'

const clinics = clinicsData.clinics
const totalClinics = clinics.length
const uniqueAreas = Array.from(new Set(clinics.map((c: any) => c.area)))
const avgRating = (clinics.reduce((sum: number, c: any) => sum + c.rating, 0) / clinics.length).toFixed(1)
const emergencyClinics = clinics.filter((c: any) => 
  c.services?.some((s: string) => s.toLowerCase().includes('emergency'))
).length

// Build area counts from real data
const areaCounts: { [key: string]: number } = {}
clinics.forEach((c: any) => {
  areaCounts[c.area] = (areaCounts[c.area] || 0) + 1
})

const topAreas = Object.entries(areaCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 12)
  .map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    count,
  }))

// Get top rated clinics
const topRatedClinics = [...clinics]
  .sort((a: any, b: any) => b.rating - a.rating || b.reviewCount - a.reviewCount)
  .slice(0, 6)

export default function Home() {
  return (
    <>
      {/* Hero Section with Gradient & Search */}
      <section className="hero-gradient text-white py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-slide-down">
              <span className="text-2xl">😁</span>
              <span className="text-sm font-medium">Dubai's #1 Dental Directory</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-lg">
              Find the Best Dentists in Dubai 🦷
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-50">
              Your smile deserves the best care. Compare {totalClinics}+ verified dental clinics across {uniqueAreas.length} areas. 
              Find your perfect dentist today! 💎
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-white rounded-2xl shadow-glass-lg p-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Search by clinic name, area, or service..."
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 search-box border-2 border-transparent focus:border-primary-500"
                />
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:shadow-lg whitespace-nowrap">
                  🔍 Search
                </button>
              </div>
            </div>

            {/* Trust Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-lg">✅</span>
                <span>All Clinics Verified</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-lg">⭐</span>
                <span>Real Patient Reviews</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-lg">🚨</span>
                <span>24/7 Emergency Care</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-lg">💕</span>
                <span>Trusted by Thousands</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative floating elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">🦷</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-20 animate-float" style={{animationDelay: '1s'}}>✨</div>
      </section>

      {/* Animated Stats Counter */}
      <StatsSection />

      {/* Why Choose Us */}
      <section className="py-20 pattern-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Why Dubai Dental Clinics? 🌟</span>
            </h2>
            <p className="text-xl text-gray-600">Your trusted partner for finding quality dental care</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div 
                key={feature.title}
                className="feature-item animate-slide-up"
                style={{animationDelay: `${i * 0.1}s`}}
              >
                <div className="service-icon mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-2xl mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">🩺 What We Help With</h2>
            <p className="text-xl text-gray-600">From checkups to cosmetic transformations - we've got you covered</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service) => (
              <a
                key={service.slug}
                href={`/services/${service.slug}`}
                className="clinic-card bg-white p-6 rounded-2xl shadow-md hover:shadow-glass-lg text-center group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-sm text-gray-500">{service.description}</p>
              </a>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="/services" className="btn-primary inline-flex items-center gap-2">
              View All Services →
            </a>
          </div>
        </div>
      </section>

      {/* Top Rated Clinics */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">🏆 Community Favorites</h2>
            <p className="text-xl text-gray-600">Highest rated dental clinics loved by patients</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRatedClinics.map((clinic: any, i) => (
              <a
                key={clinic.slug}
                href={`/clinics/${clinic.slug}`}
                className="clinic-card glass-card p-6 rounded-2xl group animate-scale-in"
                style={{animationDelay: `${i * 0.05}s`}}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                      {clinic.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="text-lg">📍</span>
                      <span>{clinic.area}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full">
                      <span className="text-yellow-500 text-lg">⭐</span>
                      <span className="font-bold text-gray-900">{clinic.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400 mt-1">
                      {clinic.reviewCount.toLocaleString()} reviews
                    </span>
                  </div>
                </div>

                {clinic.services && clinic.services.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {clinic.services.slice(0, 3).map((service: string) => (
                      <span key={service} className="bg-primary-50 text-primary-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                        {service}
                      </span>
                    ))}
                    {clinic.services.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-medium">
                        +{clinic.services.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-primary-600 font-semibold text-sm group-hover:underline">
                    View Details →
                  </span>
                  {clinic.phone && (
                    <span className="text-gray-400 text-xs">📞 Available</span>
                  )}
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="/clinics?sort=rating" className="btn-secondary inline-flex items-center gap-2">
              View All {totalClinics}+ Clinics →
            </a>
          </div>
        </div>
      </section>

      {/* Browse by Area */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">📍 Find Dentists by Area</h2>
            <p className="text-xl text-gray-600">Explore {uniqueAreas.length} areas across Dubai</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {topAreas.map((area) => (
              <a
                key={area.slug}
                href={`/dentists/${area.slug}`}
                className="clinic-card bg-gradient-to-br from-white to-blue-50 p-5 rounded-xl shadow-sm hover:shadow-glass border border-blue-100 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {area.name}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {area.count} clinic{area.count !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <div className="text-2xl group-hover:scale-110 transition-transform">
                    🏥
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="/clinics" className="text-primary-600 font-semibold hover:underline text-lg">
              View all areas →
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 pattern-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">💬 Happy Smiles</h2>
            <p className="text-xl text-gray-600">Real stories from real patients</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div 
                key={i} 
                className="testimonial-card animate-slide-up"
                style={{animationDelay: `${i * 0.1}s`}}
              >
                <p className="text-gray-700 mb-6 leading-relaxed italic relative z-10">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-dental flex items-center justify-center text-white text-xl font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-red-600 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="text-6xl mb-6 animate-pulse-slow">🚨</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Dental Emergency?</h2>
            <p className="text-xl md:text-2xl mb-8 text-red-50">
              {emergencyClinics}+ clinics offering 24/7 emergency care. Get immediate help when you need it most.
            </p>
            <a
              href="/emergency"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-red-600 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Find Emergency Dentist Now →
            </a>
          </div>
        </div>
        <div className="absolute top-10 left-10 text-8xl opacity-10">⚡</div>
        <div className="absolute bottom-10 right-10 text-8xl opacity-10">💊</div>
      </section>
    </>
  )
}

// Animated Stats Component
function StatsSection() {
  const [counts, setCounts] = useState({
    clinics: 0,
    areas: 0,
    rating: 0,
  })

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setCounts({
        clinics: Math.floor(totalClinics * progress),
        areas: Math.floor(uniqueAreas.length * progress),
        rating: parseFloat((parseFloat(avgRating) * progress).toFixed(1)),
      })

      if (step >= steps) {
        clearInterval(timer)
        setCounts({
          clinics: totalClinics,
          areas: uniqueAreas.length,
          rating: parseFloat(avgRating),
        })
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const stats = [
    { icon: '🏥', label: 'Dental Clinics', value: counts.clinics, suffix: '+' },
    { icon: '📍', label: 'Dubai Areas', value: counts.areas, suffix: '' },
    { icon: '🚨', label: '24/7 Emergency', value: emergencyClinics, suffix: '+' },
    { icon: '⭐', label: 'Average Rating', value: counts.rating, suffix: '' },
  ]

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div 
              key={stat.label} 
              className="text-center counter animate-slide-up"
              style={{animationDelay: `${i * 0.1}s`}}
            >
              <div className="text-5xl mb-3">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const services = [
  { name: 'General Dentistry', slug: 'general-dentistry', icon: '🦷', description: 'Checkups & cleanings' },
  { name: 'Cosmetic Dentistry', slug: 'cosmetic-dentistry', icon: '✨', description: 'Transform your smile' },
  { name: 'Orthodontics', slug: 'orthodontics', icon: '😁', description: 'Braces & aligners' },
  { name: 'Dental Implants', slug: 'dental-implants', icon: '🔧', description: 'Permanent solutions' },
  { name: 'Teeth Whitening', slug: 'teeth-whitening', icon: '💎', description: 'Brighten your smile' },
  { name: 'Root Canal', slug: 'root-canal', icon: '🩺', description: 'Save your tooth' },
  { name: 'Pediatric Dentistry', slug: 'pediatric-dentistry', icon: '👶', description: 'Care for little smiles' },
  { name: 'Emergency Care', slug: 'emergency', icon: '🚨', description: '24/7 urgent care' },
]

const features = [
  {
    icon: '✅',
    title: 'Verified Clinics',
    description: `All ${totalClinics}+ clinics are verified with accurate information, real reviews, and up-to-date contact details.`,
  },
  {
    icon: '⭐',
    title: 'Real Reviews',
    description: 'Read authentic patient reviews from Google to find the right dentist for your specific needs.',
  },
  {
    icon: '📍',
    title: 'Easy to Find',
    description: `Search by location across ${uniqueAreas.length} areas, service type, or clinic name. Find quality care near you.`,
  },
]

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Dubai Marina Resident',
    text: 'Found an amazing dentist for my family in minutes! The reviews were spot-on and the clinic was professional and caring.',
  },
  {
    name: 'Ahmed K.',
    role: 'Business Bay',
    text: 'Had a dental emergency at midnight. This site helped me find a 24/7 clinic nearby. Literally saved my tooth!',
  },
  {
    name: 'Maria L.',
    role: 'JBR',
    text: 'Switched to a new dentist after reading the reviews here. Best decision ever - my smile has never looked better!',
  },
]
