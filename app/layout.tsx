import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import clinicsData from '../data/clinics.json'
import { ToothIcon, HospitalIcon, MedicalIcon, AlertIcon, LocationIcon } from '../components/Icons'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

const totalClinics = clinicsData.clinics.length
const areas = Array.from(new Set(clinicsData.clinics.map((c: any) => c.area)))

export const metadata: Metadata = {
  metadataBase: new URL('https://dubaidentalclinics.com'),
  title: {
    default: 'Dubai Dental Clinics — Find the Best Dentists in Dubai',
    template: '%s | Dubai Dental Clinics',
  },
  description: `Discover ${totalClinics}+ top-rated dental clinics across ${areas.length} areas in Dubai. Compare dentists, read reviews, and find your perfect smile. 😁`,
  keywords: 'dentist dubai, dental clinic dubai, best dentist in dubai, cosmetic dentist dubai, orthodontist dubai, dental implants dubai, emergency dentist dubai',
  openGraph: {
    title: 'Dubai Dental Clinics — Find the Best Dentists in Dubai',
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
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://dubaidentalclinics.com' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#09c2b2" />
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
      <body className={`${inter.className} bg-warm-50 text-slate-800`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-warm-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-dental flex items-center justify-center group-hover:scale-105 transition-transform">
              <ToothIcon className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-slate-900 font-[var(--font-jakarta)]">Dubai Dental Clinics</div>
              <div className="text-xs text-slate-500 tracking-wide">Because Your Smile Matters 😊</div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-1">
            <a href="/clinics" className="px-4 py-2 text-slate-700 hover:text-brand-700 hover:bg-brand-50 rounded-lg font-medium transition-all flex items-center gap-2">
              <HospitalIcon className="w-4 h-4" />
              <span>Find Clinics</span>
            </a>
            <a href="/services" className="px-4 py-2 text-slate-700 hover:text-brand-700 hover:bg-brand-50 rounded-lg font-medium transition-all flex items-center gap-2">
              <MedicalIcon className="w-4 h-4" />
              <span>Services</span>
            </a>
            <a href="/blog" className="px-4 py-2 text-slate-700 hover:text-brand-700 hover:bg-brand-50 rounded-lg font-medium transition-all">
              <span>Blog</span>
            </a>
            <a href="/emergency" className="ml-2 px-5 py-2.5 bg-coral-500 hover:bg-coral-600 text-white rounded-xl font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-2">
              <AlertIcon className="w-4 h-4" />
              <span>Emergency</span>
            </a>
          </div>

          <div className="md:hidden">
            <a href="/emergency" className="px-4 py-2 bg-coral-500 text-white rounded-xl font-semibold text-sm flex items-center gap-2">
              <AlertIcon className="w-4 h-4" />
              <span>Emergency</span>
            </a>
          </div>
        </div>
      </nav>

      <div className="md:hidden border-t border-warm-200 bg-warm-50">
        <div className="flex justify-around px-4 py-2">
          <a href="/clinics" className="text-center py-2 px-3 text-slate-700 hover:text-brand-600 flex flex-col items-center gap-1">
            <HospitalIcon className="w-5 h-5" />
            <span className="text-xs font-medium">Clinics</span>
          </a>
          <a href="/services" className="text-center py-2 px-3 text-slate-700 hover:text-brand-600 flex flex-col items-center gap-1">
            <MedicalIcon className="w-5 h-5" />
            <span className="text-xs font-medium">Services</span>
          </a>
          <a href="/blog" className="text-center py-2 px-3 text-slate-700 hover:text-brand-600 flex flex-col items-center gap-1">
            <span className="text-xs font-medium">Blog</span>
          </a>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  const areaCounts: { [key: string]: number } = {}
  clinicsData.clinics.forEach((c: any) => {
    areaCounts[c.area] = (areaCounts[c.area] || 0) + 1
  })

  const topFooterAreas = Object.entries(areaCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
    }))

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-dental flex items-center justify-center">
                <ToothIcon className="w-6 h-6 text-white" />
              </div>
              <div className="font-bold text-base">Dubai Dental Clinics</div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Your trusted guide to finding the best dental care in Dubai. {totalClinics}+ verified clinics across {areas.length} areas. Because your smile matters! 😊
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-base mb-4 flex items-center gap-2">
              <LocationIcon className="w-4 h-4" />
              Popular Areas
            </h4>
            <ul className="space-y-2 text-sm">
              {topFooterAreas.map((area) => (
                <li key={area.slug}>
                  <a href={`/dentists/${area.slug}`} className="text-slate-400 hover:text-brand-400 transition-colors">
                    {area.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-base mb-4 flex items-center gap-2">
              <MedicalIcon className="w-4 h-4" />
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/services/general-dentistry" className="text-slate-400 hover:text-brand-400 transition-colors">General Dentistry</a></li>
              <li><a href="/services/cosmetic-dentistry" className="text-slate-400 hover:text-brand-400 transition-colors">Cosmetic Dentistry</a></li>
              <li><a href="/services/orthodontics" className="text-slate-400 hover:text-brand-400 transition-colors">Orthodontics</a></li>
              <li><a href="/services/dental-implants" className="text-slate-400 hover:text-brand-400 transition-colors">Dental Implants</a></li>
              <li><a href="/services/teeth-whitening" className="text-slate-400 hover:text-brand-400 transition-colors">Teeth Whitening</a></li>
              <li><a href="/services/emergency" className="text-slate-400 hover:text-brand-400 transition-colors">Emergency Care</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/clinics" className="text-slate-400 hover:text-brand-400 transition-colors">All {totalClinics} Clinics</a></li>
              <li><a href="/services" className="text-slate-400 hover:text-brand-400 transition-colors">All Services</a></li>
              <li><a href="/emergency" className="text-slate-400 hover:text-brand-400 transition-colors">24/7 Emergency</a></li>
              <li><a href="/about" className="text-slate-400 hover:text-brand-400 transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-slate-400 hover:text-brand-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-slate-400">
            <div>© 2026 Dubai Dental Clinics. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-brand-400 rounded-full"></span>
                {totalClinics}+ Verified Clinics
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-brand-300 rounded-full"></span>
                {areas.length} Areas Covered
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
