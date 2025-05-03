import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { siteConfig } from '../../../lib/site.config';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import { Client as PostmarkClient } from 'postmark';
import mailchimp from '@mailchimp/mailchimp_transactional';

// Define schema for contact form payload
const contactSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().nonempty(),
  message: z.string().nonempty(),
  honeypot: z.string().optional(),
  recaptchaToken: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate incoming data
    const body = await request.json();
    const data = contactSchema.parse(body);

    // Verify reCAPTCHA token if enabled in config
    if (siteConfig.contactForm?.recaptchaSiteKey) {
      const secret = process.env.RECAPTCHA_SECRET_KEY;
      if (!secret) {
        return NextResponse.json(
          { success: false, error: 'reCAPTCHA secret key not configured' },
          { status: 500 }
        );
      }
      if (!data.recaptchaToken) {
        return NextResponse.json(
          { success: false, error: 'reCAPTCHA token missing' },
          { status: 400 }
        );
      }
      // Verify token with Google
      const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: data.recaptchaToken }),
      });
      const verifyJson = await verifyRes.json();
      if (!verifyJson.success) {
        return NextResponse.json(
          { success: false, error: 'reCAPTCHA verification failed' },
          { status: 400 }
        );
      }
    }

    // Drop spam submissions if honeypot field is filled
    if (data.honeypot) {
      return NextResponse.json({ success: true });
    }

    // Determine email provider from config
    const provider = siteConfig.contactForm?.provider ?? 'smtp';
    // Prepare email contents
    const ownerSubject = `Contact Form: ${data.subject}`;
    const ownerHtml = [
      `<p><strong>Name:</strong> ${data.name}</p>`,
      `<p><strong>Email:</strong> ${data.email}</p>`,
      data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : '',
      `<p><strong>Message:</strong><br/>${data.message.replace(/\n/g, '<br/>')}</p>`
    ].join('');
    const confirmationSubject = `Thanks for contacting ${siteConfig.site.name}`;
    const confirmationHtml = `<p>Hi ${data.name},</p><p>Thanks for your message. We'll get back to you soon.</p><hr/>${ownerHtml}`;

    // Send via configured provider
    switch (provider) {
      case 'smtp': {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          secure: process.env.SMTP_SECURE === 'true',
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });
        await transporter.sendMail({ from: `"${data.name}" <${data.email}>`, to: siteConfig.contact.email, subject: ownerSubject, html: ownerHtml });
        await transporter.sendMail({ from: `"${siteConfig.site.name}" <${process.env.SMTP_USER}>`, to: data.email, subject: confirmationSubject, html: confirmationHtml });
        break;
      }
      case 'sendgrid': {
        const apiKey = process.env.SENDGRID_API_KEY;
        const fromEmail = process.env.SENDGRID_FROM_EMAIL;
        if (!apiKey || !fromEmail) {
          return NextResponse.json(
            { success: false, error: 'SendGrid environment variables not defined' },
            { status: 500 }
          );
        }
        sgMail.setApiKey(apiKey);
        await sgMail.send({ to: siteConfig.contact.email, from: fromEmail, subject: ownerSubject, html: ownerHtml });
        await sgMail.send({ to: data.email, from: fromEmail, subject: confirmationSubject, html: confirmationHtml });
        break;
      }
      case 'postmark': {
        const apiToken = process.env.POSTMARK_API_TOKEN;
        const fromEmail = process.env.POSTMARK_FROM_EMAIL;
        if (!apiToken || !fromEmail) {
          return NextResponse.json(
            { success: false, error: 'Postmark environment variables not defined' },
            { status: 500 }
          );
        }
        const pmClient = new PostmarkClient(apiToken);
        await pmClient.sendEmail({ From: fromEmail, To: siteConfig.contact.email, Subject: ownerSubject, HtmlBody: ownerHtml });
        await pmClient.sendEmail({ From: fromEmail, To: data.email, Subject: confirmationSubject, HtmlBody: confirmationHtml });
        break;
      }
      case 'mailchimp': {
        const apiKey = process.env.MAILCHIMP_TRANSACTIONAL_API_KEY;
        const fromEmail = process.env.MAILCHIMP_TRANSACTIONAL_FROM_EMAIL;
        if (!apiKey || !fromEmail) {
          return NextResponse.json(
            { success: false, error: 'Mailchimp Transactional environment variables not defined' },
            { status: 500 }
          );
        }
        const mcClient = mailchimp(apiKey);
        // Send to site owner
        await mcClient.messages.send({
          message: {
            from_email: fromEmail,
            from_name: siteConfig.site.name,
            to: [{ email: siteConfig.contact.email, type: 'to' }],
            subject: ownerSubject,
            html: ownerHtml,
          },
        });
        // Send confirmation to submitter
        await mcClient.messages.send({
          message: {
            from_email: fromEmail,
            from_name: siteConfig.site.name,
            to: [{ email: data.email, type: 'to' }],
            subject: confirmationSubject,
            html: confirmationHtml,
          },
        });
        break;
      }
      case 'activeCampaign': {
        // TODO: implement ActiveCampaign transactional email
        return NextResponse.json(
          { success: false, error: 'ActiveCampaign provider not yet implemented' },
          { status: 501 }
        );
      }
      case 'hubspot': {
        // TODO: implement HubSpot transactional email
        return NextResponse.json(
          { success: false, error: 'HubSpot provider not yet implemented' },
          { status: 501 }
        );
      }
      default:
        return NextResponse.json(
          { success: false, error: `Provider '${provider}' not supported.` },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
} 