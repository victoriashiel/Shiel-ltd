import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CalendarClock, Calculator, Check, ChevronRight, Receipt } from 'lucide-react';
import { HeroCard } from '@/components/home/hero-card';
import { ServiceExplorer } from '@/components/home/service-explorer';
import { AudiencePicker } from '@/components/tools/audience-picker';
import { PriceTeaser } from '@/components/tools/price-teaser';
import { ClientPanel, HeroGlow } from '@/components/ui/hero';
import { ArrowLink, Button, Container, FaqList, JsonLd, Rich, Section, SectionHead } from '@/components/ui/primitives';
import { audiences, countries, homeFaqs, promises, results, services } from '@/lib/content';
import { countryMeta, fromPrice, teaserData } from '@/lib/packages';
import { tools } from '@/lib/routes';
import { pageMeta, webPageLd } from '@/lib/seo';
import { proof, site } from '@/lib/site';

const title = 'Accountants for Ireland, the UK & Gibraltar | Shiel';
const description = 'Fixed-fee accounting, tax, bookkeeping and payroll for companies and sole traders in Ireland, the UK and Gibraltar, from €79 or £49 a month. Named accountant.';

export const metadata = pageMeta({ title, description, path: '/', absoluteTitle: true });

const toolIcons = { 'corporation-tax-calculator': Calculator, 'filing-deadlines': CalendarClock, 'vat-threshold-checker': Receipt };
const toolLines = {
  'corporation-tax-calculator': 'Estimate the tax on your company’s profit.',
  'filing-deadlines': 'Your next deadlines from one date.',
  'vat-threshold-checker': 'Check whether you need to register.',
};

const strip = [
  `${proof.years} years’ experience`,
  `${proof.recovered} recovered for clients in the last two years`,
  'Free switching from your current accountant',
  'WhatsApp access to your accountant',
  'One named accountant per client',
  'Fixed monthly fees, never hourly',
  `From ${proof.fromIE} a month, or ${proof.fromUK} in the UK`,
];

