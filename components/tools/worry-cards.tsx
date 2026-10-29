'use client';

import { AnimatePresence, m } from 'motion/react';
import { Check, Plus } from 'lucide-react';
import { useState } from 'react';
import { WhatsAppIcon } from '@/components/ui/primitives';
import { whatsappLink } from '@/lib/site';

type Worry = { say: string; fix: string; where?: string };

// The visitor taps the worries that sound like them. Each one turns over to show
// what we do about it, and the ones they pick go into a ready-written WhatsApp message.
export function WorryCards({ worries, hello }: { worries: Worry[]; hello: string }) {
  const [picked, setPicked] = useState<boolean[]>(() => worries.map(() => false));
  const chosen = worries.filter((_, i) => picked[i]);
  const message = chosen.length ? `${hello}\n\nWhat sounds familiar:\n${chosen.map((w) => `• ${w.say}`).join('\n')}` : hello;

  return (
    <div>
      <ul className="grid gap-3 md:grid-cols-2">
        {worries.map((w, i) => {
          const on = picked[i];
          return (
            <li key={w.say} className="reveal">
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setPicked((p) => p.map((v, j) => (j === i ? !v : v)))}
                className={`group relative flex h-full w-full flex-col overflow-hidden rounded-[var(--radius)] border p-5 text-left sm:min-h-[11.5rem] sm:p-6 transition-colors duration-300 active:scale-[0.99] ${
                  on ? 'border-brand-bright/50 bg-brand-pale' : 'border-line bg-surface hover:border-line-strong'
                }`}
              >
                <span className="flex items-start gap-4">
                  <span className="flex-1 font-display text-lg leading-snug font-semibold sm:text-xl">
                    <span aria-hidden="true" className="text-brand-bright">“</span>
                    {w.say}
                    <span aria-hidden="true" className="text-brand-bright">”</span>
                  </span>
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full border transition ${on ? 'border-brand-bright bg-brand-bright text-white' : 'border-line-strong text-muted group-hover:text-ink'}`} aria-hidden="true">
                    {on ? <Check className="size-4" strokeWidth={3} /> : <Plus className="size-4" />}
                  </span>
                </span>
                <AnimatePresence initial={false} mode="wait">
                  {on ? (
                    <m.span key="fix" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.22 }} className="mt-4 block">
                      <span className="block text-xs font-semibold text-brand-ink">What we do</span>
                      <span className="mt-1 block text-[0.95rem] text-ink/85">{w.fix}</span>
                    </m.span>
                  ) : (
                    <m.span key="tap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="mt-auto flex items-center gap-2 pt-4 text-sm text-muted">
                      {w.where && <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs font-semibold text-ink/70">{w.where}</span>}
                      Sounds like me
                    </m.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ul>

      <div aria-live="polite" className="mt-4">
        <AnimatePresence initial={false}>
          {chosen.length > 0 && (
            <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }} className="band flex flex-col gap-4 rounded-[var(--radius)] px-5 py-5 sm:flex-row sm:items-center sm:px-6">
              <p className="flex-1 text-on-band/90">
                <strong className="font-display text-white">
                  {chosen.length === 1 ? 'One of these is you.' : `${chosen.length} of these are you.`}
                </strong>{' '}
                Send them to an accountant and get a fixed quote within 24 hours.
              </p>
              <a href={whatsappLink(message)} target="_blank" rel="noopener" className="btn btn-whatsapp btn-sm shrink-0">
                <WhatsAppIcon className="size-4" />
                Send on WhatsApp
              </a>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
