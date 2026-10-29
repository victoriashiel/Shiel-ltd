'use client';

import Link from 'next/link';
import { AnimatePresence, m } from 'motion/react';
import { useState } from 'react';
import { Segmented } from '@/components/ui/segmented';

type Person = { slug: string; name: string; role: string; bio: string; specialties: string[]; countries: string[]; photo?: string; wrote?: { slug: string; title: string }[] };

const filters = ['All', 'Ireland', 'United Kingdom', 'Gibraltar'] as const;
type Filter = (typeof filters)[number];

// The whole team, filterable by the country each person covers.
export function TeamGrid({ people }: { people: Person[] }) {
  const [filter, setFilter] = useState<Filter>('All');
  const shown = filter === 'All' ? people : people.filter((p) => p.countries.includes(filter));

  return (
    <div>
      <div className="mb-6 max-w-lg">
        <Segmented<Filter> label="Who covers" value={filter} onChange={setFilter} options={filters.map((f) => ({ value: f, label: f === 'United Kingdom' ? 'UK' : f }))} />
        <p className="mt-2 text-sm text-muted" aria-live="polite">
          {filter === 'All' ? `${people.length} people` : `${shown.length} of ${people.length} cover ${filter === 'United Kingdom' ? 'the UK' : filter}`}
        </p>
      </div>
      <ul className="rail sm:mx-0 sm:flex sm:flex-wrap sm:justify-center sm:gap-6 sm:overflow-visible sm:px-0" role="region" aria-label="Team, swipe for more" tabIndex={0}>
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((t) => (
            <m.li
              key={t.slug}
              id={t.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-[80vw] max-w-sm shrink-0 scroll-mt-24 sm:w-[calc((100%-1.5rem)/2)] sm:max-w-none lg:w-[calc((100%-3rem)/3)]"
            >
              <article className="card flex h-full flex-col overflow-hidden">
                {t.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.photo} alt={t.name} width={480} height={600} loading="eager" className="aspect-[4/3] w-full object-cover object-top sm:aspect-[4/5]" />
                ) : (
                  <span className="grid aspect-[4/3] w-full place-items-center bg-gradient-to-b from-[#ecebe7] to-[#d6d5d0] font-display text-4xl font-bold text-[#0b1718]/35 sm:aspect-[4/5]" aria-hidden="true">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                )}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h2 className="text-2xl">{t.name}</h2>
                  <p className="mt-1 text-sm font-semibold text-brand-ink">{t.role}</p>
                  <p className="mt-3 flex-1 text-muted">{t.bio}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Specialties">
                    {t.specialties.map((s) => (
                      <li key={s} className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold text-ink-2">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-muted">Covers {t.countries.join(', ')}</p>
                  {t.wrote && t.wrote.length > 0 && (
                    <div className="mt-4 border-t border-line pt-3">
                      <p className="text-xs font-semibold text-muted">Writes about</p>
                      <ul className="mt-1.5 grid gap-1">
                        {t.wrote.map((g) => (
                          <li key={g.slug}>
                            <Link href={`/guides/${g.slug}`} className="text-sm font-medium text-brand-ink hover:underline">
                              {g.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            </m.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
