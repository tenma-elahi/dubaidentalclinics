import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import clinicsData from '../../../data/clinics.json'

type ServiceInfo = {
  name: string
  slug: string
  icon: string
  description: string
  longDescription: string
  searchTerms: string[]
}

const serviceData: ServiceInfo[] = [
  {
    name: 'General Dentistry',
    slug: 'general-dentistry',
    icon: '🦷',
    description: 'Comprehensive general dental care in Dubai including checkups, cleanings, and fillings.',
    longDescription: 'General dentistry forms the foundation of good oral health. Services include regular checkups, professional cleanings, dental fillings, tooth extractions, and preventive care. Dubai\'s general dentists help you maintain healthy teeth and gums through routine examinations and early detection of potential issues.',
    searchTerms: ['General Dentistry', 'Dental Check-ups', 'Teeth Cleaning', 'Dental Fillings'],
  },
  {
    name: 'Cosmetic Dentistry',
    slug: 'cosmetic-dentistry',
    icon: '✨',
    description: 'Transform your smile with cosmetic dentistry in Dubai — veneers, bonding, and smile makeovers.',
    longDescription: 'Cosmetic dentistry focuses on improving the appearance of your teeth, gums, and smile. Dubai is a global hub for cosmetic dental procedures, with clinics offering Hollywood-standard veneers, dental bonding, tooth contouring, and complete smile makeovers. Many patients travel to Dubai specifically for high-quality cosmetic dental treatments at competitive prices.',
    searchTerms: ['Cosmetic Dentistry', 'Veneers', 'Smile Design', 'Smile Makeover'],
  },
  {
    name: 'Orthodontics',
    slug: 'orthodontics',
    icon: '😁',
    description: 'Straighten your teeth with braces and Invisalign from Dubai\'s top orthodontists.',
    longDescription: 'Orthodontic treatment corrects misaligned teeth and jaw issues. Modern options include traditional metal braces, ceramic braces, lingual braces, and clear aligners like Invisalign. Dubai\'s orthodontists use advanced 3D scanning and treatment planning to deliver precise results. Treatment times vary from 6 months to 2 years depending on complexity.',
    searchTerms: ['Orthodontics', 'Braces', 'Invisalign', 'Clear Aligners', 'Aligners'],
  },
  {
    name: 'Dental Implants',
    slug: 'dental-implants',
    icon: '🔧',
    description: 'Permanent tooth replacement with dental implants in Dubai — natural-looking results.',
    longDescription: 'Dental implants are the gold standard for replacing missing teeth. A titanium post is surgically placed into the jawbone, providing a permanent foundation for a crown, bridge, or denture. Dubai\'s implant specialists use guided surgery and immediate loading techniques for faster, more predictable results. Most patients report minimal discomfort and long-lasting outcomes.',
    searchTerms: ['Dental Implants', 'Full Mouth Rehabilitation'],
  },
  {
    name: 'Teeth Whitening',
    slug: 'teeth-whitening',
    icon: '💎',
    description: 'Professional teeth whitening in Dubai for a brighter, more confident smile.',
    longDescription: 'Professional teeth whitening can lighten your teeth by several shades in just one session. Dubai dental clinics offer in-office treatments using advanced LED or laser technology, as well as custom take-home whitening kits. Professional whitening is safer and more effective than over-the-counter products, with results lasting 6-12 months with proper maintenance.',
    searchTerms: ['Teeth Whitening'],
  },
  {
    name: 'Root Canal',
    slug: 'root-canal',
    icon: '🩺',
    description: 'Modern, painless root canal treatment in Dubai to save your natural teeth.',
    longDescription: 'Root canal therapy saves teeth that are severely infected or damaged. Modern techniques and anesthesia make the procedure virtually painless. Dubai\'s endodontists use microscopes and rotary instruments for precise, efficient treatment. A root canal preserves your natural tooth and prevents the need for extraction, maintaining your smile and bite function.',
    searchTerms: ['Root Canal', 'Endodontics'],
  },
  {
    name: 'Pediatric Dentistry',
    slug: 'pediatric-dentistry',
    icon: '👶',
    description: 'Gentle, child-friendly dental care in Dubai for babies, children, and teens.',
    longDescription: 'Pediatric dentists specialize in dental care for children from infancy through adolescence. They create a fun, welcoming environment to make dental visits positive experiences. Services include first dental visits, preventive care, sealants, fluoride treatments, and early orthodontic assessment. Dubai\'s pediatric dental clinics are designed with children in mind.',
    searchTerms: ['Pediatric Dentistry', 'Pediatrics'],
  },
]

export async function generateStaticParams() {
  return serviceData.map((s) => ({ service: s.slug }))
}

export async function generateMetadata({ params }: { params: { service: string } }): Promise<Metadata> {
  const service = serviceData.find(s => s.slug === params.service)
  if (!service) return { title: 'Service Not Found' }

  const matchingClinics = clinicsData.clinics.filter((c: any) =>
    c.services.some((s: string) => service.searchTerms.some(term => s.includes(term)))
  )

  return {
    title: `${service.name} in Dubai - ${matchingClinics.length} Clinics | Dubai Dental Clinics`,
    description: service.description,
    alternates: {
      canonical: `https://dubaidentalclinics.com/services/${params.service}`,
    },
  }
}

export default function ServicePage({ params }: { params: { service: string } }) {
  const service = serviceData.find(s => s.slug === params.service)
  if (!service) notFound()

  const matchingClinics = clinicsData.clinics.filter((c: any) =>
    c.services.some((s: string) => service.searchTerms.some(term => s.includes(term)))
  )

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm mb-6" aria-label="Breadcrumb">
          <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
          <span className="mx-2 text-gray-400">/</span>
          <a href="/services" className="text-gray-500 hover:text-gray-700">Services</a>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{service.name}</span>
        </nav>

        <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-xl p-8 mb-8">
          <div className="text-5xl mb-4">{service.icon}</div>
          <h1 className="text-4xl font-bold mb-4">{service.name} in Dubai</h1>
          <p className="text-xl text-cyan-100">{matchingClinics.length} dental clinics offering {service.name.toLowerCase()} in Dubai</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">About {service.name}</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{service.longDescription}</p>
        </div>

        <h2 className="text-2xl font-bold mb-6">Clinics Offering {service.name}</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {matchingClinics.map((clinic: any) => (
            <a
              key={clinic.slug}
              href={`/clinics/${clinic.slug}`}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{clinic.name}</h3>
                  <p className="text-gray-500 text-sm">{clinic.area}</p>
                </div>
                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                  <span className="text-yellow-500">⭐</span>
                  <span className="ml-1 font-medium">{clinic.rating}</span>
                  <span className="text-gray-400 text-sm ml-1">({clinic.reviewCount.toLocaleString()})</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {clinic.services.slice(0, 4).map((s: string) => (
                  <span key={s} className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">{s}</span>
                ))}
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{clinic.phone}</span>
                <span className="text-primary font-medium">View Details →</span>
              </div>
            </a>
          ))}
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
                { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://dubaidentalclinics.com/services' },
                { '@type': 'ListItem', position: 3, name: service.name },
              ],
            }),
          }}
        />
      </div>
    </div>
  )
}
