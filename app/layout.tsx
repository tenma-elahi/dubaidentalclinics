import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import clinicsData from '../data/clinics.json'

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
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-dental flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              😁
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-xl text-gray-900">Dubai Dental Clinics</div>
              <div className="text-xs text-gray-500">Your Smile, Our Priority</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <a 
              href="/clinics" 
              className="px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all"
            >
              🏥 Find Clinics
            </a>
            <a 
              href="/services" 
              className="px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all"
            >
              🩺 Services
            </a>
            <a 
              href="/emergency" 
              className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span className="animate-pulse-slow">🚨</span>
              <span>Emergency</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <a 
              href="/emergency" 
              className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold text-sm"
            >
              🚨
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-100 px-4 py-3 bg-gray-50">
        <div className="flex justify-around">
          <a href="/clinics" className="text-center py-2 px-3 text-gray-700 hover:text-primary-600">
            <div className="text-2xl mb-1">🏥</div>
            <div className="text-xs font-medium">Clinics</div>
          </a>
          <a href="/services" className="text-center py-2 px-3 text-gray-700 hover:text-primary-600">
            <div className="text-2xl mb-1">🩺</div>
            <div className="text-xs font-medium">Services</div>
          </a>
          <a href="/emergency" className="text-center py-2 px-3 text-red-600">
            <div className="text-2xl mb-1">🚨</div>
            <div className="text-xs font-semibold">Emergency</div>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-dental flex items-center justify-center text-2xl">
                😁
              </div>
              <div className="font-bold text-lg">Dubai Dental Clinics</div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Your trusted guide to finding the best dental care in Dubai. {totalClinics}+ verified clinics across {areas.length} areas.
            </p>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-all">
                📱
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-all">
                💬
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-all">
                📧
              </div>
            </div>
          </div>

          {/* Popular Areas */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span>📍</span>
              <span>Popular Areas</span>
            </h4>
            <ul className="space-y-3">
              {topFooterAreas.slice(0, 6).map((area) => (
                <li key={area.slug}>
                  <a 
                    href={`/dentists/${area.slug}`} 
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {area.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span>🩺</span>
              <span>Services</span>
            </h4>
            <ul className="space-y-3">
              <li><a href="/services/general-dentistry" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">General Dentistry</a></li>
              <li><a href="/services/cosmetic-dentistry" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Cosmetic Dentistry</a></li>
              <li><a href="/services/orthodontics" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Orthodontics</a></li>
              <li><a href="/services/dental-implants" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Dental Implants</a></li>
              <li><a href="/services/teeth-whitening" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Teeth Whitening</a></li>
              <li><a href="/services/emergency" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Emergency Care</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span>🔗</span>
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-3">
              <li><a href="/clinics" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">All {totalClinics} Clinics</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">All Services</a></li>
              <li><a href="/emergency" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">24/7 Emergency</a></li>
              <li>
                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg mt-2">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-sm">Verified Clinics</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2026 Dubai Dental Clinics. All rights reserved. 🦷
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>{totalClinics}+ Verified Clinics</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-blue-400">✓</span>
                <span>{areas.length} Areas Covered</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
