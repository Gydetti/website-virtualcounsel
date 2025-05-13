"use client";
import { Section } from "@/components/layout/Section";
import LazySection from "@/components/ui/lazy-section";
import type { problemPainSectionDataSchema } from "@/lib/schemas/sections.schema";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import type { z } from "zod";

// Updated props type alias using Zod schema
export type ProblemPainSectionProps = z.infer<
	typeof problemPainSectionDataSchema
>;

export default function ProblemPainSection({
	badgeText,
	heading,
	description,
	calloutText,
	cards,
}: ProblemPainSectionProps) {
	return (
		<Section
			id="pain"
			className="bg-gradient-to-b from-transparent to-[rgba(var(--accent-rgb),0.1)]"
		>
			<LazySection
				animation="slide-up"
				delay={0}
				className="-mx-3.5 sm:mx-auto bg-gray-900 text-white rounded-[30px] border border-gray-700/50 shadow-lg p-8 sm:p-12"
			>
				<div className="grid gap-12 lg:grid-cols-2">
					<div className="flex flex-col justify-center space-y-8">
						<div className="space-y-4">
							{badgeText && (
								<div className="inline-flex items-center space-x-2 text-accent">
									<AlertTriangle className="h-5 w-5" />
									<span className="font-medium">{badgeText}</span>
								</div>
							)}
							{heading && (
								<h2 className="section-title text-white">{heading}</h2>
							)}
							{description && (
								<p className="max-w-[600px] text-gray-400 md:text-xl">
									{description}
								</p>
							)}
						</div>
						{calloutText && (
							<div className="rounded-lg bg-gray-800 p-6">
								<p className="text-lg font-medium">{calloutText}</p>
							</div>
						)}
					</div>
					{cards && cards.length > 0 && (
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
							{cards.map((card, idx) => (
								<motion.div
									key={card.id}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: idx * 0.2 }}
									viewport={{ once: true }}
									className="rounded-lg bg-gray-800 p-6"
								>
									<h3 className="mb-3 text-xl font-bold text-accent">
										{card.title}
									</h3>
									<p className="text-gray-300 text-base md:text-lg">
										{card.description}
									</p>
								</motion.div>
							))}
						</div>
					)}
				</div>
			</LazySection>
		</Section>
	);
}
