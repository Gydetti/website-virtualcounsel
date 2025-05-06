import { Section } from "@/components/layout/Section";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";

export interface ValuePropSectionProps {
  /** Label above the heading */
  badgeText?: string;
  /** Main heading text */
  heading?: string;
  /** Subheading or description text */
  subheading?: string;
  /** List of benefit items */
  benefits?: {
    title: string;
    description: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
  }[];
}

export default function ValuePropSection({
  badgeText = "Why Choose Us",
  heading = "Transform Your Real Estate Business",
  subheading =
    "Our unique approach combines proven marketing strategies with real estate expertise to deliver results that matter.",
  benefits = [
    {
      title: "Save 10+ Hours Weekly",
      description:
        "Our streamlined systems eliminate manual prospecting, giving you back precious time for closing deals.",
      icon: CheckCircle,
    },
    {
      title: "Personalized Strategy",
      description:
        "Unlike generic marketing courses, we create custom plans based on your specific market and strengths.",
      icon: CheckCircle,
    },
    {
      title: "Proven Results",
      description:
        "Our clients see an average 127% increase in qualified leads within the first 90 days of implementation.",
      icon: CheckCircle,
    },
  ],
}: ValuePropSectionProps) {
  return (
    <Section id="value-prop-section" className="bg-gradient-to-b from-white/70 to-white/0">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <Badge className="mb-4 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground">
          {badgeText}
        </Badge>
        <h2 className="section-title">{heading}</h2>
        <p className="section-subtitle">{subheading}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3"
      >
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <div
              key={benefit.title}
              className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{benefit.title}</h3>
              <p className="text-gray-500 dark:text-gray-400">{benefit.description}</p>
            </div>
          );
        })}
      </motion.div>
    </Section>
  );
} 