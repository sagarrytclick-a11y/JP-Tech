import { z } from 'zod';

export const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .regex(/^\+?[\d\s-]{10,15}$/, 'Enter a valid 10-digit phone number'),
  service: z.string().min(1, 'Please select a service'),
  industry: z.string().optional().default(''),
  budget: z.string().optional().default(''),
  message: z
    .string()
    .min(10, 'Please describe your project in at least 10 characters')
    .max(1500, 'Please keep your message under 1500 characters'),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
