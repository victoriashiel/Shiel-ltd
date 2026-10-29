'use client';

import Link from 'next/link';
import { AnimatePresence, m } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

type Item = { slug: string; title: string; description: string; topic: string; readMinutes: number };

// Guides filtered by topic with a row of chips.
export function GuideList({ guides }: { guides: Item[] }) {
  const topics = ['All', ...new Set(guides.map((g) => g.topic))];
  const [topic, setTopic] = useState('All');
  const shown = topic === 'All' ? guides : guides.filter((g) => g.topic === topic);

  return (
    <div>
      <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0" aria-label="Filter by topic">
        {topics.map((t) => (
          <li key={t} className="shrink-0">
            <button
              type="button"
              aria-pressed={t === topic}
              onClick={() => setTopic(t)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition active:scale-95 ${t === topic ? 'border-ink bg-ink text-bg' : 'border-line bg-surface text-muted hover:text-ink'}`}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>
      <ul className="mt-5 grid gap-3 md:grid-cols-2">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((g) => (
            <m.li key={g.slug} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ type: 'spring', stiffness: 320, damping: 30 }}>
              <Link href={`/guides/${g.slug}`} className="card card-hover group flex h-full flex-col p-5 sm:p-6">
                <span className="text-xs font-semibold text-brand-ink">
                  {g.topic} · {g.readMinutes} min
                </span>
                <span className="mt-2 font-display text-lg leading-snug font-semibold sm:text-xl">{g.title}</span>
                <span className="mt-2 hidden flex-1 text-muted sm:block">{g.description}</span>
                <span className="link-arrow mt-4 text-sm">
                  Read <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </m.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
