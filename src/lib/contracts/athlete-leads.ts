// @polsia:user-owned — shared zod contract for the athlete-leads resource.
// Client-importable: zod only, no server-only imports. Mirror this in the
// route handler and the client island so the wire shape stays in sync.

import { z } from 'zod';

export const TRANSITION_STAGES = ['pre_retirement', 'early', 'mid', 'late'] as const;

export const AthleteLeadCreate = z.object({
  name: z.string().min(1, 'Name is required').max(120, 'Name is too long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .max(254, 'Email is too long')
    .email('Enter a valid email address'),
  sport: z.string().min(1, 'Sport is required').max(120, 'Sport is too long'),
  transitionStage: z.enum(TRANSITION_STAGES, {
    message: 'Choose a transition stage',
  }),
  targetVenture: z
    .string()
    .min(1, 'Describe the venture you are standing up')
    .max(2000, 'Keep the venture description under 2000 characters'),
});

export const AthleteLeadItem = AthleteLeadCreate.extend({
  id: z.string(),
  createdAt: z.coerce.date(),
});

export type AthleteLeadCreate = z.infer<typeof AthleteLeadCreate>;
export type AthleteLeadItem = z.infer<typeof AthleteLeadItem>;
export type TransitionStage = (typeof TRANSITION_STAGES)[number];
