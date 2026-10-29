'use client';

import Link from 'next/link';
import { AnimatePresence, m } from 'motion/react';
import { AlertTriangle, CalendarPlus, CheckCircle2, CircleDot } from 'lucide-react';
import { useId, useMemo, useState, useSyncExternalStore } from 'react';
import { Segmented } from '@/components/ui/segmented';
import { AnimatedNumber } from '@/components/ui/animated-number';

type C = 'ireland' | 'united-kingdom' | 'gibraltar';
const countryOptions: { value: C; label: string }[] = [
  { value: 'ireland', label: 'Ireland' },
  { value: 'united-kingdom', label: 'UK' },
  { value: 'gibraltar', label: 'Gibraltar' },
];
const sym = (c: C) => (c === 'ireland' ? '€' : '£');
const fmt = (n: number) => Math.round(n).toLocaleString('en-IE');

function MoneyInput({ label, value, onChange, symbol, hint }: { label: string; value: number; onChange: (n: number) => void; symbol: string; hint?: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block font-display font-semibold">
        {label}
      </label>
      {hint && <p className="text-sm text-muted">{hint}</p>}
      <div className="mt-2 flex items-center rounded-2xl border border-line bg-surface transition focus-within:border-brand-bright focus-within:ring-4 focus-within:ring-brand-bright/15">
        <span className="pl-4 font-display text-lg text-muted" aria-hidden="true">
          {symbol}
        </span>
        <input
          id={id}
          inputMode="numeric"
          value={value ? value.toLocaleString('en-IE') : ''}
          placeholder="0"
          onChange={(e) => onChange(Number(e.target.value.replace(/[^\d]/g, '')) || 0)}
          className="h-14 w-full bg-transparent px-2 font-display text-xl font-semibold tabular-nums outline-none"
        />
      </div>
    </div>
  );
}

function ResultPanel({ children }: { children: React.ReactNode }) {
  return <div className="band grain relative overflow-hidden rounded-[1.75rem] p-6 sm:p-8">{children}</div>;
}

/* ------------------------------------------------------- corporation tax */

