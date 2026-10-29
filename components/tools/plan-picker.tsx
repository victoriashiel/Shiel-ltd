'use client';

import Link from 'next/link';
import { AnimatePresence, m } from 'motion/react';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { Segmented } from '@/components/ui/segmented';

type Plan = { name: string; strap: string; price: number; popular?: boolean; features: string[] };
type Country = { key: 'ireland' | 'united-kingdom' | 'gibraltar'; name: string; symbol: string; plans: Plan[]; setup?: { name: string; price: number } };

// Every monthly plan for one kind of client, switchable by country.
export function PlanPicker({ countries, segment }: { countries: Country[]; segment: string }) {
  const [key, setKey] = useState(countries[0].key);
  const c = countries.find((x) => x.key === key) ?? countries[0];

  return (
    <div>
      <div className="max-w-md">
        <Segmented label="Where your business is registered" value={key} onChange={setKey} options={countries.map((x) => ({ value: x.key, label: x.name }))} />
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <m.div key={c.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
          <ul className="rail mt-3 pt-3 lg:mx-0 lg:grid lg:grid-flow-row lg:grid-cols-3 lg:overflow-visible lg:px-0" role="region" aria-label={`Plans in ${c.name}, swipe for more`} tabIndex={0}>
            {c.plans.map((p) => (
              <li key={p.name} className={`card relative flex w-[78vw] max-w-xs shrink-0 flex-col p-5 lg:w-auto lg:max-w-none ${p.popular ? 'ring-2 ring-clay' : ''}`}>
                {p.popular && <span className="absolute -top-3 left-5 rounded-full bg-clay px-2.5 py-0.5 text-xs font-semibold text-[#0b1718]">Most chosen</span>}
                <p className="font-display font-semibold">{p.name.replace(/^(LTD|Sole Trader|Contractor|E-commerce)\s+/i, '')}</p>
                <p className="mt-3 font-display text-4xl font-bold">
                  {c.symbol}
                  {p.price}
                  <span className="text-base font-medium text-muted"> / month</span>
                </p>
                <p className="mt-2 text-sm text-muted">{p.strap}</p>
                <ul className="mt-4 grid gap-1.5 border-t border-line pt-4 text-sm">
                  {p.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-bright" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted">
              {c.setup ? `Just starting? A one-off ${c.setup.name.toLowerCase()} is ${c.symbol}${c.setup.price}. ` : ''}Prices exclude VAT where it applies.
            </p>
            <Link href={`/packages/${c.key}/${segment}`} className="link-arrow shrink-0">
              Full plan details for {c.name} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </m.div>
      </AnimatePresence>
    </div>
  );
}
