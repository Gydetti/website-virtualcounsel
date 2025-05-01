import type React from "react"
import { Poppins, Raleway } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTop from "@/components/ui/scroll-to-top"
import CookieConsentBanner from "@/components/cookie/cookie-consent-banner"
import TrackingScripts from "@/components/tracking/tracking-scripts"
import DataLayerProvider from "@/components/tracking/data-layer-provider"
import PageViewTracker from "@/components/tracking/page-view-tracker"
import StructuredData from "@/components/seo/structured-data"

// Poppins for headings
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

// Raleway for body text
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-raleway",
  display: "swap",
})

export const metadata = {
  title: "Professional Business Website | For Entrepreneurs and Small Businesses",
  description:
    "A modern, responsive website template for entrepreneurs and small businesses looking to establish a strong online presence.",
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Professional Business Website | For Entrepreneurs and Small Businesses",
    description:
      "A modern, responsive website template for entrepreneurs and small businesses looking to establish a strong online presence.",
    siteName: "Your Business Name",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Business Website | For Entrepreneurs and Small Businesses",
    description:
      "A modern, responsive website template for entrepreneurs and small businesses looking to establish a strong online presence.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Cookiebot script - placed in head */}
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
          data-blockingmode="auto"
          type="text/javascript"
        ></script>

        {/* Structured Data for SEO */}
        <StructuredData type="organization" />
        <StructuredData type="website" />
      </head>
      <body className={`${poppins.variable} ${raleway.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <DataLayerProvider>
            {/* Tracking scripts that respect cookie consent */}
            <TrackingScripts />
            <PageViewTracker />

            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <ScrollToTop />
            <CookieConsentBanner />
            <Toaster />
          </DataLayerProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
