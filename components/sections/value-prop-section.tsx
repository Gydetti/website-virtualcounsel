"use client";

import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

export interface ValuePropSectionProps {
	/** Label above the heading */
	badgeText?: string;
	/** Main heading text */
	heading?: string;
	/** Subheading or description text */
	subheading?: string;
	/** List of benefit items */
	benefits?: {
		title: string;
		description: string;
		icon: string;
	}[];
}

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
	"check-circle": CheckCircle,
	// Add more icons as needed
};

export default function ValuePropSection({
	badgeText = "Why Choose Us",
	heading = "Transform Your Real Estate Business",
	subheading = "Our unique approach combines proven marketing strategies with real estate expertise to deliver results that matter.",
	benefits = [
		{
			title: "Save 10+ Hours Weekly",
			description:
				"Our streamlined systems eliminate manual prospecting, giving you back precious time for closing deals.",
			icon: "check-circle",
		},
		{
			title: "Personalized Strategy",
			description:
				"Unlike generic marketing courses, we create custom plans based on your specific market and strengths.",
			icon: "check-circle",
		},
		{
			title: "Proven Results",
			description:
				"Our clients see an average 127% increase in qualified leads within the first 90 days of implementation.",
			icon: "check-circle",
		},
	],
}: ValuePropSectionProps) {
	return (
		<Section
			id="value-prop-section"
			className="bg-gradient-to-b from-white/70 to-white/0"
		>
			<div className="text-center mb-16">
				<Badge className="mb-4 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground">
					{badgeText}
				</Badge>
				<h2 className="section-title">{heading}</h2>
				<p className="section-subtitle">{subheading}</p>
			</div>
			<div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
				{benefits.map((benefit, idx) => {
					const Icon =
						iconMap[benefit.icon as keyof typeof iconMap] ?? CheckCircle;
					return (
						<motion.div
							key={benefit.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: idx * 0.2 }}
							viewport={{ once: true }}
							className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm hover:shadow-md"
						>
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground">
								<Icon className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-bold">{benefit.title}</h3>
							<p className="text-gray-500 dark:text-gray-400">
								{benefit.description}
							</p>
						</motion.div>
					);
				})}
			</div>
		</Section>
	);
}
