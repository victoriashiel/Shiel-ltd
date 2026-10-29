'use client';

import Link from 'next/link';
import { AnimatePresence, m } from 'motion/react';
import { Check } from 'lucide-react';
import { useState } from 'react';

export function FitChecker({ items, packagesHref, name }: { items: string[]; packagesHref: string; name: string }) {
  const [picked, setPicked] = useState<boolean[]>(() => items.map(() => false));
  const count = picked.filter(Boolean).length;
  const verdict =
    count === 0
      ? { title: 'Tap the statements that sound like you', text: 'It takes a few seconds and tells you whether this is likely to be the right starting point.' }
      : count <= 2
        ? { title: 'Likely a good fit', text: `Some of this matches how we work with ${name.toLowerCase()}. A short message will confirm the rest.` }
        : { title: 'This sounds like you', text: `You are exactly who these plans were built for. Have a look at the prices, or tell us what is due next.` };

  return (
    <div className="rounded-[1.75rem] border border-white/12 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl sm:p-6">
      <p className="font-display text-lg font-semibold">Is this for you?</p>
      <ul className="mt-4 grid gap-2">
        {items.map((t, i) => (
          <li key={t}>
            <button
              type="button"
              aria-pressed={picked[i]}
              onClick={() => setPicked((p) => p.map((v, j) => (j === i ? !v : v)))}
              className="flex w-full items-start gap-3 rounded-2xl border border-white/10 p-3.5 text-left transition hover:border-white/25 active:scale-[0.99] aria-pressed:border-mint/60 aria-pressed:bg-mint/10"
            >
              <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition ${picked[i] ? 'border-mint bg-mint text-[#0b1718]' : 'border-white/30'}`} aria-hidden="true">
                {picked[i] && <Check className="size-3.5" strokeWidth={3} />}
              </span>
              <span className="text-[0.95rem] text-on-band/90">{t}</span>
            </button>
          </li>
        ))}
      </ul>
      <div aria-live="polite" className="mt-4 min-h-[7.5rem] rounded-2xl bg-black/20 p-4">
        <AnimatePresence mode="wait" initial={false}>
          <m.div key={verdict.title} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
            <p className="font-display font-semibold text-mint">{verdict.title}</p>
            <p className="mt-1 text-sm text-on-band/80">{verdict.text}</p>
            {count > 0 && (
              <Link href={packagesHref} className="link-arrow mt-3 text-sm text-mint">
                See the plans <span aria-hidden="true">→</span>
              </Link>
            )}
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
