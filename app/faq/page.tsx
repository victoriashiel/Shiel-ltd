import { FaqHub, type HubFaq } from '@/components/tools/faq-hub';
import { ClientPanel, PageHero } from '@/components/ui/hero';
import { JsonLd, Section } from '@/components/ui/primitives';
import { audiences, countries, homeFaqs, pricingFaqs, services } from '@/lib/content';
import { guides } from '@/lib/guides';
import { faqLd, pageMeta, webPageLd } from '@/lib/seo';

const title = 'Frequently Asked Questions | Shiel Accountants';
const description = 'Search every answer about pricing, switching accountant, services, deadlines, VAT and working across Ireland, the UK and Gibraltar with Shiel Accountants.';
export const metadata = pageMeta({ title, description, path: '/faq', absoluteTitle: true });

// Every FAQ on the site, grouped by topic and linked back to the page it comes from.
const topics = ['Popular', 'Pricing', 'Services', 'Who we help', 'Countries', 'Tax rules'];
const all: HubFaq[] = [
  ...homeFaqs.map((f) => ({ ...f, topic: 'Popular' })),
  ...pricingFaqs.map((f) => ({ ...f, topic: 'Pricing', href: '/packages', from: 'pricing' })),
  ...services.flatMap((s) => s.faqs.map((f) => ({ ...f, topic: 'Services', href: `/${s.slug}`, from: s.name.toLowerCase() }))),
  ...audiences.flatMap((a) => a.faqs.map((f) => ({ ...f, topic: 'Who we help', href: `/who-we-help/${a.slug}`, from: a.name.toLowerCase() }))),
  ...countries.flatMap((c) => c.faqs.map((f) => ({ ...f, topic: 'Countries', href: `/countries/${c.key}`, from: c.name }))),
  ...guides.flatMap((g) => g.faqs.map((f) => ({ ...f, topic: 'Tax rules', href: `/guides/${g.slug}`, from: 'the guide' }))),
];
// The same question can appear on more than one page; keep the first.
const faqs = all.filter((f, i) => all.findIndex((x) => x.q === f.q) === i);

export default function Page() {
  return (
    <>
      <JsonLd data={webPageLd({ path: '/faq', name: title, description })} />
      <JsonLd data={faqLd(faqs)} />
      <PageHero
        trail={[{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }]}
        headline="Ask us *anything*"
        answer={`${faqs.length} answers about prices, switching, deadlines, VAT and working across Ireland, the UK and Gibraltar. Search them, or ask your accountant directly.`}
        primary={{ href: '/contact', label: 'Ask your own question' }}
      />
      <Section className="!pt-6 sm:!pt-10">
        <FaqHub faqs={faqs} topics={topics} />
      </Section>
      <ClientPanel />
    </>
  );
}
