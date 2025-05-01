import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Terms of Service | Entrepreneur Template",
  description: "Our terms of service outline the rules and guidelines for using our website and services.",
}

export default function TermsOfServicePage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">Legal</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>

          <div className="prose prose-lg max-w-none">
            <p>Last Updated: [LAST_UPDATED_DATE]</p>

            <h2>1. Introduction</h2>
            <p>[TERMS_INTRODUCTION: Explain the purpose of these terms and who they apply to.]</p>

            <h2>2. Acceptance of Terms</h2>
            <p>[TERMS_ACCEPTANCE: Explain that by using the website or services, users accept these terms.]</p>

            <h2>3. Description of Services</h2>
            <p>[SERVICES_DESCRIPTION: Provide a general description of the services you offer.]</p>

            <h2>4. User Accounts</h2>
            <p>[USER_ACCOUNTS: Explain the rules and responsibilities related to user accounts, if applicable.]</p>

            <h2>5. Intellectual Property Rights</h2>
            <p>[INTELLECTUAL_PROPERTY: Explain ownership of content and intellectual property on your website.]</p>

            <h2>6. User Content</h2>
            <p>[USER_CONTENT: Explain the rules regarding content submitted by users, if applicable.]</p>

            <h2>7. Prohibited Activities</h2>
            <p>
              [PROHIBITED_ACTIVITIES: List activities that are not allowed on your website or when using your services.]
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>[LIABILITY_LIMITATION: Explain the limits of your liability for damages or losses.]</p>

            <h2>9. Indemnification</h2>
            <p>[INDEMNIFICATION: Explain user responsibilities to indemnify you against claims.]</p>

            <h2>10. Termination</h2>
            <p>[TERMINATION: Explain when and how you may terminate user access to your website or services.]</p>

            <h2>11. Governing Law</h2>
            <p>[GOVERNING_LAW: Specify which laws govern these terms.]</p>

            <h2>12. Changes to Terms</h2>
            <p>[TERMS_CHANGES: Explain how you will notify users of changes to these terms.]</p>

            <h2>13. Contact Information</h2>
            <p>[CONTACT_INFORMATION: Provide contact information for terms-related inquiries.]</p>
          </div>
        </div>
      </div>
    </section>
  )
}
