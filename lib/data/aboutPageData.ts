import { z } from "zod";
import { aboutSectionDataSchema } from "../schemas/sections.schema";

export const aboutPageMainContentData: z.infer<typeof aboutSectionDataSchema> =
	{
		// id for the data object itself is not part of the section's props schema
		badgeText: "Our Story",
		heading: "About [Client/Company Name]", // Placeholder for client to fill
		paragraphs: [
			"Paragraph 1: Introduce the company/individual, its mission, and core values. Explain the 'why' behind the business.",
			"Paragraph 2: Briefly touch upon the history, key milestones, or the journey so far.",
			"Paragraph 3: Highlight what makes the company/individual unique, its approach, or its commitment to clients.",
		],
		image: {
			src: "/placeholder.svg?width=500&height=500",
			alt: "Image representing our company", // Generic alt
			width: 500,
			height: 500,
		},
		stats: [
			{
				id: "stat-experience",
				value: "10+ Years",
				label: "Industry Experience",
			},
			{ id: "stat-clients", value: "100+", label: "Satisfied Clients" },
		],
		cta: {
			text: "Learn More About Our Services",
			href: "/services",
		},
	};

// Validate data
try {
	aboutSectionDataSchema.parse(aboutPageMainContentData);
} catch (error) {
	console.error(
		"Error validating aboutPageMainContentData:",
		error instanceof z.ZodError ? error.errors : error,
	);
	// Potentially throw error in build to ensure data conforms
}

// Data for About Values & Philosophy section
export const aboutValuesSectionData = {
	badgeText: "Our Values",
	heading: "Our Core Beliefs",
	values: ["Integrity", "Innovation", "Empathy"],
};

// Data for About Social Proof snippet section
export const aboutSocialProofSectionData = {
	badgeText: "Experience & Trust",
	heading: "What Clients Are Saying",
	socialProof: [
		{
			id: "sp1",
			quote:
				"Working with them transformed our business - their expertise is unmatched.",
			name: "Alex Martinez",
			title: "CEO, Tech Solutions",
			image: {
				src: "/images/testimonials/alex.jpg",
				alt: "Alex Martinez",
				width: 60,
				height: 60,
			},
		},
		{
			id: "sp2",
			quote:
				"Their team truly cares about our success and delivers beyond expectations.",
			name: "Samantha Lee",
			title: "Founder, Creative Co.",
			image: {
				src: "/images/testimonials/samantha.jpg",
				alt: "Samantha Lee",
				width: 60,
				height: 60,
			},
		},
	],
};

// Validate new data
import {
	aboutSocialProofSectionDataSchema,
	aboutValuesSectionDataSchema,
} from "@/lib/schemas/sections.schema";
try {
	aboutValuesSectionDataSchema.parse(aboutValuesSectionData);
	aboutSocialProofSectionDataSchema.parse(aboutSocialProofSectionData);
} catch (error) {
	console.error(
		"Error validating About values or social proof data:",
		error instanceof Error ? error.message : error,
	);
}
