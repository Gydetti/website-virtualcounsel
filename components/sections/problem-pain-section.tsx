"use client";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

export default function ProblemPainSection() {
  return (
    <section id="pain" className="section-padding bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-100/20 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl" />

      <div className="container-wide relative z-10 text-center">
        <Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
          Understand the Pain
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Recognize Your Challenges
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          Acknowledge the core obstacles visitors face and outline what's at
          stake if these issues go unaddressed.
        </p>
        <motion.ul
          className="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {[
            "Inconsistent lead flow and weak pipeline",
            "Wasted time on ineffective marketing",
            "Falling behind more visible competitors",
            "Unpredictable or stagnant growth",
          ].map((point) => (
            <li key={point} className="flex items-start">
              <XCircle className="text-red-400 mr-3 mt-1 h-5 w-5 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
} 