// biome-ignore-all lint/style/noNonNullAssertion: canvas, layout and parser code indexes arrays it has just sized; strict index checks need the assertions.
// biome-ignore-all lint/suspicious/noArrayIndexKey: entry paragraphs and dialogue lines are fixed text that never reorders.
'use client';
import { ArrowLeft, ArrowRight, Search, X } from 'lucide-react';
// Copied from the parafencing-project dictionary (canonical source); sync with scripts/sync-p4p-dictionary.mjs.
// created_by: Claude Code (Fable 5.2); date_created: 2026-11-13
// updated_by: Claude Code (Fable 5.2); last_updated_on: 2026-11-14
// The P4P (Parafencing 4 Progress) dictionary as a full-screen page: a slowly moving field of
// terms, and an entry panel that opens beside it. Layout and motion follow the reference
// dictionary; colours follow the app theme. Published by P4P (Parafencing 4 Progress) at bulachak.com/p4p/dictionary.
// Owner direction, 14 Nov 2026: keep it clean and self-explanatory, with no status or
// disclaimer lines, and treat accessibility as a requirement.
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import DictionaryCloud from './dictionary-cloud';
import { layoutDictionary } from './dictionary-layout';
import {
  type Dictionary,
  type DictionaryEntry,
  parseDictionary,
  searchEntries,
} from './dictionary-model';
import './dictionary.css';

const Book = createContext<Dictionary | null>(null);
const useBook = () => useContext(Book)!;
const nbsp = (value: string) => value.replace(/ (?=\S+$)/, ' ');
const neighbour = (dictionary: Dictionary, entry: DictionaryEntry, step: number) => {
  const all = dictionary.entries;
  return all[(all.indexOf(entry) + step + all.length) % all.length]!;
};

export interface DictionaryViewProps {
  files: { name: string; raw: string }[];
  termId: string;
  onTerm: (id: string) => void;
  onExit: () => void;
}

