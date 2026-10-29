'use client';

import { AnimatePresence, m } from 'motion/react';
import { useState } from 'react';
import { Segmented } from '@/components/ui/segmented';

type Item = { title: string; text: string };

// One country's explanation at a time, instead of three blocks of text.
export function ExplainSwitch({ items }: { items: Item[] }) {
  const [key, setKey] = useState(items[0].title);
  const item = items.find((i) => i.title === key) ?? items[0];
  return (
    <div>
      <div className="max-w-md">
        <Segmented label="Country" value={key} onChange={setKey} options={items.map((i) => ({ value: i.title, label: i.title === 'United Kingdom' ? 'UK' : i.title }))} />
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <m.p key={item.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="card mt-4 max-w-3xl p-5 text-ink-2 sm:p-6 sm:text-lg" aria-live="polite">
          {item.text}
        </m.p>
      </AnimatePresence>
    </div>
  );
}
