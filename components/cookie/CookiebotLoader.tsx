// Client-only component to load Cookiebot script on mount
'use client';
import { useEffect } from 'react';

export default function CookiebotLoader() {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_COOKIEBOT_ID;
    if (!id) return;
    const script = document.createElement('script');
    script.id = 'Cookiebot';
    script.src = 'https://consent.cookiebot.com/uc.js';
    script.setAttribute('data-cbid', id);
    script.setAttribute('data-blockingmode', 'auto');
    script.async = true;
    document.head.appendChild(script);
  }, []);
  return null;
}
