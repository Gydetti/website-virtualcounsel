'use client';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

declare const process: {
  env: {
    NEXT_PUBLIC_NEWSLETTER_PROVIDER?: string;
    HUBSPOT_PORTAL_ID?: string;
    HUBSPOT_FORM_ID?: string;
  };
};

function HubspotForm() {
  useEffect(() => {
    const portalId = process.env.HUBSPOT_PORTAL_ID;
    const formId = process.env.HUBSPOT_FORM_ID;
    if (!portalId || !formId) return;
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/v2.js';
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      if (window.hbspt?.forms) {
        // @ts-ignore
        window.hbspt.forms.create({
          portalId,
          formId,
          target: '#hsNewsletter',
        });
      }
    };
    document.body.appendChild(script);
  }, []);
  return <div id="hsNewsletter" />;
}

export function SubscribeForm() {
  const provider = process.env.NEXT_PUBLIC_NEWSLETTER_PROVIDER?.toLowerCase();
  // if no provider defined, hide form
  if (!provider) return null;

  // embed HubSpot form
  if (provider === 'hubspot') {
    return <HubspotForm />;
  }

  // generic email push for Mailchimp or ActiveCampaign
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 min-w-[300px]">
      <Input
        type="email"
        placeholder="Uw e-mailadres"
        value={email}
        onChange={e => setEmail(e.currentTarget.value)}
        className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-brand-primary focus:ring-brand-primary/20 text-sm"
      />
      <Button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="bg-brand-primary text-white hover:bg-brand-primary/90 font-medium whitespace-nowrap text-sm px-4 py-2"
        animation="none"
      >
        {status === 'loading' ? 'Bezig...' : status === 'success' ? 'Verstuurd!' : 'Aanmelden'}
      </Button>
      {status === 'error' && (
        <p className="text-feedback-error-text text-sm mt-2 col-span-full">
          Oeps—er is iets misgegaan. Probeer het opnieuw.
        </p>
      )}
    </form>
  );
}