export function CorporationTaxCalculator() {
  const [c, setC] = useState<C>('united-kingdom');
  const [profit, setProfit] = useState(100000);
  const [passive, setPassive] = useState(0);
  const [assoc, setAssoc] = useState(0);
  const [months, setMonths] = useState(12);

  const r = useMemo(() => {
    if (c === 'ireland') {
      const trading = profit * 0.125;
      const other = passive * 0.25;
      const total = trading + other;
      const base = profit + passive;
      return {
        tax: total,
        rate: base ? total / base : 0,
        base,
        lines: [`Trading profit ${sym(c)}${fmt(profit)} × 12.5% = ${sym(c)}${fmt(trading)}`, ...(passive ? [`Non-trading income ${sym(c)}${fmt(passive)} × 25% = ${sym(c)}${fmt(other)}`] : [])],
        note: 'Irish trading income is taxed at 12.5% and most passive income such as rent and interest at 25%. Close company surcharges, reliefs and losses are not included.',
      };
    }
    if (c === 'gibraltar') {
      const tax = profit * 0.15;
      return { tax, rate: profit ? 0.15 : 0, base: profit, lines: [`Profit ${sym(c)}${fmt(profit)} × 15% = ${sym(c)}${fmt(tax)}`], note: 'Gibraltar taxes income accrued in or derived from Gibraltar at 15%. Utility, energy and fuel suppliers and companies abusing a dominant position pay 20%.' };
    }
    const share = (assoc + 1) * (12 / months);
    const lower = 50000 / share;
    const upper = 250000 / share;
    let tax: number;
    let lines: string[];
    if (profit <= lower) {
      tax = profit * 0.19;
      lines = [`Profit is at or below the lower limit of £${fmt(lower)}`, `£${fmt(profit)} × 19% = £${fmt(tax)}`];
    } else if (profit >= upper) {
      tax = profit * 0.25;
      lines = [`Profit is above the upper limit of £${fmt(upper)}`, `£${fmt(profit)} × 25% = £${fmt(tax)}`];
    } else {
      const main = profit * 0.25;
      const relief = (upper - profit) * (3 / 200);
      tax = main - relief;
      lines = [`Main rate: £${fmt(profit)} × 25% = £${fmt(main)}`, `Marginal Relief: (£${fmt(upper)} − £${fmt(profit)}) × 3/200 = £${fmt(relief)}`, `Tax due: £${fmt(main)} − £${fmt(relief)} = £${fmt(tax)}`];
    }
    return { tax, rate: profit ? tax / profit : 0, base: profit, lines, note: `Limits used: £${fmt(lower)} and £${fmt(upper)}, after sharing between ${assoc + 1} associated ${assoc ? 'companies' : 'company'} over a ${months}-month period. Assumes no exempt distributions are received.` };
  }, [c, profit, passive, assoc, months]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
      <div className="card grid content-start gap-6 p-5 sm:p-7">
        <Segmented label="Country" value={c} onChange={setC} options={countryOptions} />
        <MoneyInput label={c === 'ireland' ? 'Trading profit' : 'Taxable profit'} hint="After allowable expenses and capital allowances" value={profit} onChange={setProfit} symbol={sym(c)} />
        <AnimatePresence initial={false} mode="popLayout">
          {c === 'ireland' && (
            <m.div key="ie" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
              <MoneyInput label="Non-trading income" hint="Rent, interest and other passive income" value={passive} onChange={setPassive} symbol="€" />
            </m.div>
          )}
          {c === 'united-kingdom' && (
            <m.div key="uk" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="grid gap-6 sm:grid-cols-2">
              <Stepper label="Associated companies" value={assoc} min={0} max={9} onChange={setAssoc} />
              <Stepper label="Period length (months)" value={months} min={1} max={12} onChange={setMonths} />
            </m.div>
          )}
        </AnimatePresence>
        <input
          type="range"
          aria-label="Adjust profit"
          min={0}
          max={c === 'ireland' ? 1000000 : 400000}
          step={1000}
          value={Math.min(profit, c === 'ireland' ? 1000000 : 400000)}
          onChange={(e) => setProfit(Number(e.target.value))}
          className="w-full accent-[#21a09a]"
        />
      </div>

      <ResultPanel>
        <p className="text-on-band-muted">Estimated corporation tax</p>
        <p className="mt-1 font-display text-6xl font-extrabold tracking-tight sm:text-7xl" aria-live="polite">
          {sym(c)}
          <AnimatedNumber value={r.tax} />
        </p>
        <div className="mt-6">
          <div className="flex justify-between text-sm text-on-band-muted">
            <span>Effective rate</span>
            <span className="font-display font-semibold text-mint">{(r.rate * 100).toFixed(2)}%</span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
            <m.div className="h-full rounded-full bg-gradient-to-r from-[#21a09a] to-[#6fd6cb]" animate={{ width: `${Math.min(r.rate / 0.25, 1) * 100}%` }} transition={{ type: 'spring', stiffness: 160, damping: 26 }} />
          </div>
          <div className="mt-1 flex justify-between text-xs text-on-band-muted">
            <span>0%</span>
            <span>25%</span>
          </div>
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-black/20 p-4">
            <dt className="text-xs text-on-band-muted">Profit after tax</dt>
            <dd className="mt-1 font-display text-xl font-bold">
              {sym(c)}
              {fmt(r.base - r.tax)}
            </dd>
          </div>
          <div className="rounded-2xl bg-black/20 p-4">
            <dt className="text-xs text-on-band-muted">Tax per {sym(c)}100 of profit</dt>
            <dd className="mt-1 font-display text-xl font-bold">
              {sym(c)}
              {(r.rate * 100).toFixed(2)}
            </dd>
          </div>
        </dl>
        <div className="mt-6 rounded-2xl border border-white/10 p-4">
          <p className="text-sm font-semibold">How it is worked out</p>
          <ul className="mt-2 grid gap-1.5 font-mono text-[0.8rem] text-on-band/85">
            {r.lines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-on-band-muted">{r.note}</p>
        </div>
        <Link href="/contact" className="btn btn-primary btn-block mt-6">
          Check this with an accountant
        </Link>
      </ResultPanel>
    </div>
  );
}

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  const id = useId();
  return (
    <div>
      <p id={id} className="font-display font-semibold">
        {label}
      </p>
      <div role="group" aria-labelledby={id} className="mt-2 flex h-14 items-center justify-between rounded-2xl border border-line bg-surface px-2">
        <button type="button" aria-label="Decrease" disabled={value <= min} onClick={() => onChange(value - 1)} className="grid size-10 place-items-center rounded-xl bg-surface-2 text-xl font-bold disabled:opacity-30">
          −
        </button>
        <output aria-live="polite" className="font-display text-xl font-semibold tabular-nums">
          {value}
        </output>
        <button type="button" aria-label="Increase" disabled={value >= max} onClick={() => onChange(value + 1)} className="grid size-10 place-items-center rounded-xl bg-surface-2 text-xl font-bold disabled:opacity-30">
          +
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- deadlines */

const pad = (n: number) => String(n).padStart(2, '0');
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const lastDay = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
const isMonthEnd = (d: Date) => d.getDate() === lastDay(d.getFullYear(), d.getMonth());

// Adds months, keeping month-ends as month-ends (31 Mar + 9 months = 31 Dec).
function addMonths(d: Date, n: number) {
  const y = d.getFullYear();
  const m = d.getMonth() + n;
  const day = isMonthEnd(d) ? lastDay(y, m) : Math.min(d.getDate(), lastDay(y, m));
  return new Date(y, m, day);
}
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const longDate = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const noop = () => () => {};

type Deadline = { label: string; date: Date; detail: string };

function deadlinesFor(c: C, ye: Date, ard?: Date): Deadline[] {
  if (c === 'ireland') {
    const ct1 = ye.getDate() >= 21 ? new Date(ye.getFullYear(), ye.getMonth() + 9, 23) : addMonths(ye, 9);
    const prelim = new Date(ye.getFullYear(), ye.getMonth() - 1, 23);
    const list: Deadline[] = [
      { label: 'Preliminary tax (small companies)', date: prelim, detail: 'Paid by the 23rd of the eleventh month of the accounting period. Larger companies pay in two instalments.' },
      { label: 'CT1 return and balance of tax', date: ct1, detail: 'Filed and paid through ROS by the 23rd of the ninth month after the period ends.' },
    ];
    if (ard) list.push({ label: 'CRO B1 annual return', date: addDays(ard, 56), detail: 'Due within 56 days of your Annual Return Date, with financial statements attached where required.' });
    return list;
  }
  if (c === 'united-kingdom') {
    return [
      { label: 'Corporation Tax payment', date: addDays(addMonths(ye, 9), 1), detail: 'Due 9 months and 1 day after the period ends, for companies outside the quarterly instalment regime.' },
      { label: 'Accounts to Companies House', date: addMonths(ye, 9), detail: 'A private company’s usual deadline, 9 months after its year-end. First accounts can differ.' },
      { label: 'Company Tax Return (CT600)', date: addMonths(ye, 12), detail: 'Due 12 months after the end of the accounting period.' },
    ];
  }
  return [{ label: 'Corporate Tax Return (CT1) and tax', date: new Date(ye.getFullYear(), ye.getMonth() + 10, 0), detail: 'Due nine months after the end of the month in which the accounting period ends, with any balance of tax.' }];
}

function icsFor(list: Deadline[], c: C) {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const events = list.map((d, i) => {
    const day = iso(d.date).replace(/-/g, '');
    const next = iso(addDays(d.date, 1)).replace(/-/g, '');
    return ['BEGIN:VEVENT', `UID:${day}-${i}-${c}@shiel.ltd`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${day}`, `DTEND;VALUE=DATE:${next}`, `SUMMARY:${d.label}`, `DESCRIPTION:${d.detail} Estimated by shiel.ltd. Confirm with your accountant.`, 'BEGIN:VALARM', 'TRIGGER:-P14D', 'ACTION:DISPLAY', `DESCRIPTION:${d.label} in two weeks`, 'END:VALARM', 'END:VEVENT'].join('\r\n');
  });
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Shiel Accountants//Deadlines//EN', 'CALSCALE:GREGORIAN', ...events, 'END:VCALENDAR'].join('\r\n');
}

export function DeadlineFinder() {
  const [c, setC] = useState<C>('ireland');
  const [ye, setYe] = useState('2025-12-31');
  // The build date is not the visitor's date, so "today" only exists in the browser.
  const todayIso = useSyncExternalStore(noop, () => iso(new Date()), () => null);
  const today = todayIso ? new Date(`${todayIso}T00:00:00`) : null;
  const [ard, setArd] = useState('');
  const yeId = useId();
  const ardId = useId();
  const yeDate = ye ? new Date(`${ye}T00:00:00`) : null;
  const ardDate = ard ? new Date(`${ard}T00:00:00`) : undefined;
  const list = yeDate && !isNaN(+yeDate) ? deadlinesFor(c, yeDate, ardDate).sort((a, b) => +a.date - +b.date) : [];

  const download = () => {
    const blob = new Blob([icsFor(list, c)], { type: 'text/calendar' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'company-deadlines.ics';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="card grid content-start gap-6 p-5 sm:p-7">
        <Segmented label="Country" value={c} onChange={setC} options={countryOptions} />
        <div>
          <label htmlFor={yeId} className="block font-display font-semibold">
            Accounting period end
          </label>
          <p className="text-sm text-muted">Your company’s financial year-end</p>
          <input id={yeId} type="date" value={ye} onChange={(e) => setYe(e.target.value)} className="mt-2 h-14 w-full rounded-2xl border border-line bg-surface px-4 font-display text-lg outline-none focus:border-brand-bright" />
        </div>
        {c === 'ireland' && (
          <div>
            <label htmlFor={ardId} className="block font-display font-semibold">
              Annual Return Date <span className="font-normal text-muted">(optional)</span>
            </label>
            <p className="text-sm text-muted">Shown on the CRO register, and separate from your year-end</p>
            <input id={ardId} type="date" value={ard} onChange={(e) => setArd(e.target.value)} className="mt-2 h-14 w-full rounded-2xl border border-line bg-surface px-4 font-display text-lg outline-none focus:border-brand-bright" />
          </div>
        )}
      </div>

      <ResultPanel>
        <div className="flex items-center justify-between gap-4">
          <p className="font-display text-xl font-semibold">Your dates</p>
          {list.length > 0 && (
            <button type="button" onClick={download} className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/15">
              <CalendarPlus className="size-4" aria-hidden="true" />
              Add to calendar
            </button>
          )}
        </div>
        <ol className="relative mt-6 grid gap-4" aria-live="polite">
          <span aria-hidden="true" className="absolute top-3 bottom-3 left-[0.9rem] w-px bg-white/15" />
          <AnimatePresence initial={false}>
            {list.map((d, i) => {
              const days = today ? Math.round((+d.date - +today) / 86400000) : 1000;
              const past = days < 0;
              const soon = !past && days <= 45;
              return (
                <m.li key={`${c}-${d.label}-${iso(d.date)}`} layout initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05 } }} exit={{ opacity: 0 }} className="relative flex gap-4">
                  <span className={`relative z-10 mt-0.5 grid size-7 shrink-0 place-items-center rounded-full ${past ? 'bg-white/15 text-on-band-muted' : soon ? 'bg-[#f0a690] text-[#3a140b]' : 'bg-mint text-[#0b1718]'}`}>
                    {past ? <CheckCircle2 className="size-4" aria-hidden="true" /> : soon ? <AlertTriangle className="size-4" aria-hidden="true" /> : <CircleDot className="size-4" aria-hidden="true" />}
                  </span>
                  <div className="flex-1 rounded-2xl bg-black/20 p-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <p className="font-display font-semibold">{d.label}</p>
                      {today && <p className={`text-xs font-semibold ${past ? 'text-on-band-muted' : soon ? 'text-[#f0a690]' : 'text-mint'}`}>{past ? `${-days} days ago` : days === 0 ? 'Today' : `In ${days} days`}</p>}
                    </div>
                    <p className="mt-1 font-display text-2xl font-bold">
                      <time dateTime={iso(d.date)}>{longDate(d.date)}</time>
                    </p>
                    <p className="mt-1 text-sm text-on-band/75">{d.detail}</p>
                  </div>
                </m.li>
              );
            })}
          </AnimatePresence>
        </ol>
        <p className="mt-6 text-xs text-on-band-muted">Estimates for standard periods. First accounting periods, unusual period ends, group companies and large-company instalments can change these dates.</p>
      </ResultPanel>
    </div>
  );
}

/* ------------------------------------------------------------------- VAT */

export function VatChecker() {
  const [c, setC] = useState<C>('ireland');
  const [kind, setKind] = useState<'services' | 'goods'>('services');
  const [turnover, setTurnover] = useState(38000);
  const [next30, setNext30] = useState(0);

  const threshold = c === 'ireland' ? (kind === 'goods' ? 85000 : 42500) : 90000;
  const share = c === 'gibraltar' ? 0 : turnover / threshold;
  const over = c !== 'gibraltar' && (turnover > threshold || (c === 'united-kingdom' && next30 > 90000));
  const near = !over && share >= 0.8;
  const status = c === 'gibraltar' ? 'none' : over ? 'over' : near ? 'near' : 'under';
  const copy = {
    none: { title: 'Gibraltar has no VAT', text: 'Local sales are not subject to VAT. If you sell into the UK or EU, the rules of the customer’s country can still apply.' },
    over: { title: 'You need to register', text: c === 'ireland' ? 'Your turnover is above the Irish threshold for your type of business. Registration should happen promptly, and charging VAT starts from the date you are registered.' : 'Your taxable turnover is over £90,000. You must register within 30 days of the end of the month you went over, or straight away if the next 30 days alone exceed it.' },
    near: { title: 'You are getting close', text: 'You are above 80% of the threshold. It is worth keeping a monthly eye on your rolling 12-month total and planning for registration.' },
    under: { title: 'No need to register yet', text: 'You are comfortably below the threshold. Voluntary registration can still make sense if your customers are mainly VAT-registered businesses.' },
  }[status];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="card grid content-start gap-6 p-5 sm:p-7">
        <Segmented label="Country" value={c} onChange={setC} options={countryOptions} />
        {c === 'ireland' && (
          <Segmented
            label="What you mainly sell"
            size="sm"
            value={kind}
            onChange={setKind}
            options={[
              { value: 'services', label: 'Services' },
              { value: 'goods', label: 'Goods (90%+)' },
            ]}
          />
        )}
        {c !== 'gibraltar' && <MoneyInput label="Turnover in the last 12 months" hint="Taxable sales over any rolling 12-month period" value={turnover} onChange={setTurnover} symbol={sym(c)} />}
        {c === 'united-kingdom' && <MoneyInput label="Expected sales in the next 30 days alone" value={next30} onChange={setNext30} symbol="£" />}
      </div>
      <ResultPanel>
        <AnimatePresence mode="wait" initial={false}>
          <m.div key={status} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} aria-live="polite">
            <p className={`font-display text-3xl font-bold sm:text-4xl ${status === 'over' ? 'text-[#f0a690]' : 'text-mint'}`}>{copy.title}</p>
            <p className="mt-3 text-on-band/85">{copy.text}</p>
          </m.div>
        </AnimatePresence>
        {c !== 'gibraltar' && (
          <div className="mt-8">
            <div className="flex justify-between text-sm text-on-band-muted">
              <span>
                {sym(c)}
                {fmt(turnover)}
              </span>
              <span>
                Threshold {sym(c)}
                {fmt(threshold)}
              </span>
            </div>
            <div className="relative mt-2 h-4 overflow-hidden rounded-full bg-white/10">
              <m.div className={`h-full rounded-full ${over ? 'bg-[#f0a690]' : near ? 'bg-gradient-to-r from-[#21a09a] to-[#f0a690]' : 'bg-gradient-to-r from-[#21a09a] to-[#6fd6cb]'}`} animate={{ width: `${Math.min(share, 1) * 100}%` }} transition={{ type: 'spring', stiffness: 160, damping: 26 }} />
              <span className="absolute inset-y-0 left-[80%] w-px bg-white/40" aria-hidden="true" />
            </div>
            <p className="mt-2 text-xs text-on-band-muted">{Math.round(share * 100)}% of the threshold. The marker shows 80%.</p>
          </div>
        )}
        <Link href="/contact" className="btn btn-primary btn-block mt-8">
          Talk to us about VAT
        </Link>
      </ResultPanel>
    </div>
  );
}
