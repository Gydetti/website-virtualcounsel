'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { trackEvent } from '@/lib/tracking-utils';

export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page view when route changes
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // Push to dataLayer for GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        page: {
          path: url,
          title: document.title,
        },
      });
    }

    // Track using our utility
    trackEvent('page_view', 'navigation', url, undefined, {
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}
