import Link from 'next/link';
import { countries, serviceBySlug } from '@/lib/content';
import { countryMeta, fromPrice } from '@/lib/packages';
import { site } from '@/lib/site';
import { Checklist, serviceIcons } from './primitives';

export function GlanceCard({ title, items, foot }: { title: string; items: string[]; foot?: React.ReactNode }) {
  return (
    <div className="relative rounded-[1.75rem] border border-white/12 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl sm:p-7">
      <p className="font-display text-lg font-semibold">{title}</p>
      <Checklist items={items} className="mt-5 text-on-band/90 [&_li>span:first-child]:bg-mint/15 [&_li>span:first-child]:text-mint" />
      {foot && <div className="mt-6 border-t border-white/10 pt-5">{foot}</div>}
    </div>
  );
}

export function FromPrices({ label = 'Included in plans from' }: { label?: string }) {
  return (
    <div>
      <p className="text-sm text-on-band-muted">{label}</p>
      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
        {countries.map((c) => (
          <p key={c.key} className="font-display">
            <span className="mr-1.5 text-xs font-semibold text-on-band-muted">{countryMeta[c.key].short}</span>
            <span className="text-2xl font-bold">
              {countryMeta[c.key].symbol}
              {fromPrice(c.key)}
            </span>
            <span className="sr-only"> a month in {c.name}</span>
          </p>
        ))}
      </div>
    </div>
  );
}


export function ServiceCards({ slugs }: { slugs: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {slugs.map((slug) => {
        const s = serviceBySlug[slug];
        const Icon = serviceIcons[s.icon];
        return (
          <li key={slug} className="reveal">
            <Link href={`/${slug}`} className="card card-hover group flex h-full gap-4 p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-pale text-brand-ink">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-lg font-semibold">{s.name}</span>
                <span className="mt-1 block text-sm text-muted">{s.card}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}


export function Updated({ date = site.updatedLabel }: { date?: string }) {
  return (
    <p className="text-sm text-muted">
      Written and maintained by the Shiel Accountants team. Last updated <time dateTime={site.updated}>{date}</time>.
    </p>
  );
}
