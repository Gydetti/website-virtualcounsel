import DynamicPageRenderer from "@/components/layout/DynamicPageRenderer";
import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site.config.local";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Find the page structure for the about page
const aboutPageStructure = siteConfig.pageStructures?.find(
  (p) => p.path === "/about",
);

export async function generateMetadata(): Promise<Metadata> {
  if (siteConfig.enabledPages && !siteConfig.enabledPages.includes("/about")) {
    return defaultMetadata({ title: "Page Not Found" });
  }

  const pageSeo = aboutPageStructure?.seo;
  const title = pageSeo?.title || "About Us";
  const description =
    pageSeo?.description || `Learn more about ${siteConfig.site.name}.`;

  return defaultMetadata({
    title: `${title} | ${siteConfig.site.name}`,
    description: description,
  });
}

export default async function AboutPage() {
  if (siteConfig.enabledPages && !siteConfig.enabledPages.includes("/about")) {
    notFound();
  }

  if (!aboutPageStructure) {
    return (
      <div className="container py-12 text-center">
        <p className="text-xl text-red-600">
          About page structure is not defined in site configuration.
        </p>
      </div>
    );
  }

  return (
    <DynamicPageRenderer pagePath="/about" pageStructure={aboutPageStructure} />
  );
}
