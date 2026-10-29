'use client';

import Link from 'next/link';
import { ArrowRight, Plus, Search, X } from 'lucide-react';
import { useDeferredValue, useState } from 'react';
import { WhatsAppIcon } from '@/components/ui/primitives';
import { whatsappLink } from '@/lib/site';

export type HubFaq = { q: string; a: string; topic: string; href?: string; from?: string };

const norm = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^\w\s€£%]/g, ' ');

// Every question on the site in one searchable list. Topic chips narrow it down, search
// looks across everything, and every answer stays in the page for search engines.
export function FaqHub({ faqs, topics }: { faqs: HubFaq[]; topics: string[] }) {
  const [topic, setTopic] = useState(topics[0]);
  const [query, setQuery] = useState('');
  const q = useDeferredValue(query.trim());
  const words = norm(q).split(/\s+/).filter(Boolean);
  const matches = (f: HubFaq) => (words.length ? words.every((w) => norm(`${f.q} ${f.a} ${f.topic}`).includes(w)) : f.topic === topic);
  const shown = faqs.filter(matches);

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-4 border-b border-line bg-bg/90 px-4 pt-3 pb-3 backdrop-blur-xl sm:mx-0 sm:rounded-3xl sm:border sm:px-4 lg:top-[4.75rem]">
        <label className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 transition focus-within:border-brand-bright focus-within:ring-4 focus-within:ring-brand-bright/15">
          <Search className="size-5 shrink-0 text-muted" aria-hidden="true" />
          <span className="sr-only">Search all questions</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search, e.g. VAT, switching, deadlines"
            className="h-12 w-full bg-transparent text-base outline-none placeholder:text-muted"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-2 text-muted hover:text-ink" aria-label="Clear search">
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </label>
        <ul className={`-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 ${q ? 'opacity-40' : ''}`} aria-label="Topics">
          {topics.map((t) => {
            const on = !q && t === topic;
            return (
              <li key={t} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setQuery('');
                    setTopic(t);
                  }}
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition active:scale-95 ${on ? 'border-ink bg-ink text-bg' : 'border-line bg-surface text-muted hover:text-ink'}`}
                >
                  {t}
                  <span className={`text-xs tabular-nums ${on ? 'text-bg/70' : 'text-muted/70'}`}>{faqs.filter((f) => f.topic === t).length}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-5 text-sm text-muted" aria-live="polite">
        {q ? `${shown.length} ${shown.length === 1 ? 'answer' : 'answers'} for “${q}”` : `${shown.length} questions about ${topic.toLowerCase()}`}
      </p>

      <ul className="mt-3 divide-y divide-line overflow-hidden rounded-[var(--radius)] border border-line bg-surface">
        {faqs.map((f) => (
          <li key={`${f.topic}-${f.q}`} hidden={!matches(f)} className="faq-in">
            <details className="acc group">
              <summary className="flex items-center justify-between gap-4 px-4 py-4 text-left font-display font-semibold sm:px-6">
                <span>
                  {q && <span className="mb-0.5 block text-xs font-semibold text-brand-ink">{f.topic}</span>}
                  {f.q}
                </span>
                <span className="acc-icon grid size-8 shrink-0 place-items-center rounded-full bg-surface-2 text-ink" aria-hidden="true">
                  <Plus className="size-4" />
                </span>
              </summary>
              <div className="px-4 pb-5 sm:px-6">
                <p className="text-muted">{f.a}</p>
                {f.href && (
                  <Link href={f.href} className="link-arrow mt-3 inline-flex text-sm">
                    More on {f.from} <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </details>
          </li>
        ))}
      </ul>

      {shown.length === 0 && (
        <div className="band mt-3 flex flex-col gap-4 rounded-[var(--radius)] p-5 sm:flex-row sm:items-center sm:p-6">
          <p className="flex-1 text-on-band/90">
            <strong className="font-display text-white">No answer for that yet.</strong> Send it to us and your accountant will reply within one business day.
          </p>
          <a href={whatsappLink(`Hi Shiel, I have a question: ${q}`)} target="_blank" rel="noopener" className="btn btn-whatsapp btn-sm shrink-0">
            <WhatsAppIcon className="size-4" />
            Ask on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
