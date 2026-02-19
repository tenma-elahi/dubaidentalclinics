import { Metadata } from 'next'
import { AlertIcon, PhoneIcon, LocationIcon, CheckIcon, HospitalIcon, ArrowRightIcon } from '../../components/Icons'

export const metadata: Metadata = {
  title: 'Emergency Dentist in Dubai - 24/7 Dental Care | Dubai Dental Clinics',
  description: 'Find 24/7 emergency dental clinics in Dubai. Get immediate care for dental emergencies including toothache, broken teeth, and dental trauma. Call now.',
  alternates: {
    canonical: 'https://dubaidentalclinics.com/emergency',
  },
}

export default function EmergencyPage() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="text-sm mb-5" aria-label="Breadcrumb">
          <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">Emergency Dentist</span>
        </nav>

        {/* Emergency Banner */}
        <div className="bg-red-600 text-white rounded-xl p-8 mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <AlertIcon className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Dental Emergency in Dubai?</h1>
          <p className="text-lg md:text-xl text-red-50">
            Find 24/7 emergency dental care in Dubai right now. Don't wait!
          </p>
        </div>

        {/* 24/7 Emergency Clinics */}
        <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
          <HospitalIcon className="w-6 h-6 text-brand-600" />
          <span>24/7 Emergency Dental Clinics in Dubai</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {emergencyClinics.map((clinic, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-red-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{clinic.name}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                    <LocationIcon className="w-4 h-4" />
                    <span>{clinic.area}</span>
                  </div>
                </div>
                <span className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5">
                  <AlertIcon className="w-4 h-4" />
                  <span>24/7</span>
                </span>
              </div>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-start gap-2 text-gray-600">
                  <LocationIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{clinic.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-gray-600 flex-shrink-0" />
                  <a href={`tel:${clinic.phone}`} className="text-brand-600 font-medium hover:underline">{clinic.phone}</a>
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href={`tel:${clinic.phone}`}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white text-center py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <PhoneIcon className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
                <a
                  href={clinic.clinicUrl}
                  className="flex-1 border border-gray-300 text-gray-700 text-center py-2.5 rounded-lg font-semibold hover:bg-warm-50 transition-all flex items-center justify-center gap-2"
                >
                  <span>View Clinic</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* What is a Dental Emergency */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">What is a Dental Emergency?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertIcon className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-semibold text-lg text-red-600">Seek Immediate Care</h3>
              </div>
              <ul className="space-y-2.5 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Severe toothache that doesn't improve with painkillers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Knocked-out tooth (bring the tooth!)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Broken or cracked tooth with severe pain</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Swelling in mouth, face, or neck</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Bleeding that won't stop</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Signs of infection (fever, swelling, pus)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Dental abscess</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <CheckIcon className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-lg text-yellow-600">Can Wait for Regular Appointment</h3>
              </div>
              <ul className="space-y-2.5 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">•</span>
                  <span>Minor toothache</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">•</span>
                  <span>Lost filling (no pain)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">•</span>
                  <span>Chipped tooth (cosmetic)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">•</span>
                  <span>Loose crown</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">•</span>
                  <span>Food stuck between teeth</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">•</span>
                  <span>Minor sensitivity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* First Aid Tips */}
        <div className="bg-blue-50 rounded-xl p-8 border border-blue-100">
          <h2 className="text-2xl font-bold mb-6 text-blue-900">First Aid for Common Dental Emergencies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-5 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <AlertIcon className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Knocked-Out Tooth</h3>
              </div>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm leading-relaxed">
                <li>Find the tooth and pick it up by the crown (not the root)</li>
                <li>Rinse gently with water (don't scrub)</li>
                <li>Try to place it back in the socket</li>
                <li>If not possible, keep it in milk or saliva</li>
                <li>See a dentist within 30 minutes for best results</li>
              </ol>
            </div>
            <div className="bg-white rounded-lg p-5 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <AlertIcon className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Severe Toothache</h3>
              </div>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm leading-relaxed">
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
