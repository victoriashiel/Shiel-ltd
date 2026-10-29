'use client';

import Link from 'next/link';
import { AnimatePresence, m, useInView } from 'motion/react';
import { ArrowRight, Check, ChevronDown, Info, Minus, Plus, Sparkles } from 'lucide-react';
import { useRef, useState, useSyncExternalStore } from 'react';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { WhatsAppIcon } from '@/components/ui/primitives';
import { Segmented } from '@/components/ui/segmented';
import { whatsappLink } from '@/lib/site';

export type BuilderPlan = { name: string; short: string; strap: string; price: number; oneOff: boolean; popular: boolean; features: string[]; details: string[]; limits: string; limitsLabel: string };
export type BuilderData = {
  countries: { key: string; label: string; symbol: string; note: string; bespoke: number }[];
  segments: { key: string; label: string }[];
  plans: Record<string, Record<string, { intro: string; plans: BuilderPlan[] }>>;
  core: Record<string, string[]>;
  definition: string;
};
type Extra = { id: string; label: string; unit: string; price: number; from?: boolean; max: number; segments?: string[] };
type Question = { text: string; options: { label: string; tier: number }[] };

const enquiryHref = (country: string, plan: string) => `/contact?country=${country}&plan=${encodeURIComponent(plan)}`;

// Short questions that point to a plan. Each answer carries a tier: the plan index it needs,
// or 9 when the volumes are above the published plans.
const stage: Question = { text: 'Where are you in the journey?', options: [{ label: 'Not trading yet', tier: -1 }, { label: 'Just starting', tier: 0 }, { label: 'Already trading', tier: 0 }] };
const questions: Record<string, Question[]> = {
  'limited-company': [
    stage,
    { text: 'Bank transactions a month', options: [{ label: 'Up to 30', tier: 1 }, { label: '31–60', tier: 2 }, { label: '61–120', tier: 3 }, { label: '120+', tier: 9 }] },
    { text: 'People on payroll, directors included', options: [{ label: '0–2', tier: 1 }, { label: '3–6', tier: 2 }, { label: '7–15', tier: 3 }, { label: '15+', tier: 9 }] },
  ],
  'sole-trader': [
    stage,
    { text: 'Transactions a month', options: [{ label: 'Up to 20', tier: 0 }, { label: '21–60', tier: 1 }, { label: '61–150', tier: 2 }, { label: '150+', tier: 9 }] },
    { text: 'Yearly turnover', options: [{ label: 'Up to 80k', tier: 0 }, { label: '80k–200k', tier: 1 }, { label: '200k–500k', tier: 2 }, { label: '500k+', tier: 9 }] },
  ],
  contractor: [
    stage,
    { text: 'Clients or contracts at once', options: [{ label: 'One', tier: 0 }, { label: '2 or 3', tier: 1 }, { label: 'More than 3', tier: 2 }] },
    { text: 'Transactions a month', options: [{ label: 'Up to 15', tier: 0 }, { label: 'More than 15', tier: 1 }] },
  ],
  ecommerce: [
    stage,
    { text: 'Accounting transactions a month', options: [{ label: 'Up to 50', tier: 0 }, { label: '51–100', tier: 1 }, { label: '101–200', tier: 2 }, { label: '200+', tier: 9 }] },
    { text: 'Sales channels', options: [{ label: 'One', tier: 0 }, { label: 'Two or more', tier: 1 }] },
  ],
};

const noop = () => () => {};
const popularIndex = (plans: BuilderPlan[]) => Math.max(0, plans.findIndex((p) => p.popular));

