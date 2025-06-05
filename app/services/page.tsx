import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import DynamicPageRenderer from '@/components/layout/DynamicPageRenderer';
import { defaultMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site.config.local';

// Find the page structure for the services page
const servicesPageStructure = siteConfig.pageStructures?.find(p => p.path === '/services');

export async function generateMetadata(): Promise<Metadata> {
  if (
    !siteConfig.features.enableServices ||
    (siteConfig.enabledPages && !siteConfig.enabledPages.includes('/services'))
  ) {
    return defaultMetadata({ title: 'Page Not Found' });
  }

  const pageSeo = servicesPageStructure?.seo;
  const title = pageSeo?.title || 'Diensten';
  const description =
    pageSeo?.description ||
    'Ontdek mijn aanbod van diensten, ontworpen om ondernemers te helpen groeien.';

  return defaultMetadata({
    title: `${title} | ${siteConfig.site.name}`,
    description: description,
  });
}

export default async function ServicesPage() {
  if (
    !siteConfig.features.enableServices ||
    (siteConfig.enabledPages && !siteConfig.enabledPages.includes('/services'))
  ) {
    notFound();
  }

  if (!servicesPageStructure) {
    return (
      <div className="container py-12 text-center">
        <p className="text-xl text-feedback-error">
          Services page structure is not defined in site configuration.
        </p>
      </div>
    );
  }

  return <DynamicPageRenderer pagePath="/services" pageStructure={servicesPageStructure} />;
}
