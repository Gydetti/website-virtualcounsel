'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import PageTransitionWrapper from '@/components/layout/PageTransitionWrapper';
import DataLayerProvider from '@/components/tracking/data-layer-provider';
import BfcacheSafety from '@/components/ui/BfcacheSafety';
import ScrollToTop from '@/components/ui/scroll-to-top';
import { siteConfig } from '@/lib/siteConfig';

const DynamicBackgroundCanvas = dynamic(() => import('@/components/ui/BackgroundCanvas'), {
  ssr: false,
});
const DynamicTrackingScripts = dynamic(() => import('@/components/tracking/tracking-scripts'), {
  ssr: false,
});
const DynamicPageViewTracker = dynamic(() => import('@/components/tracking/page-view-tracker'), {
  ssr: false,
});
const DynamicToaster = dynamic(
  () => import('@/components/ui/toaster').then(mod => ({ default: mod.Toaster })),
  { ssr: false }
);
const DynamicCookiebotLoaderClient = dynamic(
  () => import('@/components/cookie/CookiebotLoaderClient'),
  { ssr: false }
);
const DynamicCookieConsentBanner = dynamic(
  () => import('@/components/cookie/cookie-consent-banner'),
  { ssr: false }
);

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BfcacheSafety />
      {/* Animated background canvas */}
      {siteConfig.features.enableAdvancedBackgrounds && <DynamicBackgroundCanvas />}
      {/* Custom React-based cookie banner (disabled by default) */}
      {siteConfig.features.enableCustomCookieBanner && <DynamicCookieConsentBanner />}
      {/* Cookiebot loader for production consent flow */}
      <DynamicCookiebotLoaderClient />
      <DataLayerProvider>
        {/* Tracking scripts that respect cookie consent */}
        <DynamicTrackingScripts />
        <Suspense fallback={null}>
          <DynamicPageViewTracker />
        </Suspense>
        <div className="flex min-h-screen flex-col">
          <Header />
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
          <Footer />
        </div>
        <ScrollToTop />
        <DynamicToaster />
      </DataLayerProvider>
    </>
  );
}
