import { Poppins, Raleway } from "next/font/google";
import type React from "react";
import "./globals.css";
import CookiebotLoaderClient from "@/components/cookie/CookiebotLoaderClient";
import Footer from "@/components/layout/footer";
// import Script from "next/script" (removed for client-only loading)
import Header from "@/components/layout/header";
import StructuredData from "@/components/seo/structured-data";
import { ThemeProvider } from "@/components/theme-provider";
import DataLayerProvider from "@/components/tracking/data-layer-provider";
import PageViewTracker from "@/components/tracking/page-view-tracker";
import TrackingScripts from "@/components/tracking/tracking-scripts";
import ScrollToTop from "@/components/ui/scroll-to-top";
import { Toaster } from "@/components/ui/toaster";
import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site.config";
import { Partytown } from "@qwik.dev/partytown/react";
import { Suspense } from "react";

// Poppins for headings
const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	preload: true,
	variable: "--font-poppins",
	display: "swap",
});

// Raleway for body text
const raleway = Raleway({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	preload: true,
	variable: "--font-raleway",
	display: "swap",
});

const siteUrl = siteConfig.site.url || "http://localhost:3000";

export const metadata = defaultMetadata({
	metadataBase: new URL(siteUrl),
	robots: { index: true, follow: true },
	generator: "v0.dev",
	description: siteConfig.site.description,
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				{/* Preconnect to Google Fonts */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				{/* GA4 script for analytics (Partytown) */}
				<script
					type="text/partytown"
					data-cookieconsent="statistics"
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.tracking.ga4Id}`}
				/>
				{/* Load Partytown worker for third-party script offloading */}
				<Partytown forward={["dataLayer.push"]} />
				{/* Cookiebot script will now be loaded on the client only via client-only component */}

				{/* Structured Data for SEO */}
				<StructuredData
					type="organization"
					data={{
						name: siteConfig.site.name,
						url: siteConfig.site.url,
						logo: siteConfig.theme.logo.src,
						socialLinks: [
							siteConfig.social.facebook,
							siteConfig.social.twitter,
							siteConfig.social.linkedin,
							siteConfig.social.instagram,
						],
						phone: siteConfig.contact.phone,
						email: siteConfig.contact.email,
						streetAddress: siteConfig.contact.address.line1,
						city: siteConfig.contact.address.city,
						postalCode: siteConfig.contact.address.zip,
						country: siteConfig.contact.address.country,
					}}
				/>
				<StructuredData
					type="website"
					data={{ name: siteConfig.site.name, url: siteConfig.site.url }}
				/>
			</head>
			<body
				className={`${poppins.variable} ${raleway.variable} font-sans antialiased bg-gradient-to-br from-blue-50 to-transparent`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<CookiebotLoaderClient />
					<DataLayerProvider>
						{/* Tracking scripts that respect cookie consent */}
						<TrackingScripts />
						<Suspense fallback={null}>
							<PageViewTracker />
						</Suspense>

						<div className="flex min-h-screen flex-col">
							<Header />
							<main className="flex-1">{children}</main>
							<Footer />
						</div>
						<ScrollToTop />
						<Toaster />
					</DataLayerProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
