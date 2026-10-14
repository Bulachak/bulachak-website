// @polsia:user-owned — Zod contract for October Webinar Registration & Dogfooding.
import { z } from 'zod';

export const AttendeeRole = z.enum([
  'club-owner',
  'athlete-founder',
  'business-owner',
  'community-member',
  'other',
]);

export const WebinarRegistration = z.object({
  name: z.string().min(2, 'Your name is required'),
  email: z.string().email('Valid email address is required'),
  whatsappOrTelegram: z.string().optional(),
  role: AttendeeRole,
  organization: z.string().optional(),
  biggestChallenge: z.string().max(500).optional(),
  source: z.string().max(100).optional(),
});

export const WebinarResponse = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  confirmed: z.boolean(),
  eventTitle: z.string(),
  eventDate: z.string(),
  eventTime: z.string(),
  zoomLink: z.string(),
  icsContent: z.string(),
  icsFileName: z.string(),
  message: z.string(),
});

export type WebinarRegistration = z.infer<typeof WebinarRegistration>;
export type WebinarResponse = z.infer<typeof WebinarResponse>;
export type AttendeeRole = z.infer<typeof AttendeeRole>;
