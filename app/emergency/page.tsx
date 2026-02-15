import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Emergency Dentist in Dubai - 24/7 Dental Care | Dubai Dental Guide',
  description: 'Find 24/7 emergency dental clinics in Dubai. Get immediate care for dental emergencies including toothache, broken teeth, and dental trauma.',
}

export default function EmergencyPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Banner */}
        <div className="bg-red-600 text-white rounded-xl p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">🚨 Dental Emergency?</h1>
          <p className="text-xl mb-6">
            Don't wait! Find 24/7 emergency dental care in Dubai right now.
          </p>
          <a
            href="tel:+97148888888"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-xl hover:bg-gray-100 transition"
          >
            📞 Call Emergency Hotline
          </a>
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
                <p className="text-gray-600">📞 {clinic.phone}</p>
              </div>
              <div className="flex gap-3">
                <a
                  href={`tel:${clinic.phone}`}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white text-center py-2 rounded-lg font-medium transition"
                >
                  Call Now
                </a>
                <a
                  href={`https://maps.google.com/?q=${clinic.lat},${clinic.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border border-gray-300 text-gray-700 text-center py-2 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Directions
                </a>
              </div>
            </div>
          ))}
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
      </div>
    </div>
  )
}

const emergencyClinics = [
  {
    name: 'Dubai Dental Hospital',
    area: 'Dubai Healthcare City',
    address: 'Building 27, DHCC, Dubai',
    phone: '+971 4 362 4000',
    lat: 25.2335,
    lng: 55.3184,
  },
  {
    name: 'Mediclinic Dental Center',
    area: 'Downtown Dubai',
    address: 'Mohammed Bin Rashid Blvd, Downtown',
    phone: '+971 4 449 6666',
    lat: 25.1972,
    lng: 55.2744,
  },
  {
    name: 'Aster Clinic Dental',
    area: 'Al Barsha',
    address: 'Mall of the Emirates, Al Barsha',
    phone: '+971 4 409 4444',
    lat: 25.1181,
    lng: 55.2008,
  },
  {
    name: 'Dr. Joy Dental Clinic',
    area: 'Dubai Marina',
    address: 'Marina Walk, Dubai Marina',
    phone: '+971 4 394 7744',
    lat: 25.0773,
    lng: 55.1391,
  },
]
