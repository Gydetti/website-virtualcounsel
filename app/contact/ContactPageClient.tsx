'use client';
import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from 'lucide-react';
import type { ChangeEvent, CSSProperties, FormEvent } from 'react';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LazySection from '@/components/ui/lazy-section';
import { Textarea } from '@/components/ui/textarea';
import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import { siteConfig } from '@/lib/siteConfig';

export default function ContactPageClient() {
  const contactConfig = siteConfig.contactForm;
  if (!contactConfig) return null;

  // Initialize form state dynamically
  const initialFormData: Record<string, string> = contactConfig.fields.reduce(
    (acc, field) => {
      acc[field.name] = '';
      return acc;
    },
    {} as Record<string, string>
  );
  // Add honeypot field
  initialFormData[contactConfig.honeypotFieldName] = '';
  const [formData, setFormData] = useState(initialFormData);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getElementBorderRadius } = useThemeBorderRadius();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        setError(result.error || 'Failed to send message');
      } else {
        setSubmitted(true);
        setFormData(initialFormData);
        setRecaptchaToken(null);
        // Hide success after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Internal error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Section
        bgClass={siteConfig.sectionStyles?.heroGradient ?? ''}
        className="relative py-16 md:py-24 z-10"
      >
        <LazySection
          animation="none"
          className="stagger-container text-center max-w-3xl mx-auto"
          style={{ '--stagger-delay': '0.1s' } as CSSProperties}
        >
          <Badge className="mb-4" style={{ '--index': 0 } as CSSProperties}>
            Contact section
          </Badge>
          <h1 style={{ '--index': 1 } as CSSProperties}>
            Section heading inviting users to reach out
          </h1>
          <p
            className="text-neutral-text mb-8 whitespace-normal break-words"
            style={{ '--index': 2 } as CSSProperties}
          >
            Brief subtitle explaining how visitors can reach out and what to expect
          </p>
        </LazySection>
      </Section>

      <LazySection>
        <section className="py-16">
          <div className="container-wide">
            <div className="grid lg:grid-cols-3 gap-12 items-stretch">
              <div className="lg:col-span-2">
                <div
                  className={`bg-neutral-surface ${getElementBorderRadius('section')} shadow-lg p-8`}
                >
                  <h2 className="text-2xl font-bold mb-6">
                    Form heading prompting message submission
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Dynamic fields from config */}
                    {contactConfig.fields.map(field => (
                      <div key={field.name}>
                        <label
                          htmlFor={field.name}
                          className="block text-sm font-medium text-neutral-text mb-1"
                        >
                          {field.label}{' '}
                          {field.required && <span className="text-feedback-error">*</span>}
                        </label>
                        {field.type === 'textarea' ? (
                          <Textarea
                            id={field.name}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required={field.required}
                            className={`w-full px-4 py-3 ${getElementBorderRadius('input')} border focus:ring-2 focus:ring-primary focus:border-transparent`}
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
                            className={`w-full px-4 py-3 ${getElementBorderRadius('input')} border focus:ring-2 focus:ring-primary focus:border-transparent`}
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
                      className={`w-full bg-primary hover:bg-primary90 text-white py-3 ${getElementBorderRadius('button')} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : submitted ? 'Message Sent!' : 'Send Message'}
                    </Button>

                    {error && (
                      <div
                        className={`mt-4 p-4 bg-feedback-error-bg text-feedback-error ${getElementBorderRadius('card')}`}
                      >
                        {error}
                      </div>
                    )}
                    {submitted && (
                      <div
                        className={`mt-4 p-4 bg-feedback-success-bg text-feedback-success ${getElementBorderRadius('card')}`}
                      >
                        Thank you for your message! We'll get back to you as soon as possible.
                      </div>
                    )}
                  </form>
                </div>
              </div>

              <div>
                <LazySection className="h-full">
                  <div
                    className={`bg-primary text-white ${getElementBorderRadius('section')} shadow-lg p-8 h-full flex flex-col`}
                  >
                    <h2 className="text-xl font-semibold mb-4">Contact Details</h2>

                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Mail aria-hidden="true" className="size-6 mr-4 mt-1" />
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
                        <Phone aria-hidden="true" className="size-6 mr-4 mt-1" />
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
                        className="size-10 rounded-full bg-neutral-surface/20 flex items-center justify-center hover:bg-neutral-surface/30 transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook className="size-5 text-white" />
                      </a>
                      <a
                        href="/"
                        className="size-10 rounded-full bg-neutral-surface/20 flex items-center justify-center hover:bg-neutral-surface/30 transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter className="size-5 text-white" />
                      </a>
                      <a
                        href="/"
                        className="size-10 rounded-full bg-neutral-surface/20 flex items-center justify-center hover:bg-neutral-surface/30 transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram className="size-5 text-white" />
                      </a>
                      <a
                        href="/"
                        className="size-10 rounded-full bg-neutral-surface/20 flex items-center justify-center hover:bg-neutral-surface/30 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="size-5 text-white" />
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
