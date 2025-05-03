"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/site.config";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type React from "react";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { z } from "zod";

export default function ContactPageClient() {
	const contactConfig = siteConfig.contactForm;
	if (!contactConfig) return null;

	// Initialize form state dynamically
	const initialFormData: Record<string, string> = contactConfig.fields.reduce(
		(acc, field) => {
			acc[field.name] = "";
			return acc;
		},
		{} as Record<string, string>,
	);
	// Add honeypot field
	initialFormData[contactConfig.honeypotFieldName] = "";
	const [formData, setFormData] = useState(initialFormData);
	const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleRecaptchaChange = (token: string | null) => {
		setRecaptchaToken(token);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);
		try {
			const payload = { ...formData, recaptchaToken };
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			const result = await res.json();
			if (!res.ok || !result.success) {
				setError(result.error || "Failed to send message");
			} else {
				setSubmitted(true);
				setFormData(initialFormData);
				setRecaptchaToken(null);
				// Hide success after 5 seconds
				setTimeout(() => setSubmitted(false), 5000);
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Internal error");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<section className="bg-gradient-to-r from-blue-50 to-white py-16 md:py-24">
				<div className="container-wide">
					<div className="text-center max-w-3xl mx-auto">
						<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
							[CONTACT_PAGE_BADGE]
						</Badge>
						<h1 className="text-4xl md:text-5xl font-bold mb-6">
							[CONTACT_PAGE_TITLE]
						</h1>
						<p className="text-lg text-gray-700 mb-8">
							[CONTACT_PAGE_DESCRIPTION: Encourage visitors to reach out and
							explain how you can help them.]
						</p>
					</div>
				</div>
			</section>

			<section className="py-16 bg-white">
				<div className="container-wide">
					<div className="grid lg:grid-cols-3 gap-12">
						<div className="lg:col-span-2">
							<div className="bg-white rounded-xl shadow-lg p-8">
								<h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

								<form onSubmit={handleSubmit} className="space-y-6">
									{/* Dynamic fields from config */}
									{contactConfig.fields.map((field) => (
										<div key={field.name}>
											<label
												htmlFor={field.name}
												className="block text-sm font-medium text-gray-700 mb-1"
											>
												{field.label}{" "}
												{field.required && (
													<span className="text-red-500">*</span>
												)}
											</label>
											{field.type === "textarea" ? (
												<Textarea
													id={field.name}
													name={field.name}
													placeholder={field.placeholder}
													value={formData[field.name]}
													onChange={handleChange}
													required={field.required}
													className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
													rows={4}
												/>
											) : (
												<Input
													id={field.name}
													type={field.type}
													name={field.name}
													placeholder={field.placeholder}
													value={formData[field.name]}
													onChange={handleChange}
													required={field.required}
													className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
												/>
											)}
										</div>
									))}

									{/* Honeypot field (hidden) */}
									<input
										type="text"
										name={contactConfig.honeypotFieldName}
										value={formData[contactConfig.honeypotFieldName]}
										onChange={handleChange}
										className="hidden"
										autoComplete="off"
										tabIndex={-1}
									/>

									{/* reCAPTCHA widget */}
									{contactConfig.recaptchaSiteKey && (
										<ReCAPTCHA
											sitekey={contactConfig.recaptchaSiteKey}
											onChange={handleRecaptchaChange}
										/>
									)}

									<Button
										type="submit"
										className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg"
										disabled={isSubmitting}
									>
										{isSubmitting
											? "Sending..."
											: submitted
												? "Message Sent!"
												: "Send Message"}
									</Button>

									{error && (
										<div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
											{error}
										</div>
									)}
									{submitted && (
										<div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
											Thank you for your message! We'll get back to you as soon
											as possible.
										</div>
									)}
								</form>
							</div>
						</div>

						<div>
							<div className="bg-primary text-white rounded-xl shadow-lg p-8 h-full">
								<h2 className="text-2xl font-bold mb-6">Contact Information</h2>

								<ul className="space-y-6 mb-8">
									<li className="flex items-start">
										<Mail
											aria-hidden="true"
											className="h-6 w-6 mr-4 flex-shrink-0 mt-1"
										/>
										<div>
											<p className="font-semibold mb-1">Email</p>
											<a
												href={`mailto:${siteConfig.contact.email}`}
												className="text-white/80 hover:text-white transition-colors"
											>
												{siteConfig.contact.email}
											</a>
										</div>
									</li>

									<li className="flex items-start">
										<Phone
											aria-hidden="true"
											className="h-6 w-6 mr-4 flex-shrink-0 mt-1"
										/>
										<div>
											<p className="font-semibold mb-1">Phone</p>
											<a
												href={`tel:${siteConfig.contact.phone}`}
												className="text-white/80 hover:text-white transition-colors"
											>
												{siteConfig.contact.phone}
											</a>
										</div>
									</li>

									<li className="flex items-start">
										<MapPin
											aria-hidden="true"
											className="h-6 w-6 mr-4 flex-shrink-0 mt-1"
										/>
										<div>
											<p className="font-semibold mb-1">Address</p>
											<span>{siteConfig.contact.address.line1}</span>
											<br />
											{siteConfig.contact.address.line2 && (
												<>
													<span>{siteConfig.contact.address.line2}</span>
													<br />
												</>
											)}
											<span>
												{siteConfig.contact.address.city},{" "}
												{siteConfig.contact.address.country}{" "}
												{siteConfig.contact.address.zip}
											</span>
										</div>
									</li>

									<li className="flex items-start">
										<Clock
											aria-hidden="true"
											className="h-6 w-6 mr-4 flex-shrink-0 mt-1"
										/>
										<div>
											<p className="font-semibold mb-1">Hours</p>
											<span>{siteConfig.contact.hours.monFri}</span>
											<br />
											<span>{siteConfig.contact.hours.sat}</span>
											<br />
											<span>{siteConfig.contact.hours.sun}</span>
										</div>
									</li>
								</ul>

								<div className="mt-8">
									<h3 className="font-bold text-lg mb-4">Follow Us</h3>
									<div className="flex space-x-4">
										{siteConfig.social.facebook && (
											<a
												href={siteConfig.social.facebook}
												className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
												aria-label="Facebook"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													className="h-5 w-5"
													role="img"
												>
													<title>Facebook</title>
													<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
												</svg>
											</a>
										)}
										{siteConfig.social.twitter && (
											<a
												href={siteConfig.social.twitter}
												className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
												aria-label="Twitter"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													className="h-5 w-5"
													role="img"
												>
													<title>Twitter</title>
													<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
												</svg>
											</a>
										)}
										{siteConfig.social.instagram && (
											<a
												href={siteConfig.social.instagram}
												className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
												aria-label="Instagram"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													className="h-5 w-5"
													role="img"
												>
													<title>Instagram</title>
													<rect
														x="2"
														y="2"
														width="20"
														height="20"
														rx="5"
														ry="5"
													/>
													<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
													<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
												</svg>
											</a>
										)}
										{siteConfig.social.linkedin && (
											<a
												href={siteConfig.social.linkedin}
												className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
												aria-label="LinkedIn"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													className="h-5 w-5"
													role="img"
												>
													<title>LinkedIn</title>
													<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
													<rect x="2" y="9" width="4" height="12" />
													<circle cx="4" cy="4" r="2" />
												</svg>
											</a>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-16">
				<div className="container-wide">
					<div className="bg-gray-200 rounded-xl overflow-hidden h-[400px] md:h-[500px] relative">
						{/* Replace with actual Google Maps embed or other map service */}
						<div className="absolute inset-0 flex items-center justify-center bg-gray-300">
							<p className="text-gray-600 text-lg font-medium">
								[MAP_PLACEHOLDER: Replace with your preferred map embed code]
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
