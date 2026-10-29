import Link from 'next/link';
import { MessageCircle, Send, Sparkles } from 'lucide-react';
import { FitChecker } from '@/components/tools/fit-checker';
import { PlanPicker } from '@/components/tools/plan-picker';
import { WorryCards } from '@/components/tools/worry-cards';
import { PageHero } from '@/components/ui/hero';
import { ServiceCards, Updated } from '@/components/ui/parts';
import { Button, FaqList, JsonLd, Section, SectionHead } from '@/components/ui/primitives';
import { audienceBySlug, audiences, countries, results } from '@/lib/content';
import { countryMeta, fromPrice, monthlyPlans, setupPlan } from '@/lib/packages';
import { pageMeta, serviceLd, webPageLd } from '@/lib/seo';
import { whatsappLink } from '@/lib/site';

export const dynamicParams = false;
export const generateStaticParams = () => audiences.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const a = audienceBySlug[(await params).slug];
  return pageMeta({ title: a.title, description: a.description, path: `/who-we-help/${a.slug}`, absoluteTitle: true });
}

const next = [
  { icon: MessageCircle, when: 'Today', title: 'Tell us about the business', text: 'A few lines on WhatsApp or the enquiry form is enough.' },
  { icon: Send, when: 'Within 24 hours', title: 'Get a fixed price', text: 'Your plan and fee in writing, before anything starts.' },
  { icon: Sparkles, when: 'From then on', title: 'We take it from here', text: 'We collect your records from any previous accountant, free of charge.' },
];

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const a = audienceBySlug[(await params).slug];
  const path = `/who-we-help/${a.slug}`;
  const prices = countries.map((c) => {
    const setup = setupPlan(c.key, a.segment);
    return {
      key: c.key,
      name: c.name,
      symbol: countryMeta[c.key].symbol,
      plans: monthlyPlans(c.key, a.segment).map(({ name, strap, price, popular, features }) => ({ name, strap, price, popular, features })),
      setup: setup && { name: setup.name, price: setup.price },
    };
  });
  const priceLine = countries.map((c) => `${countryMeta[c.key].symbol}${fromPrice(c.key, a.segment)} in ${c.name === 'United Kingdom' ? 'the UK' : c.name}`).join(', ');
  const faqs = [{ q: `How much does an accountant for ${a.name.toLowerCase()} cost?`, a: `Our monthly plans start from ${priceLine}, with a fixed fee agreed in writing before any work begins. Switching from your current accountant is free.` }, ...a.faqs];
  const proof = results.find((r) => a.services.includes(r.service));
  const others = audiences.filter((x) => x.slug !== a.slug);

  return (
    <>
      <JsonLd
        data={serviceLd({
          path,
          name: `Accounting for ${a.name.toLowerCase()}`,
          description: a.description,
          offers: countries.map((c) => ({ name: `${a.name} plans in ${c.name}`, description: `Monthly plans from ${countryMeta[c.key].symbol}${fromPrice(c.key, a.segment)}.`, price: fromPrice(c.key, a.segment), currency: countryMeta[c.key].currency })),
        })}
      />
      <JsonLd data={webPageLd({ path, name: a.title, description: a.description })} />
      <PageHero
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Who we help', path: '/who-we-help' },
          { name: a.name, path },
        ]}
        headline={a.promise}
        answer={a.answer}
        chips={['Named accountant', 'WhatsApp access', 'Free switching']}
        primary={{ href: '#prices', label: 'See prices' }}
        secondary={{ href: whatsappLink(a.hello), label: 'Message an accountant' }}
        aside={<FitChecker items={a.fit} name={a.name} packagesHref="#prices" />}
      />

      <Section>
        <SectionHead title="Sound *familiar?*" lead="Tap the ones that sound like you to see how we deal with each." />
        <WorryCards worries={a.worries} hello={a.hello} />
      </Section>

      <Section tone="muted" label={a.year.title}>
        <SectionHead title={a.year.title} lead="What your accountant handles, and roughly when. You get a message whenever we need something from you." />
        <ol className="rail lg:mx-0 lg:grid lg:grid-flow-row lg:grid-cols-4 lg:overflow-visible lg:px-0" role="region" aria-label={`${a.year.title}, swipe for more`} tabIndex={0}>
          {a.year.beats.map((b, i) => (
            <li key={b.title} className="reveal relative w-[72vw] max-w-xs shrink-0 lg:w-auto lg:max-w-none">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-surface font-display font-bold text-brand-ink shadow-sm">{i + 1}</span>
                <span aria-hidden="true" className={`h-px flex-1 bg-gradient-to-r from-brand-bright/60 to-line-strong ${i === a.year.beats.length - 1 ? 'opacity-0' : ''}`} />
              </div>
              <p className="mt-4 text-sm font-semibold text-brand-ink">{b.when}</p>
              <h3 className="mt-1 text-xl">{b.title}</h3>
              <p className="mt-1.5 text-muted">{b.text}</p>
            </li>
          ))}
        </ol>
        {proof && (
          <figure className="reveal mt-6 flex sm:mt-10 flex-col gap-2 rounded-[var(--radius)] border border-line bg-surface p-6 sm:flex-row sm:items-center sm:gap-6">
            <p className="font-display text-3xl font-bold text-brand-ink sm:text-4xl">{proof.figure}</p>
            <figcaption className="text-muted">
              <span className="font-semibold text-ink">From a recent client: </span>
              {proof.text}
            </figcaption>
          </figure>
        )}
      </Section>

      <Section id="prices" label="Prices">
        <SectionHead title="Plans and *prices*" lead="Choose where your business is registered. Every plan has a fixed monthly fee and published limits." />
        <PlanPicker countries={prices} segment={a.segment} />
      </Section>

      <Section tone="band" label="Getting started">
        <SectionHead title="What happens *next*" />
        <ol className="grid gap-3 md:grid-cols-3">
          {next.map((s) => (
            <li key={s.title} className="reveal flex gap-4 rounded-[var(--radius)] border border-white/10 bg-white/[0.05] p-4 md:block md:p-6">
              <s.icon className="size-6 shrink-0 text-mint" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-mint md:mt-4">{s.when}</p>
                <h3 className="mt-0.5 text-lg text-white md:mt-1 md:text-xl">{s.title}</h3>
                <p className="mt-1 text-[0.95rem] text-on-band/80 md:mt-1.5 md:text-base">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={whatsappLink(a.hello)} variant="whatsapp" icon="whatsapp">
            Message an accountant
          </Button>
          <Button href="/contact" variant="secondary" icon="none">
            Use the enquiry form
          </Button>
        </div>
      </Section>

      <Section>
        <SectionHead title="Services you’ll *use*" />
        <ServiceCards slugs={a.services} />
      </Section>

      <Section tone="muted" label="Questions">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-[clamp(1.85rem,5.5vw,3rem)]">Frequently Asked Questions</h2>
            <div className="mt-6">
              <Updated />
            </div>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </Section>

      <Section label="Not quite you">
        <h2 className="text-2xl">Not quite you?</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/who-we-help/${o.slug}`} className="chip transition hover:border-line-strong hover:text-ink">
                {o.me}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

    </>
  );
}
