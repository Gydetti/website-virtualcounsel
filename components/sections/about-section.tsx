"use client";

import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/ui/optimized-image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
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
					<div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full z-0" />
					<div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full z-0" />

					<OptimizedImage
						src="/placeholder.svg?height=500&width=500"
						alt="About our company"
						fill
						className="h-[400px] md:h-[500px] rounded-xl shadow-2xl z-10"
						objectFit="cover"
						priority
					/>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
						About section badge: short label indicating company story
					</Badge>
					<h2 className="section-title">Our story and mission</h2>
					<p className="text-gray-700 mb-6">
						Introduce your company and core mission. Provide a brief overview of
						your expertise and industry experience. Explain how this background
						benefits your clients.
					</p>
					<p className="text-gray-700 mb-6">
						Describe your unique methodology and strategic approach. Outline key
						processes or frameworks you follow. Emphasize how this approach
						effectively solves client challenges.
					</p>
					<p className="text-gray-700 mb-8">
						Highlight your commitment to delivering measurable results and
						value. Explain how you track success and adapt strategies. Reinforce
						dedication to long-term partnership and support.
					</p>

					<div className="grid grid-cols-2 gap-4 mb-8">
						<div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
							<div className="font-bold text-primary text-xl">Stat value</div>
							<div className="text-gray-600">
								Stat label (e.g., client satisfaction)
							</div>
						</div>
						<div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
							<div className="font-bold text-primary text-xl">Stat value</div>
							<div className="text-gray-600">
								Stat label (e.g., projects completed)
							</div>
						</div>
						<div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
							<div className="font-bold text-primary text-xl">Stat value</div>
							<div className="text-gray-600">
								Stat label (e.g., years experience)
							</div>
						</div>
						<div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
							<div className="font-bold text-primary text-xl">Stat value</div>
							<div className="text-gray-600">
								Stat label (e.g., happy clients)
							</div>
						</div>
					</div>

					<Button
						size="lg"
						className="bg-primary hover:bg-primary/90 group"
						asChild
					>
						<Link href="/about">
							Call to action linking to full about page
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</Button>
				</motion.div>
			</div>
		</Section>
	);
}
