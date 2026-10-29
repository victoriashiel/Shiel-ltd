'use client';

import { useRouter } from 'next/navigation';
import { CornerDownLeft, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Sheet } from './sheet';

type Entry = { title: string; url: string; text: string; section: string };

let cache: Promise<Entry[]> | null = null;
const load = () => (cache ??= fetch('/search.json').then((r) => r.json()).catch(() => ((cache = null), [])));

const quick: Entry[] = [
  { title: 'Find my package', url: '/packages#finder', text: 'Three questions to your price', section: 'Popular' },
  { title: 'Corporation tax calculator', url: '/tools/corporation-tax-calculator', text: 'Ireland, UK and Gibraltar', section: 'Popular' },
  { title: 'Filing deadline finder', url: '/tools/filing-deadlines', text: 'Dates from your year-end', section: 'Popular' },
  { title: 'Switching accountant', url: '/guides/how-to-switch-accountant', text: 'Free, handled for you', section: 'Popular' },
];

function score(e: Entry, terms: string[]) {
  const title = e.title.toLowerCase();
  const text = e.text.toLowerCase();
  let s = 0;
  for (const t of terms) {
    if (title.startsWith(t)) s += 6;
    else if (title.includes(t)) s += 4;
    else if (text.includes(t)) s += 1;
    else return 0;
  }
  return s;
}

export function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [index, setIndex] = useState<Entry[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (open) load().then(setIndex);
  }, [open]);

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return quick;
    return index
      .map((e) => ({ e, s: score(e, terms) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((x) => x.e);
  }, [q, index]);

  const go = (url: string) => {
    onClose();
    setQ('');
    router.push(url);
  };

  return (
    <Sheet open={open} onClose={onClose} title="Search" wide>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          data-autofocus
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === 'Enter' && results[active]) {
              e.preventDefault();
              go(results[active].url);
            }
          }}
          placeholder="Try “CT1”, “payroll” or “Gibraltar”"
          aria-label="Search the site"
          aria-controls="search-results"
          aria-activedescendant={results[active] ? `sr-${active}` : undefined}
          role="combobox"
          aria-expanded="true"
          aria-autocomplete="list"
          className="h-14 w-full rounded-2xl border border-line bg-surface pr-4 pl-12 text-lg outline-none transition focus:border-brand-bright"
        />
      </div>
      <p className="sr-only" aria-live="polite">
        {q ? `${results.length} results` : ''}
      </p>
      <ul id="search-results" role="listbox" aria-label="Results" className="mt-4 grid gap-1">
        {results.map((r, i) => (
          <li key={r.url + r.title} id={`sr-${i}`} role="option" aria-selected={i === active}>
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onClick={() => go(r.url)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${i === active ? 'bg-surface-2' : ''}`}
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display font-semibold">{r.title}</span>
                <span className="block truncate text-sm text-muted">{r.text}</span>
              </span>
              <span className="shrink-0 rounded-full border border-line px-2 py-0.5 text-xs text-muted">{r.section}</span>
              {i === active && <CornerDownLeft className="hidden size-4 text-muted sm:block" aria-hidden="true" />}
            </button>
          </li>
        ))}
        {q && !results.length && <li className="px-4 py-6 text-center text-muted">Nothing matched. Try a shorter word, or message us and we will answer directly.</li>}
      </ul>
    </Sheet>
  );
}
