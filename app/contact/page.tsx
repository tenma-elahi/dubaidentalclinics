import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Dubai Dental Clinics. Ask about our directory, suggest a clinic, or inquire about dental care in Dubai.',
  alternates: { canonical: 'https://dubaidentalclinics.com/contact' },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-warm-50">
      <section className="bg-gradient-dental text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-teal-100 text-lg">Have questions about dental clinics in Dubai? We&apos;re here to help.</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl border border-warm-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Get In Touch</h2>
          <p className="text-gray-600 mb-6">
            Whether you&apos;re looking for a dentist or want to list your clinic, fill out the form below and we&apos;ll get back to you.
          </p>

          <form name="dental-contact" method="POST" data-netlify="true" action="/contact/?success=true" className="space-y-5">
            <input type="hidden" name="form-name" value="dental-contact" />

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input type="text" id="name" name="name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors" placeholder="Your name" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" id="email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors" placeholder="your@email.com" />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors" placeholder="+971 XX XXX XXXX" />
            </div>

            <div>
              <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 mb-1">What are you inquiring about?</label>
              <select id="inquiry" name="inquiry" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors bg-white">
                <option value="">Select an option</option>
                <option value="find-clinic">Help finding a dental clinic</option>
                <option value="list-clinic">List my clinic on the directory</option>
                <option value="update-listing">Update an existing listing</option>
                <option value="general">General inquiry</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea id="message" name="message" required rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors resize-y" placeholder="How can we help you?" />
            </div>

            <button type="submit" className="w-full px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-semibold transition-all shadow-sm hover:shadow-md">
              Send Message
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              You can also reach us directly at{' '}
              <a href="mailto:waseem@elahi.co" className="text-brand-600 hover:underline">waseem@elahi.co</a>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              ⚠️ We are a directory service, not a dental provider. For urgent dental needs, visit our <a href="/emergency" className="text-brand-500 hover:underline">emergency page</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
