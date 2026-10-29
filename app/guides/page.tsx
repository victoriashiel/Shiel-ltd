import Link from 'next/link';
import { ClientPanel, PageHero } from '@/components/ui/hero';
import { JsonLd, Section } from '@/components/ui/primitives';
import { guides } from '@/lib/guides';
import { pageMeta, webPageLd } from '@/lib/seo';

const title = 'Accounting & Tax Guides | Shiel Accountants';
const description = 'Plain-English guides to corporation tax rates, filing deadlines, VAT thresholds and switching accountant in Ireland, the UK and Gibraltar.';
export const metadata = pageMeta({ title, description, path: '/guides', absoluteTitle: true });

export default function Page() {
  return (
    <>
      <JsonLd data={webPageLd({ path: '/guides', name: title, description, type: 'CollectionPage' })} />
      <PageHero
        trail={[{ name: 'Home', path: '/' }, { name: 'Guides', path: '/guides' }]}
        headline="Plain-English *guides*"
        answer="Short guides to the rates, deadlines and decisions that come up most for business owners in Ireland, the UK and Gibraltar, each answering the question first and linking to the official sources."
        primary={null}
      />
      <Section>
        <ul className="grid gap-4 md:grid-cols-2">
          {guides.map((g) => (
            <li key={g.slug} className="reveal">
              <Link href={`/guides/${g.slug}`} className="card card-hover flex h-full flex-col p-7">
                <span className="chip self-start text-xs">{g.topic}</span>
                <h2 className="mt-5 text-2xl">{g.title}</h2>
                <p className="mt-2 flex-1 text-muted">{g.description}</p>
                <span className="mt-6 flex items-center justify-between text-sm text-muted">
                  {g.readMinutes} minute read
                  <span className="link-arrow">Read <span aria-hidden="true">→</span></span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <ClientPanel />
    </>
  );
}
