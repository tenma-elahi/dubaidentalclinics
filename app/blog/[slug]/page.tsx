import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogPosts } from '../../../data/blog-posts'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: `${post.title} | Dubai Dental Clinics`,
    description: post.description,
    alternates: {
      canonical: `https://dubaidentalclinics.com/blog/${params.slug}`,
    },
  }
}

function renderMarkdown(content: string) {
  // Simple markdown-to-HTML for static blog content
  const lines = content.split('\n')
  const html: string[] = []
  let inTable = false
  let tableRows: string[] = []

  const processInline = (text: string) => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-brand-600 hover:underline">$1</a>')
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      if (inTable) { html.push(renderTable(tableRows)); inTable = false; tableRows = [] }
      html.push(`<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">${processInline(line.slice(3))}</h2>`)
    } else if (line.startsWith('### ')) {
      if (inTable) { html.push(renderTable(tableRows)); inTable = false; tableRows = [] }
      html.push(`<h3 class="text-xl font-bold mt-6 mb-3 text-gray-900">${processInline(line.slice(4))}</h3>`)
    } else if (line.startsWith('#### ')) {
      if (inTable) { html.push(renderTable(tableRows)); inTable = false; tableRows = [] }
      html.push(`<h4 class="text-lg font-semibold mt-5 mb-2 text-gray-900">${processInline(line.slice(5))}</h4>`)
    } else if (line.startsWith('| ')) {
      if (!inTable) { inTable = true; tableRows = [] }
      tableRows.push(line)
    } else if (line.startsWith('- ')) {
      if (inTable) { html.push(renderTable(tableRows)); inTable = false; tableRows = [] }
      html.push(`<li class="ml-4 mb-1 text-gray-700 list-disc">${processInline(line.slice(2))}</li>`)
    } else if (/^\d+\. /.test(line)) {
      if (inTable) { html.push(renderTable(tableRows)); inTable = false; tableRows = [] }
      html.push(`<li class="ml-4 mb-1 text-gray-700 list-decimal">${processInline(line.replace(/^\d+\. /, ''))}</li>`)
    } else if (line.trim() === '') {
      if (inTable) { html.push(renderTable(tableRows)); inTable = false; tableRows = [] }
    } else {
      if (inTable) { html.push(renderTable(tableRows)); inTable = false; tableRows = [] }
      html.push(`<p class="text-gray-700 leading-relaxed mb-4">${processInline(line)}</p>`)
    }
  }
  if (inTable) html.push(renderTable(tableRows))

  return html.join('\n')
}

function renderTable(rows: string[]) {
  if (rows.length < 2) return ''
  const parseRow = (row: string) => row.split('|').slice(1, -1).map(c => c.trim())
  const headers = parseRow(rows[0])
  // Skip separator row (row[1])
  const dataRows = rows.slice(2).map(parseRow)

  return `<div class="overflow-x-auto my-6"><table class="min-w-full border border-gray-200 rounded-lg">
    <thead><tr class="bg-warm-50">${headers.map(h => `<th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">${h}</th>`).join('')}</tr></thead>
    <tbody>${dataRows.map(row => `<tr class="border-b border-gray-100">${row.map(cell => `<td class="px-4 py-3 text-sm text-gray-700">${cell}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>`
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm mb-5" aria-label="Breadcrumb">
          <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
          <span className="mx-2 text-gray-400">/</span>
          <a href="/blog" className="text-gray-500 hover:text-gray-700">Blog</a>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{post.title}</span>
        </nav>

        <article>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-brand-50 text-primary-700 text-xs font-medium px-2.5 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-gray-400 text-sm">{post.readTime}</span>
              <span className="text-gray-400 text-sm">{post.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-gray-600">{post.description}</p>
          </div>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </article>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold mb-4">More Articles</h2>
          <div className="grid gap-4">
            {blogPosts.filter(p => p.slug !== post.slug).slice(0, 3).map(p => (
              <a key={p.slug} href={`/blog/${p.slug}`} className="flex items-center gap-4 p-4 rounded-lg hover:bg-warm-50 transition">
                <div>
                  <h3 className="font-semibold text-gray-900">{p.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{p.readTime}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: post.title,
              description: post.description,
              datePublished: post.date,
              publisher: {
                '@type': 'Organization',
                name: 'Dubai Dental Clinics',
                url: 'https://dubaidentalclinics.com',
              },
            }),
          }}
        />
      </div>
    </div>
  )
}
