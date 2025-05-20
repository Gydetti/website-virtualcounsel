import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import DynamicPageRenderer from '@/components/layout/DynamicPageRenderer';
import { getResourceBySlug, getResources } from '@/lib/data/resources';
import { defaultMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site.config.local';

export async function generateStaticParams() {
  const resources = await getResources();
  return resources.map(r => ({ slug: r.slug }));
}

const resourceDetailPageStructure = siteConfig.pageStructures?.find(
  p => p.path === '/resources/:slug'
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) {
    return defaultMetadata({ title: 'Resource Not Found' });
  }

  const pageSeo = resource.seo;
  const title = pageSeo?.title || resource.title || 'Resource';
  const description = pageSeo?.description || resource.subtitle || siteConfig.site.description;

  return defaultMetadata({
    title: `${title} | ${siteConfig.site.name}`,
    description: description,
    openGraph: {
      images: resource.heroImage
        ? [
            {
              url: resource.heroImage.src,
              alt: resource.heroImage.alt,
              width: resource.heroImage.width,
              height: resource.heroImage.height,
            },
          ]
        : [],
    },
  });
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const resource = await getResourceBySlug(slug);
  if (!resource) {
    notFound();
  }

  if (!resourceDetailPageStructure) {
    return (
      <div className="container py-12 text-center">
        <p className="text-xl text-feedback-error">
          Resource detail page structure is not defined in site configuration.
        </p>
      </div>
    );
  }

  const currentPagePath = `/resources/${slug}`;

  return (
    <DynamicPageRenderer pagePath={currentPagePath} pageStructure={resourceDetailPageStructure} />
  );
}
