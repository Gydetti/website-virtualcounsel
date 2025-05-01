"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      subtitle: "Understanding your needs",
      description: "We start by learning about your business, goals, and challenges to create a tailored strategy.",
      details: [
        "Comprehensive business analysis",
        "Goal setting and KPI definition",
        "Competitor research",
        "Target audience identification",
      ],
    },
    {
      number: "02",
      title: "Strategy",
      subtitle: "Planning for success",
      description: "We develop a customized roadmap designed to achieve your specific business objectives.",
      details: ["Custom strategy development", "Resource allocation", "Timeline creation"],
    },
    {
      number: "03",
      title: "Implementation",
      subtitle: "Bringing ideas to life",
      description: "Our team executes the strategy with precision, expertise, and attention to detail.",
      details: ["Expert execution", "Regular progress updates", "Quality assurance"],
    },
    {
      number: "04",
      title: "Optimization",
      subtitle: "Continuous improvement",
      description: "We monitor results and make data-driven adjustments to maximize performance.",
      details: ["Performance tracking", "Data analysis", "Strategy refinement", "Ongoing support"],
    },
  ]

  return (
    <section id="process" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1000&width=1000')] bg-center opacity-5" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50/80 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">Our process</Badge>
          <h2 className="section-title">How we work with you</h2>
          <p className="section-subtitle">
            Our proven four-step process ensures we deliver consistent results for your business.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[40px] top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-8"
              >
                <div className="flex-shrink-0 flex items-start justify-center relative z-10">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold shadow-md bg-primary text-white">
                    {step.number}
                  </div>
                </div>
                <div className="flex-grow bg-white p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                  <p className="text-primary font-medium mb-3">{step.subtitle}</p>
                  <p className="text-gray-600 mb-6">{step.description}</p>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-3">What this includes:</h4>
                    <ul className="space-y-2">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
