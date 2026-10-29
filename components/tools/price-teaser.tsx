'use client';

import Link from 'next/link';
import { AnimatePresence, m } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Segmented } from '@/components/ui/segmented';
import { AnimatedNumber } from '@/components/ui/animated-number';

export type TeaserData = {
  countries: { key: string; label: string; symbol: string }[];
  segments: { key: string; label: string; blurb: string }[];
  plans: Record<string, Record<string, { name: string; price: number; popular?: boolean }[]>>;
};

export function PriceTeaser({ data }: { data: TeaserData }) {
  const [country, setCountry] = useState(data.countries[0].key);
  const [seg, setSeg] = useState(data.segments[0].key);
  const plans = data.plans[country][seg];
  const symbol = data.countries.find((c) => c.key === country)!.symbol;
  const from = Math.min(...plans.map((p) => p.price));
  const max = Math.max(...plans.map((p) => p.price));

  return (
    <div className="card overflow-hidden p-2 shadow-card">
      <div className="grid gap-3 p-3 sm:p-4">
        <Segmented label="Country" value={country} onChange={setCountry} options={data.countries.map((c) => ({ value: c.key, label: c.label }))} />
        <Segmented label="Business type" size="sm" value={seg} onChange={setSeg} options={data.segments.map((s) => ({ value: s.key, label: s.label }))} />
      </div>
      <div className="rounded-[1rem] bg-surface-2/70 p-5 sm:p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted">Monthly plans from</p>
            <p className="font-display text-5xl font-bold tracking-tight sm:text-6xl" aria-live="polite">
              {symbol}
              <AnimatedNumber value={from} />
            </p>
          </div>
          <p className="pb-2 text-right text-sm text-muted">
            up to {symbol}
            {max}
            <br />a month
          </p>
        </div>
        <ul className="mt-5 grid gap-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {plans.map((p, i) => (
              <m.li
                key={`${country}-${seg}-${p.name}`}
                layout
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0, transition: { delay: i * 0.04 } }}
                exit={{ opacity: 0, x: -16 }}
                className="flex items-center justify-between rounded-xl bg-surface px-4 py-3"
              >
                <span className="flex items-center gap-2 font-medium">
                  {p.name}
                  {p.popular && <span className="rounded-full bg-clay-soft px-2 py-0.5 text-xs font-semibold text-clay-ink">Popular</span>}
                </span>
                <span className="font-display font-semibold tabular-nums">
                  {symbol}
                  {p.price}
                </span>
              </m.li>
            ))}
          </AnimatePresence>
        </ul>
        <Link href={`/packages/${country}/${seg}`} className="btn btn-dark btn-block mt-5">
          See what each plan includes
          <span className="btn-icon" aria-hidden="true">
            <ArrowRight className="size-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}
