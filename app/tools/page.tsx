import Link from 'next/link';
import { Calculator, CalendarClock, Receipt } from 'lucide-react';
import { ClientPanel, PageHero } from '@/components/ui/hero';
import { JsonLd, Section } from '@/components/ui/primitives';
import { tools } from '@/lib/routes';
import { pageMeta, webPageLd } from '@/lib/seo';

const title = 'Free Accounting Tools: Tax, Deadlines & VAT | Shiel';
const description = 'Free calculators for corporation tax, company filing deadlines and VAT registration thresholds in Ireland, the UK and Gibraltar, with the workings shown.';
export const metadata = pageMeta({ title, description, path: '/tools', absoluteTitle: true });
const icons = [Calculator, CalendarClock, Receipt];

export default function Page() {
  return (
    <>
      <JsonLd data={webPageLd({ path: '/tools', name: title, description, type: 'CollectionPage' })} />
      <PageHero
        trail={[{ name: 'Home', path: '/' }, { name: 'Tools', path: '/tools' }]}
        headline="Quick answers to *common questions*"
        answer="Three free tools for business owners in Ireland, the UK and Gibraltar: estimate your corporation tax, work out your filing deadlines from your year-end, and check whether you need to register for VAT. Each shows its workings and links to the official source."
        primary={null}
      />
      <Section>
        <ul className="grid gap-4 md:grid-cols-3">
          {tools.map((t, i) => {
            const Icon = icons[i];
            return (
              <li key={t.slug} className="reveal">
                <Link href={`/tools/${t.slug}`} className="card card-hover flex h-full flex-col p-7">
                  <span className="grid size-14 place-items-center rounded-2xl bg-brand-pale text-brand-ink">
                    <Icon className="size-7" aria-hidden="true" />
                  </span>
                  <h2 className="mt-6 text-2xl">{t.name}</h2>
                  <p className="mt-2 flex-1 text-muted">{t.description}</p>
                  <span className="link-arrow mt-6">Open <span aria-hidden="true">→</span></span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>
      <ClientPanel />
    </>
  );
}
