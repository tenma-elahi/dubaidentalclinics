import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import clinicsData from '../../../data/clinics.json'

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

function getClinic(slug: string): Clinic | undefined {
  return (clinicsData.clinics as Clinic[]).find(c => c.slug === slug)
}

export async function generateStaticParams() {
  return (clinicsData.clinics as Clinic[]).map((clinic) => ({
    slug: clinic.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const clinic = getClinic(params.slug)
  
  if (!clinic) {
    return { title: 'Clinic Not Found - Dubai Dental Clinics' }
  }
  
  return {
    title: `${clinic.name} - ${clinic.area} | Dubai Dental Clinics`,
    description: `${clinic.name} in ${clinic.area}, Dubai. ⭐ ${clinic.rating}/5 from ${clinic.reviewCount} reviews. Services: ${clinic.services.slice(0, 4).join(', ')}. Call ${clinic.phone}.`,
    openGraph: {
      title: `${clinic.name} - Dental Clinic in ${clinic.area}`,
      description: `${clinic.rating}★ rated dental clinic offering ${clinic.services.slice(0, 3).join(', ')} and more.`,
      url: `https://dubaidentalclinics.com/clinics/${clinic.slug}`,
    },
    alternates: {
      canonical: `https://dubaidentalclinics.com/clinics/${clinic.slug}`,
    },
  }
}

export default function ClinicPage({ params }: { params: { slug: string } }) {
  const clinic = getClinic(params.slug)
  
  if (!clinic) {
    notFound()
  }

  const areaSlug = clinic.area.toLowerCase().replace(/\s+/g, '-')

  // Find nearby clinics (same area)
  const nearbyClinics = (clinicsData.clinics as Clinic[])
    .filter(c => c.area === clinic.area && c.slug !== clinic.slug)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)

  const isEmergency = clinic.services.some(s => s.toLowerCase().includes('emergency'))

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="bg-gradient-dental text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="text-sm mb-6 text-blue-100 breadcrumb" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-2">
              <li><a href="/">Home</a></li>
              <li><span className="mx-2">/</span></li>
              <li><a href="/clinics">Clinics</a></li>
              <li><span className="mx-2">/</span></li>
              <li><a href={`/dentists/${areaSlug}`}>{clinic.area}</a></li>
              <li><span className="mx-2">/</span></li>
              <li><span className="text-white font-medium">{clinic.name}</span></li>
            </ol>
          </nav>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {clinic.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-lg">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-xl">📍</span>
                  <span>{clinic.area}, Dubai</span>
                </div>
                {isEmergency && (
                  <div className="flex items-center gap-2 bg-red-500/30 backdrop-blur-sm px-4 py-2 rounded-full animate-pulse-slow">
                    <span className="text-xl">🚨</span>
                    <span className="font-semibold">24/7 Emergency</span>
                  </div>
                )}
              </div>
            </div>

            <div className="glass-card px-6 py-4 rounded-2xl text-center">
              <div className="flex items-center gap-2 text-4xl font-bold mb-2">
                <span className="text-yellow-300">⭐</span>
                <span>{clinic.rating}</span>
              </div>
              <div className="text-blue-100 text-sm">
                {clinic.reviewCount.toLocaleString()} reviews
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="glass-card rounded-2xl p-8 animate-slide-up">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-3xl">ℹ️</span>
                <span>About This Clinic</span>
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {clinic.description}
              </p>
            </div>

            {/* Services */}
            <div className="glass-card rounded-2xl p-8 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-3xl">🩺</span>
                <span>Services Offered</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {clinic.services.map((service: string) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 bg-gradient-to-r from-primary-50 to-accent-50 p-4 rounded-xl border border-primary-100 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      ✓
                    </div>
                    <span className="font-medium text-gray-900">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="glass-card rounded-2xl p-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-3xl">📍</span>
                <span>Location & Directions</span>
              </h2>
              
              <div className="mb-6">
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl mb-4">
                  <span className="text-2xl">🗺️</span>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Address</div>
                    <div className="text-gray-600">{clinic.address}</div>
                  </div>
                </div>

                <a
                  href={`https://maps.google.com/?q=${clinic.lat},${clinic.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center flex items-center justify-center gap-2"
                >
                  <span className="text-xl">🧭</span>
                  <span>Open in Google Maps</span>
                </a>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-3">🗺️</div>
                    <div className="font-medium">Map View</div>
                    <div className="text-sm">Click above to view in Google Maps</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="glass-card rounded-2xl p-8 animate-slide-up" style={{animationDelay: '0.3s'}}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-3xl">⭐</span>
                <span>Patient Reviews</span>
              </h2>
              
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-xl mb-6 text-center border border-yellow-200">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-6xl font-bold text-primary-600">{clinic.rating}</div>
                  <div className="text-left">
                    <div className="text-yellow-500 text-3xl mb-1">
                      {'⭐'.repeat(Math.round(clinic.rating))}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {clinic.reviewCount.toLocaleString()} reviews
                    </div>
                  </div>
                </div>
                <div className="text-gray-600 mb-4">
                  Based on verified Google Reviews
                </div>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(clinic.name + ' Dubai reviews')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <span className="text-xl">📱</span>
                  <span>Read All Reviews on Google</span>
                </a>
              </div>
            </div>

            {/* Nearby Clinics */}
            {nearbyClinics.length > 0 && (
              <div className="glass-card rounded-2xl p-8 animate-slide-up" style={{animationDelay: '0.4s'}}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="text-3xl">🏥</span>
                  <span>Other Clinics in {clinic.area}</span>
                </h2>
                
                <div className="space-y-4">
                  {nearbyClinics.map((nearby) => (
                    <a
                      key={nearby.slug}
                      href={`/clinics/${nearby.slug}`}
                      className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-primary-300 hover:shadow-md transition-all group"
                    >
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                          {nearby.name}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {nearby.services.slice(0, 2).join(', ')}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full">
                          <span className="text-yellow-500">⭐</span>
                          <span className="font-bold text-gray-900">{nearby.rating}</span>
                        </div>
                        <span className="text-2xl group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <a href={`/dentists/${areaSlug}`} className="text-primary-600 font-semibold hover:underline">
                    View all clinics in {clinic.area} →
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 space-y-6" style={{height: 'fit-content'}}>
            {/* Contact Card */}
            <div className="glass-card rounded-2xl p-6 animate-slide-up">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <span className="text-2xl">📞</span>
                <span>Contact Information</span>
              </h3>
              
              <div className="space-y-4">
                {clinic.phone && (
                  <div>
                    <div className="text-sm text-gray-500 mb-2">Phone Number</div>
                    <a
                      href={`tel:${clinic.phone}`}
                      className="btn-primary w-full text-center flex items-center justify-center gap-2"
                    >
                      <span className="text-xl">📱</span>
                      <span>{clinic.phone}</span>
                    </a>
                  </div>
                )}

                {clinic.website && (
                  <div>
                    <div className="text-sm text-gray-500 mb-2">Website</div>
                    <a
                      href={clinic.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full text-center flex items-center justify-center gap-2"
                    >
                      <span className="text-xl">🌐</span>
                      <span>Visit Website</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Opening Hours */}
            <div className="glass-card rounded-2xl p-6 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <span className="text-2xl">🕐</span>
                <span>Opening Hours</span>
              </h3>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {clinic.hours}
                </div>
              </div>

              {isEmergency && (
                <div className="mt-4 bg-red-50 border-2 border-red-200 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-red-700 font-semibold mb-1">
                    <span className="text-xl animate-pulse-slow">🚨</span>
                    <span>24/7 Emergency Care</span>
                  </div>
                  <div className="text-sm text-red-600">
                    Emergency services available round the clock
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="glass-card rounded-2xl p-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <span>Quick Actions</span>
              </h3>
              
              <div className="space-y-3">
                <a
                  href={`https://maps.google.com/?q=${clinic.lat},${clinic.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white hover:bg-primary-50 border border-gray-200 rounded-xl transition-all group"
                >
                  <span className="text-2xl">🧭</span>
                  <span className="font-medium text-gray-700 group-hover:text-primary-600">
                    Get Directions
                  </span>
                </a>

                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(clinic.name + ' Dubai')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white hover:bg-primary-50 border border-gray-200 rounded-xl transition-all group"
                >
                  <span className="text-2xl">🔍</span>
                  <span className="font-medium text-gray-700 group-hover:text-primary-600">
                    Search on Google
                  </span>
                </a>

                <a
                  href={`/dentists/${areaSlug}`}
                  className="flex items-center gap-3 p-3 bg-white hover:bg-primary-50 border border-gray-200 rounded-xl transition-all group"
                >
                  <span className="text-2xl">📍</span>
                  <span className="font-medium text-gray-700 group-hover:text-primary-600">
                    More in {clinic.area}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Dentist',
            name: clinic.name,
            address: {
              '@type': 'PostalAddress',
              streetAddress: clinic.address,
              addressLocality: clinic.area,
              addressRegion: 'Dubai',
              addressCountry: 'AE',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: clinic.lat,
              longitude: clinic.lng,
            },
            telephone: clinic.phone,
            url: clinic.website || undefined,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: clinic.rating,
              reviewCount: clinic.reviewCount,
              bestRating: 5,
              worstRating: 1,
            },
            openingHours: clinic.hours,
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
              { '@type': 'ListItem', position: 3, name: clinic.area, item: `https://dubaidentalclinics.com/dentists/${areaSlug}` },
              { '@type': 'ListItem', position: 4, name: clinic.name },
            ],
          }),
        }}
      />
    </div>
  )
}
