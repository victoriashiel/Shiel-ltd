'use client';

import Link from 'next/link';
import { AnimatePresence, m } from 'motion/react';
import { useState } from 'react';

type Option = { key: string; label: string; from: string; setup?: string; files: string[]; href: string };

// "What kind of business is it?" Shows the local price and the filings that come with it.
export function CountryFit({ country, options }: { country: string; options: Option[] }) {
  const [key, setKey] = useState(options[0].key);
  const o = options.find((x) => x.key === key) ?? options[0];

  return (
    <div className="min-w-0 rounded-[1.75rem] border border-white/12 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl sm:p-6">
      <p className="font-display text-lg font-semibold">What kind of business is it?</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {options.map((x) => (
          <li key={x.key}>
            <button
              type="button"
              aria-pressed={x.key === key}
              onClick={() => setKey(x.key)}
              className={`rounded-full border px-3.5 py-2 text-sm transition active:scale-95 ${x.key === key ? 'border-mint bg-mint text-[#06201f]' : 'border-white/15 bg-white/5 text-on-band/90 hover:border-white/30'}`}
            >
              {x.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-5 border-t border-white/10 pt-5" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <m.div key={o.key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
            <p className="text-sm text-on-band-muted">Plans in {country} from</p>
            <p className="font-display text-4xl font-bold text-white">
              {o.from}
              <span className="text-base font-medium text-on-band-muted"> / month</span>
            </p>
            {o.setup && <p className="mt-1 text-sm text-on-band-muted">One-off setup from {o.setup} if you are just starting.</p>}
            <p className="mt-4 text-sm text-on-band-muted">What we file for you</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {o.files.map((f) => (
                <li key={f} className="rounded-lg bg-black/25 px-2.5 py-1 font-display text-sm font-semibold text-mint">
                  {f}
                </li>
              ))}
            </ul>
            <Link href={o.href} className="btn btn-primary btn-block mt-5">
              See the plans
            </Link>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
