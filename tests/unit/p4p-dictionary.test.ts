import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { layoutDictionary } from '@/components/custom/p4p-dictionary/dictionary-layout';
import {
  parseDictionary,
  searchEntries,
} from '@/components/custom/p4p-dictionary/dictionary-model';

const folder = path.join(process.cwd(), 'src/content/p4p-dictionary');
const files = readdirSync(folder)
  .filter((name) => name.endsWith('.md'))
  .map((name) => ({ name, raw: readFileSync(path.join(folder, name), 'utf8') }));
const dictionary = parseDictionary(files);

describe('P4P Parafencing Dictionary', () => {
  it('parses every entry and every link resolves', () => {
    expect(dictionary.problems).toEqual([]);
    expect(dictionary.entries.length).toBeGreaterThan(250);
  });

  it('keeps internal project files and personal sign-offs out of the public text', () => {
    for (const file of files) {
      expect(file.raw).not.toMatch(/AGENTS\.md|CONTEXT\.md|authorized by/i);
      expect(file.raw).not.toMatch(/[\u2013\u2014]/);
    }
  });

  it('finds a term by a word to avoid, and lays out every term', () => {
    expect(searchEntries(dictionary, 'berth').map((entry) => entry.id)).toContain('quota-place');
    expect(layoutDictionary(dictionary).size).toBe(dictionary.entries.length);
  });
});

describe('P4P Parafencing Dictionary bundle', () => {
  it('matches the Markdown files (run scripts/sync-p4p-dictionary.mjs after editing them)', async () => {
    const { dictionaryFiles } = await import('@/content/p4p-dictionary/entries.generated');
    expect(dictionaryFiles.map((file) => file.name)).toEqual(files.map((file) => file.name).sort());
    for (const file of dictionaryFiles) {
      const disk = files.find((item) => item.name === file.name);
      expect(file.raw).toBe(disk?.raw.replace(/\r\n/g, '\n'));
    }
  });
});
