import Link from 'next/link';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { ServiceFinder } from '@/components/tools/service-finder';
import { ClientPanel, PageHero } from '@/components/ui/hero';
import { Button, FaqList, JsonLd, Section, SectionHead, Steps, serviceIcons } from '@/components/ui/primitives';
import { services } from '@/lib/content';
import { pageMeta, webPageLd } from '@/lib/seo';
import { proof } from '@/lib/site';

const title = 'Accounting Services in Ireland, UK & Gibraltar | Shiel';
const description = 'Accounts, tax, bookkeeping, payroll, advisory, company formation and cross-border work in Ireland, the UK and Gibraltar, from one accountant on a fixed fee.';
export const metadata = pageMeta({ title, description, path: '/services', absoluteTitle: true });

const from = `Included in plans from ${proof.fromIE} a month in Ireland, ${proof.fromUK} in the UK and ${proof.fromGI} in Gibraltar.`;

const start = [
  { title: 'Tell us what you need', text: 'Send a short message on WhatsApp or through the enquiry form with how the business runs and what is coming up.' },
  { title: 'Get a fixed price', text: 'We recommend a package or quote a one-off job, and the fee and scope are agreed in writing before anything starts.' },
  { title: 'We handle the switch', text: 'If you already have an accountant, we contact them and collect your records. Switching to Shiel is free.' },
  { title: 'Meet your accountant', text: 'One named accountant looks after every service you use, and you can message them directly all year.' },
];

const faqs = [
  { q: 'Can I use just one service?', a: 'Yes. Most clients take a monthly package that covers bookkeeping, tax and year-end accounts together, but we also quote one-off jobs such as a single tax return, a set of late accounts or a company formation.' },
  { q: 'Will one accountant really handle everything?', a: 'Yes. Your named accountant looks after your accounts, tax, payroll and filings, and brings in a colleague with the right specialism when a question needs it, so you never have to explain your business twice.' },
  { q: 'How much do your services cost?', a: `Monthly packages start at ${proof.fromIE} in Ireland, ${proof.fromUK} in the UK and ${proof.fromGI} in Gibraltar. Every package has a published price and clear limits, and the fee is agreed in writing before work begins.` },
  { q: 'Do you work with businesses outside Ireland, the UK and Gibraltar?', a: 'Our core markets are Ireland, the UK and Gibraltar. If you have income, a company or directors in another country as well, our international accounting service keeps the records consistent and works with your local advisers.' },
  { q: 'How do I switch from my current accountant?', a: 'Tell us who they are and we handle the handover, including collecting your records and any professional clearance. There is no charge for switching.' },
];

export default function Page() {
  return (
    <>
      <JsonLd data={webPageLd({ path: '/services', name: title, description, type: 'CollectionPage' })} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, description: s.card, url: `https://www.shiel.ltd/${s.slug}` })),
        }}
      />
      <PageHero
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
        headline="Every accounting service, *one fixed fee*"
        answer="Year-end accounts, tax returns, bookkeeping, payroll, advice, company formation and cross-border work for businesses in Ireland, the UK and Gibraltar. One named accountant looks after all of it, and the price is agreed before we start."
        primary={{ href: '/packages', label: 'View packages' }}
        secondary={{ href: '/contact', label: 'Talk to an accountant' }}
        aside={<ServiceFinder services={services.map((s) => ({ slug: s.slug, name: s.name, card: s.card }))} from={from} />}
      >
        <ul className="lift lift-3 mt-8 hidden flex-wrap gap-x-5 gap-y-2 text-sm text-on-band-muted sm:flex">
          {['Free switching', 'WhatsApp support', 'Answers within 24 hours'].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check className="size-4 text-mint" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </PageHero>

      <Section>
        <SectionHead title="Services We Offer" lead={from} />
        <ul className="grid gap-3 md:grid-cols-2 md:gap-4">
          {services.map((s) => {
            const Icon = serviceIcons[s.icon];
            return (
              <li key={s.slug} className="reveal">
                <Link href={`/${s.slug}`} className="card card-hover group flex h-full flex-col p-4 sm:p-7">
                  <span className="flex items-start gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-pale text-brand-ink sm:size-12 sm:rounded-2xl">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-semibold sm:text-xl">{s.name}</span>
                      <span className="mt-0.5 block text-sm text-muted sm:mt-1 sm:text-base">{s.card}</span>
                    </span>
                  </span>
                  <span className="mt-5 hidden flex-1 content-start gap-2 border-t border-line pt-5 sm:grid sm:grid-cols-2">
                    {s.scope.slice(0, 4).map((x) => (
                      <span key={x.title} className="flex items-center gap-2 text-sm">
                        <Check className="size-4 shrink-0 text-brand-bright" aria-hidden="true" />
                        {x.title}
                      </span>
                    ))}
                  </span>
                  <span className="link-arrow mt-6 hidden text-sm sm:inline-flex">
                    More about {s.short.toLowerCase()} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            );
          })}
          <li className="reveal">
            <div className="band grain relative flex h-full flex-col overflow-hidden rounded-[var(--radius)] p-6 sm:p-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-mint">
                <MessageCircle className="size-6" aria-hidden="true" />
              </span>
              <span className="mt-4 font-display text-xl font-semibold">Not sure what you need?</span>
              <p className="mt-1 flex-1 text-on-band/80">Tell us how the business runs and what is due next. Your accountant will point you to the right package or quote the job, with an answer within 24 hours.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/contact" size="sm">Talk to an accountant</Button>
                <Link href="/packages" className="inline-flex items-center gap-1.5 text-sm font-semibold text-mint">
                  Compare packages <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </Section>

      <Section tone="muted" label="Getting started">
        <SectionHead title="How Getting Started Works" lead="Four simple steps, and nothing changes for you until the fee and scope are agreed in writing." />
        <Steps steps={start} />
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-[clamp(1.85rem,5.5vw,3rem)]">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-muted">If your question is not here, send it on WhatsApp and your accountant will answer it directly.</p>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </Section>

      <ClientPanel />
    </>
  );
}
