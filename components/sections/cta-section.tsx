import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CtaSection() {
	return (
		<section className="section-padding bg-brand-dark text-white relative overflow-hidden">
			{/* Optional: Add decorative elements matching the dark theme */}
			<div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
			<div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />

			<div className="container-wide relative z-10 text-center">
				<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
					Get started
				</Badge>
				<h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
					Ready to grow your business?
				</h2>
				<p className="text-lg text-gray-300 max-w-xl mx-auto mb-8">
					Let's discuss how we can help you achieve your business goals.
				</p>
				<div className="flex justify-center items-center gap-4">
					<Button
						size="lg"
						className="bg-white text-brand-dark hover:bg-gray-200 group"
						asChild
					>
						<Link href="/contact">
							Schedule a consultation
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="border-gray-400 text-gray-200 hover:bg-white/10 hover:text-white group"
						asChild
					>
						<Link href="/services">
							Learn more
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
