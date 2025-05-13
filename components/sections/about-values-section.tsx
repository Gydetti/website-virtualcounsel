import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import LazySection from "@/components/ui/lazy-section";
import type { aboutValuesSectionDataSchema } from "@/lib/schemas/sections.schema";
import type { z } from "zod";

export type AboutValuesSectionProps = z.infer<
	typeof aboutValuesSectionDataSchema
>;

export default function AboutValuesSection({
	badgeText,
	heading,
	values,
}: AboutValuesSectionProps) {
	return (
		<Section id="about-values" className="py-12">
			<LazySection
				animation="slide-up"
				delay={0}
				className="max-w-3xl mx-auto text-center"
			>
				{badgeText && (
					<Badge className="mb-4 bg-primary text-primary-foreground">
						{badgeText}
					</Badge>
				)}
				{heading && <h3 className="section-title mb-6">{heading}</h3>}
				<ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{values.map((value) => (
						<li key={value} className="text-gray-700 text-lg">
							• {value}
						</li>
					))}
				</ul>
			</LazySection>
		</Section>
	);
}
