import { GuideList } from '@/components/tools/guide-list';
import { ClientPanel, PageHero } from '@/components/ui/hero';
import { JsonLd, Section } from '@/components/ui/primitives';
import { guides } from '@/lib/guides';
import { pageMeta, webPageLd } from '@/lib/seo';
import { absolute } from '@/lib/site';

const title = 'Accounting & Tax Guides | Shiel Accountants';
const description = 'Plain-English guides to tax, deadlines, VAT, IR35, Making Tax Digital and company set-up in Ireland, the UK and Gibraltar, written by our accountants.';
export const metadata = pageMeta({ title, description, path: '/guides', absoluteTitle: true });

export default function Page() {
  return (
    <>
      <JsonLd data={webPageLd({ path: '/guides', name: title, description, type: 'CollectionPage' })} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: guides.map((g, i) => ({ '@type': 'ListItem', position: i + 1, name: g.title, url: absolute(`/guides/${g.slug}`) })),
        }}
      />
      <PageHero
        trail={[{ name: 'Home', path: '/' }, { name: 'Guides', path: '/guides' }]}
        headline="Plain-English *guides*"
        answer="Short guides to the rates, deadlines and rules that come up most for business owners in Ireland, the UK and Gibraltar. Each answers the question first and links to the official sources."
        primary={null}
      />
      <Section>
        <GuideList guides={guides.map(({ slug, title, description, topic, readMinutes }) => ({ slug, title, description, topic, readMinutes }))} />
      </Section>
      <ClientPanel />
    </>
  );
}
