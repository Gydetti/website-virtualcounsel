"use client";
/* biome-disable lint/suspicious/noArrayIndexKey */

import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import LazySection from "@/components/ui/lazy-section";
import type {
	testimonialItemSchema,
	testimonialsSectionDataSchema,
} from "@/lib/schemas/sections.schema";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { z } from "zod";

// Updated props type alias using Zod schema
export type TestimonialsSectionProps = z.infer<
	typeof testimonialsSectionDataSchema
>;

export default function TestimonialsSection({
	badgeText,
	heading,
	subtitle,
	testimonials,
}: TestimonialsSectionProps) {
	const [activeIndex, setActiveIndex] = useState(0);

	if (!testimonials || testimonials.length === 0) {
		return null; // Or some placeholder if the section must render
	}

	const nextTestimonial = () => {
		setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
	};

	const prevTestimonial = () => {
		setActiveIndex(
			(prevIndex) =>
				(prevIndex - 1 + testimonials.length) % testimonials.length,
		);
	};

	return (
		<Section
			id="testimonials-section"
			aria-labelledby="testimonials-section-heading"
			className="relative overflow-hidden "
		>
			{/* Decorative elements - re-enabled and styled with theme colors */}
			<div className="hidden sm:block absolute top-0 right-1/4 w-72 h-72 bg-[rgba(var(--accent-rgb),0.03)] rounded-full -translate-y-1/2 blur-3xl pointer-events-none" />
			<div className="hidden sm:block absolute bottom-0 left-1/4 w-72 h-72 bg-[rgba(var(--primary-rgb),0.03)] rounded-full translate-y-1/2 blur-3xl pointer-events-none" />

			<div className="relative z-10">
				<div className="text-center mb-16">
					<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
						{badgeText}
					</Badge>
					<h2
						id="testimonials-section-heading"
						className="text-[var(--font-subheading-size)]"
					>
						{heading}
					</h2>
					<p className="section-subtitle">{subtitle}</p>
				</div>

				<LazySection
					animation="slide-up"
					delay={0}
					className="max-w-3xl mx-auto relative"
				>
					<div className="overflow-hidden overflow-x-hidden">
						<div
							className="flex transition-transform duration-500 ease-in-out"
							style={{ transform: `translateX(-${activeIndex * 100}%)` }}
						>
							{testimonials.map((testimonial, index) => (
								<motion.div
									key={testimonial.id}
									initial={{ opacity: 0 }}
									animate={{
										opacity: activeIndex === index ? 1 : 0,
									}}
									transition={{ duration: 0.5 }}
									className="w-full flex-shrink-0 sm:px-4 pb-12"
								>
									<Card className="border border-[#e5e7eb80] shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-white to-blue-50/10 backdrop-blur-sm h-full">
										<CardContent className="p-8">
											<div className="flex items-center mb-6">
												{testimonial.rating && testimonial.rating > 0
													? Array.from({ length: 5 }).map((_, starIndex) => (
															<Star
																key={`${testimonial.id}-star-${starIndex}`}
																aria-hidden="true"
																className={`h-5 w-5 ${
																	starIndex < (testimonial.rating || 0)
																		? "text-yellow-400 fill-yellow-400"
																		: "text-gray-300 fill-gray-300"
																}`}
															/>
														))
													: Array.from({ length: 5 }).map((_, starIndex) => (
															<Star
																key={`${testimonial.id}-star-${starIndex}`}
																aria-hidden="true"
																className="h-5 w-5 text-gray-300 fill-gray-300"
															/>
														))}
											</div>
											<p className="text-body-base text-gray-700 italic mb-8 line-clamp-6">
												&quot;{testimonial.quote}&quot;
											</p>
											<div className="flex items-center mt-auto">
												<div className="mr-4">
													<Image
														src={testimonial.image.src}
														alt={testimonial.image.alt}
														width={testimonial.image.width || 60}
														height={testimonial.image.height || 60}
														className="rounded-full border-2 border-gray-100"
													/>
												</div>
												<div>
													<h3 className="text-body-base text-gray-900">
														{testimonial.name}
													</h3>
													<p className="text-body-base text-gray-600">
														{testimonial.title}
													</p>
												</div>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</div>

					<button
						type="button"
						className="hidden sm:inline-flex items-center justify-center transition-colors absolute top-1/2 -translate-y-1/2 -left-8 bg-white/90 border border-input rounded-full h-12 w-12 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary-10 hover:text-primary z-10"
						onClick={prevTestimonial}
						aria-label="Previous testimonial"
					>
						<ChevronLeft aria-hidden="true" className="h-6 w-6" />
					</button>

					<button
						type="button"
						className="hidden sm:inline-flex items-center justify-center transition-colors absolute top-1/2 -translate-y-1/2 -right-8 bg-white/90 border border-input rounded-full h-12 w-12 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary-10 hover:text-primary z-10"
						onClick={nextTestimonial}
						aria-label="Next testimonial"
					>
						<ChevronRight aria-hidden="true" className="h-6 w-6" />
					</button>
				</LazySection>

				<div className="flex justify-center mt-4 space-x-2 absolute bottom-0 left-0 right-0">
					{testimonials.map((testimonial, index) => (
						<button
							key={testimonial.id}
							type="button"
							className={`h-3 w-3 rounded-full transition-all ${
								activeIndex === index ? "bg-primary w-6" : "bg-gray-300"
							}`}
							onClick={() => setActiveIndex(index)}
							aria-label={`Go to testimonial ${index + 1}`}
						/>
					))}
				</div>
			</div>

			{/* Authority Badge */}
			<div className="mt-16 flex justify-center">
				<div className="inline-flex items-center rounded-full border border-secondary bg-white px-6 py-2 text-sm font-medium shadow-lg dark:bg-gray-800 dark:text-primary-foreground">
					<span className="mr-2 h-2 w-2 rounded-full bg-secondary dark:bg-primary-foreground" />
					Show that you are certified or an expert in your field
				</div>
			</div>
		</Section>
	);
}
