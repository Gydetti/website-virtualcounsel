import type { Metadata } from 'next'
import { siteConfig } from './site.config'

// Returns default metadata using siteConfig values, overridable via spreads
export function defaultMetadata(overrides: Partial<Metadata> = {}): Metadata {
  // Determine base URL from config or fallback to localhost
  const baseUrl = siteConfig.site.url || 'http://localhost:3000'
  const metadataBase = overrides.metadataBase ?? new URL(baseUrl)
  // Build openGraph metadata, filtering out invalid image URLs
  const ogOverrides = overrides.openGraph || {}
  const ogUrl = (ogOverrides.url ?? siteConfig.site.url) || undefined
  const rawOgImages = ogOverrides.images ?? [siteConfig.site.openGraph.image]
  const validOgImages = (Array.isArray(rawOgImages) ? rawOgImages : []).filter(img => {
    if (typeof img === 'string') return img.trim() !== ''
    return img && typeof img.url === 'string' && img.url.trim() !== ''
  })
  const openGraph: Metadata['openGraph'] = {
    title: ogOverrides.title ?? siteConfig.site.name,
    description: ogOverrides.description ?? siteConfig.site.description,
    ...(ogUrl ? { url: ogUrl } : {}),
    siteName: siteConfig.site.name,
    ...(validOgImages.length > 0 ? { images: validOgImages } : {}),
    ...ogOverrides,
  }
  // Build twitter metadata, filtering out invalid image URLs
  const twOverrides = overrides.twitter || {}
  const rawTwImages = twOverrides.images ?? [siteConfig.site.twitterImage]
  const validTwImages = Array.isArray(rawTwImages)
    ? rawTwImages.filter(img => typeof img === 'string' && img.trim() !== '')
    : []
  const twitter: Metadata['twitter'] = {
    card: 'summary_large_image',
    title: twOverrides.title ?? siteConfig.site.name,
    description: twOverrides.description ?? siteConfig.site.description,
    ...(validTwImages.length > 0 ? { images: validTwImages } : {}),
    ...twOverrides,
  }
  const meta: Metadata = {
    title: overrides.title ?? siteConfig.site.name,
    description: overrides.description ?? siteConfig.site.description,
    openGraph,
    twitter,
    ...overrides,
  }
  // Always set metadataBase to ensure valid absolute URLs
  meta.metadataBase = metadataBase
  return meta
} 