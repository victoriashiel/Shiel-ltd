'use client';

import { AnimatePresence, m } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Segmented } from '@/components/ui/segmented';

type Filing = { code: string; name: string; authority: string; who: ('company' | 'sole')[]; when: string; text: string; source?: { label: string; url: string } };
type Who = 'company' | 'sole';

// Every recurring filing in one country, filtered to the visitor's kind of business.
export function FilingMap({ filings, authorities }: { filings: Filing[]; authorities: string[] }) {
  const [who, setWho] = useState<Who>('company');
  const shown = filings.filter((f) => f.who.includes(who));
  // The first authority gets the brand tint and the rest get brass, so the two bodies read apart at a glance.
  const tint = (a: string) => (a === authorities[0] ? 'bg-brand-pale text-brand-ink' : 'bg-clay-soft text-clay-ink');

  return (
    <div>
      <div className="max-w-sm">
        <Segmented<Who>
          label="Kind of business"
          value={who}
          onChange={setWho}
          options={[
            { value: 'company', label: 'Limited company' },
            { value: 'sole', label: 'Sole trader' },
          ]}
        />
      </div>
      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {shown.length} filings a year, all tracked and filed by your accountant.
      </p>
      <ul className="rail mt-4 sm:mx-0 sm:mt-5 sm:grid sm:grid-flow-row sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3" role="region" aria-label="Filings, swipe for more" tabIndex={0}>
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((f) => (
            <m.li key={f.code} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }} className="card flex w-[72vw] max-w-xs shrink-0 flex-col p-5 sm:w-auto sm:max-w-none">
              <span className="flex items-start justify-between gap-3">
                <span className="font-display text-2xl font-bold tracking-tight">{f.code}</span>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${tint(f.authority)}`}>{f.authority}</span>
              </span>
              <span className="mt-1 font-display font-semibold">{f.name}</span>
              <span className="mt-3 text-sm font-semibold text-brand-ink">{f.when}</span>
              <span className="mt-1 flex-1 text-sm text-muted">{f.text}</span>
              {f.source && (
                <a href={f.source.url} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-ink">
                  Source: {f.source.label.split(':')[0]} <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              )}
            </m.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
