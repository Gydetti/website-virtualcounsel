/* eslint-disable no-restricted-syntax */
import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/siteConfig';

export default function manifest(): MetadataRoute.Manifest {
  const { background, primary } = siteConfig.theme.colors;
  return {
    name: siteConfig.site.name,
    short_name: siteConfig.site.name.replace(/\s+/g, ''),
    description: siteConfig.site.description ?? '',
    start_url: '/',
    display: 'standalone',
    background_color: background ?? '#ffffff',
    theme_color: primary,
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
