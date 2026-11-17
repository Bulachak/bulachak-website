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
  icons: {
    apple: [{ url: '/p4p-dictionary/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    title: 'P4P Parafencing Dictionary',
    description,
    url: '/p4p/dictionary',
    images: [
      {
        url: '/p4p-dictionary/p4p-dictionary-og.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'P4P Parafencing Dictionary',
      },
      {
        url: '/p4p-dictionary/p4p-dictionary-og-sq.jpg',
        width: 800,
        height: 800,
        type: 'image/jpeg',
        alt: 'P4P Parafencing Dictionary',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'P4P Parafencing Dictionary',
    description,
    images: ['/p4p-dictionary/p4p-dictionary-og.jpg'],
  },
  other: { thumbnail: 'https://bulachak.com/p4p-dictionary/p4p-dictionary-og-sq.jpg' },
};

export default function P4PDictionaryRoute() {
  return <DictionaryPage files={dictionaryFiles} />;
}
