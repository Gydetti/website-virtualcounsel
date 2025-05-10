"use client";
import { Section } from "@/components/layout/Section";
import type { problemPainSectionDataSchema } from "@/lib/schemas/sections.schema";
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
			className="bg-gradient-to-b from-transparent to-secondary/10"
		>
			<div className="bg-gray-900 text-white rounded-[30px] border border-gray-700/50 shadow-lg p-6 sm:p-12">
				<div className="grid gap-12 lg:grid-cols-2">
					<div className="flex flex-col justify-center space-y-8">
						<div className="space-y-4">
							{badgeText && (
								<div className="inline-flex items-center space-x-2 text-secondary">
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
							{cards.map((card) => (
								<div key={card.id} className="rounded-lg bg-gray-800 p-6">
									<h3 className="mb-3 text-xl font-bold text-secondary">
										{card.title}
									</h3>
									<p className="text-gray-300 text-base md:text-lg">
										{card.description}
									</p>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</Section>
	);
}
