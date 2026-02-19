'use client'

import { useState } from 'react'
import clinicsData from '../../data/clinics.json'
import { SearchIcon, LocationIcon, StarIcon, PhoneIcon, ArrowRightIcon, XIcon, HospitalIcon, ChevronDownIcon } from '../../components/Icons'
import ClinicImage from '../../components/ClinicImage'

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
    <div className="min-h-screen bg-warm-50">
      {/* Hero Section */}
      <section className="bg-gradient-dental text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="text-sm mb-5 text-blue-100" aria-label="Breadcrumb">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">All Clinics</span>
          </nav>

          <div className="flex items-center gap-3 mb-3">
            <HospitalIcon className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Dental Clinics in Dubai
            </h1>
          </div>
          <p className="text-lg text-blue-50">
            Showing {clinics.length} verified dental clinic{clinics.length !== 1 ? 's' : ''} {filterArea !== 'all' && `in ${filterArea}`}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters */}
        <div className="glass-card p-5 rounded-xl mb-6">
          <div className="grid md:grid-cols-3 gap-4 mb-5">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <SearchIcon className="w-4 h-4" />
                <span>Search Clinics</span>
              </label>
              <input
                type="text"
                placeholder="Search by name, area, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>

            {/* Sort */}
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

          {/* Area Filter Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <LocationIcon className="w-4 h-4" />
              <span>Filter by Area</span>
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterArea('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  filterArea === 'all'
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
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
                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                      filterArea === area
                        ? 'bg-brand-500 text-white shadow-sm'
                        : 'bg-white text-gray-700 hover:bg-brand-50 border border-gray-200'
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
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="text-gray-600 font-medium">Active filters:</span>
              {filterArea !== 'all' && (
                <span className="bg-primary-100 text-brand-700 px-3 py-1 rounded-full flex items-center gap-1.5">
                  Area: {filterArea}
                  <button onClick={() => setFilterArea('all')} className="hover:text-primary-900">
                    <XIcon className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="bg-primary-100 text-brand-700 px-3 py-1 rounded-full flex items-center gap-1.5">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-primary-900">
                    <XIcon className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-5">
          <p className="text-gray-600">
            {clinics.length === 0 ? (
              <span className="text-red-600">No clinics found matching your criteria</span>
            ) : (
              <>
                Showing <span className="font-bold text-brand-600">{clinics.length}</span> 
                {clinics.length === 1 ? ' clinic' : ' clinics'}
              </>
            )}
          </p>
        </div>

        {/* Clinic Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {clinics.map((clinic: any, i) => (
            <a
              key={clinic.slug}
              href={`/clinics/${clinic.slug}`}
              className="clinic-card glass-card rounded-xl overflow-hidden block group"
              style={{animationDelay: `${(i % 12) * 0.03}s`}}
            >
              {/* Screenshot Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-500 to-accent-500">
                <ClinicImage slug={clinic.slug} name={clinic.name} area={clinic.area} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-yellow-50 px-2.5 py-1.5 rounded-lg shadow-md">
                  <StarIcon className="w-4 h-4 text-yellow-500" filled />
                  <span className="font-bold text-gray-900 text-sm">{clinic.rating}</span>
                </div>
              </div>

              {/* Card Content */}
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

                {/* Services Tags */}
                {clinic.services && clinic.services.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {clinic.services.slice(0, 3).map((service: string) => (
                      <span 
                        key={service} 
                        className="bg-brand-50 text-brand-700 px-2 py-1 rounded-md text-xs font-medium"
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

        {/* No Results */}
        {clinics.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl">
            <div className="flex justify-center mb-4">
              <SearchIcon className="w-16 h-16 text-gray-300" />
            </div>
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
