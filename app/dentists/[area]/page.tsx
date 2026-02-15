import { Metadata } from 'next'
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

const areaNames: { [key: string]: string } = {
  'dubai-marina': 'Dubai Marina',
  'downtown': 'Downtown Dubai',
  'downtown-dubai': 'Downtown Dubai',
  'jbr': 'JBR',
  'jumeirah': 'Jumeirah',
  'business-bay': 'Business Bay',
  'difc': 'DIFC',
  'al-barsha': 'Al Barsha',
  'deira': 'Deira',
  'bur-dubai': 'Bur Dubai',
  'jlt': 'JLT',
  'palm-jumeirah': 'Palm Jumeirah',
  'dubai-hills': 'Dubai Hills',
  'dubai-healthcare-city': 'Dubai Healthcare City',
  'jumeirah-village-circle': 'Jumeirah Village Circle',
  'jvc': 'JVC',
  'silicon-oasis': 'Silicon Oasis',
  'mirdif': 'Mirdif',
  'al-qusais': 'Al Qusais',
  'karama': 'Karama',
  'sheikh-zayed-road': 'Sheikh Zayed Road',
}

function normalizeArea(area: string): string {
  return area.toLowerCase().replace(/\s+/g, '-')
}

function getClinicsInArea(areaSlug: string): Clinic[] {
  const areaName = areaNames[areaSlug]
  return (clinicsData.clinics as Clinic[]).filter(clinic => {
    const clinicAreaSlug = normalizeArea(clinic.area)
    return clinicAreaSlug === areaSlug || clinic.area === areaName
  })
}

