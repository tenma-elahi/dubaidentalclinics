import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import clinicsData from '../data/clinics.json'
import { ToothIcon, HospitalIcon, MedicalIcon, AlertIcon, LocationIcon, TwitterIcon, FacebookIcon, InstagramIcon, LinkedInIcon } from '../components/Icons'

const inter = Inter({ subsets: ['latin'] })

const totalClinics = clinicsData.clinics.length
const areas = Array.from(new Set(clinicsData.clinics.map((c: any) => c.area)))

export const metadata: Metadata = {
  metadataBase: new URL('https://dubaidentalclinics.com'),
  title: 'Dubai Dental Clinics - Find the Best Dentists in Dubai',
  description: `Discover ${totalClinics}+ top-rated dental clinics across ${areas.length} areas in Dubai. Compare dentists by area, specialty, and reviews. Find cosmetic dentistry, orthodontics, implants, emergency dental care, and more.`,
  keywords: 'dentist dubai, dental clinic dubai, best dentist in dubai, cosmetic dentist dubai, orthodontist dubai, dental implants dubai, emergency dentist dubai, dubai dental clinics',
  openGraph: {
    title: 'Dubai Dental Clinics - Find the Best Dentists in Dubai',
    description: `Your complete guide to dental care in Dubai. Compare ${totalClinics}+ verified dental clinics, read reviews, and book appointments.`,
    url: 'https://dubaidentalclinics.com',
    siteName: 'Dubai Dental Clinics',
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dubai Dental Clinics',
    description: 'Find the best dentists in Dubai',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://dubaidentalclinics.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0066cc" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Dubai Dental Clinics',
              url: 'https://dubaidentalclinics.com',
              description: `Find ${totalClinics}+ verified dental clinics in Dubai`,
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://dubaidentalclinics.com/clinics?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-dental flex items-center justify-center group-hover:scale-105 transition-transform">
              <ToothIcon className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-gray-900">Dubai Dental Clinics</div>
              <div className="text-xs text-gray-500 tracking-wide">Find Your Perfect Dentist</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <a 
              href="/clinics" 
              className="px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <HospitalIcon className="w-4 h-4" />
              <span>Find Clinics</span>
            </a>
            <a 
              href="/services" 
              className="px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <MedicalIcon className="w-4 h-4" />
              <span>Services</span>
            </a>
            <a 
              href="/emergency" 
              className="ml-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <AlertIcon className="w-4 h-4" />
              <span>Emergency</span>
            </a>
          </div>

          {/* Mobile Emergency Button */}
          <div className="md:hidden">
            <a 
              href="/emergency" 
              className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold text-sm flex items-center gap-2"
            >
              <AlertIcon className="w-4 h-4" />
              <span>Emergency</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Simplified */}
      <div className="md:hidden border-t border-gray-100 bg-gray-50">
        <div className="flex justify-around px-4 py-2">
          <a href="/clinics" className="text-center py-2 px-3 text-gray-700 hover:text-primary-600 flex flex-col items-center gap-1">
            <HospitalIcon className="w-5 h-5" />
            <span className="text-xs font-medium">Clinics</span>
          </a>
          <a href="/services" className="text-center py-2 px-3 text-gray-700 hover:text-primary-600 flex flex-col items-center gap-1">
            <MedicalIcon className="w-5 h-5" />
            <span className="text-xs font-medium">Services</span>
          </a>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  // Get top areas for footer
  const areaCounts: { [key: string]: number } = {}
  clinicsData.clinics.forEach((c: any) => {
    areaCounts[c.area] = (areaCounts[c.area] || 0) + 1
  })

  const topFooterAreas = Object.entries(areaCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([name]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
    }))

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-dental flex items-center justify-center">
                <ToothIcon className="w-6 h-6 text-white" />
              </div>
              <div className="font-bold text-base">Dubai Dental Clinics</div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your trusted guide to finding the best dental care in Dubai. {totalClinics}+ verified clinics across {areas.length} areas.
            </p>
            <div className="flex gap-2">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                <LinkedInIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Popular Areas */}
          <div>
            <h4 className="font-semibold text-base mb-4 flex items-center gap-2">
              <LocationIcon className="w-4 h-4" />
              <span>Popular Areas</span>
            </h4>
            <ul className="space-y-2 text-sm">
              {topFooterAreas.slice(0, 6).map((area) => (
                <li key={area.slug}>
                  <a 
                    href={`/dentists/${area.slug}`} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {area.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-base mb-4 flex items-center gap-2">
              <MedicalIcon className="w-4 h-4" />
              <span>Services</span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/services/general-dentistry" className="text-gray-400 hover:text-white transition-colors">General Dentistry</a></li>
              <li><a href="/services/cosmetic-dentistry" className="text-gray-400 hover:text-white transition-colors">Cosmetic Dentistry</a></li>
              <li><a href="/services/orthodontics" className="text-gray-400 hover:text-white transition-colors">Orthodontics</a></li>
              <li><a href="/services/dental-implants" className="text-gray-400 hover:text-white transition-colors">Dental Implants</a></li>
              <li><a href="/services/teeth-whitening" className="text-gray-400 hover:text-white transition-colors">Teeth Whitening</a></li>
              <li><a href="/services/emergency" className="text-gray-400 hover:text-white transition-colors">Emergency Care</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/clinics" className="text-gray-400 hover:text-white transition-colors">All {totalClinics} Clinics</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">All Services</a></li>
              <li><a href="/emergency" className="text-gray-400 hover:text-white transition-colors">24/7 Emergency</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-400">
            <div>
              © 2026 Dubai Dental Clinics. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                <span>{totalClinics}+ Verified Clinics</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                <span>{areas.length} Areas Covered</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
