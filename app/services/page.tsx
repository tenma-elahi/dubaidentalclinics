import { Metadata } from 'next'
import { ToothIcon, SparkleIcon, BracesIcon, ImplantIcon, SmileIcon, MedicalIcon, ChildIcon, AlertIcon, ArrowRightIcon } from '../../components/Icons'

export const metadata: Metadata = {
  title: 'Dental Services in Dubai - Dubai Dental Clinics',
  description: 'Explore all dental services available in Dubai: general dentistry, cosmetic dentistry, orthodontics, dental implants, teeth whitening, root canal, and pediatric dentistry.',
  alternates: {
    canonical: 'https://dubaidentalclinics.com/services',
  },
}

const services = [
  { 
    name: 'General Dentistry', 
    slug: 'general-dentistry', 
    icon: <ToothIcon className="w-10 h-10" />, 
    description: 'Routine checkups, cleanings, fillings, and preventive care to maintain oral health.' 
  },
  { 
    name: 'Cosmetic Dentistry', 
    slug: 'cosmetic-dentistry', 
    icon: <SparkleIcon className="w-10 h-10" />, 
    description: 'Veneers, bonding, smile makeovers, and aesthetic treatments to enhance your smile.' 
  },
  { 
    name: 'Orthodontics', 
    slug: 'orthodontics', 
    icon: <BracesIcon className="w-10 h-10" />, 
    description: 'Braces, Invisalign, and clear aligners to straighten teeth and correct bite issues.' 
  },
  { 
    name: 'Dental Implants', 
    slug: 'dental-implants', 
    icon: <ImplantIcon className="w-10 h-10" />, 
    description: 'Permanent tooth replacement with titanium implants for a natural-looking smile.' 
  },
  { 
    name: 'Teeth Whitening', 
    slug: 'teeth-whitening', 
    icon: <SmileIcon className="w-10 h-10" />, 
    description: 'Professional teeth whitening treatments for a brighter, more confident smile.' 
  },
  { 
    name: 'Root Canal', 
    slug: 'root-canal', 
    icon: <MedicalIcon className="w-10 h-10" />, 
    description: 'Save infected teeth with modern root canal therapy — often painless with today\'s techniques.' 
  },
  { 
    name: 'Pediatric Dentistry', 
    slug: 'pediatric-dentistry', 
    icon: <ChildIcon className="w-10 h-10" />, 
    description: 'Gentle dental care for children in a fun, friendly environment.' 
  },
  { 
    name: 'Emergency Dental Care', 
    slug: 'emergency', 
    icon: <AlertIcon className="w-10 h-10" />, 
    description: '24/7 emergency dental services for toothaches, broken teeth, and dental trauma.' 
  },
]

export default function ServicesPage() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm mb-5" aria-label="Breadcrumb">
          <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">Services</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Dental Services in Dubai</h1>
          <p className="text-lg text-gray-600">Find the right dental treatment for your needs from clinics across Dubai.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <a
              key={service.slug}
              href={service.slug === 'emergency' ? '/emergency' : `/services/${service.slug}`}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-50 to-brand-50 rounded-xl mb-4 text-brand-600 group-hover:scale-105 transition-transform">
                {service.icon}
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-brand-600 transition-colors">{service.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-3">{service.description}</p>
              <span className="inline-flex items-center gap-1 text-brand-600 font-semibold text-sm group-hover:gap-2 transition-all">
                <span>Find clinics</span>
                <ArrowRightIcon className="w-4 h-4" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
