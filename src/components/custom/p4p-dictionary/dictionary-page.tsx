'use client';
// Public P4P Parafencing Dictionary page: keeps the open term in the URL hash (/p4p/dictionary#quinte)
// so a term can be shared, and the browser Back button steps back through terms. The server renders a
// plain list of every term (for search engines and readers without JavaScript); the interactive
// dictionary takes over once the page has loaded in the browser.
import { useCallback, useEffect, useMemo, useState } from 'react';
import { parseDictionary } from './dictionary-model';
import DictionaryView from './dictionary-view';

// Binds the last two words so no line ends on a single word.
const keepLastTwo = (value: string) => value.replace(/ (?=\S+$)/, ' ');
const readTerm = () => decodeURIComponent(window.location.hash.replace(/^#/, ''));

export function DictionaryPage({ files }: { files: { name: string; raw: string }[] }) {
  const [ready, setReady] = useState(false);
  const [termId, setTermId] = useState('');
  useEffect(() => {
    setTermId(readTerm());
    setReady(true);
    const sync = () => setTermId(readTerm());
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);
  const onTerm = useCallback((id: string) => {
    window.history.pushState(null, '', id ? `#${id}` : window.location.pathname);
    setTermId(id);
  }, []);
  const onExit = useCallback(() => {
    window.location.assign('/p4p');
  }, []);
  const dictionary = useMemo(() => parseDictionary(files), [files]);

  if (!ready) {
    return (
      <main className="portfolio-container py-16">
        <h1 className="text-3xl font-semibold">P4P Parafencing Dictionary</h1>
        <p className="mt-4 max-w-2xl text-pretty">
          {dictionary.entries.length} terms of wheelchair fencing, each with its&nbsp;source.
        </p>
        {dictionary.groups.map((group) => (
          <section key={group} className="mt-10">
            <h2 className="text-xl font-semibold">{group}</h2>
            <dl className="mt-4 space-y-3">
              {dictionary.entries
                .filter((entry) => entry.group === group)
                .map((entry) => (
                  <div key={entry.id} id={entry.id}>
                    <dt className="font-semibold">{entry.term}</dt>
                    <dd className="text-pretty">{keepLastTwo(entry.short)}</dd>
                  </div>
                ))}
            </dl>
          </section>
        ))}
      </main>
    );
  }

  return (
    <div id="p4p-dictionary">
      <h1 className="sr-only">P4P Parafencing Dictionary</h1>
      <DictionaryView files={files} termId={termId} onTerm={onTerm} onExit={onExit} />
    </div>
  );
}
