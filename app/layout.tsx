import './globals.css';

import { Partytown } from '@qwik.dev/partytown/react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Poppins, Raleway } from 'next/font/google';

import WebVitalsReporter from '@/components/analytics/WebVitalsReporter';
import AppShell from '@/components/layout/AppShell';
import StructuredData from '@/components/seo/structured-data';
import { defaultMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/siteConfig';
import { themeVariants } from '@/lib/theme.variants';

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

// Hardcoded default theme variant (no env var needed)
const themeKey = 'v1';
// Simplify fallback to direct property access
const variant = themeVariants[themeKey] ?? themeVariants.v1;

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
  return `${r} ${g} ${b}`;
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

// Convert camelCase to kebab-case for CSS variable names
function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// Unified CSS-variable injector: handles all theme colors plus computed light/dark variants
function getThemeCssVars(theme: typeof siteConfig.theme, variantKey: string): string {
  // Base HSL values for primary color
  const [h, s, l] = hexToHslServer(theme.colors.primary);
  // Compute first- and second-level color variants
  const primaryLight = hslToHexServer(h, s, Math.min(l + 20, 100));
  const primaryLight2 = hslToHexServer(h, s, Math.min(l + 30, 100));
  const primaryDark = hslToHexServer(h, s, Math.max(l - 20, 0));
  const primaryDark2 = hslToHexServer(h, s, Math.max(l - 30, 0));
  // Compute third-level primary variants
  const primaryLight3 = hslToHexServer(h, s, Math.min(l + 40, 100));
  const primaryDark3 = hslToHexServer(h, s, Math.max(l - 40, 0));
  // Compute light/dark variants for secondary and accent
  const [hSec, sSec, lSec] = hexToHslServer(theme.colors.secondary);
  const secondaryLight = hslToHexServer(hSec, sSec, Math.min(lSec + 20, 100));
  const secondaryDark = hslToHexServer(hSec, sSec, Math.max(lSec - 30, 0));
  const [hAcc, sAcc, lAcc] = hexToHslServer(theme.colors.accent);
  const accentLight = hslToHexServer(hAcc, sAcc, Math.min(lAcc + 20, 100));
  const accentDark = hslToHexServer(hAcc, sAcc, Math.max(lAcc - 20, 0));

  // Inject CSS variables for each original theme color
  const cssVars = Object.entries(theme.colors)
    .map(([key, value]) => {
      const name = toKebabCase(key);
      const rgb = hexToRgbServer(value);
      const [hVal, sVal, lVal] = hexToHslServer(value);
      return `--${name}: ${value}; --${name}-rgb: ${rgb}; --brand-${name}: ${hVal} ${sVal}% ${lVal}%; --brand-${name}-rgb: ${rgb};`;
    })
    .join('\n');

  // Append theme-specific overrides for layout, typography, borders, spacing, shadows, and computed variants
  return `
    ${cssVars}
    /* Layout Overrides */
    --container-padding: ${theme.layout.containerPadding};
    --container-max-width: ${siteConfig.theme.layout.containerMaxWidth};
    /* Typography Overrides */
    --font-base-size: ${theme.typography.baseSize};
    /* Border Overrides */
    --radius: ${theme.borders.radiusBase};
    --border-width-base: ${theme.borders.widthBase};
    --border-color-base: ${theme.borders.colorBase};
    /* Spacing Overrides */
    --space-xs: ${theme.spacing.xs};
    --space-sm: ${theme.spacing.sm};
    --space-md: ${theme.spacing.md};
    --space-lg: ${theme.spacing.lg};
    --space-xl: ${theme.spacing.xl};
    /* Shadow Overrides */
    --shadow-flat: ${theme.shadows.flat};
    --shadow-subtle: ${theme.shadows.subtle};
    --shadow-medium: ${theme.shadows.medium};
    --shadow-pronounced: ${theme.shadows.pronounced};
    /* Computed Color Variants */
    --brand-light: ${primaryLight};
    --brand-light-rgb: ${hexToRgbServer(primaryLight)};
    --brand-dark: ${primaryDark};
    --brand-dark-rgb: ${hexToRgbServer(primaryDark)};
    --brand-light-2: ${primaryLight2};
    --brand-light-2-rgb: ${hexToRgbServer(primaryLight2)};
    --brand-dark-2: ${primaryDark2};
    --brand-dark-2-rgb: ${hexToRgbServer(primaryDark2)};
    --brand-light-3: ${primaryLight3};
    --brand-light-3-rgb: ${hexToRgbServer(primaryLight3)};
    --brand-dark-3: ${primaryDark3};
    --brand-dark-3-rgb: ${hexToRgbServer(primaryDark3)};
    --brand-secondary-light: ${secondaryLight};
    --brand-secondary-light-rgb: ${hexToRgbServer(secondaryLight)};
    --brand-secondary-dark: ${secondaryDark};
    --brand-secondary-dark-rgb: ${hexToRgbServer(secondaryDark)};
    --brand-accent-light: ${accentLight};
    --brand-accent-light-rgb: ${hexToRgbServer(accentLight)};
    --brand-accent-dark: ${accentDark};
    --brand-accent-dark-rgb: ${hexToRgbServer(accentDark)};
  `.trim();
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Merge full variant into the base theme (colors, typography, spacing, borders, shadows, layout, animation, visualStyle, sectionStyles)
  const mergedTheme = {
    ...siteConfig.theme,
    ...variant,
    colors: {
      ...siteConfig.theme.colors,
      ...variant.colors,
    },
    typography: {
      ...siteConfig.theme.typography,
      ...variant.typography,
    },
  };
  // Compute secondary light/dark variants for primary color
  const [h, s, l] = hexToHslServer(mergedTheme.colors.primary);
  const primaryLight = hslToHexServer(h, s, Math.min(l + 20, 100));
  const primaryDark = hslToHexServer(h, s, Math.max(l - 20, 0));
  // Augment colors with computed variants
  const augmentedTheme = {
    ...mergedTheme,
    colors: {
      ...mergedTheme.colors,
      'light-2': primaryLight,
      'dark-2': primaryDark,
    },
  };
  // Generate CSS variables based on active variant
  const themeCssVars = getThemeCssVars(augmentedTheme as typeof siteConfig.theme, themeKey);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
        className={`${poppins.variable} ${raleway.variable} font-sans antialiased bg-body-gradient`}
      >
        <WebVitalsReporter />
        <SpeedInsights />
        <Analytics />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
