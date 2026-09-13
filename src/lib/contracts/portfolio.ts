// @polsia:user-owned — editorial content shared by the portfolio API and UI.
import { z } from 'zod';

export const PortfolioLeg = z.enum(['A4A', 'P4P', 'I4I']);
export const PortfolioCategory = z.enum([
  'Operations & automation',
  'Web & product',
  'Strategy & storytelling',
  'Community & access',
]);
export const CaseStudy = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string(),
  subtitle: z.string(),
  category: PortfolioCategory,
  legs: z.array(PortfolioLeg),
  legNotes: z.record(PortfolioLeg, z.string()).optional(),
  status: z.enum(['Delivered work', 'Live product', 'Prototype', 'Strategy & research']),
  summary: z.string(),
  role: z.string(),
  highlight: z.string(),
  evidenceNote: z.string(),
  featured: z.boolean(),
  tags: z.array(z.string()),
  sections: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      paragraphs: z.array(z.string()),
      bullets: z.array(z.string()).optional(),
    }),
  ),
  links: z.array(
    z.object({
      label: z.string(),
      url: z.union([
        z.string().url(),
        z.string().regex(/^\/assets\/portfolio\/[a-z0-9-]+\.(pdf|png|webp|jpg)$/),
      ]),
    }),
  ),
});
export const PortfolioList = z.object({ items: z.array(CaseStudy) });
export type CaseStudy = z.infer<typeof CaseStudy>;
export type PortfolioLeg = z.infer<typeof PortfolioLeg>;
export type PortfolioCategory = z.infer<typeof PortfolioCategory>;
export type CaseCopy = Pick<
  CaseStudy,
  | 'title'
  | 'subtitle'
  | 'summary'
  | 'role'
  | 'highlight'
  | 'evidenceNote'
  | 'tags'
  | 'sections'
  | 'links'
  | 'legNotes'
>;
