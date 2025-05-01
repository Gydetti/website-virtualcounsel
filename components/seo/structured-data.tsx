import type { Organization, WebSite, BreadcrumbList, WithContext } from "schema-dts"

interface StructuredDataProps {
  type: "organization" | "website" | "breadcrumb"
  data?: Record<string, any>
  breadcrumbItems?: Array<{ name: string; item: string }>
}

export default function StructuredData({ type, data, breadcrumbItems }: StructuredDataProps) {
  // Organization schema
  const organizationSchema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data?.name || "Your Business Name",
    url: data?.url || "https://your-domain.com",
    logo: data?.logo || "https://your-domain.com/logo.png",
    sameAs: data?.socialLinks || [
      "https://facebook.com/yourbusiness",
      "https://twitter.com/yourbusiness",
      "https://linkedin.com/company/yourbusiness",
      "https://instagram.com/yourbusiness",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: data?.phone || "+31201234567",
      contactType: "customer service",
      email: data?.email || "info@example.com",
      areaServed: data?.areaServed || "Worldwide",
      availableLanguage: data?.languages || ["English", "Dutch"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: data?.streetAddress || "Herengracht 182",
      addressLocality: data?.city || "Amsterdam",
      postalCode: data?.postalCode || "1016 BR",
      addressCountry: data?.country || "Netherlands",
    },
  }

  // Website schema
  const websiteSchema: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: data?.name || "Your Business Name",
    url: data?.url || "https://your-domain.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${data?.url || "https://your-domain.com"}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  // Breadcrumb schema
  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement:
      breadcrumbItems?.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.item,
      })) || [],
  }

  // Select the appropriate schema based on type
  const schemaData = (() => {
    switch (type) {
      case "organization":
        return organizationSchema
      case "website":
        return websiteSchema
      case "breadcrumb":
        return breadcrumbSchema
      default:
        return organizationSchema
    }
  })()

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      key={`structured-data-${type}`}
    />
  )
}
