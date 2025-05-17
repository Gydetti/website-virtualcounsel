/// <reference types="vitest" />
declare module 'vite-tsconfig-paths';
declare module '@vitejs/plugin-react';
declare module 'vitest/config';
declare module 'vitest';
declare module '@testing-library/react';
declare module 'react-google-recaptcha';
declare module '@mailchimp/mailchimp_transactional';
declare module 'nodemailer';
declare module '@sendgrid/mail';
declare module 'postmark';
declare module '@qwik.dev/partytown/react';

declare module 'web-vitals' {
  export type Metric = {
    name: string;
    value: number;
    delta: number;
    id: string;
  };
  export function onCLS(onReport: (metric: Metric) => void): void;
  export function onFCP(onReport: (metric: Metric) => void): void;
  export function onLCP(onReport: (metric: Metric) => void): void;
  export function onTTFB(onReport: (metric: Metric) => void): void;
  export function onINP(onReport: (metric: Metric) => void): void;
}
