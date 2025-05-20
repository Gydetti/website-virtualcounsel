import { z } from 'zod';

// Schema for validating contact form payloads across the app
export const contactSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().nonempty(),
  message: z.string().nonempty(),
  honeypot: z.string().optional(),
});
