'use client';

import { m } from 'motion/react';
import { useId } from 'react';

// A radio group drawn as a pill switcher with a sliding highlight.
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  size = 'md',
  tone = 'light',
}: {
  options: { value: T; label: string; hint?: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  size?: 'sm' | 'md';
  tone?: 'light' | 'band';
}) {
  const id = useId();
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={`relative flex gap-1 overflow-x-auto rounded-full p-1 [scrollbar-width:none] ${tone === 'band' ? 'bg-white/8 ring-1 ring-white/10' : 'bg-surface-2 ring-1 ring-line'}`}
      onKeyDown={(e) => {
        const i = options.findIndex((o) => o.value === value);
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          onChange(options[(i + 1) % options.length].value);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          onChange(options[(i - 1 + options.length) % options.length].value);
        }
      }}
    >
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(o.value)}
            className={`relative flex-1 shrink-0 rounded-full font-display font-semibold whitespace-nowrap transition-colors ${size === 'sm' ? 'px-3.5 py-2 text-sm' : 'px-4 py-2.5 text-[0.95rem]'} ${
              on ? (tone === 'band' ? 'text-[#0b1718]' : 'text-ink') : tone === 'band' ? 'text-on-band/75 hover:text-on-band' : 'text-muted hover:text-ink'
            }`}
          >
            {on && (
              <m.span
                layoutId={`seg-${id}`}
                className={`absolute inset-0 rounded-full shadow-sm ${tone === 'band' ? 'bg-mint' : 'bg-surface'}`}
                transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                aria-hidden="true"
              />
            )}
            <span className="relative">{o.label}</span>
            {o.hint && <span className="relative ml-1 opacity-70">{o.hint}</span>}
          </button>
        );
      })}
    </div>
  );
}
