import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Cookie Policy | Entrepreneur Template",
  description: "Our cookie policy explains how we use cookies and similar technologies on our website.",
}

export default function CookiePolicyPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">Legal</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Cookie Policy</h1>

          <div className="prose prose-lg max-w-none">
            <p>Last Updated: [LAST_UPDATED_DATE]</p>

            <h2>1. Introduction</h2>
            <p>[COOKIE_POLICY_INTRODUCTION: Explain the purpose of this cookie policy.]</p>

            <h2>2. What Are Cookies</h2>
            <p>[COOKIES_EXPLANATION: Explain what cookies are and how they work.]</p>

            <h2>3. Types of Cookies We Use</h2>
            <p>[COOKIE_TYPES: Explain the different types of cookies used on your website.]</p>

            <h3>3.1 Essential Cookies</h3>
            <p>[ESSENTIAL_COOKIES: Explain essential cookies that are necessary for the website to function.]</p>

            <h3>3.2 Performance Cookies</h3>
            <p>[PERFORMANCE_COOKIES: Explain cookies used to analyze website performance.]</p>

            <h3>3.3 Functionality Cookies</h3>
            <p>[FUNCTIONALITY_COOKIES: Explain cookies that remember user preferences.]</p>

            <h3>3.4 Targeting Cookies</h3>
            <p>[TARGETING_COOKIES: Explain cookies used for advertising purposes.]</p>

            <h2>4. Third-Party Cookies</h2>
            <p>[THIRD_PARTY_COOKIES: Explain cookies set by third-party services on your website.]</p>

            <h2>5. Cookie Management</h2>
            <p>[COOKIE_MANAGEMENT: Explain how users can manage or disable cookies in their browsers.]</p>

            <h2>6. Changes to This Cookie Policy</h2>
            <p>[POLICY_CHANGES: Explain how you will notify users of changes to this policy.]</p>

            <h2>7. Contact Us</h2>
            <p>[CONTACT_INFORMATION: Provide contact information for cookie-related inquiries.]</p>
          </div>
        </div>
      </div>
    </section>
  )
}
