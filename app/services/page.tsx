import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dental Services in Dubai - Dubai Dental Clinics',
  description: 'Explore all dental services available in Dubai: general dentistry, cosmetic dentistry, orthodontics, dental implants, teeth whitening, root canal, and pediatric dentistry.',
  alternates: {
    canonical: 'https://dubaidentalclinics.com/services',
  },
}

const services = [
  { name: 'General Dentistry', slug: 'general-dentistry', icon: '🦷', description: 'Routine checkups, cleanings, fillings, and preventive care to maintain oral health.' },
  { name: 'Cosmetic Dentistry', slug: 'cosmetic-dentistry', icon: '✨', description: 'Veneers, bonding, smile makeovers, and aesthetic treatments to enhance your smile.' },
  { name: 'Orthodontics', slug: 'orthodontics', icon: '😁', description: 'Braces, Invisalign, and clear aligners to straighten teeth and correct bite issues.' },
  { name: 'Dental Implants', slug: 'dental-implants', icon: '🔧', description: 'Permanent tooth replacement with titanium implants for a natural-looking smile.' },
  { name: 'Teeth Whitening', slug: 'teeth-whitening', icon: '💎', description: 'Professional teeth whitening treatments for a brighter, more confident smile.' },
  { name: 'Root Canal', slug: 'root-canal', icon: '🩺', description: 'Save infected teeth with modern root canal therapy — often painless with today\'s techniques.' },
  { name: 'Pediatric Dentistry', slug: 'pediatric-dentistry', icon: '👶', description: 'Gentle dental care for children in a fun, friendly environment.' },
  { name: 'Emergency Dental Care', slug: 'emergency', icon: '🚨', description: '24/7 emergency dental services for toothaches, broken teeth, and dental trauma.' },
]

export default function ServicesPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm mb-6" aria-label="Breadcrumb">
          <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">Services</span>
        </nav>

        <h1 className="text-4xl font-bold mb-4">Dental Services in Dubai</h1>
        <p className="text-gray-600 mb-12">Find the right dental treatment for your needs from clinics across Dubai.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <a
              key={service.slug}
              href={service.slug === 'emergency' ? '/emergency' : `/services/${service.slug}`}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h2 className="text-2xl font-bold mb-3">{service.name}</h2>
              <p className="text-gray-600">{service.description}</p>
              <span className="inline-block mt-4 text-primary font-medium">Find clinics →</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
