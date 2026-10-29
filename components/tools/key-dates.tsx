'use client';

import Link from 'next/link';
import { AnimatePresence, m } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Segmented } from '@/components/ui/segmented';

type Fact = { value: string; label: string; text: string; source: { label: string; url: string } };
type Country = { key: string; name: string; facts: Fact[] };

// Country switcher for the headline rates and filing dates, each with its official source.
export function KeyDates({ countries }: { countries: Country[] }) {
  const [key, setKey] = useState(countries[0].key);
  const c = countries.find((x) => x.key === key) ?? countries[0];

  return (
    <div>
      <div className="max-w-md">
        <Segmented label="Country" value={key} onChange={setKey} options={countries.map((x) => ({ value: x.key, label: x.name }))} />
      </div>
      <AnimatePresence mode="wait">
        <m.ul key={c.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="rail mt-5 sm:mx-0 sm:mt-6 sm:grid sm:grid-flow-row sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {c.facts.map((f) => (
            <li key={f.label} className="card flex w-[70vw] max-w-xs shrink-0 flex-col p-5 sm:w-auto sm:max-w-none">
              <p className="font-display text-3xl font-bold text-brand-ink">{f.value}</p>
              <p className="mt-1 font-display font-semibold">{f.label}</p>
              <p className="mt-2 flex-1 text-sm text-muted">{f.text}</p>
              <a href={f.source.url} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-ink">
                Source: {f.source.label.split(':')[0]} <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </m.ul>
      </AnimatePresence>
      <Link href={`/countries/${c.key}`} className="link-arrow mt-6 inline-flex text-sm">
        More on accounting in {c.name} <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
