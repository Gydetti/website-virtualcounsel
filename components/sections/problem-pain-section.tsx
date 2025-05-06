"use client";
import { Section } from "@/components/layout/Section";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export interface ProblemPainSectionProps {
	badgeText?: string;
	heading?: string;
	description?: string;
	calloutText?: string;
	cards?: { title: string; description: string }[];
}

export default function ProblemPainSection({
	badgeText = "The Reality For Most Realtors",
	heading = "Struggling to stand out in a crowded market?",
	description =
		"Most real estate professionals face the same challenges: inconsistent leads, wasted marketing dollars, and not enough time. Without addressing these issues, your business remains vulnerable.",
	calloutText =
		"\"Without a strategic approach to lead generation, realtors risk stagnation while competitors capture market share. The cost of inaction isn't just lost revenue today—it's diminished growth potential for years to come.\"",
	cards = [
		{
			title: "Wasted Ad Spend",
			description:
				"Without a targeted strategy, you're throwing money at ads that don't convert to quality leads.",
		},
		{
			title: "Time Drain",
			description:
				"Hours spent on ineffective prospecting means less time for closing deals and personal life.",
		},
		{
			title: "Inconsistent Results",
			description:
				"The feast-or-famine cycle creates stress and makes business growth impossible to predict.",
		},
		{
			title: "Competitive Pressure",
			description:
				"As more agents adopt digital strategies, those without effective systems fall further behind.",
		},
	],
}: ProblemPainSectionProps) {
	return (
		<Section id="pain" className="bg-gradient-to-b from-transparent to-secondary/10">
			<div className="bg-gray-900 text-white rounded-[30px] border border-gray-700/50 shadow-lg p-12">
				<div className="grid gap-12 lg:grid-cols-2">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="flex flex-col justify-center space-y-8"
					>
						<div className="space-y-4">
							<div className="inline-flex items-center space-x-2 text-secondary">
								<AlertTriangle className="h-5 w-5" />
								<span className="font-medium">{badgeText}</span>
							</div>
							<h2 className="section-title text-white">
								{heading}
							</h2>
							<p className="max-w-[600px] text-gray-400 md:text-xl">
								{description}
							</p>
						</div>
						{calloutText && (
							<div className="rounded-lg bg-gray-800 p-6">
								<p className="text-lg font-medium">{calloutText}</p>
							</div>
						)}
					</motion.div>
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="grid grid-cols-1 gap-6 sm:grid-cols-2"
					>
						{cards.map((card) => (
							<div key={card.title} className="rounded-lg bg-gray-800 p-6">
								<h3 className="mb-3 text-xl font-bold text-secondary">
									{card.title}
								</h3>
								<p className="text-gray-300 text-base md:text-lg">{card.description}</p>
							</div>
						))}
					</motion.div>
				</div>
			</div>
		</Section>
	);
}
