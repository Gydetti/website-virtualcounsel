"use client";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export interface SolutionVisionSectionProps {
	badgeText?: string;
	heading?: string;
	description?: string;
	benefits?: string[];
}

export default function SolutionVisionSection({
	badgeText = "Experience the Solution",
	heading = "How We Transform Your Business",
	description = "Through our proven process, we resolve core challenges and drive tangible growth—envision a future where your goals become reality.",
	benefits = [
		"A steady pipeline of qualified leads",
		"Efficient strategies tailored to your goals",
		"A standout brand that attracts attention",
		"Measurable, sustainable business growth",
	],
}: SolutionVisionSectionProps) {
	return (
		<section
			id="solution-vision-section"
			aria-labelledby="solution-vision-section-heading"
			className="section-padding bg-transparent relative overflow-hidden"
		>
			{/* Adjust decorative elements positioning/z-index for overlap */}
			{/* <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/20 rounded-full -translate-y-1/4 translate-x-1/4 blur-3xl z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl z-0" /> */}

			<div className="container-wide relative z-10 text-center">
				<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
					{badgeText}
				</Badge>
				<h2
					id="solution-vision-section-heading"
					className="text-3xl md:text-4xl font-bold mb-4"
				>
					{heading}
				</h2>
				<p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
					{description}
				</p>
				<motion.ul
					className="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					{benefits.map((benefit) => (
						<li key={benefit} className="flex items-start">
							<CheckCircle className="text-green-400 mr-3 mt-1 h-5 w-5 flex-shrink-0" />
							<span>{benefit}</span>
						</li>
					))}
				</motion.ul>
			</div>
		</section>
	);
}
