'use client'

import { useState } from 'react'

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
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="bg-gradient-dental text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="text-sm mb-6 text-blue-100 breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="mx-2">/</span>
            <a href="/clinics">Clinics</a>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">{area.name}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-slide-down">
              <span className="text-xl">📍</span>
              <span className="text-sm font-medium">Area Guide</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-lg">
              Dentists in {area.name} 🦷
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-50 leading-relaxed">
              {area.description}
            </p>

            {/* Stats Pills */}
            <div className="flex flex-wrap gap-4">
              <div className="glass-card px-6 py-3 rounded-full flex items-center gap-2">
                <span className="text-2xl">🏥</span>
                <div>
                  <div className="font-bold text-2xl">{totalClinics}</div>
                  <div className="text-xs text-blue-100">Clinics</div>
                </div>
              </div>
              <div className="glass-card px-6 py-3 rounded-full flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <div>
                  <div className="font-bold text-2xl">{avgRating}</div>
                  <div className="text-xs text-blue-100">Avg Rating</div>
                </div>
              </div>
              <div className="glass-card px-6 py-3 rounded-full flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <div className="text-sm font-medium">All Verified</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute top-20 right-10 text-8xl opacity-10 animate-float">📍</div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Sort */}
        <div className="glass-card p-6 rounded-2xl mb-8 animate-slide-down">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔍 Search Clinics in {area.name}
              </label>
              <input
                type="text"
                placeholder="Search by name or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ⬇️ Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {searchQuery && (
            <div className="mt-4 flex items-center gap-3 text-sm">
              <span className="text-gray-600 font-medium">Search:</span>
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full flex items-center gap-2">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-primary-900">
                  ✕
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinics.map((clinic: any, i) => (
              <a
                key={clinic.slug}
                href={`/clinics/${clinic.slug}`}
                className="clinic-card glass-card p-6 rounded-2xl block group animate-scale-in"
                style={{animationDelay: `${(i % 12) * 0.03}s`}}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {clinic.name}
                    </h3>
                    <div className="text-sm text-gray-500">
                      {clinic.address.split(',')[0]}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full">
                      <span className="text-yellow-500 text-lg">⭐</span>
                      <span className="font-bold text-gray-900">{clinic.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {clinic.reviewCount.toLocaleString()} reviews
                    </span>
                  </div>
                </div>

                {/* Services Tags */}
                {clinic.services && clinic.services.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {clinic.services.slice(0, 3).map((service: string) => (
                      <span 
                        key={service} 
                        className="bg-primary-50 text-primary-700 px-2.5 py-1 rounded-lg text-xs font-medium"
                      >
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

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-primary-600 font-semibold text-sm group-hover:underline">
                    View Details →
                  </span>
                  {clinic.phone && (
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <span className="text-green-500">📞</span>
                      <span>Available</span>
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No clinics found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="btn-primary"
            >
              Clear search
            </button>
          </div>
        )}

        {/* CTA Section */}
        {clinics.length > 0 && (
          <div className="mt-16 glass-card p-10 rounded-2xl text-center animate-slide-up">
            <h3 className="text-3xl font-bold mb-4">Looking for More Options?</h3>
            <p className="text-gray-600 mb-6 text-lg">
              Explore dental clinics in other areas of Dubai
            </p>
            <a href="/clinics" className="btn-primary inline-flex items-center gap-2">
              <span className="text-xl">🏥</span>
              <span>View All Clinics</span>
            </a>
          </div>
        )}
      </div>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `Dental Clinics in ${area.name}, Dubai`,
            description: area.description,
            numberOfItems: clinics.length,
            itemListElement: clinics.slice(0, 10).map((clinic: any, index: number) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Dentist',
                name: clinic.name,
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: clinic.address,
                  addressLocality: area.name,
                  addressRegion: 'Dubai',
                  addressCountry: 'AE',
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: clinic.rating,
                  reviewCount: clinic.reviewCount,
                },
                url: `https://dubaidentalclinics.com/clinics/${clinic.slug}`,
              },
            })),
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dubaidentalclinics.com' },
              { '@type': 'ListItem', position: 2, name: 'Clinics', item: 'https://dubaidentalclinics.com/clinics' },
              { '@type': 'ListItem', position: 3, name: area.name },
            ],
          }),
        }}
      />
    </div>
  )
}
