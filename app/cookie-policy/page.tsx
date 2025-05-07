import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site.config";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Cookie Policy | Entrepreneur Template",
  description:
    "Our cookie policy explains how we use cookies and similar technologies on our website.",
};

export default function CookiePolicyPage() {
  // Disable this page if not enabled in config
  if (
    siteConfig.enabledPages &&
    !siteConfig.enabledPages.includes("/cookie-policy")
  ) {
    notFound();
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
            Section label for legal page
          </Badge>
          <h1>Section title for cookie policy page</h1>

          <div className="prose prose-lg max-w-none">
            <p>Last updated date placeholder (e.g. 'January 1, 2025')</p>

            <h2>1. Introduction</h2>
            <p>Paragraph placeholder: explain purpose of cookie policy</p>

            <h2>2. What are cookies</h2>
            <p>
              Paragraph placeholder: explain what cookies are and how they work
            </p>

            <h2>3. Types of cookies we use</h2>
            <p>
              Paragraph placeholder: explain different types of cookies used
            </p>

            <h3>3.1 Essential cookies</h3>
            <p>
              Paragraph placeholder: explain essential cookies required for
              functionality
            </p>

            <h3>3.2 Performance cookies</h3>
            <p>
              Paragraph placeholder: explain cookies used to analyze performance
            </p>

            <h3>3.3 Functionality cookies</h3>
            <p>
              Paragraph placeholder: explain cookies that remember preferences
            </p>

            <h3>3.4 Targeting cookies</h3>
            <p>Paragraph placeholder: explain cookies used for advertising</p>

            <h2>4. Third-party cookies</h2>
            <p>
              Paragraph placeholder: explain third-party cookies used on site
            </p>

            <h2>5. Cookie management</h2>
            <p>
              Paragraph placeholder: explain how users can manage or disable
              cookies
            </p>

            <h2>6. Changes to this cookie policy</h2>
            <p>
              Paragraph placeholder: explain how updates to policy will be
              communicated
            </p>

            <h2>7. Contact information</h2>
            <p>
              Paragraph placeholder: provide contact details for cookie policy
              inquiries
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