// Country, how you trade, a plan and any extras, with a running monthly total.
export function PriceBuilder({ data, extras, initialCountry, initialSegment, syncUrl }: { data: BuilderData; extras: Extra[]; initialCountry: string; initialSegment: string; syncUrl: boolean }) {
  const [country, setCountry] = useState(initialCountry);
  const [seg, setSeg] = useState(initialSegment);
  const [pick, setPick] = useState(() => popularIndex(data.plans[initialCountry][initialSegment].plans.filter((p) => !p.oneOff)));
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [setupOn, setSetupOn] = useState(false);
  // Links to /packages#finder arrive with the questions already open.
  const fromFinderLink = useSyncExternalStore(noop, () => window.location.hash === '#finder', () => false);
  const [helpToggle, setHelp] = useState<boolean | null>(null);
  const help = helpToggle ?? fromFinderLink;
  const [answers, setAnswers] = useState<(number | undefined)[]>([]);
  const [more, setMore] = useState(false);
  const [tip, setTip] = useState(false);
  const summary = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const summaryVisible = useInView(summary, { amount: 0.3 });

  const c = data.countries.find((x) => x.key === country)!;
  const block = data.plans[country][seg];
  const monthly = block.plans.filter((p) => !p.oneOff);
  const setup = block.plans.find((p) => p.oneOff);
  const plan = monthly[Math.min(pick, monthly.length - 1)];
  const available = extras.filter((x) => !x.segments || x.segments.includes(seg));
  const qs = questions[seg];

  // Volumes above the published plans point to a bespoke quote instead of a plan.
  const answered = qs.every((_, i) => answers[i] !== undefined);
  const tiers = answered ? qs.slice(1).map((q, i) => q.options[answers[i + 1]!].tier) : [];
  const bespoke = answered && Math.max(...tiers) >= 9;
  const recommended = answered && !bespoke ? (seg === 'limited-company' && answers[0] === 0 ? 0 : Math.min(Math.max(...tiers), monthly.length - 1)) : null;

  const lines = available.filter((x) => (counts[x.id] ?? 0) > 0).map((x) => ({ ...x, qty: counts[x.id], total: counts[x.id] * x.price }));
  const total = plan.price + lines.reduce((sum, l) => sum + l.total, 0);
  const fromTotal = lines.some((l) => l.from);
  const planLabel = [plan.name, ...lines.map((l) => `${l.qty} × ${l.label.toLowerCase()}`), ...(setupOn && setup ? [setup.name] : [])].join(' + ');

  const choose = (nc: string, ns: string) => {
    setCountry(nc);
    setSeg(ns);
    if (ns !== seg) {
      setPick(popularIndex(data.plans[nc][ns].plans.filter((p) => !p.oneOff)));
      setAnswers([]);
      setSetupOn(false);
    }
    if (syncUrl) window.history.replaceState(null, '', `/packages/${nc}/${ns}`);
  };

  const answer = (qi: number, oi: number) => {
    const next = [...answers];
    next[qi] = oi;
    setAnswers(next);
    if (!qs.every((_, i) => next[i] !== undefined)) return;
    const t = qs.slice(1).map((q, i) => q.options[next[i + 1]!].tier);
    if (Math.max(...t) >= 9) return;
    const rec = seg === 'limited-company' && next[0] === 0 ? 0 : Math.min(Math.max(...t), monthly.length - 1);
    setPick(rec);
    // On phones the plans are a swipeable row, so bring the recommended one into view.
    cards.current[rec]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    setSetupOn(!!setup && next[0]! < 2);
  };

  const bump = (id: string, by: number, max: number) => setCounts((s) => ({ ...s, [id]: Math.min(max, Math.max(0, (s[id] ?? 0) + by)) }));
  const money = (n: number) => `${c.symbol}${n.toLocaleString('en-IE')}`;

  return (
    <div id="finder" className="scroll-mt-24 lg:grid lg:grid-cols-[1fr_22rem] lg:items-start lg:gap-8">
      <div className="min-w-0">
        {/* 1. Where and how */}
        <div className="grid gap-2 [&>*]:w-fit [&>*]:max-w-full">
          <Segmented label="Country" value={country} onChange={(v) => choose(v, seg)} options={data.countries.map((x) => ({ value: x.key, label: x.label }))} />
          <Segmented label="How you trade" size="sm" value={seg} onChange={(v) => choose(country, v)} options={data.segments.map((x) => ({ value: x.key, label: x.label }))} />
        </div>

        {/* 2. Plan */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="font-display font-semibold">Choose a plan</p>
          <button type="button" onClick={() => setHelp(!help)} aria-expanded={help} className="inline-flex items-center gap-1.5 rounded-full bg-brand-pale px-3 py-1.5 text-sm font-semibold text-brand-ink transition active:scale-95">
            <Sparkles className="size-4" aria-hidden="true" />
            {help ? 'Hide questions' : 'Help me choose'}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {help && (
            <m.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
              <div className="mt-3 grid gap-4 rounded-[var(--radius)] border border-line bg-surface p-4 sm:p-5">
                {qs.map((q, qi) => (
                  <div key={`${seg}-${q.text}`}>
                    <p className="text-sm font-semibold">{q.text}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {q.options.map((o, oi) => {
                        const on = answers[qi] === oi;
                        return (
                          <button key={o.label} type="button" aria-pressed={on} onClick={() => answer(qi, oi)} className={`rounded-full border px-3 py-1.5 text-sm transition active:scale-95 ${on ? 'border-brand-bright bg-brand-bright text-white' : 'border-line bg-bg hover:border-line-strong'}`}>
                            {o.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <p className="text-sm text-muted" aria-live="polite">
                  {bespoke
                    ? `Your volumes sit above our published plans. Bespoke plans start from ${money(c.bespoke)} a month, quoted after a short conversation.`
                    : recommended !== null
                      ? `We have picked ${monthly[recommended].short} for you below.`
                      : 'Answer all three and we will pick the plan for you.'}
                </p>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        <div role="radiogroup" aria-label="Plan" className="rail mt-3 pt-3 lg:mx-0 lg:grid lg:grid-flow-row lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {monthly.map((p, i) => {
            const on = p === plan;
            return (
              <button
                key={`${country}-${seg}-${p.name}`}
                ref={(el) => {
                  cards.current[i] = el;
                }}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setPick(i)}
                className={`relative flex w-[62vw] max-w-[15rem] shrink-0 flex-col rounded-[1.4rem] border p-4 text-left transition-colors duration-300 active:scale-[0.98] lg:w-auto lg:max-w-none ${
                  on ? 'band border-transparent shadow-lift' : 'border-line bg-surface hover:border-line-strong'
                }`}
              >
                {(recommended === i || p.popular) && (
                  <span className={`absolute -top-2.5 left-4 rounded-full px-2.5 py-0.5 text-xs font-bold ${recommended === i ? 'bg-brand-bright text-white' : 'bg-clay text-[#0b1718]'}`}>{recommended === i ? 'Recommended' : 'Most popular'}</span>
                )}
                <span className="flex items-center justify-between gap-2">
                  <span className="font-display text-lg font-semibold">{p.short}</span>
                  <span className={`grid size-5 place-items-center rounded-full border-2 ${on ? 'border-mint bg-mint text-[#0b1718]' : 'border-line-strong'}`} aria-hidden="true">
                    {on && <Check className="size-3" strokeWidth={3.5} />}
                  </span>
                </span>
                <span className="mt-2 font-display text-3xl font-bold tracking-tight">
                  {money(p.price)}
                  <span className={`text-sm font-medium ${on ? 'text-on-band-muted' : 'text-muted'}`}> / month</span>
                </span>
                <span className={`mt-1.5 text-sm ${on ? 'text-on-band/80' : 'text-muted'}`}>{p.strap}</span>
              </button>
            );
          })}
        </div>

        {/* What the chosen plan includes */}
        <AnimatePresence mode="wait" initial={false}>
          <m.div key={plan.name + country} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="mt-4 rounded-[var(--radius)] border border-line bg-surface p-5">
            <ul className="grid gap-2 sm:grid-cols-2">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-[0.95rem]">
                  <Check className="mt-1 size-4 shrink-0 text-brand-ink" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-sm">
              <span className="flex items-center gap-1.5">
                <span className="font-semibold">{plan.limitsLabel}:</span>
                <span className="text-muted">{plan.limits}</span>
                <button type="button" onClick={() => setTip((t) => !t)} aria-expanded={tip} aria-label="What counts as a transaction?" className="rounded-full p-0.5 text-muted hover:text-ink">
                  <Info className="size-4" aria-hidden="true" />
                </button>
              </span>
              <button type="button" onClick={() => setMore((o) => !o)} aria-expanded={more} className="ml-auto inline-flex items-center gap-1 font-semibold text-brand-ink">
                {more ? 'Show less' : 'Everything included'}
                <ChevronDown className={`size-4 transition-transform duration-300 ${more ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
            </div>
            <AnimatePresence initial={false}>
              {tip && (
                <m.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} role="note" className="mt-3 overflow-hidden rounded-xl bg-surface-2 p-3 text-xs text-ink-2">
                  {data.definition}
                </m.p>
              )}
              {more && (
                <m.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                  <ul className="mt-3 grid gap-1.5 text-sm text-muted sm:grid-cols-2">
                    {[...plan.details, ...(seg === 'limited-company' ? data.core[country] ?? [] : [])].map((d) => (
                      <li key={d} className="flex gap-2.5">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-current" aria-hidden="true" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        </AnimatePresence>

        {/* 3. Extras */}
        <p className="mt-8 font-display font-semibold">Add anything extra</p>
        <ul className="mt-3 divide-y divide-line rounded-[var(--radius)] border border-line bg-surface">
          {setup && (
            <li className="flex items-center gap-4 px-4 py-3.5 sm:px-5">
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{setup.name}</span>
                <span className="block text-sm text-muted">One-off, {money(setup.price)}. For new businesses.</span>
              </span>
              <button type="button" role="switch" aria-checked={setupOn} aria-label={`Add ${setup.name}`} onClick={() => setSetupOn((v) => !v)} className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${setupOn ? 'bg-brand-bright' : 'bg-line-strong'}`}>
                <m.span layout transition={{ type: 'spring', stiffness: 500, damping: 32 }} className={`absolute top-1 size-5 rounded-full bg-white shadow ${setupOn ? 'right-1' : 'left-1'}`} />
              </button>
            </li>
          )}
          {available.map((x) => {
            const n = counts[x.id] ?? 0;
            return (
              <li key={x.id} className="flex items-center gap-4 px-4 py-3.5 sm:px-5">
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{x.label}</span>
                  <span className="block text-sm text-muted">
                    {x.from ? 'From ' : ''}
                    {money(x.price)} a month {x.unit}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-1 rounded-full border border-line bg-bg p-1">
                  <button type="button" onClick={() => bump(x.id, -1, x.max)} disabled={n === 0} aria-label={`Remove one: ${x.label}`} className="grid size-8 place-items-center rounded-full transition hover:bg-surface-2 active:scale-90 disabled:opacity-30">
                    <Minus className="size-4" aria-hidden="true" />
                  </button>
                  <span className="w-6 text-center font-display font-semibold tabular-nums" aria-live="polite">
                    {n}
                  </span>
                  <button type="button" onClick={() => bump(x.id, 1, x.max)} disabled={n === x.max} aria-label={`Add one: ${x.label}`} className="grid size-8 place-items-center rounded-full transition hover:bg-surface-2 active:scale-90 disabled:opacity-30">
                    <Plus className="size-4" aria-hidden="true" />
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 4. Summary */}
      <div ref={summary} className="band grain relative mt-8 overflow-hidden rounded-[1.75rem] p-6 shadow-lift lg:sticky lg:top-24 lg:mt-0">
        <p className="text-sm text-on-band-muted">Your price</p>
        <p className="mt-1 font-display text-5xl font-bold tracking-tight text-white">
          {fromTotal && <span className="mr-1 text-lg font-medium text-on-band-muted">from</span>}
          {c.symbol}
          <AnimatedNumber value={total} />
          <span className="text-lg font-medium text-on-band-muted"> / month</span>
        </p>
        <ul className="mt-5 grid gap-2 border-t border-white/10 pt-5 text-sm">
          <li className="flex justify-between gap-4">
            <span className="text-on-band/85">{plan.name}</span>
            <span className="font-semibold">{money(plan.price)}</span>
          </li>
          <AnimatePresence initial={false}>
            {lines.map((l) => (
              <m.li key={l.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex justify-between gap-4 overflow-hidden">
                <span className="text-on-band/85">
                  {l.qty} × {l.label.toLowerCase()}
                </span>
                <span className="font-semibold">
                  {l.from ? 'from ' : ''}
                  {money(l.total)}
                </span>
              </m.li>
            ))}
            {setupOn && setup && (
              <m.li key="setup" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex justify-between gap-4 overflow-hidden border-t border-white/10 pt-2 text-on-band-muted">
                <span>{setup.name}, one-off</span>
                <span className="font-semibold text-white">{money(setup.price)}</span>
              </m.li>
            )}
          </AnimatePresence>
        </ul>
        <Link href={enquiryHref(country, planLabel)} className="btn btn-primary btn-block mt-6">
          Get started
          <span className="btn-icon" aria-hidden="true">
            <ArrowRight className="size-4" />
          </span>
        </Link>
        <a href={whatsappLink(`Hi Shiel, I’m interested in ${planLabel} in ${c.label}.`)} target="_blank" rel="noopener" className="mt-3 inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-mint">
          <WhatsAppIcon className="size-4" />
          Ask about this plan on WhatsApp
        </a>
        <p className="mt-5 text-xs text-on-band-muted">{c.note} Fixed in writing before we start. 30 days’ notice, no lock-in.</p>
        <p className="mt-2 text-xs text-on-band-muted">
          Bigger or more complex? Bespoke plans from {money(c.bespoke)} a month.{' '}
          <Link href={enquiryHref(country, 'Bespoke plan')} className="font-semibold text-mint underline-offset-2 hover:underline">
            Get a quote
          </Link>
        </p>
      </div>

      {/* A running total that follows the visitor on phones until the full summary is in view. */}
      <AnimatePresence>
        {!summaryVisible && (
          <m.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="pointer-events-none sticky bottom-[5.6rem] z-30 mt-4 lg:hidden">
            <div className="band pointer-events-auto flex items-center gap-3 rounded-full py-2 pr-2 pl-5 shadow-lift">
              <span className="min-w-0 flex-1 truncate text-sm">
                <span className="font-display text-lg font-bold text-white">
                  {fromTotal ? 'from ' : ''}
                  {money(total)}
                </span>
                <span className="text-on-band-muted"> / month · {plan.short}</span>
              </span>
              <button type="button" onClick={() => summary.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="btn btn-primary btn-sm shrink-0">
                Review
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
