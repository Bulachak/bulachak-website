// @polsia:user-owned: concise public copy informed by Kamilla's philosophy documents.
import type { StoryPage } from '@/lib/contracts/portfolio-pages';

export const englishAbout: StoryPage = {
  slug: 'about',
  title: 'A future we build together',
  eyebrow: 'About Bulachak',
  description:
    'Bulachak means "the future" in Tatar. Its three branches, Agents 4 Athletes, Parafencing 4 Progress, and Immigrant 4 Immigrant, share the Emerald Pasture philosophy.',
  sections: [
    {
      id: 'philosophy',
      title: 'The Emerald Pasture',
      paragraphs: [
        'In business and economics, market environments are often framed as oceans: "Red Oceans" where competitors fight over a fixed pool of existing demand, or "Blue Oceans" where companies search for new, uncontested spaces.',
        'Bulachak introduces a third environment: the Emerald Pasture. Instead of fighting or fleeing, it is built on co-opetition: cultivating shared ground where organizations compete with excellence while cooperating to expand total value through clear agreements and mutual respect.',
      ],
    },
    {
      id: 'red-ocean',
      title: 'Red Ocean',
      paragraphs: [
        'Extract value',
        'Compete for a share of existing demand in a crowded, zero-sum contest.',
      ],
    },
    {
      id: 'blue-ocean',
      title: 'Blue Ocean',
      paragraphs: ['Discover value', 'Create new demand and find untapped, uncontested spaces.'],
    },
    {
      id: 'emerald-pasture',
      title: 'Emerald Pasture',
      paragraphs: [
        'Grow value together',
        'Share knowledge and combine strengths to grow total value instead of only dividing a fixed pool. Respect people’s time and capacity.',
      ],
    },
    {
      id: 'alignment',
      title: 'Human alignment first, AI second',
      paragraphs: [
        'Agree on goals, responsibilities, and fair exchanges. Then build AI systems to support the people doing the work.',
      ],
    },
    {
      id: 'connections',
      title: 'Three branches, one philosophy',
      paragraphs: [],
    },
    {
      id: 'a4a',
      title: 'Agents 4 Athletes',
      paragraphs: [
        'The commercial engine, developing tools and operations support for athletes, clubs, and sports organizations.',
      ],
    },
    {
      id: 'p4p',
      title: 'Parafencing 4 Progress',
      paragraphs: [
        'A nonprofit branch in development, focused on equipment, coaching, and access to adaptive fencing.',
      ],
    },
    {
      id: 'i4i',
      title: 'Immigrant 4 Immigrant',
      paragraphs: [
        'Community and immigrant kinship through mutual support, shared knowledge, and cultural continuity.',
      ],
    },
  ],
};
