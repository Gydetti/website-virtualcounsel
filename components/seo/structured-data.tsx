// No default React import needed
import type {
  BlogPosting,
  BreadcrumbList,
  FAQPage,
  Organization,
  WebSite,
  WithContext,
} from 'schema-dts';

interface StructuredDataProps {
  type: 'organization' | 'website' | 'breadcrumb' | 'article' | 'faq';
  data?: {
    // Common fields
    name?: string;
    url?: string;
    logo?: string;
    socialLinks?: string[];
    phone?: string;
    email?: string;
    streetAddress?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    // Article fields
    title?: string;
    description?: string;
    imageUrl?: string;
    datePublished?: string;
    dateModified?: string;
    authorName?: string;
    publisherName?: string;
    publisherLogo?: string;
    // FAQ fields
    items?: { question: string; answer: string }[];
  };
  breadcrumbItems?: Array<{ name: string; item: string }>;
}

export default function StructuredData({ type, data, breadcrumbItems }: StructuredDataProps) {
  // Organization schema
  const organizationSchema: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data?.name || 'Your Business Name',
    url: data?.url || 'https://your-domain.com',
    logo: data?.logo || 'https://your-domain.com/logo.png',
    sameAs: data?.socialLinks || [
      'https://facebook.com/yourbusiness',
      'https://twitter.com/yourbusiness',
      'https://linkedin.com/company/yourbusiness',
      'https://instagram.com/yourbusiness',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: data?.phone || '+31201234567',
      contactType: 'customer service',
      email: data?.email || 'info@virtualcounsel.nl',
      areaServed: 'Worldwide',
      availableLanguage: ['English', 'Dutch'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: data?.streetAddress || 'Herengracht 182',
      addressLocality: data?.city || 'Amsterdam',
      postalCode: data?.postalCode || '1016 BR',
      addressCountry: data?.country || 'Netherlands',
    },
  };

  // Website schema
  const websiteSchema: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data?.name || 'Your Business Name',
    url: data?.url || 'https://your-domain.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${data?.url || 'https://your-domain.com'}/search?q={search_term_string}`,
      },
      query: 'required name=search_term_string',
    },
  };

  // Breadcrumb schema
  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement:
      breadcrumbItems?.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.item,
      })) || [],
  };

  // Article schema
  const articleSchema: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data?.title || '',
    description: data?.description || '',
    image: data?.imageUrl || '',
    datePublished: data?.datePublished || '',
    dateModified: data?.dateModified || data?.datePublished || '',
    author: { '@type': 'Person', name: data?.authorName || '' },
    publisher: {
      '@type': 'Organization',
      name: data?.publisherName || '',
      logo: { '@type': 'ImageObject', url: data?.publisherLogo || '' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': data?.url || '' },
  };

  // FAQ schema
  const faqSchema: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity:
      data?.items?.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })) || [],
  };

  // Select the appropriate schema based on type
  const schemaData = (() => {
    switch (type) {
      case 'organization':
        return organizationSchema;
      case 'website':
        return websiteSchema;
      case 'breadcrumb':
        return breadcrumbSchema;
      case 'article':
        return articleSchema;
      case 'faq':
        return faqSchema;
      default:
        return organizationSchema;
    }
  })();
  return (
    <script type="application/ld+json" key={`structured-data-${type}`}>
      {JSON.stringify(schemaData)}
    </script>
  );
}
