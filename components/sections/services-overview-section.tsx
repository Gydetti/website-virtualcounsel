import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import LazySection from "@/components/ui/lazy-section";
import OptimizedImage from "@/components/ui/optimized-image";
import type { servicesOverviewSectionDataSchema } from "@/lib/schemas/sections.schema";
import type { z } from "zod";
import type { CSSProperties } from "react";

export type ServicesOverviewSectionProps = z.infer<
	typeof servicesOverviewSectionDataSchema
>;

export default function ServicesOverviewSection({
	badgeText,
	heading,
	description,
}: ServicesOverviewSectionProps) {
	return (
		<Section
			id="services-overview"
			className="relative overflow-hidden bg-gradient-to-r from-blue-100 via-transparent to-transparent z-10 py-12"
		>
			<LazySection
				animation="none"
				className="stagger-container text-center max-w-3xl mx-auto"
				style={{ '--stagger-delay': '0.1s' } as CSSProperties}
			>
				{badgeText && (
					<Badge className="mb-4" style={{ '--index': 0 } as CSSProperties}>
						{badgeText}
					</Badge>
				)}
				{heading && (
					<h1 className="text-[var(--font-heading-size)] mb-4" style={{ '--index': 1 } as CSSProperties}>
						{heading}
					</h1>
				)}
				{description && (
					<p className="text-gray-700 mb-8" style={{ '--index': 2 } as CSSProperties}>
						{description}
					</p>
				)}
			</LazySection>
		</Section>
	);
}
