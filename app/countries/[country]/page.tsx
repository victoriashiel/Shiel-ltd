import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CalendarClock } from 'lucide-react';
import { CountryFit } from '@/components/tools/country-fit';
import { FilingMap } from '@/components/tools/filing-map';
import { PageHero } from '@/components/ui/hero';
import { Updated } from '@/components/ui/parts';
import { Button, FaqList, JsonLd, Section, SectionHead, Sources } from '@/components/ui/primitives';
import { audiences, countries, countryByKey } from '@/lib/content';
import { countryMeta, fromPrice, segmentKeys, segmentMeta, setupPlan, type CountryKey } from '@/lib/packages';
import { pageMeta, serviceLd, webPageLd } from '@/lib/seo';
import { site, whatsappLink } from '@/lib/site';

export const dynamicParams = false;
export const generateStaticParams = () => countries.map((c) => ({ country: c.key }));

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }) {
  const c = countryByKey[(await params).country as CountryKey];
  return pageMeta({ title: c.title, description: c.description, path: `/countries/${c.key}`, absoluteTitle: true });
}

const local: Record<CountryKey, string> = { ireland: 'Irish', 'united-kingdom': 'UK', gibraltar: 'Gibraltar' };

export default async function Page({ params }: { params: Promise<{ country: string }> }) {
  const c = countryByKey[(await params).country as CountryKey];
  const m = countryMeta[c.key];
  const path = `/countries/${c.key}`;
  const the = c.key === 'united-kingdom' ? 'the UK' : c.name;
  const hello = `Hi Shiel, my business is in ${the} and I’d like a quote.`;
  const fileCodes = (who: 'company' | 'sole') => c.filings.filter((f) => f.who.includes(who)).map((f) => f.code);
  const options = segmentKeys.map((s) => {
    const setup = setupPlan(c.key, s);
    return {
      key: s,
      label: segmentMeta[s].label,
      from: `${m.symbol}${fromPrice(c.key, s)}`,
      setup: setup ? `${m.symbol}${setup.price}` : undefined,
      files: fileCodes(s === 'sole-trader' ? 'sole' : 'company'),
      href: `/packages/${c.key}/${s}`,
    };
  });
  const others = countries.filter((x) => x.key !== c.key);

  return (
    <>
      <JsonLd
        data={{
          ...serviceLd({
            path,
            name: `Accountants in ${c.name}`,
            description: c.description,
            offers: segmentKeys.map((s) => ({ name: `${segmentMeta[s].label} plans in ${c.name}`, description: segmentMeta[s].blurb, price: fromPrice(c.key, s), currency: m.currency })),
          }),
          areaServed: { '@type': 'Country', name: c.name },
        }}
      />
      <JsonLd data={webPageLd({ path, name: c.title, description: c.description })} />
      <PageHero
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Countries', path: '/countries' },
          { name: c.name, path },
        ]}
        headline={c.promise}
        answer={c.answer}
        chips={[`${c.authorities[0]} and ${c.authorities[1]}`, 'Named accountant', 'Free switching']}
        primary={{ href: `/packages/${c.key}`, label: `${local[c.key]} prices` }}
        secondary={{ href: whatsappLink(hello), label: 'Message an accountant' }}
        aside={<CountryFit country={the} options={options} />}
      />

      <Section>
        <SectionHead title={`Your year in *${the}*`} lead={`Everything a business here files, who it goes to and when. Your accountant tracks every date and files with ${c.authorities[0]} and ${c.authorities[1]} for you.`} />
        <FilingMap filings={c.filings} authorities={[...c.authorities]} />
        <Link href="/tools/filing-deadlines" className="card card-hover group mt-4 flex items-center gap-4 p-4 sm:mt-6 sm:p-5">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-clay-soft text-clay-ink">
            <CalendarClock className="size-6" aria-hidden="true" />
          </span>
          <span className="flex-1">
            <span className="block font-display text-lg font-semibold">Work out your own dates</span>
            <span className="block text-sm text-muted">Enter your year-end and see the deadlines that follow.</span>
          </span>
          <ArrowUpRight className="size-5 text-muted transition group-hover:text-ink" aria-hidden="true" />
        </Link>
      </Section>

      <Section tone="muted" label="Rates">
        <SectionHead title="The numbers *that matter*" lead="Headline rates and windows, each linked to its official source." />
        <dl className="rail sm:mx-0 sm:grid sm:grid-flow-row sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4" role="region" aria-label="Rates, swipe for more" tabIndex={0}>
          {c.facts.map((f) => (
            <div key={f.label} className="card flex w-[70vw] max-w-xs shrink-0 flex-col p-5 sm:w-auto sm:max-w-none">
              <dt className="order-2 mt-1 font-display font-semibold">{f.label}</dt>
              <dd className="order-1 font-display text-3xl font-bold tracking-tight text-brand-ink">{f.value}</dd>
              <dd className="order-3 mt-2 flex-1 text-sm text-muted">{f.text}</dd>
              <dd className="order-4 mt-4">
                <a href={f.source.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-ink">
                  Source: {f.source.label.split(':')[0]} <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <SectionHead title={`Who we help in *${the}*`} lead="Each kind of business has its own page, with the problems we solve and the plans that fit." />
        <ul className="grid gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
          {audiences.map((a) => (
            <li key={a.slug} className="reveal">
              <Link href={`/who-we-help/${a.slug}`} className="card card-hover group flex h-full items-center gap-4 px-4 py-3 sm:p-5">
                <span className="min-w-0 flex-1">
                  <span className="block font-display font-semibold">{a.me}</span>
                  <span className="mt-0.5 block text-sm text-muted">
                    {a.name}, from {m.symbol}
                    {fromPrice(c.key, a.segment)} a month
                  </span>
                </span>
                <ArrowRight className="size-5 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-ink" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="band" label="Switching">
        <SectionHead title={`Switching from another *${local[c.key]}* accountant`} lead="It is free, and you do not need to have the conversation yourself. Most handovers are done before the next deadline." />
        <ol className="grid gap-3 md:grid-cols-3">
          {c.switching.map((s, i) => (
            <li key={s.title} className="reveal flex gap-4 rounded-[var(--radius)] border border-white/10 bg-white/[0.05] p-4 md:block md:p-6">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint/15 font-display font-bold text-mint md:size-10">{i + 1}</span>
              <div>
                <h3 className="text-lg text-white md:mt-4 md:text-xl">{s.title}</h3>
                <p className="mt-1 text-[0.95rem] text-on-band/80 md:mt-1.5 md:text-base">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={whatsappLink(hello)} variant="whatsapp" icon="whatsapp">
            Message an accountant
          </Button>
          <Button href="/contact" variant="secondary" icon="none">
            Use the enquiry form
          </Button>
        </div>
      </Section>

      <Section tone="muted" label="Questions">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-[clamp(1.85rem,5.5vw,3rem)]">Frequently Asked Questions</h2>
            <div className="mt-6">
              <Updated />
            </div>
          </div>
          <div>
            <FaqList faqs={c.faqs} />
            <Sources items={[...new Map([...c.facts.map((f) => f.source), ...c.filings.flatMap((f) => (f.source ? [f.source] : []))].map((s) => [s.url, s])).values()]} updated={site.updatedLabel} />
          </div>
        </div>
      </Section>

      <Section label="Other countries">
        <h2 className="text-2xl">Business in more than one country?</h2>
        <p className="mt-2 max-w-2xl text-muted">The same accountant can look after all of it, with one set of books where the rules allow.</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.key}>
              <Link href={`/countries/${o.key}`} className="chip transition hover:border-line-strong hover:text-ink">
                {o.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/international-accounting" className="chip transition hover:border-line-strong hover:text-ink">
              International accounting
            </Link>
          </li>
        </ul>
      </Section>

    </>
  );
}
