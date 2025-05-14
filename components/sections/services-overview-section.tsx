import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import LazySection from "@/components/ui/lazy-section";
import OptimizedImage from "@/components/ui/optimized-image";
import type { servicesOverviewSectionDataSchema } from "@/lib/schemas/sections.schema";
import type { z } from "zod";

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
				animation="slide-up"
				delay={0}
				className="text-center max-w-3xl mx-auto"
			>
				{badgeText && (
					<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
						{badgeText}
					</Badge>
				)}
				{heading && <h1 className="text-3xl font-bold mb-4">{heading}</h1>}
				{description && <p className="text-gray-700 mb-8">{description}</p>}
			</LazySection>
		</Section>
	);
}
