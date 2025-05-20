import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/siteConfig';

export default function robots(): MetadataRoute.Robots {
  const { features, enabledPages, site } = siteConfig;
  const disallow: string[] = [];
  if (!features.enableBlog) disallow.push('/blog', '/blog/*');
  if (!features.enableServices) disallow.push('/services', '/services/*');
  if (!features.enableContactForm) disallow.push('/contact', '/contact/*');
  // Add any other static disallowed paths
  // e.g., '/private', '/admin'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow,
    },
    sitemap: `${site.url.replace(/\/$/, '')}/sitemap.xml`,
  };
}
