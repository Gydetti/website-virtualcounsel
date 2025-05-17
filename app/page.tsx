import DynamicPageRenderer from "@/components/layout/DynamicPageRenderer";
import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site.config.local"; // Use the local config for data
import type { Metadata } from "next";

// Find the page structure for the homepage
const homepageStructure = siteConfig.pageStructures?.find(
  (p) => p.path === "/",
);

// Generate metadata: prioritize page-specific SEO from structure, then site defaults
export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = homepageStructure?.seo;
  const title = pageSeo?.title || `${siteConfig.site.name} | Home`;
  const description = pageSeo?.description || siteConfig.site.description;
  // Add other SEO fields like keywords, openGraph overrides if present in pageSeo

  return defaultMetadata({
    title: title,
    description: description,
    // Potentially pass openGraph: pageSeo?.openGraph if you want to override fully
  });
}

export default async function Home() {
  if (!homepageStructure) {
    // Fallback or error if homepage structure is not defined in site.config.local.ts
    // This should ideally not happen if config is correct.
    return (
      <div className="container py-12 text-center">
        <p className="text-xl text-red-600">
          Homepage structure is not defined in site configuration.
        </p>
        <p>
          Please check <code>lib/site.config.local.ts</code> and ensure a{" "}
          <code>pageStructures</code> entry with <code>path: "/"</code> exists.
        </p>
      </div>
    );
  }

  // The DynamicPageRenderer will internally handle fetching/passing data to sections
  // based on the 'homepageStructure' and its 'pagePath' prop.
  return (
    <DynamicPageRenderer
      pagePath="/"
      pageStructure={{ ...homepageStructure }}
    />
  );
}
