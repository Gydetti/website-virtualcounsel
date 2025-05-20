import type { Metadata } from 'next';

import { getResourceBySlug } from '@/lib/data/resources';
import { defaultMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/siteConfig';

interface Params {
  params: { slug: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resource = await getResourceBySlug(params.slug);
  if (!resource) {
    return defaultMetadata({ title: 'Resource Not Found' });
  }
  return defaultMetadata({
    title: `${resource.title} | ${siteConfig.site.name}`,
    description: resource.subtitle ?? siteConfig.site.description,
    openGraph: {
      title: `${resource.title} | ${siteConfig.site.name}`,
      description: resource.subtitle ?? siteConfig.site.description,
      images: [
        {
          url: resource.heroImage.src,
          alt: resource.heroImage.alt,
          width: resource.heroImage.width,
          height: resource.heroImage.height,
        },
      ],
      type: 'website',
    },
  });
}
