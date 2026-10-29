'use client';

import Link from 'next/link';
import { AnimatePresence, m } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

type Item = { slug: string; me: string; card: string; worry: string; from: string };

// "Which sounds like you?" Tap a description to preview the page written for that kind of client.
export function AudiencePicker({ items }: { items: Item[] }) {
  const [slug, setSlug] = useState<string | null>(null);
  const pick = items.find((i) => i.slug === slug);

  return (
    <div className="min-w-0 rounded-[1.75rem] border border-white/12 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl sm:p-6">
      <p className="font-display text-lg font-semibold">Which sounds like you?</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((i) => {
          const on = i.slug === slug;
          return (
            <li key={i.slug}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setSlug(on ? null : i.slug)}
                className={`rounded-full border px-3.5 py-2 text-sm transition active:scale-95 ${on ? 'border-mint bg-mint text-[#06201f]' : 'border-white/15 bg-white/5 text-on-band/90 hover:border-white/30'}`}
              >
                {i.me}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-5 min-h-[9.5rem] border-t border-white/10 pt-5" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {pick ? (
            <m.div key={pick.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
              <p className="font-display text-lg leading-snug text-white">“{pick.worry}”</p>
              <p className="mt-2 text-sm text-on-band-muted">
                {pick.card} From {pick.from} a month.
              </p>
              <Link href={`/who-we-help/${pick.slug}`} className="btn btn-primary btn-block mt-4">
                This is me
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </m.div>
          ) : (
            <m.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-on-band-muted">
              Tap the one closest to you. Each has its own plans and prices, and the same named accountant looks after the lot.
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
