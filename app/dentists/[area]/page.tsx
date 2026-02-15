import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import clinicsData from '../../../data/clinics.json'
import areasData from '../../../data/areas.json'
import AreaPageClient from './AreaPageClient'

type Area = {
  name: string
  slug: string
  description: string
}

function getAreaBySlug(slug: string): Area | undefined {
  return (areasData as any[]).find(a => a.slug === slug)
}

export async function generateStaticParams() {
  return (areasData as any[]).map((area) => ({
    area: area.slug,
  }))
}

export async function generateMetadata({ params }: { params: { area: string } }): Promise<Metadata> {
  const area = getAreaBySlug(params.area)
  
  if (!area) {
    return { title: 'Area Not Found - Dubai Dental Clinics' }
  }

  const clinics = clinicsData.clinics.filter((c: any) => c.area === area.name)
  
  return {
    title: `Best Dentists in ${area.name} (${clinics.length} Clinics) - Dubai Dental Clinics`,
    description: `Find ${clinics.length} top-rated dental clinics in ${area.name}, Dubai. ${area.description}`,
    openGraph: {
      title: `Best Dentists in ${area.name} - Dubai Dental Clinics`,
      description: `${clinics.length} verified dental clinics in ${area.name}. Compare ratings and services.`,
      url: `https://dubaidentalclinics.com/dentists/${params.area}`,
    },
    alternates: {
      canonical: `https://dubaidentalclinics.com/dentists/${params.area}`,
    },
  }
}

export default function AreaPage({ params }: { params: { area: string } }) {
  const area = getAreaBySlug(params.area)
  
  if (!area) {
    notFound()
  }

  const areaClinics = clinicsData.clinics.filter((c: any) => c.area === area.name)

  return <AreaPageClient area={area} clinics={areaClinics} />
}
