'use client';

import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import type { ChangeEvent, CSSProperties, FormEvent } from 'react';
import { useState } from 'react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LazySection from '@/components/ui/lazy-section';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/lib/siteConfig';

// Provide typing for the Recaptcha API on the window object
declare global {
  interface Window {
    grecaptcha?: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

// Updated props type alias using Zod schema

import type { contactSectionDataSchema } from '@/lib/schemas/sections.schema';
export type ContactSectionProps = z.infer<typeof contactSectionDataSchema>;

export default function ContactSection({ badgeText, heading, subtitle }: ContactSectionProps) {
  const fields = siteConfig.contactForm?.fields || [];
  const honeypotName = siteConfig.contactForm?.honeypotFieldName || 'honeypot';
  const recaptchaKey = siteConfig.contactForm?.recaptchaSiteKey;
  // Initialize formData with all field keys (always controlled)
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const f of fields) {
      initial[f.name] = '';
    }
    initial[honeypotName] = '';
    return initial;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Remove reCAPTCHA logic: no token needed

    // Send data to API
    const payload = {
      ...formData,
      honeypot: formData[honeypotName],
      // recaptchaToken removed
    };
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (!result.success) {
      console.error('Contact API error:', result.error || result.errors);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setSubmitted(true);
    // Reset form
    const reset: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      reset[key] = '';
    }
    setFormData(reset);

    // Reset submitted state after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <Section
      id="contact-section"
      aria-labelledby="contact-section-heading"
      className="relative overflow-hidden bg-transparent"
    >
      {/* Remove reCAPTCHA script loading */}
      {/* {recaptchaKey && (
				<Script
					src={`https://www.google.com/recaptcha/api.js?render=${recaptchaKey}`}
					strategy="lazyOnload"
				/>
			)} */}
      {/* Decorative elements */}
      {/* <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
			<div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" /> */}

      <div className="relative z-10">
        {/* Header only: CSS-only stagger for title */}
        <LazySection
          animation="none"
          className="stagger-container text-center"
          style={{ '--stagger-delay': '0.1s' } as CSSProperties}
        >
          <div>
            {badgeText && <Badge className="mb-4">{badgeText}</Badge>}
            {heading && (
              <h2 id="contact-section-heading" className="section-title">
                {heading}
              </h2>
            )}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        </LazySection>
        {/* Cards: animate individually on scroll */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-8 md:gap-12 max-w-4xl mx-auto">
          <LazySection animation="slide-up" delay={0.1}>
            {/* Form card */}
            <div
              className="h-full flex flex-col bg-neutral-surface rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              style={{ '--index': 1 } as CSSProperties}
            >
              <h3 className="mb-6">Form title prompting user to send a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {fields.map(field => (
                    <div key={field.name}>
                      {field.type === 'textarea' ? (
                        <Textarea
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
                  <input
                    type="text"
                    name={honeypotName}
                    value={formData[honeypotName]}
                    onChange={handleChange}
                    className="hidden"
                  />
                </div>
                <Button type="submit" className="w-full group" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : submitted ? 'Message sent!' : 'Send message'}
                  {!isSubmitting && !submitted && (
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  )}
                </Button>
                {submitted && (
                  <div className="mt-4 p-4 bg-feedback-success-bg text-feedback-success rounded-lg">
                    Thank you for your message! We'll get back to you as soon as possible.
                  </div>
                )}
              </form>
            </div>
          </LazySection>
          <LazySection animation="slide-up" delay={0.2}>
            {/* Contact info card */}
            <div
              className="h-full bg-primary text-white rounded-xl shadow-lg p-8 flex flex-col justify-between hover:shadow-xl transition-shadow"
              style={{ '--index': 2 } as CSSProperties}
            >
              <h3 className="mb-6">Contact information</h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <Mail className="size-6 mr-4 shrink-0 mt-1" />
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
                  <Phone className="size-6 mr-4 shrink-0 mt-1" />
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
                  <MapPin className="size-6 mr-4 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Address</p>
                    <address className="text-white/80 not-italic">
                      {siteConfig.contact.address?.line1}
                      {siteConfig.contact.address?.line2 && (
                        <>
                          <br />
                          {siteConfig.contact.address.line2}
                        </>
                      )}
                      <br />
                      {siteConfig.contact.address?.zip} {siteConfig.contact.address?.city}
                      <br />
                      {siteConfig.contact.address?.country}
                    </address>
                  </div>
                </li>
              </ul>
            </div>
          </LazySection>
        </div>
      </div>
    </Section>
  );
}
