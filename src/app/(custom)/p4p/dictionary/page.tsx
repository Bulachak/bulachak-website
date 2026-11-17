// /p4p/dictionary — the public P4P Parafencing Dictionary. Entries are Markdown files in
// src/content/p4p-dictionary, bundled through entries.generated.ts (see scripts/sync-p4p-dictionary.mjs).
// The page renders per request like the rest of the site so the CSP nonce reaches its scripts.
import type { Metadata } from 'next';
import { DictionaryPage } from '@/components/custom/p4p-dictionary/dictionary-page';
import { dictionaryFiles } from '@/content/p4p-dictionary/entries.generated';

const description =
  'An open dictionary of wheelchair fencing: rules, classification, equipment, technique, coaching, research and history, each term with its source. From P4P, Parafencing 4 Progress.';

export const metadata: Metadata = {
  title: 'Parafencing Dictionary · P4P',
  description,
  alternates: { canonical: '/p4p/dictionary' },
  openGraph: { title: 'P4P Parafencing Dictionary', description, url: '/p4p/dictionary' },
};

export default function P4PDictionaryRoute() {
  return <DictionaryPage files={dictionaryFiles} />;
}
