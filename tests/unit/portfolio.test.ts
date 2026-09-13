// @polsia:user-owned — catalogue behavior and publication boundaries.

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { caseStudies } from '@/lib/business/portfolio-content';
import { filterPortfolio } from '@/lib/business/portfolio-filter';
import { PortfolioList } from '@/lib/contracts/portfolio';

const slugs = (items: typeof caseStudies) => items.map((item) => item.slug);

describe('portfolio discovery', () => {
  it('matches every search term regardless of case or repeated whitespace', () => {
    expect(slugs(filterPortfolio(caseStudies, '  PLAYLA   bIlInGuAl  ', 'All work'))).toEqual([
      'playla-family-resource-app',
    ]);
    expect(filterPortfolio(caseStudies, 'PlayLA nonexistent-query-term', 'All work')).toEqual([]);
  });

  it('combines the selected capability with search instead of replacing either filter', () => {
    expect(slugs(filterPortfolio(caseStudies, 'playla', 'Operations & automation'))).toEqual([
      'playla-operations',
    ]);
    expect(slugs(filterPortfolio(caseStudies, 'playla', 'Web & product'))).toEqual([
      'playla-family-resource-app',
    ]);
    expect(filterPortfolio(caseStudies, 'playla', 'Strategy & storytelling')).toEqual([]);
  });

  it('keeps the category selection when the search is empty', () => {
    const communityWork = filterPortfolio(caseStudies, '   ', 'Community & access');
    expect(communityWork.length).toBeGreaterThan(0);
    expect(communityWork.every((item) => item.category === 'Community & access')).toBe(true);
    expect(slugs(communityWork)).toContain('community-presence-and-school-sport');
  });

  it('restores the complete ordered catalogue after clearing both controls', () => {
    const originalOrder = slugs(caseStudies);
    expect(filterPortfolio(caseStudies, 'no-such-work', 'Web & product')).toEqual([]);
    expect(filterPortfolio(caseStudies, '', 'All work')).toEqual(caseStudies);
    expect(filterPortfolio(caseStudies, ' \n\t ', 'All work')).toEqual(caseStudies);
    expect(slugs(caseStudies)).toEqual(originalOrder);
  });
});

describe('public portfolio contract', () => {
  it('validates the real catalogue against the contract shared by the API and client', () => {
    expect(caseStudies.length).toBeGreaterThan(0);
    expect(PortfolioList.parse({ items: caseStudies })).toEqual({ items: caseStudies });
  });

  it('gives every case a unique safe route and every section a unique safe anchor', () => {
    const safeId = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    expect(new Set(slugs(caseStudies)).size).toBe(caseStudies.length);
    for (const item of caseStudies) {
      expect(item.slug).toMatch(safeId);
      expect(item.sections.length).toBeGreaterThan(0);
      const sectionIds = item.sections.map((section) => section.id);
      expect(new Set(sectionIds).size, item.slug).toBe(sectionIds.length);
      for (const id of sectionIds) expect(id, item.slug).toMatch(safeId);
    }
  });

  it('excludes former application targets and the private club name from copy and URLs', () => {
    const publicPayload = JSON.stringify(caseStudies);
    const excludedNames = [
      /quoreka/i,
      /fam[\s-]?bot/i,
      /f[ew]ncing[\s-]?hub/i,
      /luxiomer/i,
      /beverly\s+hills\s+fencers\s+club/i,
      /dare-dashboard-for-open-ai/i,
      /dare\s+dashboard\s+for\s+andrey/i,
    ];
    for (const excludedName of excludedNames) expect(publicPayload).not.toMatch(excludedName);
  });

  it('keeps employer pitches, excluded proposal claims and internal review links out of publication', () => {
    const publicPayload = JSON.stringify(caseStudies);
    expect(publicPayload).not.toMatch(/how i would apply this at|why .{0,30} cares|marina-pitch/i);
    expect(publicPayload).not.toMatch(/enterprise diagnostic blueprint|40%|23%/i);
    for (const item of caseStudies) {
      for (const link of item.links) {
        if (link.url.startsWith('/assets/portfolio/')) {
          expect(link.url).toMatch(/^\/assets\/portfolio\/[a-z0-9-]+\.(pdf|png|webp|jpg)$/);
          expect(existsSync(join(process.cwd(), 'public', link.url)), item.slug).toBe(true);
          continue;
        }
        const url = new URL(link.url);
        expect(url.protocol, item.slug).toBe('https:');
        expect(link.url, item.slug).not.toMatch(
          /committee-review|04_portal|nominee-record|drive\.google\.com/i,
        );
      }
    }
  });
});
