"use client";

import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import LazySection from "@/components/ui/lazy-section";
import type { valuePropSectionDataSchema } from "@/lib/schemas/sections.schema";
import { CheckCircle } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import type { z } from "zod";

// Updated props type alias using Zod schema
export type ValuePropSectionProps = z.infer<typeof valuePropSectionDataSchema>;

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
	"check-circle": CheckCircle,
	// Add more icons as needed
};

export default function ValuePropSection({
	badgeText,
	heading,
	subheading,
	benefits,
}: ValuePropSectionProps) {
	if (!benefits || benefits.length === 0) {
		// Schema enforces min(1), but good practice for robustness
		return null;
	}

	return (
		<Section
			id="value-prop-section"
			className="bg-gradient-to-b from-white/70 to-white/0"
		>
			<div className="text-center mb-16">
				{badgeText && (
					<Badge className="mb-4">
						{badgeText}
					</Badge>
				)}
				{heading && <h2 className="section-title">{heading}</h2>}
				{subheading && <p className="section-subtitle">{subheading}</p>}
			</div>
			<div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
				{benefits.map((benefit, idx) => {
					const Icon =
						iconMap[benefit.icon as keyof typeof iconMap] ?? CheckCircle;
					return (
						<LazySection
							key={benefit.id}
							animation="slide-up"
							delay={idx * 0.2}
							className="flex flex-col items-start space-y-3 rounded-lg p-6 shadow-sm hover:shadow-md"
						>
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(var(--primary-rgb),0.1)] text-primary dark:bg-[rgba(var(--primary-rgb),0.2)] dark:text-primary-foreground">
								<Icon className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-bold">{benefit.title}</h3>
							<p className="text-gray-500 dark:text-gray-400">
								{benefit.description}
							</p>
						</LazySection>
					);
				})}
			</div>
		</Section>
	);
}
