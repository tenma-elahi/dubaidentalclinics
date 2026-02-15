import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import clinicsData from '../../../data/clinics.json'
import { 
  LocationIcon, StarIcon, AlertIcon, PhoneIcon, CheckIcon, HospitalIcon,
  MedicalIcon, ArrowRightIcon, CalendarIcon, ToothIcon
} from '../../../components/Icons'

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
    description: `${clinic.name} in ${clinic.area}, Dubai. ${clinic.rating}/5 from ${clinic.reviewCount} reviews. Services: ${clinic.services.slice(0, 4).join(', ')}. Call ${clinic.phone}.`,
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image */}
      <div className="relative h-96 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
        <img 
          src={`/images/clinics/${clinic.slug}.jpg`}
          alt={`${clinic.name} - dental clinic in ${clinic.area}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 text-white pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav className="text-sm mb-5 text-blue-100 breadcrumb" aria-label="Breadcrumb">
              <ol className="flex items-center flex-wrap gap-2">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li><span className="mx-1">/</span></li>
                <li><a href="/clinics" className="hover:text-white">Clinics</a></li>
                <li><span className="mx-1">/</span></li>
                <li><a href={`/dentists/${areaSlug}`} className="hover:text-white">{clinic.area}</a></li>
                <li><span className="mx-1">/</span></li>
                <li><span className="text-white font-medium">{clinic.name}</span></li>
              </ol>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight drop-shadow-lg">
                  {clinic.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-2 rounded-lg border border-white/30">
                    <LocationIcon className="w-4 h-4" />
                    <span>{clinic.area}, Dubai</span>
                  </div>
                  {isEmergency && (
                    <div className="flex items-center gap-2 bg-red-500/30 backdrop-blur-md px-3 py-2 rounded-lg border border-red-400/40">
                      <AlertIcon className="w-4 h-4" />
                      <span className="font-semibold">24/7 Emergency</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm px-6 py-4 rounded-xl text-center shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <StarIcon className="w-8 h-8 text-yellow-500" filled />
                  <span className="text-3xl font-bold text-gray-900">{clinic.rating}</span>
                </div>
                <div className="text-gray-600 text-sm">
                  {clinic.reviewCount.toLocaleString()} reviews
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ToothIcon className="w-5 h-5 text-primary-600" />
                <span>About This Clinic</span>
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {clinic.description}
              </p>
            </div>

            {/* Services */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                <MedicalIcon className="w-5 h-5 text-primary-600" />
                <span>Services Offered</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-2.5">
                {clinic.services.map((service: string) => (
                  <div
                    key={service}
                    className="flex items-center gap-2.5 bg-primary-50 p-3 rounded-lg border border-primary-100"
                  >
                    <div className="flex-shrink-0">
                      <CheckIcon className="w-5 h-5 text-primary-600" />
                    </div>
                    <span className="font-medium text-gray-900 text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                <LocationIcon className="w-5 h-5 text-primary-600" />
                <span>Location & Directions</span>
              </h2>
              
              <div className="mb-5">
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg mb-4">
                  <LocationIcon className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Address</div>
                    <div className="text-gray-600 text-sm">{clinic.address}</div>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200 mb-4">
                  <iframe
                    src={`https://maps.google.com/maps?q=${clinic.lat},${clinic.lng}&z=15&output=embed`}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map showing location of ${clinic.name}`}
                  ></iframe>
                </div>

                <a
                  href={`https://maps.google.com/?q=${clinic.lat},${clinic.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full text-center flex items-center justify-center gap-2"
                >
                  <LocationIcon className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Reviews */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                <StarIcon className="w-5 h-5 text-primary-600" filled />
                <span>Patient Reviews</span>
              </h2>
              
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg mb-5 text-center border border-yellow-200">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-5xl font-bold text-primary-600">{clinic.rating}</div>
                  <div className="text-left">
                    <div className="flex gap-0.5 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i}
                          className="w-6 h-6 text-yellow-500" 
                          filled={i < Math.round(clinic.rating)} 
                        />
                      ))}
                    </div>
                    <div className="text-gray-600 font-medium text-sm">
                      {clinic.reviewCount.toLocaleString()} reviews
                    </div>
                  </div>
                </div>
                <div className="text-gray-600 mb-4 text-sm">
                  Based on verified Google Reviews
                </div>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(clinic.name + ' Dubai reviews')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2 text-sm"
                >
                  <span>Read All Reviews on Google</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Nearby Clinics */}
            {nearbyClinics.length > 0 && (
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                  <HospitalIcon className="w-5 h-5 text-primary-600" />
                  <span>Other Clinics in {clinic.area}</span>
                </h2>
                
                <div className="space-y-3">
                  {nearbyClinics.map((nearby) => (
                    <a
                      key={nearby.slug}
                      href={`/clinics/${nearby.slug}`}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all group"
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors text-sm">
                          {nearby.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {nearby.services.slice(0, 2).join(', ')}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-yellow-50 px-2.5 py-1.5 rounded-lg">
                          <StarIcon className="w-4 h-4 text-yellow-500" filled />
                          <span className="font-bold text-gray-900 text-sm">{nearby.rating}</span>
                        </div>
                        <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-5 text-center">
                  <a href={`/dentists/${areaSlug}`} className="text-primary-600 font-semibold hover:underline text-sm flex items-center justify-center gap-1">
                    <span>View all clinics in {clinic.area}</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-20 space-y-5" style={{height: 'fit-content'}}>
            {/* Contact Card */}
            <div className="glass-card rounded-xl p-5">
              <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
                <PhoneIcon className="w-5 h-5 text-primary-600" />
                <span>Contact Information</span>
              </h3>
              
              <div className="space-y-3">
                {clinic.phone && (
                  <div>
                    <div className="text-xs text-gray-500 mb-2 font-medium">Phone Number</div>
                    <a
                      href={`tel:${clinic.phone}`}
                      className="btn-primary w-full text-center flex items-center justify-center gap-2 text-sm"
                    >
                      <PhoneIcon className="w-4 h-4" />
                      <span>{clinic.phone}</span>
                    </a>
                  </div>
                )}

                {clinic.website && (
                  <div>
                    <div className="text-xs text-gray-500 mb-2 font-medium">Website</div>
                    <a
                      href={clinic.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full text-center flex items-center justify-center gap-2 text-sm"
                    >
                      <span>Visit Website</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Opening Hours */}
            <div className="glass-card rounded-xl p-5">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary-600" />
                <span>Opening Hours</span>
              </h3>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {clinic.hours}
                </div>
              </div>

              {isEmergency && (
                <div className="mt-4 bg-red-50 border border-red-200 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700 font-semibold mb-1 text-sm">
                    <AlertIcon className="w-4 h-4" />
                    <span>24/7 Emergency Care</span>
                  </div>
                  <div className="text-xs text-red-600">
                    Emergency services available round the clock
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="glass-card rounded-xl p-5">
              <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
              
              <div className="space-y-2">
                <a
                  href={`https://maps.google.com/?q=${clinic.lat},${clinic.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white hover:bg-primary-50 border border-gray-200 rounded-lg transition-all group text-sm"
                >
                  <LocationIcon className="w-4 h-4 text-gray-600 group-hover:text-primary-600" />
                  <span className="font-medium text-gray-700 group-hover:text-primary-600">
                    Get Directions
                  </span>
                </a>

                <a
                  href={`/dentists/${areaSlug}`}
                  className="flex items-center gap-3 p-3 bg-white hover:bg-primary-50 border border-gray-200 rounded-lg transition-all group text-sm"
                >
                  <HospitalIcon className="w-4 h-4 text-gray-600 group-hover:text-primary-600" />
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
