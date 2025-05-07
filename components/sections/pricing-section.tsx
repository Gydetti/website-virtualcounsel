"use client";

import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

interface PricingCard {
	title: string;
	price: string;
	features: string[];
	cta: { text: string; href: string };
}

interface PricingSectionProps {
	cards: PricingCard[];
}

export default function PricingSection({ cards }: PricingSectionProps) {
	return (
		<Section id="pricing" className="bg-white relative overflow-hidden">
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true }}
				className="text-center mb-16"
			>
				<h2 className="section-title">Pricing Plans</h2>
				<p className="section-subtitle">
					Choose the plan that best fits your needs
				</p>
			</motion.div>
			<div className="grid gap-8 md:grid-cols-3 items-stretch">
				{cards.map((card, idx) => (
					<motion.div
						key={card.title}
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: idx * 0.1 }}
						viewport={{ once: true }}
					>
						<Card className="relative flex h-full flex-col justify-between border border-gray-200 bg-white shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg">
							{idx === 1 && (
								<div className="absolute top-0 right-0 mt-4 mr-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
									Popular
								</div>
							)}
							<CardHeader className="text-center bg-gray-50 px-6 py-8 rounded-t-lg">
								<CardTitle>{card.title}</CardTitle>
								<div className="mt-2 text-3xl font-bold">{card.price}</div>
							</CardHeader>
							<CardContent className="flex-grow px-6 py-4">
								<ul className="space-y-3">
									{card.features.map((feature) => (
										<li key={feature} className="flex items-start">
											<span className="text-green-500 mr-3 mt-1">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="h-5 w-5"
												>
													<title>Feature checkmark</title>
													<polyline points="20 6 9 17 4 12" />
												</svg>
											</span>
											<span>{feature}</span>
										</li>
									))}
								</ul>
							</CardContent>
							<CardFooter className="text-center px-6 py-6">
								<Button
									asChild
									className="w-full bg-primary hover:bg-primary/90 py-3 text-sm font-semibold"
								>
									<a href={card.cta.href}>{card.cta.text}</a>
								</Button>
							</CardFooter>
						</Card>
					</motion.div>
				))}
			</div>
		</Section>
	);
}
