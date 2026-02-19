'use client'

import { useState, useEffect } from 'react'
import ClinicImage from '../components/ClinicImage'
import clinicsData from '../data/clinics.json'
import { 
  ToothIcon, StarIcon, LocationIcon, PhoneIcon, SearchIcon, CheckIcon, 
  AlertIcon, HospitalIcon, MedicalIcon, SparkleIcon, SmileIcon, ShieldIcon,
  BadgeIcon, HeartIcon, ArrowRightIcon, QuoteIcon, BracesIcon, ImplantIcon, ChildIcon
} from '../components/Icons'

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
      {/* Hero Section - Clean & Professional */}
      <section className="hero-gradient text-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <BadgeIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Dubai's #1 Dental Directory</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
              Find the Best Dentists in Dubai
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-brand-100 leading-relaxed">
              Your smile deserves the best care. Compare {totalClinics}+ verified dental clinics across {uniqueAreas.length} areas. 
              Find your perfect dentist today.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-white rounded-xl shadow-lg p-1.5 flex gap-2">
                <div className="flex-1 flex items-center px-4">
                  <SearchIcon className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Search by clinic name, area, or service..."
                    className="flex-1 py-3 text-gray-900 border-0 focus:outline-none"
                  />
                </div>
                <button className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap">
                  Search
                </button>
              </div>
            </div>

            {/* Trust Signals - Clean Icons */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <CheckIcon className="w-4 h-4" />
                <span>All Clinics Verified</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <StarIcon className="w-4 h-4" filled />
                <span>Real Patient Reviews</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <AlertIcon className="w-4 h-4" />
                <span>24/7 Emergency Care</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <HeartIcon className="w-4 h-4" />
                <span>Trusted by Thousands</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 tracking-tight">
              Why Dubai Dental Clinics?
            </h2>
            <p className="text-lg text-gray-600">Your trusted partner for finding quality dental care</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div 
                key={feature.title}
                className="feature-item"
                style={{animationDelay: `${i * 0.1}s`}}
              >
                <div className="service-icon mx-auto mb-5">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-xl mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 tracking-tight">What We Help With</h2>
            <p className="text-lg text-gray-600">From checkups to cosmetic transformations</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {services.map((service) => (
              <a
                key={service.slug}
                href={`/services/${service.slug}`}
                className="clinic-card bg-white p-5 rounded-xl border border-gray-200 text-center group"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{service.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{service.description}</p>
              </a>
            ))}
          </div>

          <div className="text-center mt-8">
            <a href="/services" className="btn-primary inline-flex items-center gap-2">
              <span>View All Services</span>
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Top Rated Clinics */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 tracking-tight">Community Favorites</h2>
            <p className="text-lg text-gray-600">Highest rated dental clinics loved by patients</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topRatedClinics.map((clinic: any, i) => (
              <a
                key={clinic.slug}
                href={`/clinics/${clinic.slug}`}
                className="clinic-card glass-card rounded-xl overflow-hidden group"
                style={{animationDelay: `${i * 0.05}s`}}
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-500 to-accent-500">
                  <ClinicImage slug={clinic.slug} name={clinic.name} area={clinic.area} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-yellow-50 px-2.5 py-1.5 rounded-lg shadow-md">
                    <StarIcon className="w-4 h-4 text-yellow-500" filled />
                    <span className="font-bold text-gray-900 text-sm">{clinic.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <h3 className="font-bold text-base text-gray-900 mb-1.5 group-hover:text-brand-600 transition-colors">
                      {clinic.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <LocationIcon className="w-4 h-4" />
                      <span>{clinic.area}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {clinic.reviewCount.toLocaleString()} reviews
                    </div>
                  </div>

                  {clinic.services && clinic.services.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {clinic.services.slice(0, 3).map((service: string) => (
                        <span key={service} className="bg-brand-50 text-brand-700 px-2 py-1 rounded-md text-xs font-medium">
                          {service}
                        </span>
                      ))}
                      {clinic.services.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-medium">
                          +{clinic.services.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-brand-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      <span>View Details</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </span>
                    {clinic.phone && (
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <PhoneIcon className="w-3.5 h-3.5 text-green-500" />
                        <span>Available</span>
                      </div>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-8">
            <a href="/clinics?sort=rating" className="btn-secondary inline-flex items-center gap-2">
              <span>View All {totalClinics}+ Clinics</span>
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Browse by Area */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 tracking-tight">Find Dentists by Area</h2>
            <p className="text-lg text-gray-600">Explore {uniqueAreas.length} areas across Dubai</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {topAreas.map((area) => (
              <a
                key={area.slug}
                href={`/dentists/${area.slug}`}
                className="clinic-card bg-white p-4 rounded-lg border border-gray-200 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors text-sm">
                      {area.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {area.count} clinic{area.count !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <HospitalIcon className="w-5 h-5 text-gray-400 group-hover:text-primary-500 group-hover:scale-110 transition-all" />
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-8">
            <a href="/clinics" className="text-brand-600 font-semibold hover:underline text-base flex items-center justify-center gap-1">
              <span>View all areas</span>
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 tracking-tight">Happy Smiles</h2>
            <p className="text-lg text-gray-600">Real stories from real patients</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div 
                key={i} 
                className="testimonial-card relative"
              >
                <QuoteIcon className="absolute top-4 left-4 w-8 h-8 text-primary-100" />
                <p className="text-gray-700 mb-5 leading-relaxed relative z-10 pt-8">
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-dental flex items-center justify-center text-white text-sm font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-5">
              <AlertIcon className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Dental Emergency?</h2>
            <p className="text-lg md:text-xl mb-7 text-red-50 max-w-2xl mx-auto">
              {emergencyClinics}+ clinics offering 24/7 emergency care. Get immediate help when you need it most.
            </p>
            <a
              href="/emergency"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-red-600 px-7 py-3.5 rounded-lg font-bold text-base transition-all shadow-lg hover:shadow-xl"
            >
              <span>Find Emergency Dentist Now</span>
              <ArrowRightIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
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
    { icon: <HospitalIcon className="w-10 h-10 text-brand-600" />, label: 'Dental Clinics', value: counts.clinics, suffix: '+' },
    { icon: <LocationIcon className="w-10 h-10 text-brand-600" />, label: 'Dubai Areas', value: counts.areas, suffix: '' },
    { icon: <AlertIcon className="w-10 h-10 text-brand-600" />, label: '24/7 Emergency', value: emergencyClinics, suffix: '+' },
    { icon: <StarIcon className="w-10 h-10 text-brand-600" filled />, label: 'Average Rating', value: counts.rating, suffix: '' },
  ]

  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div 
              key={stat.label} 
              className="text-center counter"
              style={{animationDelay: `${i * 0.1}s`}}
            >
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-brand-600 mb-1.5">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const services = [
  { name: 'General Dentistry', slug: 'general-dentistry', icon: <ToothIcon className="w-6 h-6" />, description: 'Checkups & cleanings' },
  { name: 'Cosmetic Dentistry', slug: 'cosmetic-dentistry', icon: <SparkleIcon className="w-6 h-6" />, description: 'Transform your smile' },
  { name: 'Orthodontics', slug: 'orthodontics', icon: <BracesIcon className="w-6 h-6" />, description: 'Braces & aligners' },
  { name: 'Dental Implants', slug: 'dental-implants', icon: <ImplantIcon className="w-6 h-6" />, description: 'Permanent solutions' },
  { name: 'Teeth Whitening', slug: 'teeth-whitening', icon: <SmileIcon className="w-6 h-6" />, description: 'Brighten your smile' },
  { name: 'Root Canal', slug: 'root-canal', icon: <MedicalIcon className="w-6 h-6" />, description: 'Save your tooth' },
  { name: 'Pediatric Dentistry', slug: 'pediatric-dentistry', icon: <ChildIcon className="w-6 h-6" />, description: 'Care for little smiles' },
  { name: 'Emergency Care', slug: 'emergency', icon: <AlertIcon className="w-6 h-6" />, description: '24/7 urgent care' },
]

const features = [
  {
    icon: <ShieldIcon className="w-8 h-8" />,
    title: 'Verified Clinics',
    description: `All ${totalClinics}+ clinics are verified with accurate information, real reviews, and up-to-date contact details.`,
  },
  {
    icon: <StarIcon className="w-8 h-8" filled />,
    title: 'Real Reviews',
    description: 'Read authentic patient reviews from Google to find the right dentist for your specific needs.',
  },
  {
    icon: <LocationIcon className="w-8 h-8" />,
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
