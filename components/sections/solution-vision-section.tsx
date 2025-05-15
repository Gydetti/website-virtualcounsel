"use client";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import LazySection from "@/components/ui/lazy-section";
import type { solutionVisionSectionDataSchema } from "@/lib/schemas/sections.schema";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import type { z } from "zod";

// Updated props type alias using Zod schema
export type SolutionVisionSectionProps = z.infer<
	typeof solutionVisionSectionDataSchema
>;

// Micro-animation variants for text elements
const textVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, delay: i * 0.2, ease: "easeIn" },
	}),
};

export default function SolutionVisionSection({
	badgeText,
	heading,
	description,
	benefits,
	calloutText,
	calloutCta, // Replaces calloutLinkText and calloutLinkHref
}: SolutionVisionSectionProps) {
	return (
		<Section
			id="solution-vision-section"
			className="pattern-overlay pattern-overlay-fade bg-gradient-to-b from-[rgba(var(--accent-rgb),0.1)] via-transparent to-transparent"
		>
			{/* Scroll reveal header */}
			<LazySection
				animation="slide-up"
				delay={0}
				className="text-center mb-16 max-w-4xl mx-auto"
			>
				<motion.div custom={0} variants={textVariants} className="mb-4">
					<Badge variant="secondary" className="px-3 py-1 rounded-full text-sm">
						{badgeText}
					</Badge>
				</motion.div>
				<motion.h2
					custom={1}
					variants={textVariants}
					className="section-title text-3xl sm:text-4xl md:text-5xl"
				>
					{heading}
				</motion.h2>
				<motion.p
					custom={2}
					variants={textVariants}
					className="section-subtitle"
				>
					{description}
				</motion.p>
			</LazySection>

			{/* Unified motion glass card for subheading & benefits */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="mx-auto max-w-4xl bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl p-6 md:p-12 space-y-8"
			>
				<h3 className="font-semibold text-lg text-center mt-0 mb-0">
					Imagine having:
				</h3>
				{benefits && benefits.length > 0 && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{benefits.map((b) => (
							<div key={b} className="flex items-start space-x-2">
								<CheckCircle className="h-5 w-5 text-accent mt-1" />
								<span className="text-gray-700">{b}</span>
							</div>
						))}
					</div>
				)}
			</motion.div>

			{/* Callout Card Animation */}
			{calloutText && (
				<motion.div
					custom={1}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={textVariants}
					className="mt-16 max-w-4xl mx-auto bg-[rgba(var(--accent-rgb),0.1)] p-6 rounded-lg"
				>
					<p className="text-gray-900 font-medium mb-2">{calloutText}</p>
					{calloutCta?.href && calloutCta?.text && (
						<a href={calloutCta.href} className="text-secondary font-semibold">
							{calloutCta.text} →
						</a>
					)}
				</motion.div>
			)}
		</Section>
	);
}
