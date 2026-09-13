// @polsia:user-owned: editorial pages for the public portfolio.
import { z } from 'zod';
export const StoryPage = z.object({
  slug: z.string(),
  title: z.string(),
  eyebrow: z.string(),
  description: z.string(),
  sections: z.array(
    z.object({ id: z.string(), title: z.string(), paragraphs: z.array(z.string()) }),
  ),
  relatedLeg: z.enum(['A4A', 'P4P', 'I4I']).optional(),
});
export type StoryPage = z.infer<typeof StoryPage>;
