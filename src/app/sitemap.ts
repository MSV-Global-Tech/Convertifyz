import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://convertifyz.msvglobaltech.in'
  
  const routes = [
    '',
    '/merge-pdf',
    '/split-pdf',
    '/compress-pdf',
    '/rotate-pdf',
    '/watermark-pdf',
    '/image-to-pdf',
    '/pdf-to-image',
    '/image-converter',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
