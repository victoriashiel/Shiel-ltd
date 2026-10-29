import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { KeyDates } from '@/components/tools/key-dates';
import { ServiceParts } from '@/components/tools/service-parts';
import { ClientPanel, PageHero } from '@/components/ui/hero';
import { GuideLinks } from '@/components/ui/guide-links';
import { FromPrices, GlanceCard, Updated } from '@/components/ui/parts';
import { ArrowLink, FaqList, JsonLd, Section, SectionHead, serviceIcons } from '@/components/ui/primitives';
import { audienceBySlug, countries, serviceBySlug, services, type Service } from '@/lib/content';
import { countryKeys, countryMeta, fromPrice } from '@/lib/packages';
import { pageMeta, serviceLd, webPageLd } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = serviceBySlug[slug];
  if (!page) return {};
  return pageMeta({ title: page.title, description: page.description, path: `/${slug}`, absoluteTitle: true });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!serviceBySlug[slug]) notFound();
  return <ServicePage s={serviceBySlug[slug]} />;
}

// Services where the country rates and filing dates are worth showing in full.
const withDates = ['accounts', 'tax'];

function ServicePage({ s }: { s: Service }) {
  const path = `/${s.slug}`;
  const related = services.filter((x) => x.slug !== s.slug);
  return (
    <>
      <JsonLd
        data={serviceLd({
          path,
          name: s.name,
          description: s.description,
          offers: countryKeys.map((c) => ({ name: `${s.name} in ${countryMeta[c].label}`, description: `Included in monthly packages from ${countryMeta[c].symbol}${fromPrice(c)}.`, price: fromPrice(c), currency: countryMeta[c].currency })),
        })}
      />
      <JsonLd data={webPageLd({ path, name: s.title, description: s.description })} />
      <PageHero
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: s.name, path },
        ]}
        headline={s.promise}
        answer={s.answer}
        primary={{ href: '/packages', label: 'View packages' }}
        secondary={{ href: '/contact', label: 'Talk to an accountant' }}
        aside={
          <GlanceCard
            title="Your part"
            items={s.yourPart}
            foot={<FromPrices />}
          />
        }
      />

      <Section label="Who does what">
        <SectionHead title="Who does *what*" lead="Tick off what you already have. Your accountant takes it from there and keeps you posted on WhatsApp." action={<ArrowLink href="/packages">Compare plans</ArrowLink>} />
        <ServiceParts needs={s.needs} scope={s.scope} service={s.name} />
        {s.questions && (
          <div className="mt-10">
            <h3 className="text-xl">Questions this helps you answer</h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {s.questions.map((q) => (
                <li key={q} className="reveal rounded-2xl rounded-bl-md bg-[#005c4b] px-4 py-2.5 text-white shadow-sm">
                  {q}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {withDates.includes(s.slug) && (
        <Section tone="muted" label="Key dates">
          <SectionHead title="Key dates and *rates*" lead="The headline figures for each country, every one linked to its official source." />
          <KeyDates countries={countries.map((c) => ({ key: c.key, name: c.name, facts: c.facts }))} />
        </Section>
      )}

      <Section tone={withDates.includes(s.slug) ? undefined : 'muted'}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-[clamp(1.85rem,5.5vw,3rem)]">Frequently Asked Questions</h2>
            <div className="mt-6">
              <Updated />
            </div>
          </div>
          <div>
            <FaqList faqs={s.faqs} />
            <GuideLinks slugs={s.guides} />
          </div>
        </div>
      </Section>

      <Section tone={withDates.includes(s.slug) ? 'muted' : undefined} label="Related">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl">Who this suits</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.audiences.map((slug) => (
                <li key={slug}>
                  <Link href={`/who-we-help/${slug}`} className="chip transition hover:border-line-strong hover:text-ink">
                    {audienceBySlug[slug].me}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl">Often used with</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {related.map((r) => {
                const Icon = serviceIcons[r.icon];
                return (
                  <li key={r.slug}>
                    <Link href={`/${r.slug}`} className="chip transition hover:border-line-strong hover:text-ink">
                      <Icon className="size-3.5 text-brand-ink" aria-hidden="true" />
                      {r.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Section>

      <ClientPanel />
    </>
  );
}
