// @polsia:user-owned — Zod contract for the 15-Minute Operational Leak Audit.
import { z } from 'zod';

export const AthleteCountBand = z.enum(['1-20', '21-50', '51-100', '100+']);

export const BottleneckType = z.enum([
  'inquiry-leak',
  'manual-billing',
  'paper-waivers',
  'scheduling-friction',
  'software-fatigue',
]);

export const AuditSubmission = z.object({
  organizationName: z.string().min(2, 'Organization or club name is required'),
  contactName: z.string().min(2, 'Your name is required'),
  email: z.string().email('Please provide a valid email address'),
  phone: z.string().optional(),
  sportOrNiche: z.string().min(2, 'Sport or domain is required'),
  athleteCount: AthleteCountBand,
  weeklyAdminHours: z.number().min(1).max(60),
  primaryBottlenecks: z
    .array(BottleneckType)
    .min(1, 'Please select at least one primary operational bottleneck'),
  notes: z.string().max(1000).optional(),
  source: z.string().max(100).optional(),
});

export const AuditResult = z.object({
  id: z.string(),
  organizationName: z.string(),
  contactName: z.string(),
  frictionScore: z.number().min(0).max(100),
  frictionLevel: z.enum(['Low', 'Moderate', 'Severe', 'Critical']),
  estimatedWeeklyHoursWasted: z.number(),
  estimatedAnnualCostOfDrag: z.number(),
  recommendedPillar: z.string(),
  priorityPrescriptions: z.array(z.string()),
  bookingUrl: z.string(),
  createdAt: z.string(),
});

export type AuditSubmission = z.infer<typeof AuditSubmission>;
export type AuditResult = z.infer<typeof AuditResult>;
export type AthleteCountBand = z.infer<typeof AthleteCountBand>;
export type BottleneckType = z.infer<typeof BottleneckType>;
