import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import DynamicPageRenderer from '@/components/layout/DynamicPageRenderer';
import StructuredData from '@/components/seo/structured-data';
import { getServices } from '@/lib/data-utils';
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
    openGraph: {
      title: `${title} | ${siteConfig.site.name}`,
      description: description,
      type: 'website',
    },
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

  // Get services for structured data
  const services = await getServices();

  // Prepare breadcrumb data
  const breadcrumbItems = [
    { name: 'Home', item: siteConfig.site.url },
    { name: 'Diensten', item: `${siteConfig.site.url}/services` },
  ];

  // Prepare service provider structured data
  const serviceProviderData = {
    name: siteConfig.legal?.businessName || siteConfig.site.name,
    url: `${siteConfig.site.url}/services`,
    description:
      servicesPageStructure.seo?.description ||
      'Specialistische juridische diensten voor ICT- en softwarebedrijven',
    serviceType: services.map(service => service.title),
    areaServed: 'Netherlands',
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phone,
    address: siteConfig.contact.address,
  };

  return (
    <>
      {/* SEO Structured Data */}
      <StructuredData type="breadcrumb" breadcrumbItems={breadcrumbItems} />
      <StructuredData
        type="organization"
        data={{
          name: siteConfig.legal?.businessName || siteConfig.site.name,
          url: serviceProviderData.url,
          email: serviceProviderData.email,
          phone: serviceProviderData.phone,
          streetAddress: serviceProviderData.address?.line1 || '',
          city: serviceProviderData.address?.city || '',
          postalCode: serviceProviderData.address?.zip || '',
          country: serviceProviderData.address?.country || '',
        }}
      />

      <DynamicPageRenderer pagePath="/services" pageStructure={servicesPageStructure} />
    </>
  );
}
