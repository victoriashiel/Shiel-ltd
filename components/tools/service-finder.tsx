'use client';

import Link from 'next/link';
import { AnimatePresence, m } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';

type Item = { slug: string; name: string; card: string };

const needs = [
  { label: 'File my year-end accounts', slug: 'accounts' },
  { label: 'Sort out my tax returns', slug: 'tax' },
  { label: 'Keep my books up to date', slug: 'bookkeeping' },
  { label: 'Pay staff or myself', slug: 'payroll' },
  { label: 'Plan cash flow or a big decision', slug: 'advisory' },
  { label: 'Set up a new company', slug: 'company-formation' },
  { label: 'Work across more than one country', slug: 'international-accounting' },
];

// Lets a visitor tick what they need and see which services cover it.
export function ServiceFinder({ services, from }: { services: Item[]; from: string }) {
  const [picked, setPicked] = useState<string[]>([]);
  const matches = services.filter((s) => picked.includes(s.slug));
  const toggle = (slug: string) => setPicked((p) => (p.includes(slug) ? p.filter((x) => x !== slug) : [...p, slug]));

  return (
    <div className="min-w-0 rounded-[1.75rem] border border-white/12 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl sm:p-6">
      <p className="font-display text-lg font-semibold">What do you need help with?</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {needs.map((n) => {
          const on = picked.includes(n.slug);
          return (
            <li key={n.slug}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => toggle(n.slug)}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition active:scale-95 ${
                  on ? 'border-mint bg-mint text-[#06201f]' : 'border-white/15 bg-white/5 text-on-band/90 hover:border-white/30'
                }`}
              >
                {on && <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />}
                {n.label}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 border-t border-white/10 pt-5" aria-live="polite">
        {matches.length === 0 ? (
          <p className="text-sm text-on-band-muted">Tap anything that applies and we will show you the services that cover it. Most clients need two or three, all handled by the same accountant.</p>
        ) : (
          <>
            <ul className="grid gap-2 [&>*]:min-w-0">
              <AnimatePresence initial={false}>
                {matches.map((s) => (
                  <m.li key={s.slug} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <Link href={`/${s.slug}`} className="group flex items-center gap-3 rounded-2xl bg-black/20 px-4 py-3 transition hover:bg-black/30">
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-white">{s.name}</span>
                        <span className="block truncate text-xs text-on-band-muted">{s.card}</span>
                      </span>
                      <ArrowRight className="size-4 shrink-0 text-on-band-muted transition group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true" />
                    </Link>
                  </m.li>
                ))}
              </AnimatePresence>
            </ul>
            <p className="mt-4 text-sm text-on-band-muted">{from}</p>
            <Link href="/packages" className="btn btn-primary btn-block mt-4">
              See packages and prices
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
