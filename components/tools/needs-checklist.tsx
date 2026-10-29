'use client';

import { AnimatePresence, m } from 'motion/react';
import { Check, PartyPopper } from 'lucide-react';
import { useState } from 'react';
import { WhatsAppIcon } from '@/components/ui/primitives';
import { whatsappLink } from '@/lib/site';

type Item = { title: string; text: string };

// A tick-as-you-go list of what we need from a new client, with a progress bar
// and a nudge to send it over once everything is ready.
export function NeedsChecklist({ items, service }: { items: Item[]; service: string }) {
  const [done, setDone] = useState<boolean[]>(() => items.map(() => false));
  const count = done.filter(Boolean).length;
  const all = count === items.length;
  const pct = Math.round((count / items.length) * 100);

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-4 border-b border-line px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="font-display font-semibold">
            {count} of {items.length} ready
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Checklist progress">
            <m.div className="h-full rounded-full bg-brand-bright" animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 160, damping: 22 }} />
          </div>
        </div>
        <button type="button" onClick={() => setDone(items.map(() => !all))} className="shrink-0 text-sm font-semibold text-brand-ink">
          {all ? 'Clear' : 'Tick all'}
        </button>
      </div>

      <ul className="divide-y divide-line">
        {items.map((it, i) => {
          const on = done[i];
          return (
            <li key={it.title}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
                className="flex w-full items-start gap-4 px-5 py-4 text-left transition hover:bg-surface-2/60 sm:px-6"
              >
                <span className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border-2 transition-colors ${on ? 'border-brand-bright bg-brand-bright text-white' : 'border-line-strong text-transparent'}`}>
                  <m.span initial={false} animate={{ scale: on ? 1 : 0.4, opacity: on ? 1 : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 26 }}>
                    <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                  </m.span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block font-display font-semibold transition-colors ${on ? 'text-muted line-through decoration-brand-bright/60' : ''}`}>{it.title}</span>
                  <span className="mt-0.5 block text-sm text-muted">{it.text}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <AnimatePresence initial={false}>
        {all && (
          <m.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="band flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
              <PartyPopper className="size-7 shrink-0 text-mint" aria-hidden="true" />
              <p className="flex-1 text-on-band/90">That is everything we need to get started. Send it over and your accountant will take it from here.</p>
              <a href={whatsappLink(`Hi Shiel, I have everything ready for ${service.toLowerCase()}.`)} target="_blank" rel="noopener" className="btn btn-whatsapp btn-sm shrink-0">
                <WhatsAppIcon className="size-4" />
                Send on WhatsApp
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
