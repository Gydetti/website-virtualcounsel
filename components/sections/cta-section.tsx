import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CtaSection() {
  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl" />

      <div className="container-wide px-4 text-center relative z-10">
        <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 mr-2"
          >
            <title>Clock icon</title>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="text-sm font-medium">Limited time offer</span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Ready to grow your business?</h2>

        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Schedule a free consultation today and discover how our services can help you achieve your business goals.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100 group" asChild>
            <Link href="/contact">
              Schedule a consultation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/20" asChild>
            <Link href="/about">Learn more about us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
