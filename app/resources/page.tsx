import DynamicPageRenderer from "@/components/layout/DynamicPageRenderer";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LazySection from "@/components/ui/lazy-section";
import OptimizedImage from "@/components/ui/optimized-image";
import { getResources } from "@/lib/data/resources";
import type { Resource } from "@/lib/data/resources";
import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site.config.local";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Metadata
export async function generateMetadata(): Promise<Metadata> {
  const title = `Resources | ${siteConfig.site.name}`;
  const description = `Explore various resources offered by ${siteConfig.site.name}.`;

  return defaultMetadata({
    title,
    description,
  });
}

export default async function ResourcesIndexPage() {
  // Use DynamicPageRenderer for ResourceListSection
  const resourcesListPageStructure = siteConfig.pageStructures?.find(
    (p) => p.path === "/resources",
  );
  if (!resourcesListPageStructure) {
    return (
      <Section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl text-red-600">
            Resources page structure not defined in site configuration.
          </p>
        </div>
      </Section>
    );
  }
  const currentPagePath = "/resources";
  return (
    <DynamicPageRenderer
      pagePath={currentPagePath}
      pageStructure={resourcesListPageStructure}
    />
  );
}

function someFunction(resource: Resource, index: number) {
  // ... existing code ...
}
