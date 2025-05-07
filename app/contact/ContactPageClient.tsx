"use client";
import type { ChangeEvent, FormEvent } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LazySection from "@/components/ui/lazy-section";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/site.config";
import {
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: FormEvent) => {
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
      <LazySection>
        <section className="bg-gradient-to-r from-blue-50 to-white py-16 md:py-24">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto">
              <Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
                Contact section
              </Badge>
              <h1>Section heading inviting users to reach out</h1>
              <p className="text-gray-700 mb-8 whitespace-normal break-words">
                Brief subtitle explaining how visitors can reach out and what to
                expect
              </p>
            </div>
          </div>
        </section>
      </LazySection>

      <LazySection>
        <section className="py-16 bg-white">
          <div className="container-wide">
            <div className="grid lg:grid-cols-3 gap-12 items-stretch">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">
                    Form heading prompting message submission
                  </h2>

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
                            autoComplete={field.name}
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
                        Thank you for your message! We'll get back to you as
                        soon as possible.
                      </div>
                    )}
                  </form>
                </div>
              </div>

              <div>
                <LazySection className="h-full">
                  <div className="bg-primary text-white rounded-xl shadow-lg p-8 h-full flex flex-col">
                    <h2 className="text-xl font-semibold mb-4">
                      Contact Details
                    </h2>

                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Mail
                          aria-hidden="true"
                          className="h-6 w-6 mr-4 mt-1"
                        />
                        <div>
                          <p className="font-semibold mb-1">Email</p>
                          <a
                            href="mailto:name@email.com"
                            className="text-white/80 hover:text-white transition-colors"
                          >
                            name@email.com
                          </a>
                        </div>
                      </li>

                      <li className="flex items-start">
                        <Phone
                          aria-hidden="true"
                          className="h-6 w-6 mr-4 mt-1"
                        />
                        <div>
                          <p className="font-semibold mb-1">Phone</p>
                          <a
                            href="tel:+314567676"
                            className="text-white/80 hover:text-white transition-colors"
                          >
                            +314567676
                          </a>
                        </div>
                      </li>
                    </ul>

                    <div className="mt-auto flex space-x-4">
                      <a
                        href="/"
                        className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook className="h-5 w-5 text-white" />
                      </a>
                      <a
                        href="/"
                        className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter className="h-5 w-5 text-white" />
                      </a>
                      <a
                        href="/"
                        className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram className="h-5 w-5 text-white" />
                      </a>
                      <a
                        href="/"
                        className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5 text-white" />
                      </a>
                    </div>
                  </div>
                </LazySection>
              </div>
            </div>
          </div>
        </section>
      </LazySection>
    </>
  );
}
