import { servicesOverviewSectionDataSchema } from "@/lib/schemas/sections.schema";
import type { z } from "zod";

export const servicesOverviewSectionData: z.infer<
	typeof servicesOverviewSectionDataSchema
> = {
	badgeText: "Our services",
	heading: "What we offer",
	description:
		"Explore our full range of services designed to help your business grow, optimize operations, and achieve measurable success.",
};

// Validate data
try {
	servicesOverviewSectionDataSchema.parse(servicesOverviewSectionData);
} catch (error) {
	console.error(
		"Error validating servicesOverviewSectionData:",
		error instanceof Error ? error.message : error,
	);
}
