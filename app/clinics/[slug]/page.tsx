import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import clinicsData from '../../../data/clinics.json'

type Clinic = {
  name: string
  slug: string
  address: string
  area: string
  phone: string
  website: string
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
    return {
      title: 'Clinic Not Found - Dubai Dental Guide',
    }
  }
  
  return {
    title: `${clinic.name} - ${clinic.area} | Dubai Dental Guide`,
    description: `${clinic.name} dental clinic in ${clinic.area}, Dubai. ${clinic.rating} stars from ${clinic.reviewCount} reviews. Services: ${clinic.services?.join(', ')}.`,
    openGraph: {
      title: `${clinic.name} - Dental Clinic in ${clinic.area}`,
      description: `${clinic.rating}★ rated dental clinic offering ${clinic.services.slice(0, 3).join(', ')} and more.`,
    },
  }
}

export default function ClinicPage({ params }: { params: { slug: string } }) {
  const clinic = getClinic(params.slug)
  
  if (!clinic) {
    notFound()
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="text-sm mb-6">
          <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
          <span className="mx-2 text-gray-400">/</span>
          <a href="/clinics" className="text-gray-500 hover:text-gray-700">Clinics</a>
          <span className="mx-2 text-gray-400">/</span>
          <a href={`/dentists/${clinic.area.toLowerCase().replace(/ /g, '-')}`} className="text-gray-500 hover:text-gray-700">{clinic.area}</a>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{clinic.name}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{clinic.name}</h1>
                  <p className="text-gray-500 text-lg">{clinic.area}, Dubai</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-2xl">
                    <span className="text-yellow-500">⭐</span>
                    <span className="ml-2 font-bold">{clinic.rating}</span>
                  </div>
                  <p className="text-gray-500">{clinic.reviewCount} reviews</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{clinic.description}</p>

              {/* Services */}
              <h2 className="text-xl font-semibold mb-4">Services</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {clinic.services.map((service: string) => (
                  <span key={service} className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full">
                    {service}
                  </span>
                ))}
              </div>

              {/* Map */}
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="bg-gray-100 h-64 rounded-lg overflow-hidden mb-4">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(clinic.address + ', Dubai')}&zoom=15`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <p className="text-gray-600">📍 {clinic.address}</p>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-xl font-semibold mb-4">Patient Reviews</h2>
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">{clinic.rating}</div>
                  <div className="text-yellow-500 text-xl">{'⭐'.repeat(Math.round(clinic.rating))}</div>
                </div>
                <div>
                  <div className="font-medium">Based on {clinic.reviewCount} reviews</div>
                  <div className="text-gray-500 text-sm">from Google Reviews</div>
                </div>
              </div>
              <p className="text-gray-500 text-center py-8">
                Reviews are sourced from Google. Visit their Google Business profile for detailed reviews.
              </p>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(clinic.name + ' Dubai reviews')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-primary hover:underline"
              >
                Read reviews on Google →
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 sticky top-6">
              <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-gray-500 text-sm">Phone</div>
                  <a href={`tel:${clinic.phone}`} className="text-primary font-medium text-lg">
                    {clinic.phone}
                  </a>
                </div>
                
                <div>
                  <div className="text-gray-500 text-sm">Website</div>
                  <a href={clinic.website} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
                    Visit Website
                  </a>
                </div>
                
                <div>
                  <div className="text-gray-500 text-sm">Hours</div>
                  <div className="font-medium">{clinic.hours}</div>
                </div>

                <div>
                  <div className="text-gray-500 text-sm">Address</div>
                  <div className="font-medium">{clinic.address}</div>
                </div>
              </div>

              <hr className="my-6" />

              <a
                href={`tel:${clinic.phone}`}
                className="block w-full bg-primary hover:bg-cyan-700 text-white text-center py-3 rounded-lg font-semibold transition"
              >
                📞 Call Now
              </a>
              
              <a
                href={`https://maps.google.com/?q=${clinic.lat},${clinic.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-3 border border-primary text-primary text-center py-3 rounded-lg font-semibold hover:bg-cyan-50 transition"
              >
                📍 Get Directions
              </a>

              <a
                href={clinic.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-3 border border-gray-300 text-gray-700 text-center py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                🌐 Visit Website
              </a>
            </div>

            {/* Nearby Clinics */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-4">Other Clinics in {clinic.area}</h3>
              <div className="space-y-3">
                {(clinicsData.clinics as Clinic[])
                  .filter(c => c.area === clinic.area && c.slug !== clinic.slug)
                  .slice(0, 3)
                  .map(c => (
                    <a
                      key={c.slug}
                      href={`/clinics/${c.slug}`}
                      className="block p-3 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="font-medium">{c.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <span className="text-yellow-500">⭐</span>
                        <span className="ml-1">{c.rating}</span>
                        <span className="ml-1">({c.reviewCount})</span>
                      </div>
                    </a>
                  ))}
              </div>
              <a
                href={`/dentists/${clinic.area.toLowerCase().replace(/ /g, '-')}`}
                className="block text-center text-primary hover:underline mt-4 text-sm"
              >
                View all clinics in {clinic.area} →
              </a>
            </div>
          </div>
        </div>

        {/* Schema Markup */}
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
              url: clinic.website,
              openingHours: clinic.hours,
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: clinic.rating,
                reviewCount: clinic.reviewCount,
              },
            }),
          }}
        />
      </div>
    </div>
  )
}
