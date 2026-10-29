'use client';

import Link from 'next/link';
import { AnimatePresence, m } from 'motion/react';
import { ArrowRight, BookOpen, Building2, ChartLine, Check, FileText, Globe2, Percent, Users } from 'lucide-react';
import { useId, useRef, useState } from 'react';

const icons = { file: FileText, percent: Percent, book: BookOpen, users: Users, chart: ChartLine, building: Building2, globe: Globe2 };

export type ExplorerService = { slug: string; name: string; short: string; icon: keyof typeof icons; card: string; scope: string[] };

// Tabs on the left (chips on phones), one detail panel on the right.
export function ServiceExplorer({ services, fromLabel }: { services: ExplorerService[]; fromLabel: string }) {
  const [active, setActive] = useState(0);
  // Which way the last change went, so the panel slides in from the matching side.
  const [dir, setDir] = useState(1);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = services[active];
  const Icon = icons[s.icon];

  // On phones the tabs are a swipeable row, so keep the chosen one in view.
  const select = (i: number, d = i >= active ? 1 : -1) => {
    setDir(d);
    setActive(i);
    tabs.current[i]?.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' });
  };

  const step = (to: number) => {
    const next = (to + services.length) % services.length;
    select(next, to > active ? 1 : -1);
    return next;
  };

  const move = (to: number) => tabs.current[step(to)]?.focus({ preventScroll: true });

  return (
    <div className="card overflow-hidden p-2 shadow-card lg:grid lg:grid-cols-[17rem_1fr]">
      <div
        role="tablist"
        aria-label="Services"
        className="flex gap-1.5 overflow-x-auto p-1 [scrollbar-width:none] lg:flex-col lg:gap-0.5 lg:overflow-visible lg:p-2"
        onKeyDown={(e) => {
          if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
            move(active + 1);
          } else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
            e.preventDefault();
            move(active - 1);
          } else if (e.key === 'Home') {
            e.preventDefault();
            move(0);
          } else if (e.key === 'End') {
            e.preventDefault();
            move(services.length - 1);
          }
        }}
      >
        {services.map((x, i) => {
          const on = i === active;
          const TabIcon = icons[x.icon];
          return (
            <button
              key={x.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={on}
              aria-controls={`${id}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i)}
              className={`relative flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-left font-display text-[0.95rem] font-semibold whitespace-nowrap transition-colors lg:py-3 ${
                on ? 'text-ink' : 'text-muted hover:bg-surface-2/70 hover:text-ink'
              }`}
            >
              {on && <m.span layoutId={`${id}-pill`} className="absolute inset-0 rounded-xl bg-surface-2 ring-1 ring-line" transition={{ type: 'spring', stiffness: 460, damping: 36 }} aria-hidden="true" />}
              <TabIcon className={`relative size-[1.1rem] shrink-0 ${on ? 'text-brand-ink' : ''}`} aria-hidden="true" />
              <span className="relative">{x.name}</span>
            </button>
          );
        })}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="band grain relative mt-2 overflow-hidden rounded-[1rem] lg:mt-0">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <m.div
            key={s.slug}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 40 }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, x: d * -40 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            // Swipe left or right on the panel to move between services.
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            dragSnapToOrigin
            onDragEnd={(_, { offset, velocity }) => {
              if (offset.x < -60 || velocity.x < -400) step(active + 1);
              else if (offset.x > 60 || velocity.x > 400) step(active - 1);
            }}
            style={{ touchAction: 'pan-y' }}
            className="relative flex h-full cursor-grab flex-col p-6 select-none active:cursor-grabbing sm:p-8 lg:min-h-[25rem] lg:cursor-auto"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-mint">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="flex items-center gap-1.5" aria-label={`${active + 1} of ${services.length}`}>
                {services.map((x, i) => (
                  <span key={x.slug} aria-hidden="true" className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-5 bg-mint' : 'w-1.5 bg-white/25'}`} />
                ))}
              </span>
            </div>
            <h3 className="mt-6 text-[clamp(1.6rem,4vw,2.25rem)]">{s.name}</h3>
            <p className="mt-2 max-w-xl text-on-band/80 sm:text-lg">{s.card}</p>
            <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {s.scope.map((x) => (
                <li key={x} className="flex items-center gap-2.5 text-[0.95rem] text-on-band/90">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-mint/15 text-mint" aria-hidden="true">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-auto">
              <p className="text-sm text-on-band-muted">{fromLabel}</p>
              <Link href={`/${s.slug}`} className="btn btn-primary btn-sm self-start sm:self-auto">
                More on {s.short.toLowerCase()}
                <span className="btn-icon" aria-hidden="true">
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
