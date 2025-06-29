'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MagicLinkRedirector() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#confirm') || hash.startsWith('#recovery')) {
      const path = window.location.pathname;
      if (!path.startsWith('/admin')) {
        router.replace(`/admin${hash}`);
      }
    }
  }, [router]);

  return null;
}
