import { SubscribeForm } from "@/components/ui/SubscribeForm";
import { Button } from "@/components/ui/button";
import {
	ArrowRight,
	ExternalLink,
	Facebook,
	Instagram,
	Linkedin,
	Mail,
	MapPin,
	Phone,
	Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<>
			{/* Newsletter subscription */}
			<div className="relative overflow-hidden py-10 text-white bg-gradient-to-br from-[hsl(222,47%,22%)] via-[hsl(222,47%,18%)] to-[hsl(222,47%,14%)]">
				{/* Decorative blur spots */}
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 blur-3xl" />
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full translate-y-1/2 blur-3xl" />
				<div className="container-wide relative z-10">
					<div className="flex flex-col md:flex-row items-center justify-between gap-6">
						<div>
							<h3 className="text-white mb-2">Subscribe to our newsletter</h3>
							<p className="text-body-base text-white">
								Stay updated with the latest insights and news
							</p>
						</div>
						<SubscribeForm />
					</div>
				</div>
			</div>

			<footer className="bg-brand-dark text-white relative overflow-hidden">
				{/* Decorative elements */}
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 blur-3xl" />
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full translate-y-1/2 blur-3xl" />

				<div className="container-wide py-12 md:py-16 relative z-10">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						<div>
							<Link href="/" className="inline-block mb-4">
								<Image
									src="/placeholder.svg?height=40&width=150"
									alt="Your Company Name Logo"
									width={150}
									height={40}
									className="h-10 w-auto brightness-0 invert"
								/>
							</Link>
							<p className="text-body-base text-white mb-6 max-w-xs">
								We help entrepreneurs and small businesses grow through
								strategic digital solutions tailored to their unique needs.
							</p>
							<div className="flex space-x-4">
								<Link
									href="/"
									className="text-white hover:text-brand-light transition-colors bg-white/10 p-2 rounded-full"
									aria-label="Facebook"
								>
									<Facebook className="h-5 w-5" />
								</Link>
								<Link
									href="/"
									className="text-white hover:text-brand-light transition-colors bg-white/10 p-2 rounded-full"
									aria-label="Instagram"
								>
									<Instagram className="h-5 w-5" />
								</Link>
								<Link
									href="/"
									className="text-white hover:text-brand-light transition-colors bg-white/10 p-2 rounded-full"
									aria-label="Twitter"
								>
									<Twitter className="h-5 w-5" />
								</Link>
								<Link
									href="/"
									className="text-white hover:text-brand-light transition-colors bg-white/10 p-2 rounded-full"
									aria-label="LinkedIn"
								>
									<Linkedin className="h-5 w-5" />
								</Link>
							</div>
						</div>

						<div>
							<h3 className="mb-4">Quick links</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="/"
										className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
									>
										<span className="w-0 h-0.5 bg-white transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
										Home
									</Link>
								</li>
								<li>
									<Link
										href="/services"
										className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
									>
										<span className="w-0 h-0.5 bg-white transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
										Services
									</Link>
								</li>
								<li>
									<Link
										href="/about"
										className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
									>
										<span className="w-0 h-0.5 bg-white transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
										About
									</Link>
								</li>
								<li>
									<Link
										href="/blog"
										className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
									>
										<span className="w-0 h-0.5 bg-white transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
										Blog
									</Link>
								</li>
								<li>
									<Link
										href="/faq"
										className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
									>
										<span className="w-0 h-0.5 bg-white transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
										FAQ
									</Link>
								</li>
								<li>
									<Link
										href="/contact"
										className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
									>
										<span className="w-0 h-0.5 bg-white transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
										Contact
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="mb-4">Services</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="/services/web-design-development"
										className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
									>
										<span className="w-0 h-0.5 bg-white transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
										Web design & development
									</Link>
								</li>
								<li>
									<Link
										href="/services/digital-marketing-strategy"
										className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
									>
										<span className="w-0 h-0.5 bg-white transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
										Digital marketing strategy
									</Link>
								</li>
								<li>
									<Link
										href="/services/business-automation"
										className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
									>
										<span className="w-0 h-0.5 bg-white transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
										Business automation
									</Link>
								</li>
								<li>
									<Link
										href="/services/content-creation"
										className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
									>
										<span className="w-0 h-0.5 bg-white transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
										Content creation
									</Link>
								</li>
								<li>
									<Link
										href="/services/seo-optimization"
										className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
									>
										<span className="w-0 h-0.5 bg-white transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
										SEO optimization
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="mb-4">Contact</h3>
							<ul className="space-y-2 text-white">
								<li className="flex items-center">
									<Mail className="h-4 w-4 mr-2" />
									<span>Email: </span>
									<a
										href="mailto:info@example.com"
										className="ml-1 hover:text-brand-light"
									>
										info@example.com
									</a>
								</li>
								<li className="flex items-center">
									<Phone className="h-4 w-4 mr-2" />
									<span>Phone: </span>
									<a
										href="tel:+31201234567"
										className="ml-1 hover:text-brand-light"
									>
										+31 20 123 4567
									</a>
								</li>
								<li className="flex items-start">
									<MapPin className="h-4 w-4 mr-2 mt-1" />
									<span>Address: </span>
									<address className="ml-1 not-italic">
										Herengracht 182
										<br />
										1016 BR Amsterdam, Netherlands
									</address>
								</li>
							</ul>
							<Button
								asChild
								className="mt-4 bg-white text-brand-dark hover:bg-gray-200 group"
							>
								<Link href="/contact">
									Contact us
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
						</div>
					</div>

					<div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
						<p className="text-gray-200 text-sm">
							© {currentYear} Your Company Name. All rights reserved.
						</p>
						<div className="flex space-x-6 mt-4 md:mt-0">
							<Link
								href="https://groeienmetgydo.nl"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center text-gray-100 hover:text-white text-sm"
							>
								<span>Website gemaakt met 🍌 door Groeien met Gydo</span>
								<ExternalLink className="ml-1 h-4 w-4" />
							</Link>

							<Link
								href="/privacy-policy"
								className="text-gray-200 hover:text-white text-sm"
							>
								Privacy policy
							</Link>
							<Link
								href="/terms-of-service"
								className="text-gray-200 hover:text-white text-sm"
							>
								Terms of service
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}
