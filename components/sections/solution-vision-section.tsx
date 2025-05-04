"use client";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function SolutionVisionSection() {
  return (
    <section id="solution" className="section-padding bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="container-wide relative z-10 text-center">
        <Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
          Experience the Solution
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How We Transform Your Business
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          Through our proven process, we resolve core challenges and drive
          tangible growth—envision a future where your goals become reality.
        </p>
        <motion.ul
          className="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {[
            "A steady pipeline of qualified leads",
            "Efficient strategies tailored to your goals",
            "A standout brand that attracts attention",
            "Measurable, sustainable business growth",
          ].map((benefit) => (
            <li key={benefit} className="flex items-start">
              <CheckCircle className="text-green-400 mr-3 mt-1 h-5 w-5 flex-shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
} 