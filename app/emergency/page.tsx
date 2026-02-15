import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Emergency Dentist in Dubai - 24/7 Dental Care | Dubai Dental Clinics',
  description: 'Find 24/7 emergency dental clinics in Dubai. Get immediate care for dental emergencies including toothache, broken teeth, and dental trauma. Call now.',
  alternates: {
    canonical: 'https://dubaidentalclinics.com/emergency',
  },
}

export default function EmergencyPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="text-sm mb-6" aria-label="Breadcrumb">
          <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">Emergency Dentist</span>
        </nav>

        {/* Emergency Banner */}
        <div className="bg-red-600 text-white rounded-xl p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">🚨 Dental Emergency in Dubai?</h1>
          <p className="text-xl mb-6">
            Find 24/7 emergency dental care in Dubai right now. Don't wait!
          </p>
        </div>

        {/* 24/7 Emergency Clinics */}
        <h2 className="text-2xl font-bold mb-6">24/7 Emergency Dental Clinics in Dubai</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {emergencyClinics.map((clinic, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{clinic.name}</h3>
                  <p className="text-gray-500">{clinic.area}</p>
                </div>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                  24/7
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-gray-600">📍 {clinic.address}</p>
                <p className="text-gray-600">📞 <a href={`tel:${clinic.phone}`} className="text-primary font-medium">{clinic.phone}</a></p>
              </div>
              <div className="flex gap-3">
                <a
                  href={`tel:${clinic.phone}`}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white text-center py-2 rounded-lg font-medium transition"
                >
                  Call Now
                </a>
                <a
                  href={clinic.clinicUrl}
                  className="flex-1 border border-gray-300 text-gray-700 text-center py-2 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  View Clinic
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* What is a Dental Emergency */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">What is a Dental Emergency?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-red-600">🔴 Seek Immediate Care</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Severe toothache that doesn't improve with painkillers</li>
                <li>• Knocked-out tooth (bring the tooth!)</li>
                <li>• Broken or cracked tooth with severe pain</li>
                <li>• Swelling in mouth, face, or neck</li>
                <li>• Bleeding that won't stop</li>
                <li>• Signs of infection (fever, swelling, pus)</li>
                <li>• Dental abscess</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3 text-yellow-600">🟡 Can Wait for Regular Appointment</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Minor toothache</li>
                <li>• Lost filling (no pain)</li>
                <li>• Chipped tooth (cosmetic)</li>
                <li>• Loose crown</li>
                <li>• Food stuck between teeth</li>
                <li>• Minor sensitivity</li>
              </ul>
            </div>
          </div>
        </div>

        {/* First Aid Tips */}
        <div className="bg-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-900">First Aid for Common Dental Emergencies</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">🦷 Knocked-Out Tooth</h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-1">
                <li>Find the tooth and pick it up by the crown (not the root)</li>
                <li>Rinse gently with water (don't scrub)</li>
                <li>Try to place it back in the socket</li>
                <li>If not possible, keep it in milk or saliva</li>
                <li>See a dentist within 30 minutes for best results</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold mb-2">😣 Severe Toothache</h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-1">
                <li>Rinse with warm salt water</li>
                <li>Gently floss to remove any trapped food</li>
                <li>Apply a cold compress to the cheek</li>
                <li>Take over-the-counter pain relief</li>
                <li>See a dentist as soon as possible</li>
              </ol>
            </div>
          </div>
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
                { '@type': 'ListItem', position: 2, name: 'Emergency Dentist' },
              ],
            }),
          }}
        />
      </div>
    </div>
  )
}

const emergencyClinics = [
  {
    name: 'Mediclinic City Hospital Dental',
    area: 'Dubai Healthcare City',
    address: 'Building 37, Dubai Healthcare City, Phase 2',
    phone: '+971 4 435 9999',
    clinicUrl: '/clinics/mediclinic-city-hospital-dental',
  },
  {
    name: 'American Hospital Dubai - Dental',
    area: 'Oud Metha',
    address: 'Oud Metha Road, Oud Metha',
    phone: '+971 4 377 6111',
    clinicUrl: '/clinics/american-hospital-dubai-dental',
  },
  {
    name: 'Emirates Hospital Dental - Jumeirah',
    area: 'Jumeirah',
    address: 'Jumeirah Beach Road, Jumeirah 2',
    phone: '+971 4 349 6666',
    clinicUrl: '/clinics/emirates-hospital-dental-jumeirah',
  },
  {
    name: 'Dubai Dental Hospital',
    area: 'Dubai Healthcare City',
    address: 'Building 34, Dubai Healthcare City',
    phone: '+971 4 362 4000',
    clinicUrl: '/clinics/dubai-dental-hospital',
  },
]
