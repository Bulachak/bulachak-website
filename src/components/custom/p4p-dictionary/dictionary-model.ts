// biome-ignore-all lint/style/noNonNullAssertion: canvas, layout and parser code indexes arrays it has just sized; strict index checks need the assertions.
// Copied from the parafencing-project dictionary (canonical source); sync with scripts/sync-p4p-dictionary.mjs.
// created_by: Claude Code (Fable 5.2); date_created: 2026-11-13
// Parses the dictionary markdown files into entries and a graph.
// The writing is the data: every [[Term]] link inside a definition becomes an edge.

export type EntryStatus = 'official' | 'library' | 'glossary' | 'rule' | 'draft';
export type Segment = { text: string; link?: string };

export interface DictionaryEntry {
  id: string;
  term: string;
  group: string;
  short: string;
  paragraphs: Segment[][];
  example: string[];
  avoid: string[];
  source: string;
  status: EntryStatus;
  /** Terms this entry links to, in reading order. */
  links: string[];
  /** Links out followed by links in: everything one step away. */
  connects: string[];
}

export interface Dictionary {
  groups: string[];
  entries: DictionaryEntry[];
  byId: Map<string, DictionaryEntry>;
  edges: Array<[string, string]>;
  problems: string[];
}

export interface DictionaryFile {
  name: string;
  raw: string;
}

export const STATUS_LABEL: Record<EntryStatus, string> = {
  official: 'From the official rules',
  library: 'From the P4P library',
  glossary: 'From the project glossary',
  rule: 'Settled terminology',
  draft: 'Draft, awaiting coach review',
};

export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const LINK = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

function segments(text: string, links: string[]): Segment[] {
  const out: Segment[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    if (match.index! > last) out.push({ text: text.slice(last, match.index) });
    const id = slugify(match[1]!);
    out.push({ text: (match[2] || match[1]!).trim(), link: id });
    if (!links.includes(id)) links.push(id);
    last = match.index! + match[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}

function parseFile(file: DictionaryFile, problems: string[]): DictionaryEntry[] {
  const raw = file.raw.replace(/\r\n/g, '\n');
  const front = raw.match(/^---\n([\s\S]*?)\n---\n/);
  const group = front?.[1]?.match(/^group:\s*(.+)$/m)?.[1]?.trim() || '';
  if (!group) problems.push(`${file.name}: missing "group" in the header`);
  const body = front ? raw.slice(front[0].length) : raw;
  const entries: DictionaryEntry[] = [];
  for (const section of body.split(/^## /m).slice(1)) {
    const lines = section.split('\n');
    const term = lines[0]!.trim();
    const fields: Record<string, string> = {};
    let index = 1;
    for (; index < lines.length && lines[index]!.trim(); index++) {
      const field = lines[index]!.match(/^([a-z]+):\s*(.*)$/);
      if (field) fields[field[1]!] = field[2]!.trim();
      else
        problems.push(
          `${file.name}: "${term}" has a line that is not "key: value" before its definition`,
        );
    }
    const links: string[] = [];
    const paragraphs: Segment[][] = [];
    const example: string[] = [];
    for (const block of lines
      .slice(index)
      .join('\n')
      .split(/\n{2,}/)
      .map((item) => item.trim())
      .filter(Boolean)) {
      const blockLines = block.split('\n');
      if (blockLines.every((line) => line.startsWith('>')))
        example.push(...blockLines.map((line) => line.replace(/^>\s?/, '').trim()).filter(Boolean));
      else paragraphs.push(segments(blockLines.join(' '), links));
    }
    const status = (['official', 'library', 'glossary', 'rule', 'draft'] as const).find(
      (item) => item === fields.status,
    );
    if (!status)
      problems.push(
        `${file.name}: "${term}" needs status official, library, glossary, rule or draft`,
      );
    if (!fields.short) problems.push(`${file.name}: "${term}" has no short definition`);
    if (!paragraphs.length) problems.push(`${file.name}: "${term}" has no full definition`);
    entries.push({
      id: slugify(term),
      term,
      group,
      short: fields.short || '',
      paragraphs,
      example,
      avoid: (fields.avoid || '')
        .split(';')
        .map((item) => item.trim())
        .filter(Boolean),
      source: fields.source || '',
      status: status || 'draft',
      links,
      connects: [],
    });
  }
  return entries;
}

export function parseDictionary(files: DictionaryFile[]): Dictionary {
  const problems: string[] = [];
  const entries = [...files]
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap((file) => parseFile(file, problems));
  const byId = new Map<string, DictionaryEntry>();
  for (const entry of entries) {
    if (byId.has(entry.id)) problems.push(`"${entry.term}" is defined twice`);
    byId.set(entry.id, entry);
  }
  const seen = new Set<string>();
  const edges: Array<[string, string]> = [];
  for (const entry of entries) {
    for (const target of entry.links) {
      if (target === entry.id) {
        problems.push(`"${entry.term}" links to itself`);
        continue;
      }
      if (!byId.has(target)) {
        problems.push(`"${entry.term}" links to "${target}", which has no entry`);
        continue;
      }
      const key = [entry.id, target].sort().join('|');
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([entry.id, target]);
      }
    }
    entry.links = entry.links.filter((target) => target !== entry.id && byId.has(target));
  }
  for (const entry of entries) {
    const incoming = entries
      .filter((other) => other.links.includes(entry.id))
      .map((other) => other.id);
    entry.connects = [...new Set([...entry.links, ...incoming])];
    if (!entry.connects.length) problems.push(`"${entry.term}" is not connected to any other term`);
  }
  return {
    groups: [...new Set(entries.map((entry) => entry.group))],
    entries,
    byId,
    edges,
    problems,
  };
}

export function searchEntries(dictionary: Dictionary, query: string): DictionaryEntry[] {
  const needle = slugify(query);
  if (!needle) return dictionary.entries;
  return dictionary.entries.filter((entry) =>
    slugify(`${entry.term} ${entry.short} ${entry.avoid.join(' ')}`).includes(needle),
  );
}
