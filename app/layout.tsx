import AppShell from '@/components/layout/AppShell';
import StructuredData from '@/components/seo/structured-data';
import { heroSectionData } from '@/lib/data/homepage';
import { defaultMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/siteConfig';
import { Partytown } from '@qwik.dev/partytown/react';
import { Poppins, Raleway } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';
import WebVitalsReporter from '@/components/analytics/WebVitalsReporter';

// Poppins for headings
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  preload: true,
  variable: '--font-poppins',
  display: 'swap',
});

// Raleway for body text
const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  preload: true,
  variable: '--font-raleway',
  display: 'swap',
});

const siteUrl = siteConfig.site.url || 'http://localhost:3000';

export const metadata = defaultMetadata({
  metadataBase: new URL(siteUrl),
  robots: { index: true, follow: true },
  generator: 'v0.dev',
  description: siteConfig.site.description ?? '',
});

// Next.js 15 App Router: use viewport export instead of metadata.viewport
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Helper functions to inline theme CSS variables at SSR
function hexToRgbServer(hex: string): string {
  const cleanHex = hex.replace('#', '');
  const r = Number.parseInt(cleanHex.substring(0, 2), 16);
  const g = Number.parseInt(cleanHex.substring(2, 4), 16);
  const b = Number.parseInt(cleanHex.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

// Helper to convert hex to HSL (for light/dark variants)
function hexToHslServer(hex: string): [number, number, number] {
  const cleanHex = hex.replace('#', '');
  const r = Number.parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = Number.parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = Number.parseInt(cleanHex.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHexServer(h: number, s: number, l: number): string {
  const s1 = s / 100;
  const l1 = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s1 * Math.min(l1, 1 - l1);
  const f = (n: number) => {
    const color = l1 - a * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function getThemeCssVars(theme: typeof siteConfig.theme): string {
  const [h, s, l] = hexToHslServer(theme.colors.primary);
  const primaryLight = hslToHexServer(h, s, Math.min(l + 20, 100));
  const primaryDark = hslToHexServer(h, s, Math.max(l - 20, 0));
  return `
		--primary: ${theme.colors.primary};
		--primary-rgb: ${hexToRgbServer(theme.colors.primary)};
		--primary-light: ${primaryLight};
		--primary-dark: ${primaryDark};
		--secondary: ${theme.colors.secondary};
		--secondary-rgb: ${hexToRgbServer(theme.colors.secondary)};
		--accent: ${theme.colors.accent};
		--accent-rgb: ${hexToRgbServer(theme.colors.accent)};
		${theme.colors.background ? `--background: ${theme.colors.background};` : ''}
		${theme.colors.header ? `--header: ${theme.colors.header};` : ''}
		${theme.colors.body ? `--body: ${theme.colors.body};` : ''}
		${theme.colors.lightGrey ? `--light-grey: ${theme.colors.lightGrey};` : ''}
		--white: #fff;
		--black: #000;
		--font-heading: ${theme.typography.headingFont};
		--font-body: ${theme.typography.bodyFont};
		--font-base-size: ${theme.typography.baseSize};
		--space-xs: ${theme.spacing.xs};
		--space-sm: ${theme.spacing.sm};
		--space-md: ${theme.spacing.md};
		--space-lg: ${theme.spacing.lg};
		--space-xl: ${theme.spacing.xl};
		--radius-base: ${theme.borders.radiusBase};
		--border-width-base: ${theme.borders.widthBase};
		--border-color-base: ${theme.borders.colorBase};
		--shadow-sm: ${theme.shadows.sm};
		--shadow-md: ${theme.shadows.md};
		--shadow-lg: ${theme.shadows.lg};
		--container-max-width: ${theme.layout.containerMaxWidth};
		--container-padding: ${theme.layout.containerPadding};
	`.trim();
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const themeCssVars = getThemeCssVars(siteConfig.theme);
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline theme CSS variables to prevent FOUC */}
        <style>{`:root {${themeCssVars}}`}</style>
        {/* `viewport` meta will be injected by Next.js and the metadata API */}
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preconnect & DNS-prefetch to site origin for images and data */}
        <link rel="preconnect" href={siteUrl} />
        <link rel="dns-prefetch" href={siteUrl} />
        {/* GA4 script for analytics (Partytown) */}
        <script
          type="text/partytown"
          data-cookieconsent="statistics"
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.tracking.ga4Id}`}
        />
        {/* Load Partytown worker for third-party script offloading */}
        <Partytown forward={['dataLayer.push']} />
        {/* Structured Data for SEO */}
        <StructuredData
          type="organization"
          data={{
            name: siteConfig.site.name ?? '',
            url: siteConfig.site.url ?? '',
            logo: siteConfig.theme.logo.src ?? '',
            socialLinks: [
              siteConfig.social?.facebook ?? '',
              siteConfig.social?.twitter ?? '',
              siteConfig.social?.linkedin ?? '',
              siteConfig.social?.instagram ?? '',
            ],
            phone: siteConfig.contact.phone ?? '',
            email: siteConfig.contact.email ?? '',
            streetAddress: siteConfig.contact.address?.line1 ?? '',
            city: siteConfig.contact.address?.city ?? '',
            postalCode: siteConfig.contact.address?.zip ?? '',
            country: siteConfig.contact.address?.country ?? '',
          }}
        />
        <StructuredData
          type="website"
          data={{
            name: siteConfig.site.name ?? '',
            url: siteConfig.site.url ?? '',
          }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body
        className={`${poppins.variable} ${raleway.variable} font-sans antialiased bg-gradient-to-br from-brand-light to-transparent`}
      >
        <WebVitalsReporter />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
