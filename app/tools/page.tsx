import Link from 'next/link';
import { ArrowRight, BookOpen, Calculator, CalendarClock, Receipt } from 'lucide-react';
import { ClientPanel, PageHero } from '@/components/ui/hero';
import { JsonLd, Section, SectionHead } from '@/components/ui/primitives';
import { guideBySlug } from '@/lib/guides';
import { tools } from '@/lib/routes';
import { pageMeta, webPageLd } from '@/lib/seo';
import { absolute } from '@/lib/site';

const title = 'Free Accounting Tools: Tax, Deadlines & VAT | Shiel';
const description = 'Free calculators for corporation tax, company filing deadlines and VAT registration thresholds in Ireland, the UK and Gibraltar, with the workings shown.';
export const metadata = pageMeta({ title, description, path: '/tools', absoluteTitle: true });

// Each tool, phrased as the question a visitor arrives with.
const asks: Record<string, { q: string; icon: typeof Calculator }> = {
  'corporation-tax-calculator': { q: 'How much corporation tax will my company pay?', icon: Calculator },
  'filing-deadlines': { q: 'When are my company’s deadlines?', icon: CalendarClock },
  'vat-threshold-checker': { q: 'Do I need to register for VAT?', icon: Receipt },
};

export default function Page() {
  return (
    <>
      <JsonLd data={webPageLd({ path: '/tools', name: title, description, type: 'CollectionPage' })} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: tools.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, description: t.description, url: absolute(`/tools/${t.slug}`) })),
        }}
      />
      <PageHero
        trail={[{ name: 'Home', path: '/' }, { name: 'Tools', path: '/tools' }]}
        headline="Free tools, *instant answers*"
        answer="Corporation tax, filing deadlines and VAT registration for Ireland, the UK and Gibraltar. Each one shows its workings and links to the official source."
        primary={null}
        aside={
          <div className="min-w-0 rounded-[1.75rem] border border-white/12 bg-white/[0.06] p-4 shadow-2xl backdrop-blur-xl sm:p-5">
            <p className="px-1 font-display text-lg font-semibold">What do you want to know?</p>
            <ul className="mt-3 grid gap-2">
              {tools.map((t) => {
                const a = asks[t.slug];
                return (
                  <li key={t.slug}>
                    <Link href={`/tools/${t.slug}`} className="group flex items-center gap-4 rounded-2xl bg-black/20 p-4 transition hover:bg-black/30 active:scale-[0.99]">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mint/15 text-mint">
                        <a.icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display font-semibold text-white">{a.q}</span>
                        <span className="block text-xs text-on-band-muted">{t.name} · under a minute</span>
                      </span>
                      <ArrowRight className="size-4 shrink-0 text-on-band-muted transition group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        }
      />

      <Section label="Guides">
        <SectionHead title="The guides *behind the numbers*" lead="Each tool gives you a figure. These explain the rules that produce it, with worked examples and official sources." />
        <ul className="grid gap-3 md:grid-cols-2">
          {tools.flatMap((t) => t.guides).map((slug) => {
            const g = guideBySlug[slug];
            return (
              <li key={slug} className="reveal">
                <Link href={`/guides/${slug}`} className="card card-hover group flex h-full items-center gap-4 p-4 sm:p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-pale text-brand-ink">
                    <BookOpen className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display font-semibold">{g.title}</span>
                    <span className="block text-sm text-muted">
                      {g.topic} · {g.readMinutes} minute read
                    </span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-ink" aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>
        <Link href="/guides" className="link-arrow mt-6 inline-flex text-sm">
          All guides <span aria-hidden="true">→</span>
        </Link>
      </Section>

      <ClientPanel title="Want the *real figure*?" text="The tools give a good estimate. Send us your numbers and your accountant will work out the exact position, with the fee agreed before anything starts." />
    </>
  );
}
