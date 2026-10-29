import { ClientPanel, PageHero } from '@/components/ui/hero';
import { Button, Container, FaqList, JsonLd, Sources } from '@/components/ui/primitives';
import { guideBySlug, guides, type Block } from '@/lib/guides';
import { pageMeta, orgId, webPageLd } from '@/lib/seo';
import { absolute, site } from '@/lib/site';

export const dynamicParams = false;
export const generateStaticParams = () => guides.map((g) => ({ slug: g.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const g = guideBySlug[(await params).slug];
  const meta = pageMeta({ title: g.title, description: g.description, path: `/guides/${g.slug}` });
  return { ...meta, openGraph: { ...meta.openGraph, type: 'article', publishedTime: g.published, modifiedTime: g.updated } };
}

const longDate = (d: string) => new Date(`${d}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

function Render({ b }: { b: Block }) {
  switch (b.type) {
    case 'p':
      return <p>{b.text}</p>;
    case 'h2':
      return <h2 id={b.id} className="scroll-mt-24">{b.text}</h2>;
    case 'h3':
      return <h3>{b.text}</h3>;
    case 'ul':
      return (
        <ul>
          {b.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case 'note':
      return <p className="!my-6 rounded-2xl border-l-4 border-brand-bright bg-brand-pale/50 p-5 font-medium !text-ink">{b.text}</p>;
    case 'table':
      return (
        <div className="overflow-x-auto rounded-2xl border border-line bg-surface" role="region" aria-label="Table" tabIndex={0}>
          <table className="!my-0 min-w-[30rem]">
            <thead>
              <tr>
                {b.head.map((h) => (
                  <th key={h} scope="col">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r) => (
                <tr key={r.join()}>
                  {r.map((c, i) => (i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i}>{c}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const g = guideBySlug[(await params).slug];
  const path = `/guides/${g.slug}`;
  const toc = g.body.filter((b): b is Extract<Block, { type: 'h2' }> => b.type === 'h2');
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: g.title,
          description: g.description,
          image: absolute(`/og/guides--${g.slug}.png`),
          datePublished: g.published,
          dateModified: g.updated,
          author: { '@type': 'Organization', '@id': orgId, name: site.name, url: site.url },
          publisher: { '@id': orgId },
          mainEntityOfPage: absolute(path),
          articleSection: g.topic,
          inLanguage: 'en',
          ...(g.sources.length ? { citation: g.sources.map((s) => s.url) } : {}),
        }}
      />
      <JsonLd data={webPageLd({ path, name: g.title, description: g.description })} />
      <PageHero
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
          { name: g.topic, path },
        ]}
        headline={g.headline}
        answer={g.answer}
        primary={g.tool ? { href: g.tool.href, label: g.tool.label } : { href: '/contact', label: 'Talk to us' }}
      >
        <p className="lift lift-4 mt-6 text-sm text-on-band-muted">
          By the {site.name} team · Updated <time dateTime={g.updated}>{longDate(g.updated)}</time> · {g.readMinutes} minute read
        </p>
      </PageHero>
      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <p className="label mb-3">On this page</p>
            <ol className="grid gap-2 border-l border-line text-sm">
              {toc.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-muted transition hover:border-brand-bright hover:text-ink">
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="prose-shiel max-w-[42rem] [&>h2:first-child]:mt-0">
            {g.body.map((b, i) => (
              <Render key={i} b={b} />
            ))}
            <h2 id="faq" className="scroll-mt-24">Frequently Asked Questions</h2>
            <div className="not-prose">
              <FaqList faqs={g.faqs} />
            </div>
            <Sources items={g.sources} updated={longDate(g.updated)} />
            {g.tool && (
              <div className="mt-10">
                <Button href={g.tool.href} variant="dark">{g.tool.label}</Button>
              </div>
            )}
            <p className="mt-10 text-sm text-muted">This guide is general information, not advice for your situation. Rules change, so check the official sources or talk to us before acting on it.</p>
          </article>
        </div>
      </Container>
      <ClientPanel />
    </>
  );
}
