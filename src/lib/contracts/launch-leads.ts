// @polsia:user-owned — Shared Zod contract for the YC Silent Launch lead capture form on bulachak.com.
import { z } from 'zod';

export const LAUNCH_BRANCHES = ['A4A', 'P4P', 'I4I', 'GENERAL'] as const;
export const LAUNCH_LOCALES = ['en', 'ru', 'tt'] as const;

export const LaunchLeadCreate = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120, 'Name is too long'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .max(254, 'Email is too long')
    .email('Enter a valid email address'),
  branch: z.enum(LAUNCH_BRANCHES, {
    message: 'Select a branch or focus area',
  }),
  message: z.string().trim().max(1000, 'Keep note under 1000 characters').optional(),
  locale: z.enum(LAUNCH_LOCALES).default('en'),
  source: z.string().trim().max(100).optional(),
});

export const LaunchLeadItem = LaunchLeadCreate.extend({
  id: z.string(),
  locale: z.enum(LAUNCH_LOCALES),
  createdAt: z.string(),
  auditPrefillUrl: z.string(),
});

export type LaunchLeadCreate = z.infer<typeof LaunchLeadCreate>;
export type LaunchLeadItem = z.infer<typeof LaunchLeadItem>;
export type LaunchBranch = (typeof LAUNCH_BRANCHES)[number];
