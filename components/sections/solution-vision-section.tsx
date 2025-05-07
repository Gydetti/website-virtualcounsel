"use client";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export interface SolutionVisionSectionProps {
  /** Label above the heading */
  badgeText?: string;
  /** Main heading text */
  heading?: string;
  /** Subheading or description text */
  description?: string;
  /** List of benefit items */
  benefits?: string[];
  /** Callout box text */
  calloutText?: string;
  /** Callout link text */
  calloutLinkText?: string;
  /** Callout link URL */
  calloutLinkHref?: string;
}

// Micro-animation variants for text elements
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.3, ease: "easeIn" },
  }),
};

export default function SolutionVisionSection({
  badgeText = "The Solution",
  heading = "Transform your real estate business with our proven system",
  description = "Through our 12-week coaching program, you'll develop a customized marketing strategy that delivers consistent results without consuming your valuable time.",
  benefits = [
    "A consistent flow of qualified leads every month",
    "Automated systems that work while you sleep",
    "More time to focus on high-value activities",
    "Confidence in your marketing strategy",
    "Sustainable business growth without burnout",
  ],
  calloutText = "Stop struggling with ineffective marketing and start thriving with a system designed specifically for real estate success.",
  calloutLinkText = "See how it works",
  calloutLinkHref = "/about",
}: SolutionVisionSectionProps) {
  return (
    <Section
      id="solution-vision-section"
      className="bg-gradient-to-b from-secondary/10 via-transparent to-transparent "
    >
      {/* Header Animations */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-16 max-w-4xl mx-auto "
      >
        <motion.div custom={0} variants={textVariants} className="mb-4">
          <Badge variant="secondary" className="px-3 py-1 rounded-full text-sm">
            {badgeText}
          </Badge>
        </motion.div>
        <motion.h2
          custom={1}
          variants={textVariants}
          className="section-title text-3xl sm:text-4xl md:text-5xl"
        >
          {heading}
        </motion.h2>
        <motion.p
          custom={2}
          variants={textVariants}
          className="section-subtitle"
        >
          {description}
        </motion.p>
      </motion.div>

      {/* Unified motion glass card for subheading & benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-4xl bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl p-12 space-y-8"
      >
        <h3 className="font-semibold text-lg text-center mt-0 mb-0">
          Imagine having:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b) => (
            <div key={b} className="flex items-start space-x-2">
              <CheckCircle className="h-5 w-5 text-secondary mt-1" />
              <span className="text-gray-700">{b}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Callout Card Animation */}
      {calloutText && (
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          className="mt-16 max-w-4xl mx-auto bg-secondary/10 p-6 rounded-lg"
        >
          <p className="text-gray-900 font-medium mb-2">{calloutText}</p>
          {calloutLinkText && (
            <a href={calloutLinkHref} className="text-secondary font-semibold">
              {calloutLinkText} →
            </a>
          )}
        </motion.div>
      )}
    </Section>
  );
}
