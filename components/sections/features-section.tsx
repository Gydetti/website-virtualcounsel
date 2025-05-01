"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, XCircle, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function FeaturesSection() {
  return (
    <section className="section-padding bg-brand-dark text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>

      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">Why choose us</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform your business</h2>
          <p className="text-lg text-gray-300">
            See the difference our services can make for your business growth and online presence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-lg border border-red-200 bg-white/5 backdrop-blur p-6 hover:bg-white/10 transition-colors"
          >
            <h3 className="text-xl font-bold text-red-400 mb-4">Without our services</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <XCircle className="text-red-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Struggling to attract qualified leads online</span>
              </li>
              <li className="flex items-start">
                <XCircle className="text-red-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Wasting time on ineffective marketing strategies</span>
              </li>
              <li className="flex items-start">
                <XCircle className="text-red-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Losing business to more visible competitors</span>
              </li>
              <li className="flex items-start">
                <XCircle className="text-red-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Inconsistent results and unpredictable growth</span>
              </li>
              <li className="flex items-start">
                <XCircle className="text-red-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Feeling overwhelmed by constant digital changes</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-lg border border-green-200 bg-white/5 backdrop-blur p-6 hover:bg-white/10 transition-colors"
          >
            <h3 className="text-xl font-bold text-green-400 mb-4">With our services</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="text-green-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Steady flow of qualified leads from your digital presence</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Strategic approach that maximizes your time and budget</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Stand out from competitors with a distinctive brand</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Consistent, measurable growth you can track</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Expert guidance keeping you ahead of industry trends</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-white text-brand-dark hover:bg-gray-200 group" asChild>
            <Link href="/services">
              Explore our services
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
