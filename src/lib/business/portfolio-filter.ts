// @polsia:user-owned — pure catalogue matching, shared with meaningful tests.
import type { CaseStudy } from '@/lib/contracts/portfolio';

export function filterPortfolio(items: CaseStudy[], query: string, category: string) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return items.filter((item) => {
    if (category !== 'All work' && item.category !== category) return false;
    const searchable = [
      item.title,
      item.subtitle,
      item.summary,
      item.category,
      ...item.legs,
      ...item.tags,
    ]
      .join(' ')
      .toLocaleLowerCase();
    return terms.every((term) => searchable.includes(term));
  });
}
