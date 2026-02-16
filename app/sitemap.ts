import { MetadataRoute } from 'next'
import clinicsData from '../data/clinics.json'
import { blogPosts } from '../data/blog-posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dubaidentalclinics.com'
  
  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/clinics`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/emergency`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
  ]
  
  // Service pages
  const services = ['general-dentistry', 'cosmetic-dentistry', 'orthodontics', 'dental-implants', 'teeth-whitening', 'root-canal', 'pediatric-dentistry']
  const servicePages = services.map(s => ({
    url: `${baseUrl}/services/${s}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  
  // Clinic pages
  const clinicPages = clinicsData.clinics.map((clinic: any) => ({
    url: `${baseUrl}/clinics/${clinic.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  // Area pages
  const areas = Array.from(new Set(clinicsData.clinics.map((c: any) => c.area)))
  const areaPages = areas.map((area: string) => ({
    url: `${baseUrl}/dentists/${area.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  // Blog pages
  const blogPages = [
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    ...blogPosts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
  
  return [...staticPages, ...servicePages, ...blogPages, ...clinicPages, ...areaPages]
}
