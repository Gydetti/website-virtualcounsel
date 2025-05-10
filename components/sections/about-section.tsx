"use client";

import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/ui/optimized-image";
import type { aboutSectionDataSchema } from "@/lib/schemas/sections.schema";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { z } from "zod";

// Updated props type alias using Zod schema
export type AboutSectionProps = z.infer<typeof aboutSectionDataSchema>;

export default function AboutSection({
	badgeText,
	heading,
	paragraphs,
	image,
	stats,
	cta,
}: AboutSectionProps) {
	return (
		<Section
			id="about"
			className="relative overflow-hidden bg-gradient-to-r from-blue-100 via-transparent to-transparent z-10"
		>
			<div className="grid md:grid-cols-2 gap-12 items-center">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className="relative"
				>
					{image?.src && (
						<>
							<div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full z-0" />
							<div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full z-0" />
							<OptimizedImage
								src={image.src}
								alt={image.alt || "About our company"}
								width={image.width || 500} // Provide default/required dimensions
								height={image.height || 500}
								fill={false} // Explicitly false if width/height are given, or true if parent has fixed size and fill is intended
								className="h-auto w-full max-h-[400px] md:max-h-[500px] rounded-xl shadow-2xl z-10 object-cover"
								priority
							/>
						</>
					)}
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					{badgeText && (
						<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
							{badgeText}
						</Badge>
					)}
					{heading && <h2 className="section-title">{heading}</h2>}
					{paragraphs?.map((p) => (
						<p key={p.slice(0, 16)} className="text-gray-700 mb-6 last:mb-8">
							{p}
						</p>
					))}

					{stats && stats.length > 0 && (
						<div className="grid grid-cols-2 gap-4 mb-8">
							{stats.map((stat) => (
								<div
									key={stat.id}
									className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
								>
									<div className="font-bold text-primary text-xl">
										{stat.value}
									</div>
									<div className="text-gray-600">{stat.label}</div>
								</div>
							))}
						</div>
					)}

					{cta?.href && cta?.text && (
						<Button
							size="lg"
							className="bg-primary hover:bg-primary/90 group"
							asChild
						>
							<Link href={cta.href}>
								{cta.text}
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</Button>
					)}
				</motion.div>
			</div>
		</Section>
	);
}
