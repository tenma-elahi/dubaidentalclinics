'use client'

import { useState } from 'react'
import { 
  LocationIcon, SearchIcon, ChevronDownIcon, HospitalIcon, StarIcon, 
  CheckIcon, PhoneIcon, ArrowRightIcon, XIcon 
} from '../../../components/Icons'

type Area = {
  name: string
  slug: string
  description: string
}

type Clinic = {
  name: string
  slug: string
  address: string
  area: string
  phone: string
  website: string | null
  rating: number
  reviewCount: number
  services: string[]
  hours: string
  description: string
  lat: number
  lng: number
}

export default function AreaPageClient({ area, clinics: initialClinics }: { area: Area; clinics: any[] }) {
  const [sortBy, setSortBy] = useState('rating')
  const [searchQuery, setSearchQuery] = useState('')

  let clinics = [...initialClinics]

  // Search filter
  if (searchQuery) {
    clinics = clinics.filter((c: any) => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.services?.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }

  // Sort
  if (sortBy === 'rating') {
    clinics.sort((a: any, b: any) => b.rating - a.rating || b.reviewCount - a.reviewCount)
  } else if (sortBy === 'reviews') {
    clinics.sort((a: any, b: any) => b.reviewCount - a.reviewCount)
  } else if (sortBy === 'name') {
    clinics.sort((a: any, b: any) => a.name.localeCompare(b.name))
  }

  const totalClinics = clinics.length
  const avgRating = totalClinics > 0
    ? (clinics.reduce((sum: number, c: any) => sum + c.rating, 0) / clinics.length).toFixed(1)
    : '0.0'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-dental text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="text-sm mb-5 text-blue-100 breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="mx-2">/</span>
            <a href="/clinics">Clinics</a>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">{area.name}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full mb-5 border border-white/20">
              <LocationIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Area Guide</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Dentists in {area.name}
            </h1>
            
            <p className="text-lg md:text-xl mb-7 text-blue-50 leading-relaxed">
              {area.description}
            </p>

            {/* Stats Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="glass-card px-5 py-3 rounded-lg flex items-center gap-3 border border-white/20">
                <HospitalIcon className="w-6 h-6" />
                <div>
                  <div className="font-bold text-xl">{totalClinics}</div>
                  <div className="text-xs text-blue-100">Clinics</div>
                </div>
              </div>
              <div className="glass-card px-5 py-3 rounded-lg flex items-center gap-3 border border-white/20">
                <StarIcon className="w-6 h-6" filled />
                <div>
                  <div className="font-bold text-xl">{avgRating}</div>
                  <div className="text-xs text-blue-100">Avg Rating</div>
                </div>
              </div>
              <div className="glass-card px-5 py-3 rounded-lg flex items-center gap-2 border border-white/20">
                <CheckIcon className="w-5 h-5" />
                <div className="text-sm font-medium">All Verified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Sort */}
        <div className="glass-card p-5 rounded-xl mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <SearchIcon className="w-4 h-4" />
                <span>Search Clinics in {area.name}</span>
              </label>
              <input
                type="text"
                placeholder="Search by name or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <ChevronDownIcon className="w-4 h-4" />
                <span>Sort By</span>
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {searchQuery && (
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="text-gray-600 font-medium">Search:</span>
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full flex items-center gap-1.5">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-primary-900">
                  <XIcon className="w-3.5 h-3.5" />
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-5">
          <p className="text-gray-600">
            {clinics.length === 0 ? (
              <span className="text-red-600">No clinics found matching your search</span>
            ) : (
              <>
                Showing <span className="font-bold text-primary-600">{clinics.length}</span> 
                {clinics.length === 1 ? ' clinic' : ' clinics'} in {area.name}
              </>
            )}
          </p>
        </div>

        {/* Clinic Grid */}
        {clinics.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {clinics.map((clinic: any, i) => (
              <a
                key={clinic.slug}
                href={`/clinics/${clinic.slug}`}
                className="clinic-card glass-card rounded-xl overflow-hidden block group"
              >
                {/* Screenshot Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
                  <img 
                    src={`/images/clinics/${clinic.slug}.jpg`}
                    alt={`${clinic.name} - dental clinic in ${area.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-yellow-50 px-2.5 py-1.5 rounded-lg shadow-md">
                    <StarIcon className="w-4 h-4 text-yellow-500" filled />
                    <span className="font-bold text-gray-900 text-sm">{clinic.rating}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <div className="mb-4">
                    <h3 className="font-bold text-base text-gray-900 mb-1.5 group-hover:text-primary-600 transition-colors">
                      {clinic.name}
                    </h3>
                    <div className="text-sm text-gray-500">
                      {clinic.address.split(',')[0]}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {clinic.reviewCount.toLocaleString()} reviews
                    </div>
                  </div>

                  {/* Services Tags */}
                  {clinic.services && clinic.services.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {clinic.services.slice(0, 3).map((service: string) => (
                        <span 
                          key={service} 
                          className="bg-primary-50 text-primary-700 px-2 py-1 rounded-md text-xs font-medium"
                        >
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

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-primary-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
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
        ) : (
          <div className="text-center py-16 bg-white rounded-xl">
            <div className="flex justify-center mb-4">
              <SearchIcon className="w-16 h-16 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No clinics found</h3>
            <p className="text-gray-600 mb-6">
              Try a different search term
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="btn-primary"
            >
              Clear search
            </button>
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-12 bg-white rounded-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            About Dental Care in {area.name}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {area.description}
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you need a routine checkup, cosmetic dentistry, orthodontics, or emergency dental care, 
            you'll find experienced professionals in {area.name}. All clinics listed are verified with 
            up-to-date contact information and real patient reviews.
          </p>
        </div>
      </div>
    </div>
  )
}
