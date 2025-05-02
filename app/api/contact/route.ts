import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { siteConfig } from '../../../lib/site.config';
import { z } from 'zod';
import nodemailer from 'nodemailer';

// Define schema for contact form payload
const contactSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().nonempty(),
  message: z.string().nonempty(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate incoming data
    const body = await request.json();
    const data = contactSchema.parse(body);

    // Configure SMTP transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Prepare email options
    const mailOptions = {
      from: `"${data.name}" <${data.email}>`,
      to: siteConfig.contact.email,
      subject: `Contact Form: ${data.subject}`,
      html: `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        <p><strong>Message:</strong><br/>${data.message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

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