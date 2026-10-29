'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { NeedsChecklist } from '@/components/tools/needs-checklist';
import { Segmented } from '@/components/ui/segmented';

type Item = { title: string; text: string };
type Side = 'you' | 'us';

// What the client sends and what the accountant does, side by side on desktop.
// On phones a switch shows one side at a time so the page stays short.
export function ServiceParts({ needs, scope, service }: { needs: Item[]; scope: Item[]; service: string }) {
  const [side, setSide] = useState<Side>('you');

  return (
    <div>
      <div className="mb-5 max-w-sm lg:hidden">
        <Segmented<Side>
          label="Whose part"
          value={side}
          onChange={setSide}
          options={[
            { value: 'you', label: 'What we need' },
            { value: 'us', label: 'What we do' },
          ]}
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div className={side === 'you' ? '' : 'hidden lg:block'}>
          <p className="mb-3 hidden font-display text-lg font-semibold lg:block">What we need from you</p>
          <NeedsChecklist items={needs} service={service} />
        </div>
        <div className={side === 'us' ? '' : 'hidden lg:block'}>
          <p className="mb-3 hidden font-display text-lg font-semibold lg:block">What your accountant does</p>
          <ul className="band grain relative grid gap-4 overflow-hidden rounded-[var(--radius)] p-5 sm:p-6">
            {scope.map((x) => (
              <li key={x.title} className="flex gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-mint/15 text-mint" aria-hidden="true">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span>
                  <span className="block font-display font-semibold text-white">{x.title}</span>
                  <span className="mt-0.5 block text-sm text-on-band/75">{x.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