export default function Home() {
  return (
    <>
      <JsonLd data={webPageLd({ path: '/', name: title, description })} />

      {/* Hero */}
      <section className="band grain relative overflow-hidden pt-24 pb-12 sm:pt-32 lg:pb-24">
        <HeroGlow />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="lift text-[clamp(2.6rem,10vw,5.2rem)] leading-[0.98]">
                <Rich text="Let us handle your accounts, *from €79 a month*." />
              </h1>
              <p className="lift lift-1 mt-6 max-w-xl text-lg leading-relaxed text-on-band/90 sm:text-xl">
                Bookkeeping, tax returns, payroll and year-end accounts, handled by a named accountant. Choose a fixed monthly package or get a quote for a one-off job.
              </p>
              <div className="lift lift-2 mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/packages">View packages</Button>
                <Button href="/contact" variant="secondary" icon="none">
                  Talk to an accountant
                </Button>
              </div>
              <ul className="lift lift-3 mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-on-band-muted">
                {['Free switching', 'WhatsApp support', 'Answers within 24 hours'].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="size-4 text-mint" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lift lift-4">
              <HeroCard />
            </div>
          </div>
        </Container>
      </section>

      {/* Proof strip */}
      <div className="relative border-b border-line bg-surface">
      <div className="marquee overflow-hidden py-4" role="region" aria-label="Why clients choose Shiel" tabIndex={0}>
        <ul className="marquee-track">
          {[...strip, ...strip].map((s, i) => (
            <li key={i} aria-hidden={i >= strip.length} className="flex items-center gap-4 px-5 font-display text-[0.95rem] font-semibold whitespace-nowrap text-ink-2">
              <span className="size-1.5 rounded-full bg-brand-bright" aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>
      </div>
        <span aria-hidden="true" className="marquee-hint pointer-events-none absolute top-1/2 right-3 size-8 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface/80 text-muted shadow-sm backdrop-blur">
          <ChevronRight className="size-4" />
        </span>
      </div>

      {/* Services */}
      <Section>
        <SectionHead
          title="Services We Offer"
          lead="Compliance, day-to-day finance, decision support and cross-border work tend to affect each other, so one accountant looks after all of it."
          action={<ArrowLink href="/services">All services</ArrowLink>}
        />
        <ServiceExplorer
          fromLabel={`Included in plans from ${proof.fromIE} a month in Ireland, ${proof.fromUK} in the UK and ${proof.fromGI} in Gibraltar.`}
          services={services.map((s) => ({ slug: s.slug, name: s.name, short: s.short, icon: s.icon, card: s.card, scope: s.scope.slice(0, 4).map((x) => x.title) }))}
        />
      </Section>

      {/* Pricing tool */}
      <Section tone="muted" label="Prices">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="reveal">
            <h2 className="text-[clamp(1.85rem,5.5vw,3rem)]">
              Our Prices
            </h2>
            <p className="mt-3 text-muted sm:mt-4 sm:text-lg">
              Every plan is published with its price, what it includes and the limits that keep it fair. Choose your country and how you trade to see where you would start. The fee is agreed in writing before any work begins.
            </p>
            <ul className="mt-6 hidden gap-3 sm:grid">
              {promises.map((p) => (
                <li key={p.title} className="flex gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-clay" aria-hidden="true" />
                  <span>
                    <strong className="font-display">{p.title}.</strong> <span className="text-muted">{p.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <PriceTeaser data={teaserData()} />
        </div>
      </Section>

      {/* Results */}
      <Section tone="band" label="Client results">
        <SectionHead title="Client Results" lead="A few examples of what a careful review, a correction or a well-timed intervention has meant for clients." />
        {/* Phones get swipeable text cards; desktop shows the client result graphics. */}
        <div className="rail lg:hidden" role="region" aria-label="Client results, swipe for more" tabIndex={0}>
          {results.map((r) => (
            <article key={r.text} className="relative flex flex-col overflow-hidden rounded-[var(--radius)] border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-mint/60 to-transparent" aria-hidden="true" />
              <div>
                <p className="font-display text-[clamp(1.9rem,2.6vw,2.25rem)] font-extrabold tracking-tight whitespace-nowrap text-mint">{r.figure}</p>
                <p className="mt-1 text-sm font-semibold text-on-band-muted">{r.label}</p>
              </div>
              <p className="mt-4 text-on-band/85">{r.text}</p>
            </article>
          ))}
        </div>
        <ul className="hidden max-w-5xl grid-cols-4 gap-5 lg:grid">
          {results.map((r) => (
            <li key={r.text} className="reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.image} alt={r.text} width={480} height={600} loading="lazy" decoding="async" className="w-full rounded-2xl border border-white/10 shadow-lift transition duration-300 hover:-translate-y-1" />
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-on-band-muted">Outcomes depend on each client’s circumstances and the rules that apply to them. These are not a promise or a typical result.</p>
      </Section>

      {/* Countries */}
      <Section tone="muted" label="Countries">
        <SectionHead title="Countries We Serve" lead="The filings and terminology differ in each country. The process behind them stays the same: current books, reviewed figures and every deadline in view." action={<ArrowLink href="/countries">Compare countries</ArrowLink>} />
        <ul className="grid gap-3 md:grid-cols-3">
          {countries.map((c) => (
            <li key={c.key} className="reveal">
              <Link href={`/countries/${c.key}`} className="card card-hover group flex h-full items-center gap-4 p-5 md:flex-col md:items-start md:p-6">
                <span className="flex-1">
                  <span className="block font-display text-xl font-semibold md:mt-2 md:text-2xl">{c.name}</span>
                  <span className="block text-sm text-muted md:text-base">
                    {c.authorities[0]} and {c.authorities[1]}
                  </span>
                </span>
                <span className="text-right md:mt-4 md:flex md:w-full md:items-baseline md:gap-1.5 md:border-t md:border-line md:pt-4 md:text-left">
                  <span className="block text-xs text-muted md:text-sm">From</span>
                  <span className="font-display text-xl font-bold md:text-2xl">
                    {countryMeta[c.key].symbol}
                    {fromPrice(c.key)}
                  </span>
                  <span className="hidden text-sm text-muted md:inline"> a month</span>
                  <ArrowUpRight className="ml-auto hidden size-5 self-center text-muted transition group-hover:text-ink md:block" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Audiences */}
      <Section tone="band" label="Who we work with">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="reveal">
            <h2 className="text-[clamp(1.85rem,5.5vw,3rem)]">
              Who We <Rich text="*Work With*" />
            </h2>
            <p className="mt-4 text-lg text-on-band/80">Six kinds of business, each with its own plans and prices.</p>
            <ArrowLink href="/who-we-help" className="mt-6 hidden text-mint lg:inline-flex">
              Everyone we help
            </ArrowLink>
          </div>
          <AudiencePicker items={audiences.map((a) => ({ slug: a.slug, me: a.me, card: a.card, worry: a.worries[0].say, from: `${countryMeta.ireland.symbol}${fromPrice('ireland', a.segment)}` }))} />
        </div>
      </Section>

      {/* Tools */}
      <Section tone="muted" label="Free tools">
        <SectionHead title="Free Tools" lead="Quick answers with the workings shown and a link to the official source." />
        <ul className="rail md:mx-0 md:grid md:grid-flow-row md:grid-cols-3 md:overflow-visible md:px-0" role="region" aria-label="Free tools, swipe for more" tabIndex={0}>
          {tools.map((t) => {
            const Icon = toolIcons[t.slug as keyof typeof toolIcons];
            return (
              <li key={t.slug} className="w-[68vw] max-w-[16rem] shrink-0 md:w-auto md:max-w-none">
                <Link href={`/tools/${t.slug}`} className="card card-hover group flex h-full flex-col p-5">
                  <span className="grid size-11 place-items-center rounded-2xl bg-brand-pale text-brand-ink">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg">{t.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted">{toolLines[t.slug as keyof typeof toolLines]}</p>
                  <span className="link-arrow mt-4 text-sm">
                    Open <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal">
            <h2 className="text-[clamp(1.85rem,5.5vw,3rem)]">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-muted">If yours is not here, send it to us on WhatsApp and your accountant will answer it directly.</p>
            <ArrowLink href="/faq" className="mt-6">
              More answers
            </ArrowLink>
          </div>
          <FaqList faqs={homeFaqs} />
        </div>
      </Section>

      <ClientPanel title="Get in Touch" />
      <p className="sr-only">Last updated {site.updatedLabel}</p>
    </>
  );
}
