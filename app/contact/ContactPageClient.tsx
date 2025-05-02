"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { siteConfig } from "@/lib/site.config"

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })

    // Reset submitted state after 5 seconds
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <>
      <section className="bg-gradient-to-r from-blue-50 to-white py-16 md:py-24">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">[CONTACT_PAGE_BADGE]</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">[CONTACT_PAGE_TITLE]</h1>
            <p className="text-lg text-gray-700 mb-8">
              [CONTACT_PAGE_DESCRIPTION: Encourage visitors to reach out and explain how you can help them.]
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <Select value={formData.subject} onValueChange={handleSelectChange} required>
                        <SelectTrigger id="subject" className="w-full px-4 py-3 rounded-lg border">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="service1">[SERVICE_1_NAME]</SelectItem>
                          <SelectItem value="service2">[SERVICE_2_NAME]</SelectItem>
                          <SelectItem value="service3">[SERVICE_3_NAME]</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
                      rows={6}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : submitted ? "Message Sent!" : "Send Message"}
                  </Button>

                  {submitted && (
                    <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
                      Thank you for your message! We'll get back to you as soon as possible.
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
                    <Mail aria-hidden="true" className="h-6 w-6 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-white/80 hover:text-white transition-colors">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <Phone aria-hidden="true" className="h-6 w-6 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Phone</p>
                      <a href={`tel:${siteConfig.contact.phone}`} className="text-white/80 hover:text-white transition-colors">
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <MapPin aria-hidden="true" className="h-6 w-6 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Address</p>
                      <span>{siteConfig.contact.address.line1}</span><br />
                      {siteConfig.contact.address.line2 && (<><span>{siteConfig.contact.address.line2}</span><br /></>)}
                      <span>{siteConfig.contact.address.city}, {siteConfig.contact.address.country} {siteConfig.contact.address.zip}</span>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <Clock aria-hidden="true" className="h-6 w-6 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Hours</p>
                      <span>{siteConfig.contact.hours.monFri}</span><br />
                      <span>{siteConfig.contact.hours.sat}</span><br />
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
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" role="img">
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
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" role="img">
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
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" role="img">
                          <title>Instagram</title>
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
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
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" role="img">
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
  )
}
