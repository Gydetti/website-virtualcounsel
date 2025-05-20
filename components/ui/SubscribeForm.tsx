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
    <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
      <Input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={e => setEmail(e.currentTarget.value)}
        className="bg-neutral-surface/30 border-white/60 text-white placeholder:text-white focus:border-white"
      />
      <Button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="bg-neutral-surface text-primary hover:bg-neutral-background/200"
      >
        {status === 'loading' ? '…sending' : status === 'success' ? '✅ Subscribed' : 'Subscribe'}
      </Button>
      {status === 'error' && (
        <p className="mt-2 text-feedback-error text-sm">Oops—something went wrong.</p>
      )}
    </form>
  );
}
