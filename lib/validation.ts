import { z } from 'zod';

export const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .regex(/^\+?[\d\s-]{10,15}$/, 'Enter a valid 10-digit phone number'),
  city: z.string().optional().default(''),
  service: z.enum(['Web', 'Social Media']).default('Web'),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
