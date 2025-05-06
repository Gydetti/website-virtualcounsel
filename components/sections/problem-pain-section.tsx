"use client";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { Section } from "@/components/layout/Section";

export interface ProblemPainSectionProps {
	badgeText?: string;
	heading?: string;
	description?: string;
	points?: string[];
}

export default function ProblemPainSection({
	badgeText = "Understand the Pain",
	heading = "Recognize Your Challenges",
	description = "Acknowledge the core obstacles visitors face and outline what's at stake if these issues go unaddressed.",
	points = [
		"Inconsistent lead flow and weak pipeline",
		"Wasted time on ineffective marketing",
		"Falling behind more visible competitors",
		"Unpredictable or stagnant growth",
	],
}: ProblemPainSectionProps) {
	return (
		<Section id="pain" className="relative">
			{/* Ensure decorative elements overlap edges if needed */}
			{/*<div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/4 -translate-x-1/4 blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-100/20 rounded-full translate-y-1/4 translate-x-1/4 blur-3xl z-0" />*/}

			<div className="relative z-10 text-center">
				<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
					{badgeText}
				</Badge>
				<h2
					id="problem-pain-section-heading"
					className="section-title"
				>
					{heading}
				</h2>
				<p className="text-gray-700 max-w-2xl mx-auto mb-8">
					{description}
				</p>
				<motion.ul
					className="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					{points.map((point) => (
						<li key={point} className="flex items-start">
							<XCircle className="text-red-400 mr-3 mt-1 h-5 w-5 flex-shrink-0" />
							<span>{point}</span>
						</li>
					))}
				</motion.ul>
			</div>
		</Section>
	);
}
