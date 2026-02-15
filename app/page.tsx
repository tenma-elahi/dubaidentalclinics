import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dubai Dental Guide - Find the Best Dentists in Dubai | 100+ Verified Clinics',
  description: 'Find top-rated dental clinics in Dubai. Compare 100+ verified dentists by location, specialty, and patient reviews. Book your appointment today.',
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find the Best Dentists in Dubai
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cyan-100">
            Compare 50+ verified dental clinics. Read reviews. Book appointments.
          </p>
          
          {/* Search Box */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search by clinic name, area, or service..."
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 search-box text-lg"
              />
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary">50+</div>
              <div className="text-gray-600">Dental Clinics</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">50+</div>
              <div className="text-gray-600">Dubai Areas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="text-gray-600">Emergency Care</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">⭐ 4.5+</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Dental Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service) => (
              <a
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center clinic-card"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-semibold text-gray-900">{service.name}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Find Dentists by Area</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {areas.map((area) => (
              <a
                key={area.slug}
                href={`/dentists/${area.slug}`}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition flex items-center justify-between clinic-card"
              >
                <span className="font-medium text-gray-900">{area.name}</span>
                <span className="text-gray-500 text-sm">{area.count} clinics</span>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/areas" className="text-primary font-semibold hover:underline">
              View all areas →
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Dubai Dental Guide?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-semibold text-xl mb-2">Verified Clinics</h3>
              <p className="text-gray-600">All clinics are verified with accurate information, reviews, and contact details.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="font-semibold text-xl mb-2">Real Reviews</h3>
              <p className="text-gray-600">Read authentic patient reviews to find the right dentist for your needs.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="font-semibold text-xl mb-2">Easy to Find</h3>
              <p className="text-gray-600">Search by location, service type, or clinic name. Find care near you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-red-700 mb-4">🚨 Dental Emergency?</h2>
          <p className="text-xl text-gray-700 mb-8">
            Find 24/7 emergency dental clinics in Dubai. Get immediate care when you need it most.
          </p>
          <a
            href="/emergency"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition"
          >
            Find Emergency Dentist →
          </a>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Dental Care Tips</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-xl shadow-sm overflow-hidden clinic-card"
              >
                <div className="h-48 bg-gradient-to-br from-cyan-500 to-blue-500"></div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm">{post.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/blog" className="text-primary font-semibold hover:underline">
              Read more articles →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

const services = [
  { name: 'General Dentistry', slug: 'general-dentistry', icon: '🦷' },
  { name: 'Cosmetic Dentistry', slug: 'cosmetic-dentistry', icon: '✨' },
  { name: 'Orthodontics', slug: 'orthodontics', icon: '😁' },
  { name: 'Dental Implants', slug: 'dental-implants', icon: '🔧' },
  { name: 'Teeth Whitening', slug: 'teeth-whitening', icon: '💎' },
  { name: 'Root Canal', slug: 'root-canal', icon: '🩺' },
  { name: 'Pediatric Dentistry', slug: 'pediatric-dentistry', icon: '👶' },
  { name: 'Emergency Care', slug: 'emergency', icon: '🚨' },
]

const areas = [
  { name: 'Dubai Marina', slug: 'dubai-marina', count: 15 },
  { name: 'Downtown Dubai', slug: 'downtown', count: 12 },
  { name: 'JBR', slug: 'jbr', count: 8 },
  { name: 'Jumeirah', slug: 'jumeirah', count: 10 },
  { name: 'Business Bay', slug: 'business-bay', count: 7 },
  { name: 'DIFC', slug: 'difc', count: 5 },
  { name: 'Al Barsha', slug: 'al-barsha', count: 9 },
  { name: 'Deira', slug: 'deira', count: 11 },
]

const blogPosts = [
  {
    title: 'How Often Should You Visit the Dentist in Dubai?',
    slug: 'how-often-visit-dentist-dubai',
    excerpt: 'Learn the recommended frequency for dental checkups and why regular visits matter.',
  },
  {
    title: 'Teeth Whitening in Dubai: What You Need to Know',
    slug: 'teeth-whitening-dubai-guide',
    excerpt: 'A complete guide to professional teeth whitening options and costs in Dubai.',
  },
  {
    title: 'Finding the Right Orthodontist in Dubai',
    slug: 'finding-orthodontist-dubai',
    excerpt: 'Tips for choosing the best orthodontist for braces or Invisalign treatment.',
  },
]
