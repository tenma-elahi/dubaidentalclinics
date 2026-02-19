import { Metadata } from 'next'
import { blogPosts } from '../../data/blog-posts'

export const metadata: Metadata = {
  title: 'Dental Care Blog - Dubai Dental Clinics',
  description: 'Expert guides on dental care in Dubai: costs, treatments, clinic reviews, and tips for finding the best dentist.',
  alternates: {
    canonical: 'https://dubaidentalclinics.com/blog',
  },
}

export default function BlogPage() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm mb-5" aria-label="Breadcrumb">
          <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">Blog</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Dubai Dental Care Blog</h1>
          <p className="text-lg text-gray-600">Expert guides, pricing information, and tips for dental care in Dubai.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all group"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-brand-50 text-brand-700 text-xs font-medium px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-400 text-xs">{post.readTime}</span>
                </div>
                <h2 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-brand-600 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {post.description}
                </p>
                <div className="mt-4 text-brand-600 font-semibold text-sm group-hover:underline">
                  Read more →
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
