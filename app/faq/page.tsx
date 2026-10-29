import { ClientPanel, PageHero } from '@/components/ui/hero';
import { Container, FaqList, JsonLd } from '@/components/ui/primitives';
import { audiences, countries, homeFaqs, services } from '@/lib/content';
import { faqLd, pageMeta, webPageLd } from '@/lib/seo';

const title = 'Frequently Asked Questions | Shiel Accountants';
const description = 'Answers about pricing, switching accountant, what is included, deadlines and working across Ireland, the UK and Gibraltar with Shiel Accountants.';
export const metadata = pageMeta({ title, description, path: '/faq', absoluteTitle: true });

const groups = [
  { title: 'Getting Started', faqs: homeFaqs },
  { title: 'Services', faqs: services.flatMap((s) => s.faqs.slice(0, 1)) },
  { title: 'Who We Work With', faqs: audiences.flatMap((a) => a.faqs.slice(0, 1)) },
  { title: 'Countries', faqs: countries.flatMap((c) => c.faqs.slice(0, 2)) },
];

export default function Page() {
  const all = groups.flatMap((g) => g.faqs);
  const unique = [...new Map(all.map((f) => [f.q, f])).values()];
  return (
    <>
      <JsonLd data={webPageLd({ path: '/faq', name: title, description })} />
      <JsonLd data={faqLd(unique)} />
      <PageHero
        trail={[{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }]}
        headline="Questions, *answered first*"
        answer="The questions business owners ask us most often, about prices, switching, what is included and working across more than one country. Every answer starts with the short version."
        primary={{ href: '/contact', label: 'Ask your own question' }}
      />
      <Container className="grid gap-14 py-14 sm:py-20">
        {groups.map((g) => {
          const seen = new Set<string>();
          const faqs = g.faqs.filter((f) => !seen.has(f.q) && seen.add(f.q));
          return (
            <section key={g.title} aria-labelledby={`faq-${g.title.toLowerCase().replace(/\s+/g, "-")}`}>
              <h2 id={`faq-${g.title.toLowerCase().replace(/\s+/g, "-")}`} className="mb-6 text-[clamp(1.6rem,4.5vw,2.4rem)]">
                {g.title}
              </h2>
              <FaqList faqs={faqs} schema={false} />
            </section>
          );
        })}
      </Container>
      <ClientPanel />
    </>
  );
}
