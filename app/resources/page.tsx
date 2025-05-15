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
	const resources = await getResources();
	if (!resources || resources.length === 0) {
		return (
			<Section className="py-12">
				<div className="container mx-auto px-4 text-center">
					<p className="text-xl text-gray-600">
						No resources available at the moment. Please check back later.
					</p>
				</div>
			</Section>
		);
	}
	// Determine column layout based on resource count
	const count = resources.length;
	const gridCols =
		count === 1
			? "grid-cols-1 md:grid-cols-1 lg:grid-cols-1"
			: count === 2
				? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
				: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
	return (
		<>
			{/* Hero section */}
			<LazySection>
				<Section className="relative overflow-hidden bg-gradient-to-r from-blue-100 via-transparent to-transparent z-10">
					<div className="text-center mb-16">
						<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
							Our Resources
						</Badge>
						<h1 className="text-[var(--font-heading-size)]">Our Resources</h1>
						<p className="text-gray-700 max-w-3xl mx-auto mt-4">
							Explore e-books, guides, and other valuable materials curated to
							help your business grow.
						</p>
					</div>
				</Section>
			</LazySection>

			{/* Resources grid */}
			<LazySection>
				<Section className="py-12">
					<div className="container mx-auto px-4">
						<div className={`grid ${gridCols} gap-8 justify-items-center`}>
							{resources.map((resource, index) => (
								<LazySection
									key={resource.slug}
									delay={index * 0.1}
									className="h-full"
								>
									<Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl">
										<div className="relative h-56 w-full overflow-hidden">
											<OptimizedImage
												src={
													resource.heroImage?.src ||
													"/images/placeholders/placeholder.svg"
												}
												alt={resource.heroImage?.alt || resource.title}
												fill
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
												className="absolute inset-0 object-cover transition-transform duration-300 hover:scale-105"
											/>
										</div>
										<CardHeader>
											<CardTitle className="mt-4 text-xl font-bold hover:text-primary transition-colors">
												<Link href={`/resources/${resource.slug}`}>
													{resource.title}
												</Link>
											</CardTitle>
											{resource.subtitle && (
												<CardDescription className="text-gray-600 line-clamp-3">
													{resource.subtitle}
												</CardDescription>
											)}
										</CardHeader>
										<CardFooter className="mt-auto pt-2">
											<Button
												variant="link"
												className="p-0 group-hover:underline"
												asChild
											>
												<Link href={`/resources/${resource.slug}`}>
													Read more <ArrowRight className="ml-2 h-4 w-4" />
												</Link>
											</Button>
										</CardFooter>
									</Card>
								</LazySection>
							))}
						</div>
					</div>
				</Section>
			</LazySection>
		</>
	);
}

function someFunction(resource: Resource, index: number) {
	// ... existing code ...
}
