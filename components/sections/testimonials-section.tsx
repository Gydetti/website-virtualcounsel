"use client";
/* biome-disable lint/suspicious/noArrayIndexKey */

import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface TestimonialsSectionProps {
	badgeText?: string;
	heading?: string;
	subtitle?: string;
	testimonials?: {
		quote: string;
		name: string;
		title: string;
		image: string;
	}[];
}

export default function TestimonialsSection({
	badgeText = "Testimonials",
	heading = "What our clients say",
	subtitle = "Don't just take our word for it. Here's what our clients have to say about working with us.",
	testimonials = [
		{
			quote:
				"Working with this team transformed our online presence. Within three months, our website traffic increased by 150% and our leads doubled. Their strategic approach and attention to detail made all the difference.",
			name: "Sarah Johnson",
			title: "CEO, Innovate Solutions",
			image: "/placeholder.svg?height=60&width=60",
		},
		{
			quote:
				"I was skeptical about digital marketing until I started working with this team. They took the time to understand my business and created a strategy that actually works. My ROI has been incredible.",
			name: "Michael Chen",
			title: "Founder, GrowthTech",
			image: "/placeholder.svg?height=60&width=60",
		},
		{
			quote:
				"The level of expertise and personalized service is outstanding. They don't just implement tactics; they develop comprehensive strategies tailored to my specific goals. I've seen consistent growth month after month.",
			name: "Emma Rodriguez",
			title: "Marketing Director, Elevate Inc.",
			image: "/placeholder.svg?height=60&width=60",
		},
	],
}: TestimonialsSectionProps) {
	const [activeIndex, setActiveIndex] = useState(0);

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
			className="relative overflow-hidden"
		>
			{/* Decorative elements */}
			{/* <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-100/50 rounded-full -translate-y-1/2 blur-3xl" />
			<div className="absolute bottom-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full translate-y-1/2 blur-3xl" /> */}

			<div className="relative z-10">
				<div className="text-center mb-16">
					<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
						{badgeText}
					</Badge>
					<h2 id="testimonials-section-heading" className="section-title">
						{heading}
					</h2>
					<p className="section-subtitle">{subtitle}</p>
				</div>

				<div className="max-w-3xl mx-auto">
					<div className="relative">
						<motion.div
							className="overflow-hidden"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							style={{ overflowX: "hidden" }}
						>
							<div
								className="flex transition-transform duration-500 ease-in-out"
								style={{ transform: `translateX(-${activeIndex * 100}%)` }}
							>
								{testimonials.map((testimonial) => (
									<motion.div
										key={testimonial.name}
										initial={{ opacity: 0 }}
										animate={{
											opacity:
												activeIndex === testimonials.indexOf(testimonial)
													? 1
													: 0,
										}}
										transition={{ duration: 0.5 }}
										className="w-full flex-shrink-0 sm:px-4 pb-12"
									>
										<Card className="border-none shadow-lg hover:shadow-xl transition-all bg-white h-full">
											<CardContent className="p-8">
												<div className="flex items-center mb-6">
													{[1, 2, 3, 4, 5].map((star) => (
														<Star
															key={star}
															aria-hidden="true"
															className="h-5 w-5 text-yellow-400 fill-yellow-400"
														/>
													))}
												</div>
												<p className="text-body-base text-gray-700 italic mb-8 line-clamp-6">
													"{testimonial.quote}"
												</p>
												<div className="flex items-center mt-auto">
													<div className="mr-4">
														<Image
															src={testimonial.image}
															alt={testimonial.name}
															width={60}
															height={60}
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
						</motion.div>

						<div className="flex justify-center mt-4 space-x-2 absolute bottom-0 left-0 right-0">
							{testimonials.map((testimonial, index) => (
								<button
									key={testimonial.name}
									type="button"
									className={`h-3 w-3 rounded-full transition-all ${
										activeIndex === index ? "bg-primary w-6" : "bg-gray-300"
									}`}
									onClick={() => setActiveIndex(index)}
									aria-label={`Go to testimonial ${index + 1}`}
								/>
							))}
						</div>

						<button
							type="button"
							className="hidden sm:inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground absolute top-1/2 -left-12 -translate-y-1/2 bg-white/90 shadow-lg hover:shadow-xl z-10 rounded-full h-12 w-12"
							onClick={prevTestimonial}
							aria-label="Previous testimonial"
						>
							<ChevronLeft aria-hidden="true" className="h-6 w-6" />
						</button>

						<button
							type="button"
							className="hidden sm:inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground absolute top-1/2 -right-12 -translate-y-1/2 bg-white/90 shadow-lg hover:shadow-xl z-10 rounded-full h-12 w-12"
							onClick={nextTestimonial}
							aria-label="Next testimonial"
						>
							<ChevronRight aria-hidden="true" className="h-6 w-6" />
						</button>
					</div>
				</div>
			</div>
		</Section>
	);
}
