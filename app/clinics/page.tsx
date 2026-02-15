import { Metadata } from 'next'
import clinicsData from '../../data/clinics.json'

export const metadata: Metadata = {
  title: 'All Dental Clinics in Dubai - Dubai Dental Guide',
  description: 'Browse 50+ verified dental clinics in Dubai. Compare ratings, services, and locations. Find the perfect dentist for your needs.',
}

export default function ClinicsPage() {
  const clinics = clinicsData.clinics || []
  
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Dental Clinics in Dubai</h1>
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <select className="border rounded-lg px-4 py-2">
              <option value="">All Areas</option>
              <option value="dubai-marina">Dubai Marina</option>
              <option value="downtown">Downtown Dubai</option>
              <option value="jbr">JBR</option>
              <option value="jumeirah">Jumeirah</option>
            </select>
            <select className="border rounded-lg px-4 py-2">
              <option value="">All Services</option>
              <option value="general">General Dentistry</option>
              <option value="cosmetic">Cosmetic Dentistry</option>
              <option value="orthodontics">Orthodontics</option>
              <option value="implants">Dental Implants</option>
            </select>
            <select className="border rounded-lg px-4 py-2">
              <option value="">Rating</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
            </select>
            <input
              type="text"
              placeholder="Search clinics..."
              className="border rounded-lg px-4 py-2"
            />
          </div>
        </div>

        {/* Results */}
        <div className="text-gray-600 mb-6">
          Showing {clinics.length} dental clinics in Dubai
        </div>

        {/* Clinic Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinics.length > 0 ? (
            clinics.map((clinic: any) => (
              <ClinicCard key={clinic.slug} clinic={clinic} />
            ))
          ) : (
            // Placeholder cards
            Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 clinic-card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">Sample Dental Clinic</h3>
                    <p className="text-gray-500 text-sm">Dubai Marina</p>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    ⭐ <span className="ml-1 text-gray-700">4.8</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">General</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">Cosmetic</span>
                </div>
                <a href="#" className="text-primary font-medium hover:underline">
                  View Details →
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function ClinicCard({ clinic }: { clinic: any }) {
  return (
    <a
      href={`/clinics/${clinic.slug}`}
      className="bg-white rounded-xl shadow-sm p-6 clinic-card block"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg">{clinic.name}</h3>
          <p className="text-gray-500 text-sm">{clinic.area}</p>
        </div>
        <div className="flex items-center text-yellow-500">
          ⭐ <span className="ml-1 text-gray-700">{clinic.rating}</span>
          <span className="text-gray-400 text-sm ml-1">({clinic.reviewCount})</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {clinic.services?.slice(0, 3).map((service: string) => (
          <span key={service} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
            {service}
          </span>
        ))}
      </div>
      <span className="text-primary font-medium hover:underline">
        View Details →
      </span>
    </a>
  )
}
