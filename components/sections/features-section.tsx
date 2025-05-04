"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function FeaturesSection() {
	return (
		<section className="section-padding text-gray-800 relative overflow-hidden">
			{/* Ensure decorative elements overlap edges */}
			{/* <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/4 translate-x-1/4 blur-3xl z-0" /> */}

			<div className="container-wide relative z-10">
				<div className="max-w-3xl mx-auto text-center mb-12">
					<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
						Why choose us
					</Badge>
					<h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
						Transform your business
					</h2>
					<p className="text-lg text-gray-700">
						See the difference our services can make for your business growth
						and online presence.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8 mb-16">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="rounded-lg border border-red-200 bg-red-50/50 backdrop-blur p-6 hover:bg-red-100/50 transition-colors text-gray-800"
					>
						<h3 className="text-xl font-bold text-red-400 mb-4">
							Without our services
						</h3>
						<ul className="space-y-3">
							<li className="flex items-start">
								<XCircle className="text-red-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
								<span className="text-gray-700">Struggling to attract qualified leads online</span>
							</li>
							<li className="flex items-start">
								<XCircle className="text-red-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
								<span className="text-gray-700">Wasting time on ineffective marketing strategies</span>
							</li>
							<li className="flex items-start">
								<XCircle className="text-red-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
								<span className="text-gray-700">Losing business to more visible competitors</span>
							</li>
							<li className="flex items-start">
								<XCircle className="text-red-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
								<span className="text-gray-700">Inconsistent results and unpredictable growth</span>
							</li>
							<li className="flex items-start">
								<XCircle className="text-red-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
								<span className="text-gray-700">Feeling overwhelmed by constant digital changes</span>
							</li>
						</ul>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="rounded-lg border border-green-200 bg-green-50/50 backdrop-blur p-6 hover:bg-green-100/50 transition-colors text-gray-800"
					>
						<h3 className="text-xl font-bold text-green-400 mb-4">
							With our services
						</h3>
						<ul className="space-y-3">
							<li className="flex items-start">
								<CheckCircle className="text-green-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
								<span className="text-gray-700">
									Steady flow of qualified leads from your digital presence
								</span>
							</li>
							<li className="flex items-start">
								<CheckCircle className="text-green-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
								<span className="text-gray-700">
									Strategic approach that maximizes your time and budget
								</span>
							</li>
							<li className="flex items-start">
								<CheckCircle className="text-green-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
								<span className="text-gray-700">Stand out from competitors with a distinctive brand</span>
							</li>
							<li className="flex items-start">
								<CheckCircle className="text-green-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
								<span className="text-gray-700">Consistent, measurable growth you can track</span>
							</li>
							<li className="flex items-start">
								<CheckCircle className="text-green-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
								<span className="text-gray-700">
									Expert guidance keeping you ahead of industry trends
								</span>
							</li>
						</ul>
					</motion.div>
				</div>

				<div className="text-center">
					<Button
						size="lg"
						className="bg-primary text-white hover:bg-primary/90 group"
						asChild
					>
						<Link href="/services">
							Explore our services
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