function Entry({
  entry,
  onTerm,
  onGroup,
}: {
  entry: DictionaryEntry;
  onTerm: (id: string) => void;
  onGroup: (group: string) => void;
}) {
  const dictionary = useBook();
  const heading = useRef<HTMLHeadingElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
    heading.current?.focus({ preventScroll: true });
  }, []);
  const previous = neighbour(dictionary, entry, -1),
    next = neighbour(dictionary, entry, 1);
  // On touch screens a clear sideways swipe on the entry moves to the next or previous term.
  // Vertical scrolling and small movements are left alone.
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (event: React.TouchEvent) => {
    const t = event.touches[0];
    swipe.current = t && event.touches.length === 1 ? { x: t.clientX, y: t.clientY } : null;
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    const start = swipe.current,
      t = event.changedTouches[0];
    swipe.current = null;
    if (!start || !t) return;
    const dx = t.clientX - start.x,
      dy = t.clientY - start.y;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 2) onTerm((dx < 0 ? next : previous).id);
  };
  return (
    <aside
      className="pfd-panel"
      aria-labelledby="pfd-term"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="pfd-panel-scroll" ref={scroller}>
        <div className="pfd-swap" key={entry.id}>
          <div className="pfd-panel-top">
            <p className="pfd-label">
              <button
                type="button"
                className="pfd-group-link"
                onClick={() => onGroup(entry.group)}
                aria-label={`${entry.group}: show every term in this section`}
              >
                {entry.group}
              </button>
            </p>
            <p className="pfd-count">
              <span aria-hidden="true">
                <strong>{dictionary.entries.indexOf(entry) + 1}</strong>&nbsp;/&nbsp;
                {dictionary.entries.length}
              </span>
              <span className="pfd-sr">{`Term ${dictionary.entries.indexOf(entry) + 1} of ${dictionary.entries.length}`}</span>
            </p>
            <button
              type="button"
              className="pfd-icon"
              aria-label={`Close ${entry.term}`}
              onClick={() => onTerm('')}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <h2 id="pfd-term" ref={heading} tabIndex={-1}>
            {entry.term}
          </h2>
          <p className="pfd-lead">{nbsp(entry.short)}</p>

          <section aria-labelledby="pfd-s-definition">
            <h3 className="pfd-label" id="pfd-s-definition">
              Definition
            </h3>
            {entry.paragraphs.map((paragraph, row) => (
              <p key={row} className="pfd-body">
                {paragraph.map((segment, cell) =>
                  segment.link ? (
                    <a
                      key={cell}
                      href={`#${segment.link}`}
                      onClick={(event) => {
                        event.preventDefault();
                        onTerm(segment.link!);
                      }}
                    >
                      {segment.text}
                    </a>
                  ) : (
                    <React.Fragment key={cell}>{segment.text}</React.Fragment>
                  ),
                )}
              </p>
            ))}
          </section>

          {entry.example.length > 0 && (
            <section aria-labelledby="pfd-s-heard">
              <h3 className="pfd-label" id="pfd-s-heard">
                In conversation
              </h3>
              <div className="pfd-heard">
                {entry.example.map((line, row) => (
                  <p key={row} className={row % 2 ? 'reply' : ''}>
                    <span className="pfd-sr">{row % 2 ? 'Reply: ' : 'Question: '}</span>
                    {nbsp(line)}
                  </p>
                ))}
              </div>
            </section>
          )}

          {entry.avoid.length > 0 && (
            <section aria-labelledby="pfd-s-avoid">
              <h3 className="pfd-label" id="pfd-s-avoid">
                Say this, not
              </h3>
              <p className="pfd-avoid">{entry.avoid.join('; ')}</p>
            </section>
          )}

          <section aria-labelledby="pfd-s-related">
            <h3 className="pfd-label" id="pfd-s-related">
              Related terms
            </h3>
            <ul className="pfd-connects">
              {entry.connects.map((id) => (
                <li key={id}>
                  <button type="button" onClick={() => onTerm(id)}>
                    {dictionary.byId.get(id)!.term}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {entry.source && (
            <section aria-labelledby="pfd-s-source">
              <h3 className="pfd-label" id="pfd-s-source">
                Source
              </h3>
              <p className="pfd-source">{entry.source}</p>
            </section>
          )}
        </div>
      </div>
      <nav className="pfd-step" aria-label="Previous and next term">
        <button type="button" onClick={() => onTerm(previous.id)}>
          <span className="pfd-icon" aria-hidden="true">
            <ArrowLeft size={20} />
          </span>
          <span className="pfd-step-text">
            <small>Previous</small>
            {previous.term}
          </span>
        </button>
        <button type="button" onClick={() => onTerm(next.id)}>
          <span className="pfd-step-text">
            <small>Next</small>
            {next.term}
          </span>
          <span className="pfd-icon" aria-hidden="true">
            <ArrowRight size={20} />
          </span>
        </button>
      </nav>
    </aside>
  );
}

function Finder({
  onTerm,
  onClose,
  startGroup,
}: {
  onTerm: (id: string) => void;
  onClose: () => void;
  startGroup: string;
}) {
  const dictionary = useBook();
  const [query, setQuery] = useState('');
  // One section at a time can be picked; empty means every section.
  const [only, setOnly] = useState(startGroup);
  const field = useRef<HTMLInputElement>(null);
  const found = useMemo(
    () => searchEntries(dictionary, query).filter((entry) => !only || entry.group === only),
    [dictionary, query, only],
  );
  const sections = useRef<HTMLFieldSetElement>(null);
  useEffect(() => {
    field.current?.focus();
  }, []);
  // Keep the picked section visible in the sideways row, for example when the search opens on one.
  useEffect(() => {
    sections.current
      ?.querySelector<HTMLElement>('[aria-pressed="true"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, []);
  return (
    <div className="pfd-finder" role="dialog" aria-modal="true" aria-labelledby="pfd-finder-title">
      <div className="pfd-finder-top">
        <h2 id="pfd-finder-title">Search terms</h2>
        <button type="button" className="pfd-icon" aria-label="Close search" onClick={onClose}>
          <X size={20} aria-hidden="true" />
        </button>
      </div>
      <label className="pfd-search">
        <Search size={20} aria-hidden="true" />
        <span className="pfd-sr">Type a word to filter the list</span>
        <input
          ref={field}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type a word, for example piste"
          autoComplete="off"
          spellCheck={false}
        />
      </label>
      <fieldset className="pfd-sections" ref={sections}>
        <legend className="pfd-sr">Show one section</legend>
        {['', ...dictionary.groups].map((group) => (
          <button
            key={group || 'all'}
            type="button"
            aria-pressed={only === group}
            onClick={() => setOnly(group)}
          >
            {group || 'All sections'}
          </button>
        ))}
      </fieldset>
      <output className="pfd-found">
        {found.length === 0
          ? only
            ? 'No terms match in this section.'
            : 'No terms match. Try a shorter word.'
          : found.length === dictionary.entries.length
            ? `All ${found.length} terms`
            : `${found.length} of ${dictionary.entries.length} terms`}
      </output>
      <div className="pfd-finder-scroll">
        {dictionary.groups.map((group, at) => {
          const entries = found.filter((entry) => entry.group === group);
          return (
            entries.length > 0 && (
              <section key={group} aria-labelledby={`pfd-g-${at}`}>
                <h3 className="pfd-label" id={`pfd-g-${at}`}>
                  {group}
                </h3>
                <ul>
                  {entries.map((entry) => (
                    <li key={entry.id}>
                      <button
                        type="button"
                        onClick={() => {
                          onTerm(entry.id);
                          onClose();
                        }}
                      >
                        <strong>{entry.term}</strong>
                        <span>{nbsp(entry.short)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )
          );
        })}
      </div>
    </div>
  );
}

export default function DictionaryView({ files, termId, onTerm, onExit }: DictionaryViewProps) {
  const dictionary = useMemo(() => parseDictionary(files), [files]);
  const points = useMemo(() => layoutDictionary(dictionary), [dictionary]);
  const entry = dictionary.byId.get(termId);
  const [finding, setFinding] = useState(false);
  const [findGroup, setFindGroup] = useState('');
  const [hint, setHint] = useState(true);
  const [intro, setIntro] = useState(
    () => !termId && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const searchButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  // Closing the search puts the keyboard back where it was opened from: the search button or a section name.
  const openFinder = useCallback((group: string) => {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setFindGroup(group);
    setFinding(true);
  }, []);
  const closeFinder = useCallback(() => {
    setFinding(false);
    window.setTimeout(
      () => (opener.current?.isConnected ? opener.current : searchButton.current)?.focus(),
      0,
    );
  }, []);

  useEffect(() => {
    if (!intro) return;
    const timer = window.setTimeout(() => setIntro(false), 1500);
    return () => window.clearTimeout(timer);
  }, [intro]);
  // The hint shows for a moment and then gets out of the way.
  useEffect(() => {
    const timer = window.setTimeout(() => setHint(false), 6500);
    return () => window.clearTimeout(timer);
  }, []);
  // The dictionary is its own page, so the app behind it must not scroll.
  useEffect(() => {
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, []);
  // Keyboard: Escape steps back one level, the arrow keys move between terms, "/" opens the search.
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      const typing =
        event.target instanceof HTMLElement &&
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName);
      if (event.key === 'Escape') {
        if (finding) closeFinder();
        else if (termId) onTerm('');
      } else if (typing || finding || event.altKey || event.ctrlKey || event.metaKey) return;
      else if (event.key === '/') {
        event.preventDefault();
        openFinder('');
      } else if (entry && event.key === 'ArrowRight') onTerm(neighbour(dictionary, entry, 1).id);
      else if (entry && event.key === 'ArrowLeft') onTerm(neighbour(dictionary, entry, -1).id);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [dictionary, finding, termId, entry, onTerm, openFinder, closeFinder]);

  return (
    <Book.Provider value={dictionary}>
      <div className={`pfd${entry ? ' pfd-open' : ''}`}>
        <div className="pfd-stage">
          <DictionaryCloud
            dictionary={dictionary}
            points={points}
            selectedId={entry ? entry.id : ''}
            onTerm={onTerm}
          />
          <button
            type="button"
            ref={searchButton}
            className="pfd-action pfd-at-search"
            aria-haspopup="dialog"
            aria-expanded={finding}
            onClick={() => openFinder('')}
          >
            <Search size={20} aria-hidden="true" />
            <span className="pfd-action-text">Search terms</span>
          </button>
          <button type="button" className="pfd-action pfd-at-exit" onClick={onExit}>
            <ArrowLeft size={20} aria-hidden="true" />
            <span className="pfd-action-text">Back to P4P</span>
          </button>
          <p className="pfd-wordmark">
            <strong>P4P</strong>&nbsp;Parafencing&nbsp;4&nbsp;Progress
          </p>
          {hint && !entry && !finding && !intro && (
            <p className="pfd-hint">
              <span className="mouse">Drag to turn, scroll to zoom, click a term</span>
              <span className="touch">Drag to turn, pinch to zoom, tap a term</span>
            </p>
          )}
          {termId && !entry && (
            <output className="pfd-hint">That term is not in the dictionary.</output>
          )}
        </div>
        {entry && <Entry entry={entry} onTerm={onTerm} onGroup={openFinder} />}
        {finding && <Finder onTerm={onTerm} onClose={closeFinder} startGroup={findGroup} />}
        {intro && (
          <div className="pfd-intro" aria-hidden="true">
            <p className="pfd-label">P4P · Parafencing 4 Progress</p>
            <p className="pfd-intro-title">
              Parafencing
              <br />
              Dictionary
            </p>
            <span className="pfd-intro-bar" />
          </div>
        )}
      </div>
    </Book.Provider>
  );
}
