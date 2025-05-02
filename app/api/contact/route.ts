import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { siteConfig } from '../../../lib/site.config';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // TODO: integrate with email provider or CRM based on siteConfig.contact or siteConfig.contactForm
    console.log('Contact form submission:', data);

    // Example: Email-only mode using nodemailer or SMTP
    // import nodemailer and send email to siteConfig.contact.email

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    let message = 'An unknown error occurred';
    if (error instanceof Error) {
      message = error.message;
    }
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
} 