function getAllAreas(): { slug: string; name: string; count: number }[] {
  const areaCounts = new Map<string, number>()
  
  ;(clinicsData.clinics as Clinic[]).forEach(clinic => {
    const slug = normalizeArea(clinic.area)
    areaCounts.set(slug, (areaCounts.get(slug) || 0) + 1)
  })
  
  return Array.from(areaCounts.entries())
    .map(([slug, count]) => ({
      slug,
      name: areaNames[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      count,
    }))
    .sort((a, b) => b.count - a.count)
}

export async function generateStaticParams() {
  const areas = getAllAreas()
  return areas.map((area) => ({
    area: area.slug,
  }))
}

export async function generateMetadata({ params }: { params: { area: string } }): Promise<Metadata> {
  const areaName = areaNames[params.area] || params.area.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  const clinics = getClinicsInArea(params.area)
  
  return {
    title: `Best Dentists in ${areaName} (${clinics.length} Clinics) - Dubai Dental Guide`,
    description: `Find ${clinics.length} top-rated dental clinics in ${areaName}, Dubai. Compare dentists by reviews, services, and location. Book your appointment today.`,
    openGraph: {
      title: `Best Dentists in ${areaName} - Dubai Dental Guide`,
      description: `${clinics.length} verified dental clinics in ${areaName}. Compare ratings and services.`,
    },
  }
}

export default function AreaPage({ params }: { params: { area: string } }) {
  const areaName = areaNames[params.area] || params.area.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  const clinicsInArea = getClinicsInArea(params.area)
  const allAreas = getAllAreas()
  
  const avgRating = clinicsInArea.length > 0
    ? (clinicsInArea.reduce((sum, c) => sum + c.rating, 0) / clinicsInArea.length).toFixed(1)
    : '4.5'

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="text-sm mb-6">
          <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
          <span className="mx-2 text-gray-400">/</span>
          <a href="/areas" className="text-gray-500 hover:text-gray-700">Areas</a>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{areaName}</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-xl p-8 mb-8">
          <h1 className="text-4xl font-bold mb-4">Best Dentists in {areaName}</h1>
          <p className="text-xl text-cyan-100">
            {clinicsInArea.length} verified dental clinics in {areaName}, Dubai. Compare services, read reviews, and book appointments.
          </p>
        </div>

        {/* Area Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Dental Care in {areaName}</h2>
          <p className="text-gray-600 mb-4">
            {areaName} is home to {clinicsInArea.length} high-quality dental clinics offering a range of services from general dentistry to specialized treatments. Whether you need a routine checkup or advanced dental work, you'll find excellent options in this area.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-primary">{clinicsInArea.length}</div>
              <div className="text-gray-500 text-sm">Dental Clinics</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-primary">⭐ {avgRating}</div>
              <div className="text-gray-500 text-sm">Average Rating</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {clinicsInArea.reduce((sum, c) => sum + c.reviewCount, 0).toLocaleString()}
              </div>
              <div className="text-gray-500 text-sm">Total Reviews</div>
            </div>
          </div>
        </div>

        {/* Clinics List */}
        <h2 className="text-2xl font-bold mb-6">Dental Clinics in {areaName}</h2>
        
        {clinicsInArea.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {clinicsInArea.map((clinic) => (
              <a
                key={clinic.slug}
                href={`/clinics/${clinic.slug}`}
                className="bg-white rounded-xl shadow-sm p-6 clinic-card block hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{clinic.name}</h3>
                    <p className="text-gray-500 text-sm">{clinic.address}</p>
                  </div>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                    <span className="text-yellow-500">⭐</span>
                    <span className="ml-1 font-medium">{clinic.rating}</span>
                    <span className="text-gray-400 text-sm ml-1">({clinic.reviewCount})</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {clinic.services?.slice(0, 4).map((s: string) => (
                    <span key={s} className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">{s}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{clinic.hours}</span>
                  <span className="text-primary font-medium">View Details →</span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-12 text-center mb-12">
            <div className="text-4xl mb-4">🦷</div>
            <h3 className="text-xl font-semibold mb-2">No clinics listed yet</h3>
            <p className="text-gray-600 mb-4">
              We're still adding dental clinics in {areaName}. Check back soon or explore nearby areas.
            </p>
            <a href="/clinics" className="text-primary font-medium hover:underline">
              Browse all clinics →
            </a>
          </div>
        )}

        {/* Nearby Areas */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Other Areas in Dubai</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allAreas
              .filter(area => area.slug !== params.area)
              .slice(0, 8)
              .map((area) => (
                <a
                  key={area.slug}
                  href={`/dentists/${area.slug}`}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition flex justify-between items-center"
                >
                  <span className="font-medium">{area.name}</span>
                  <span className="text-gray-400 text-sm">{area.count}</span>
                </a>
              ))}
          </div>
          <div className="text-center mt-6">
            <a href="/areas" className="text-primary font-medium hover:underline">
              View all areas →
            </a>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 bg-gray-50 rounded-xl p-8">
          <h2 className="text-xl font-semibold mb-4">Finding a Dentist in {areaName}</h2>
          <div className="prose prose-gray max-w-none">
            <p>
              Looking for a dentist in {areaName}? You're in the right place. Our directory features {clinicsInArea.length} verified dental clinics in this area, each offering a range of services from routine cleanings to specialized treatments.
            </p>
            <h3>What to Look For</h3>
            <ul>
              <li><strong>Reviews and ratings:</strong> Check patient reviews to get a sense of the quality of care</li>
              <li><strong>Services offered:</strong> Make sure the clinic offers the treatment you need</li>
              <li><strong>Location and hours:</strong> Choose a clinic that's convenient for your schedule</li>
              <li><strong>Insurance:</strong> Call ahead to verify insurance acceptance</li>
            </ul>
            <h3>Common Services in {areaName}</h3>
            <p>
              Dental clinics in {areaName} typically offer general dentistry, cosmetic procedures, orthodontics, and emergency care. Many clinics also specialize in advanced treatments like dental implants and veneers.
            </p>
          </div>
        </div>

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: `Dental Clinics in ${areaName}, Dubai`,
              numberOfItems: clinicsInArea.length,
              itemListElement: clinicsInArea.slice(0, 10).map((clinic, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Dentist',
                  name: clinic.name,
                  address: clinic.address,
                  telephone: clinic.phone,
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: clinic.rating,
                    reviewCount: clinic.reviewCount,
                  },
                },
              })),
            }),
          }}
        />
      </div>
    </div>
  )
}
