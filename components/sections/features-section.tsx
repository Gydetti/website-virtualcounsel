"use client";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/ui/optimized-image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export interface FeaturesSectionProps {
  badgeText?: string;
  heading?: string;
  description?: string;
  withoutTitle?: string;
  withoutItems?: string[];
  withTitle?: string;
  withItems?: string[];
  ctaText?: string;
  ctaLink?: string;
}

export default function FeaturesSection({
  badgeText = "Short label introducing benefits comparison",
  heading = "Section heading comparing before and after scenarios",
  description = "Brief description explaining feature impact on business outcomes",
  withoutTitle = "Subheading for without-services scenario",
  withoutItems = [
    "Placeholder item for negative scenario",
    "Placeholder item for negative scenario",
    "Placeholder item for negative scenario",
    "Placeholder item for negative scenario",
    "Placeholder item for negative scenario",
  ],
  withTitle = "Subheading for with-services scenario",
  withItems = [
    "Placeholder item for positive outcome",
    "Placeholder item for positive outcome",
    "Placeholder item for positive outcome",
    "Placeholder item for positive outcome",
    "Placeholder item for positive outcome",
  ],
  ctaText = "Link text for exploring services",
  ctaLink = "/services",
}: FeaturesSectionProps) {
  return (
    <Section
      id="features-section"
      aria-labelledby="features-section-heading"
      className="text-gray-800 relative overflow-hidden"
    >
      {/* Ensure decorative elements overlap edges */}
      {/* <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/4 translate-x-1/4 blur-3xl z-0" /> */}

      <div className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
            {badgeText}
          </Badge>
          <h2
            id="features-section-heading"
            className="section-title text-gray-900"
          >
            {heading}
          </h2>
          <p className="text-gray-700">{description}</p>
        </div>

        <div className="relative grid md:grid-cols-2 gap-8 md:gap-0 mb-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:w-4/5 md:mx-auto rounded-lg border border-red-200 bg-red-50/50 backdrop-blur p-6 hover:bg-red-100/50 transition-colors text-gray-800"
          >
            <h3 className="text-red-400 mb-4">{withoutTitle}</h3>
            <ul className="space-y-3">
              {withoutItems.map((item) => (
                <li key={item} className="flex items-start">
                  <XCircle className="text-red-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:w-4/5 md:mx-auto rounded-lg border border-green-200 bg-green-50/50 backdrop-blur p-6 hover:bg-green-100/50 transition-colors text-gray-800"
          >
            <h3 className="text-green-400 mb-4">{withTitle}</h3>
            <ul className="space-y-3">
              {withItems.map((item) => (
                <li key={item} className="flex items-start">
                  <CheckCircle className="text-green-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Decorative arrow image between cards on desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <OptimizedImage
              src="/images/general/1 bend arrow right.svg"
              alt="Arrow indicating transition"
              width={64}
              height={64}
              objectFit="contain"
              className="opacity-90"
            />
          </motion.div>
        </div>

        {/*<div className="text-center">
					 <Button
						size="lg"
						className="bg-primary text-white hover:bg-primary/90 group"
						asChild
					>
						<Link href={ctaLink}>
							{ctaText}
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</Button> 
				</div>*/}
      </div>
    </Section>
  );
}
