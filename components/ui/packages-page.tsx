import Link from 'next/link';
import { BellRing, CalendarClock, MessageCircle, Plus, Repeat, ShieldCheck, UserRound } from 'lucide-react';
import { PriceBuilder } from '@/components/tools/price-builder';
import { ClientPanel, PageHero } from './hero';
import { FaqList, JsonLd, Section, SectionHead } from './primitives';
import { addOns, countryKeys, extras, countryMeta, explorerData, fromPrice, monthlyPlans, segmentKeys, segmentMeta, setupPlan, type CountryKey, type SegmentKey } from '@/lib/packages';
import { absolute, whatsappLink } from '@/lib/site';
import { orgId, webPageLd } from '@/lib/seo';
import type { FAQ } from '@/lib/content';

const included = [
  { icon: UserRound, title: 'Named accountant', text: 'One person who knows your business.' },
  { icon: MessageCircle, title: 'WhatsApp access', text: 'Answers within one business day.' },
  { icon: BellRing, title: 'Deadline reminders', text: 'Every date tracked for you.' },
  { icon: CalendarClock, title: 'Yearly tax review', text: 'A planning check before year-end.' },
  { icon: Repeat, title: 'Free switching', text: 'We handle the handover.' },
  { icon: ShieldCheck, title: 'No lock-in', text: 'Monthly, with 30 days’ notice.' },
];

const pricingFaqs: FAQ[] = [
  { q: 'Are there any setup or switching fees?', a: 'No. Moving from your current accountant is free. One-off setup plans exist only for people registering a new business, and they are optional.' },
  { q: 'What happens if I go over my plan limits?', a: 'Small, occasional overages do not force a plan change. If you are consistently above the limits, we review the plan with you each quarter, and extra transactions are a published add-on.' },
  { q: 'Is there a minimum contract?', a: 'Plans run monthly with 30 days’ notice, so you are never locked in.' },
  { q: 'Do prices include VAT?', a: 'Prices for Ireland and the UK exclude VAT where it applies. Gibraltar prices exclude government filing fees and third-party charges unless stated.' },
];

export function PackagesPage({ country, segment, path, trail, headline, answer, title, description }: { country?: CountryKey; segment?: SegmentKey; path: string; trail: { name: string; path: string }[]; headline: string; answer: string; title: string; description: string }) {
  const c = country ?? 'ireland';
  const s = segment ?? 'limited-company';
  const offerCountries = country ? [country] : countryKeys;
  const offerSegments = segment ? [segment] : segmentKeys;

  const catalog = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: title,
    url: absolute(path),
    itemListElement: offerCountries.flatMap((ck) =>
      offerSegments.flatMap((sk) =>
        [...monthlyPlans(ck, sk), ...(setupPlan(ck, sk) ? [setupPlan(ck, sk)!] : [])].map((p) => ({
          '@type': 'Offer',
          name: `${p.name} (${countryMeta[ck].label})`,
          description: p.strap,
          price: p.price,
          priceCurrency: countryMeta[ck].currency,
          ...(p.billing === 'one-off' ? {} : { priceSpecification: { '@type': 'UnitPriceSpecification', price: p.price, priceCurrency: countryMeta[ck].currency, unitCode: 'MON', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' } } }),
          areaServed: { '@type': 'Country', name: countryMeta[ck].label },
          seller: { '@id': orgId },
          itemOffered: { '@type': 'Service', name: `${segmentMeta[sk].label} accounting`, provider: { '@id': orgId } },
        })),
      ),
    ),
  };

  return (
    <>
      <JsonLd data={webPageLd({ path, name: title, description })} />
      <JsonLd data={catalog} />
      <PageHero
        trail={trail}
        headline={headline}
        answer={answer}
        chips={['No lock-in', 'Free switching', 'Fee fixed in writing']}
        primary={{ href: '#price', label: 'Build your price' }}
        secondary={{ href: whatsappLink('Hi Shiel, I have a question about your prices.'), label: 'Ask about pricing' }}
      />

      <Section id="price" label="Build your price" className="scroll-mt-16">
        <SectionHead title="Build your *price*" lead="Pick where you are and how you trade, choose a plan and add any extras. The total updates as you go." />
        <PriceBuilder data={explorerData()} extras={extras} initialCountry={c} initialSegment={s} syncUrl={!!segment || !!country} />
      </Section>

      <Section tone="muted" label="Every plan">
        <SectionHead title="Every plan *includes*" />
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {included.map((x) => (
            <li key={x.title} className="reveal card p-4 sm:p-5">
              <x.icon className="size-6 text-brand-bright" aria-hidden="true" />
              <p className="mt-3 font-display font-semibold">{x.title}</p>
              <p className="mt-0.5 text-sm text-muted">{x.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Other fees">
        <SectionHead title="Other *fees*" lead="One-off and occasional work, priced up front. Anything unusual is quoted before we start." />
        <AddOns country={c} />
        {!country && <p className="mt-4 text-sm text-muted">Showing Irish fees. UK and Gibraltar use the same amounts in pounds.</p>}
      </Section>

      <Section tone="muted" label="Questions">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-[clamp(1.85rem,5.5vw,3rem)]">Frequently Asked Questions</h2>
          <FaqList faqs={pricingFaqs} />
        </div>
      </Section>

      {!segment && (
        <Section label="All price pages">
          <h2 className="text-2xl">Prices by country</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {(country ? [country] : countryKeys).map((ck) => (
              <div key={ck}>
                <Link href={`/packages/${ck}`} className="font-display font-semibold hover:underline">
                  {countryMeta[ck].label}, from {countryMeta[ck].symbol}
                  {fromPrice(ck)}
                </Link>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {segmentKeys.map((sk) => (
                    <li key={sk}>
                      <Link href={`/packages/${ck}/${sk}`} className="chip text-sm transition hover:border-line-strong hover:text-ink">
                        {segmentMeta[sk].label} {countryMeta[ck].symbol}
                        {fromPrice(ck, sk)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      <ClientPanel text="Tell us how the business runs and we will point you to the closest fit before you commit. If a different plan suits you better later, we will say so." />
    </>
  );
}

function AddOns({ country }: { country: CountryKey }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {addOns(country).map((g) => (
        <details key={g.group} className="acc rounded-2xl border border-line bg-surface">
          <summary className="flex items-center justify-between px-5 py-4 font-display font-semibold">
            {g.group}
            <Plus className="acc-icon size-4" aria-hidden="true" />
          </summary>
          <dl className="px-5 pb-4">
            {g.items.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-t border-line py-3 text-sm">
                <dt className="text-muted">{k}</dt>
                <dd className="text-right font-semibold whitespace-nowrap">{v}</dd>
              </div>
            ))}
          </dl>
        </details>
      ))}
    </div>
  );
}
