'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import type { z } from 'zod';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import PageTransitionWrapper from '@/components/layout/PageTransitionWrapper';
import DataLayerProvider from '@/components/tracking/data-layer-provider';
import BfcacheSafety from '@/components/ui/BfcacheSafety';
import ScrollToTop from '@/components/ui/scroll-to-top';
import type { ServiceType } from '@/lib/data-utils';
import type { resourceSchema } from '@/lib/schemas/contentBlocks.schema';
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

interface AppShellProps {
  children: React.ReactNode;
  resources: z.infer<typeof resourceSchema>[];
  services: ServiceType[];
}

export default function AppShell({ children, resources, services }: AppShellProps) {
  const pathname = usePathname();
  const isLandingPage = pathname?.startsWith('/landing/');

  return (
    <>
      <BfcacheSafety />
      {/* Animated background canvas */}
      {siteConfig.features.enableAdvancedBackgrounds && <DynamicBackgroundCanvas />}
      {/* Custom React-based cookie banner removed - using Cookiebot instead */}
      {/* Cookiebot loader for production consent flow */}
      <DynamicCookiebotLoaderClient />
      <DataLayerProvider>
        {/* Tracking scripts that respect cookie consent */}
        <DynamicTrackingScripts />
        <Suspense fallback={null}>
          <DynamicPageViewTracker />
        </Suspense>
        <div className="flex min-h-screen flex-col overflow-x-hidden">
          {/* Only show main Header if NOT on a landing page */}
          {!isLandingPage && <Header resources={resources} services={services} />}
          <main className="grow">
            <PageTransitionWrapper>{children}</PageTransitionWrapper>
          </main>
          {/* Only show main Footer if NOT on a landing page */}
          {!isLandingPage && <Footer />}
        </div>
        <ScrollToTop />
        <DynamicToaster />
      </DataLayerProvider>
    </>
  );
}
