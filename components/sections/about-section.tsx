"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";

export default function AboutSection() {
	return (
		<Section
			id="about"
			className="relative overflow-hidden bg-gradient-to-r from-blue-100 to-white relative z-10"
		>
			<div className="grid md:grid-cols-2 gap-12 items-center">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className="relative"
				>
					<div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-full z-0" />
					<div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full z-0" />

					<div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl z-10">
						<Image
							src="/placeholder.svg?height=500&width=500"
							alt="About our company"
							fill
							className="object-cover"
						/>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
						About us
					</Badge>
					<h2 className="section-title">
						Our story and mission
					</h2>
					<p className="text-gray-700 mb-6">
						We're a team of digital experts passionate about helping
						entrepreneurs succeed. With years of experience across various
						industries, we understand the unique challenges small businesses
						face in the digital landscape.
					</p>
					<p className="text-gray-700 mb-6">
						Our approach combines strategic thinking with practical solutions.
						We don't just implement tactics; we develop comprehensive
						strategies tailored to your specific goals and audience.
					</p>
					<p className="text-gray-700 mb-8">
						What sets us apart is our commitment to your success. We measure
						our success by your results, and we're dedicated to helping you
						achieve sustainable growth.
					</p>

					<div className="grid grid-cols-2 gap-4 mb-8">
						<div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
							<div className="font-bold text-primary text-xl">95%</div>
							<div className="text-gray-600">Client satisfaction</div>
						</div>
						<div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
							<div className="font-bold text-primary text-xl">120+</div>
							<div className="text-gray-600">Projects completed</div>
						</div>
						<div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
							<div className="font-bold text-primary text-xl">7+</div>
							<div className="text-gray-600">Years experience</div>
						</div>
						<div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
							<div className="font-bold text-primary text-xl">50+</div>
							<div className="text-gray-600">Happy clients</div>
						</div>
					</div>

					<Button
						size="lg"
						className="bg-primary hover:bg-primary/90 group"
						asChild
					>
						<Link href="/about">
							Learn more about us
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</Button>
				</motion.div>
			</div>
		</Section>
	);
}
