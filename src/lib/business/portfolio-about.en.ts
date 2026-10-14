// @polsia:user-owned: concise public copy informed by Kamilla's philosophy documents.
import type { StoryPage } from '@/lib/contracts/portfolio-pages';

export const englishAbout: StoryPage = {
  slug: 'about',
  title: 'A\u00A0future we build together',
  eyebrow: 'About Bulachak',
  description:
    'Bulachak means "the future" in Tatar. Its three branches, Agents 4 Athletes, Parafencing 4 Progress, and Immigrant 4 Immigrant, share the Emerald Pasture philosophy.',
  sections: [
    {
      id: 'philosophy',
      title: 'The\u00A0Emerald Pasture',
      paragraphs: [
        'In business and economics, market environments are often framed as oceans: "Red Oceans" where competitors fight over a fixed pool of existing demand, or "Blue Oceans" where companies search for new, uncontested spaces.',
        'Bulachak establishes a third environment: the Emerald Pasture. Rather than fighting over fixed resources or withdrawing into isolation, this model is built on co-opetition: cultivating shared ground where organizations compete with excellence while cooperating to expand total value through clear agreements and mutual respect.',
      ],
    },
    {
      id: 'red-ocean',
      title: 'Red Ocean',
      paragraphs: [
        'Extract value',
        'Compete for market share within existing demand in an exhaustive, zero-sum contest.',
      ],
    },
    {
      id: 'blue-ocean',
      title: 'Blue Ocean',
      paragraphs: ['Discover value', 'Unlock new demand and establish uncontested market spaces.'],
    },
    {
      id: 'emerald-pasture',
      title: 'Emerald Pasture',
      paragraphs: [
        'Grow value together',
        'Pool knowledge and combine strengths to expand total value rather than divide fixed resources. Respect people’s time, energy, and capacity.',
      ],
    },
    {
      id: 'alignment',
      title: 'Human alignment first, AI\u00A0second',
      paragraphs: [
        'Align first on goals, governance, and equitable exchange. Then deploy AI systems that eliminate operational friction and empower people on the ground.',
      ],
    },
    {
      id: 'connections',
      title: 'Three branches, one\u00A0philosophy',
      paragraphs: [],
    },
    {
      id: 'a4a',
      title: 'Agents 4 Athletes',
      paragraphs: [
        'The commercial engine: developing practical tools, workflow automation, and operational support for athletes, clubs, and sports organizations.',
      ],
    },
    {
      id: 'p4p',
      title: 'Parafencing 4 Progress',
      paragraphs: [
        'A dedicated nonprofit branch in development: securing specialized equipment, building coaching frameworks, and expanding lasting access to adaptive fencing.',
      ],
    },
    {
      id: 'i4i',
      title: 'Immigrant 4 Immigrant',
      paragraphs: [
        'Fostering community and immigrant kinship through reciprocal support, shared knowledge, and cultural continuity across generations.',
      ],
    },
  ],
};
