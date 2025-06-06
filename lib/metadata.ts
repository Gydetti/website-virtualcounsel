/* eslint-disable @typescript-eslint/no-explicit-any */
/* biome-disable-file */
/* biome-disable lint/suspicious/noExplicitAny */
import type { Metadata } from 'next';

import { siteConfig } from './siteConfig';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// biome-ignore lint/suspicious/noExplicitAny: allow any overrides for metadata
export function defaultMetadata(overrides: any = {}): any {
  // Determine base URL from config or fallback to localhost
  const baseUrl = siteConfig.site.url || 'http://localhost:3000';
  const metadataBase = overrides.metadataBase ?? new URL(baseUrl);
  // Build openGraph metadata, filtering out invalid image URLs
  const ogOverrides = overrides.openGraph || {};
  const ogUrl = (ogOverrides.url ?? siteConfig.site.url) || undefined;
  const rawOgImages = ogOverrides.images ?? [siteConfig.site.openGraph.image];
  const validOgImages = (Array.isArray(rawOgImages) ? rawOgImages : []).filter(img => {
    if (typeof img === 'string') {
      return img.trim() !== '';
    }
    if (img instanceof URL) {
      const str = img.toString();
      return str.trim() !== '';
    }
    if (img && typeof (img as { url?: unknown }).url === 'string') {
      return (img as { url: string }).url.trim() !== '';
    }
    return false;
  });
  const openGraph: Metadata['openGraph'] = {
    title: ogOverrides.title ?? siteConfig.site.name,
    description: ogOverrides.description ?? siteConfig.site.description,
    ...(ogUrl ? { url: ogUrl } : {}),
    siteName: siteConfig.site.name,
    ...(validOgImages.length > 0 ? { images: validOgImages } : {}),
    ...ogOverrides,
  };
  // Build twitter metadata, filtering out invalid image URLs
  const twOverrides = overrides.twitter || {};
  const rawTwImages = twOverrides.images ?? [siteConfig.site.twitterImage];
  const validTwImages = Array.isArray(rawTwImages)
    ? rawTwImages.filter(img => typeof img === 'string' && img.trim() !== '')
    : [];
  const twitter: Metadata['twitter'] = {
    card: 'summary_large_image',
    title: twOverrides.title ?? siteConfig.site.name,
    description: twOverrides.description ?? siteConfig.site.description,
    ...(validTwImages.length > 0 ? { images: validTwImages } : {}),
    ...twOverrides,
  };
  const meta: Metadata = {
    title: overrides.title ?? siteConfig.site.name,
    description: overrides.description ?? siteConfig.site.description,
    openGraph,
    twitter,
    ...overrides,
  };
  // Always set metadataBase to ensure valid absolute URLs
  meta.metadataBase = metadataBase;
  return meta;
}
