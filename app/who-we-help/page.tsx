import Link from 'next/link';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { AudiencePicker } from '@/components/tools/audience-picker';
import { ClientPanel, PageHero } from '@/components/ui/hero';
import { Button, FaqList, JsonLd, Section, SectionHead } from '@/components/ui/primitives';
import { audiences } from '@/lib/content';
import { countryMeta, fromPrice } from '@/lib/packages';
import { pageMeta, webPageLd } from '@/lib/seo';
import { whatsappLink } from '@/lib/site';

const title = 'Who We Help | Shiel Accountants';
const description = 'Accounting for limited companies, sole traders, contractors, e-commerce sellers, non-resident directors and start-ups in Ireland, the UK and Gibraltar.';
export const metadata = pageMeta({ title, description, path: '/who-we-help', absoluteTitle: true });

const ie = countryMeta.ireland.symbol;
const uk = countryMeta['united-kingdom'].symbol;

const faqs = [
  { q: 'What if my business fits more than one of these?', a: 'That is common, for example a contractor who also sells online, or a director who has moved abroad. Your accountant looks at the whole picture and recommends one plan, with anything extra priced in writing.' },
  { q: 'What if I am not on the list?', a: 'Send a short message about how the business runs. If we are not the right fit we will say so, and if we are, you get a fixed quote within 24 hours.' },
  { q: 'Do you work outside Ireland, the UK and Gibraltar?', a: 'Our clients are registered in Ireland, the UK or Gibraltar, but many of them live, sell or work elsewhere. We coordinate with advisers in other countries where that is needed.' },
  { q: 'Can I change plan as the business changes?', a: 'Yes. Plans move with you, from pre-trade to trading, sole trader to limited company, or one sales channel to several. We tell you when a change would make sense.' },
];

export default function Page() {
  return (
    <>
      <JsonLd data={webPageLd({ path: '/who-we-help', name: title, description, type: 'CollectionPage' })} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: audiences.map((a, i) => ({ '@type': 'ListItem', position: i + 1, name: a.name, description: a.card, url: `https://www.shiel.ltd/who-we-help/${a.slug}` })),
        }}
      />
      <PageHero
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Who we help', path: '/who-we-help' },
        ]}
        headline="Accountants for *the way you work*"
        answer="Limited companies, sole traders, contractors, online sellers, directors living abroad and new companies in Ireland, the UK and Gibraltar. Pick the one closest to you to see what we handle and what it costs."
        primary={null}
        aside={
          <AudiencePicker
            items={audiences.map((a) => ({ slug: a.slug, me: a.me, card: a.card, worry: a.worries[0].say, from: `${ie}${fromPrice('ireland', a.segment)}` }))}
          />
        }
      />

      <Section>
        <SectionHead title="Find *your* page" lead="Each page starts with the problems people like you bring to us, then shows how we deal with them and what it costs." />
        <ul className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {audiences.map((a) => (
            <li key={a.slug} className="reveal">
              <Link href={`/who-we-help/${a.slug}`} className="card card-hover group flex h-full flex-col p-4 sm:p-6">
                <span className="flex items-start justify-between gap-4">
                  <span>
                    <span className="block text-sm font-semibold text-brand-ink">{a.me}</span>
                    <h2 className="mt-1 text-xl sm:text-2xl">{a.name}</h2>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" aria-hidden="true" />
                </span>
                <p className="mt-4 hidden flex-1 font-display text-lg leading-snug text-ink/80 sm:block">“{a.worries[0].say}”</p>
                <p className="mt-3 text-sm text-muted sm:mt-6 sm:border-t sm:border-line sm:pt-4">
                  From <strong className="font-display text-base text-ink">{ie}{fromPrice('ireland', a.segment)}</strong> in Ireland or{' '}
                  <strong className="font-display text-base text-ink">{uk}{fromPrice('united-kingdom', a.segment)}</strong> in the UK
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="reveal band grain relative mt-4 flex flex-col gap-5 overflow-hidden rounded-[var(--radius)] p-6 sm:flex-row sm:items-center sm:p-8">
          <MessageCircle className="size-8 shrink-0 text-mint" aria-hidden="true" />
          <div className="flex-1">
            <p className="font-display text-xl font-semibold text-white">Not on the list, or a bit of everything?</p>
            <p className="mt-1 text-on-band/80">Tell us how the business runs and an accountant will come back with a fixed quote within 24 hours.</p>
          </div>
          <Button href={whatsappLink('Hi Shiel, I’d like to check whether you can help with my business.')} variant="whatsapp" icon="whatsapp">
            Message us
          </Button>
        </div>
      </Section>

      <Section tone="muted" label="Questions">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-[clamp(1.85rem,5.5vw,3rem)]">Frequently Asked Questions</h2>
          <FaqList faqs={faqs} />
        </div>
      </Section>

      <ClientPanel />
    </>
  );
}
