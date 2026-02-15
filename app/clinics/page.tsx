'use client'

import { Metadata } from 'next'
import { useState } from 'react'
import clinicsData from '../../data/clinics.json'

const totalClinics = clinicsData.clinics.length
const uniqueAreas = Array.from(new Set(clinicsData.clinics.map((c: any) => c.area))).sort()

export default function ClinicsPage() {
  const [sortBy, setSortBy] = useState('rating')
  const [filterArea, setFilterArea] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  let clinics = [...clinicsData.clinics]

  // Filter by area
  if (filterArea !== 'all') {
    clinics = clinics.filter((c: any) => c.area === filterArea)
  }

  // Search filter
  if (searchQuery) {
    clinics = clinics.filter((c: any) => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="bg-gradient-dental text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="text-sm mb-6 text-blue-100" aria-label="Breadcrumb">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">All Clinics</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Dental Clinics in Dubai 🏥
          </h1>
          <p className="text-xl text-blue-50">
            Showing {clinics.length} verified dental clinics {filterArea !== 'all' && `in ${filterArea}`}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filters */}
        <div className="glass-card p-6 rounded-2xl mb-8 animate-slide-down">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔍 Search Clinics
              </label>
              <input
                type="text"
                placeholder="Search by name, area, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
              />
            </div>

            {/* Sort */}
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

          {/* Area Filter Tags */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              📍 Filter by Area
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterArea('all')}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  filterArea === 'all'
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Areas ({totalClinics})
              </button>
              {uniqueAreas.map((area: string) => {
                const count = clinicsData.clinics.filter((c: any) => c.area === area).length
                return (
                  <button
                    key={area}
                    onClick={() => setFilterArea(area)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      filterArea === area
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
                    }`}
                  >
                    {area} ({count})
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active filters summary */}
          {(filterArea !== 'all' || searchQuery) && (
            <div className="mt-4 flex items-center gap-3 text-sm">
              <span className="text-gray-600 font-medium">Active filters:</span>
              {filterArea !== 'all' && (
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full flex items-center gap-2">
                  Area: {filterArea}
                  <button onClick={() => setFilterArea('all')} className="hover:text-primary-900">
                    ✕
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full flex items-center gap-2">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-primary-900">
                    ✕
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            {clinics.length === 0 ? (
              <span className="text-red-600">No clinics found matching your criteria</span>
            ) : (
              <>
                Showing <span className="font-bold text-primary-600">{clinics.length}</span> 
                {clinics.length === 1 ? ' clinic' : ' clinics'}
              </>
            )}
          </p>
        </div>

        {/* Clinic Grid */}
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
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="text-lg">📍</span>
                    <span>{clinic.area}</span>
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
                    <span>Call Available</span>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>

        {/* No Results */}
        {clinics.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No clinics found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setFilterArea('all')
              }}
              className="btn-primary"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dubaidentalclinics.com' },
              { '@type': 'ListItem', position: 2, name: 'All Clinics' },
            ],
          }),
        }}
      />
    </div>
  )
}
