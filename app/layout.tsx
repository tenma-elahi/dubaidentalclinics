import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://dubaidentalguide.com'),
  title: 'Dubai Dental Guide - Find the Best Dentists in Dubai',
  description: 'Discover top-rated dental clinics in Dubai. Compare dentists by area, specialty, and reviews. Find cosmetic dentistry, orthodontics, implants, emergency dental care, and more.',
  keywords: 'dentist dubai, dental clinic dubai, best dentist in dubai, cosmetic dentist dubai, orthodontist dubai, dental implants dubai, emergency dentist dubai',
  openGraph: {
    title: 'Dubai Dental Guide - Find the Best Dentists in Dubai',
    description: 'Your complete guide to dental care in Dubai. Find verified dentists, read reviews, and book appointments.',
    url: 'https://dubaidentalguide.com',
    siteName: 'Dubai Dental Guide',
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dubai Dental Guide',
    description: 'Find the best dentists in Dubai',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://dubaidentalguide.com',
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
        <meta name="theme-color" content="#0891b2" />
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
    <header className="bg-white shadow-sm border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🦷</span>
              <span className="font-bold text-xl text-gray-900">Dubai Dental Guide</span>
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/clinics" className="text-gray-600 hover:text-primary">Find Clinics</a>
            <a href="/services" className="text-gray-600 hover:text-primary">Services</a>
            <a href="/blog" className="text-gray-600 hover:text-primary">Blog</a>
            <a href="/emergency" className="text-red-600 font-semibold hover:text-red-700">🚨 Emergency</a>
          </div>
        </div>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">🦷 Dubai Dental Guide</h3>
            <p className="text-gray-400">Your trusted guide to finding the best dental care in Dubai.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Popular Areas</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/dentists/dubai-marina" className="hover:text-white">Dubai Marina</a></li>
              <li><a href="/dentists/downtown" className="hover:text-white">Downtown Dubai</a></li>
              <li><a href="/dentists/jbr" className="hover:text-white">JBR</a></li>
              <li><a href="/dentists/jumeirah" className="hover:text-white">Jumeirah</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/services/cosmetic-dentistry" className="hover:text-white">Cosmetic Dentistry</a></li>
              <li><a href="/services/orthodontics" className="hover:text-white">Orthodontics</a></li>
              <li><a href="/services/dental-implants" className="hover:text-white">Dental Implants</a></li>
              <li><a href="/services/teeth-whitening" className="hover:text-white">Teeth Whitening</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
              <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Dubai Dental Guide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
