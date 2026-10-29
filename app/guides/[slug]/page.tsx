import Link from 'next/link';
import { ReadingProgress } from '@/components/tools/reading-progress';
import { ClientPanel, PageHero } from '@/components/ui/hero';
import { Button, Container, FaqList, JsonLd, Section, Sources } from '@/components/ui/primitives';
import { team } from '@/lib/content';
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
  const author = team.find((t) => t.slug === g.author)!;
  const reviewer = team.find((t) => t.slug === g.reviewer)!;
  const person = (t: typeof author) => ({ '@type': 'Person', '@id': `${absolute('/about/team')}#${t.slug}`, name: t.name, jobTitle: t.role, url: `${absolute('/about/team')}#${t.slug}`, worksFor: { '@id': orgId }, ...(t.photo ? { image: absolute(t.photo) } : {}) });
  // Same-topic guides first, then the rest.
  const related = [...guides.filter((x) => x.slug !== g.slug && x.topic === g.topic), ...guides.filter((x) => x.slug !== g.slug && x.topic !== g.topic)].slice(0, 3);
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
          author: person(author),
          publisher: { '@id': orgId },
          mainEntityOfPage: absolute(path),
          articleSection: g.topic,
          inLanguage: 'en',
          ...(g.sources.length ? { citation: g.sources.map((s) => s.url) } : {}),
        }}
      />
      <JsonLd data={{ ...webPageLd({ path, name: g.title, description: g.description }), reviewedBy: person(reviewer), lastReviewed: g.updated }} />
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
        <div className="lift lift-4 mt-6 flex items-center gap-3 text-sm text-on-band-muted">
          <span className="flex -space-x-2" aria-hidden="true">
            {[author, reviewer].map((t) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={t.slug} src={t.photo} alt="" width={36} height={36} className="size-9 rounded-full border-2 border-[#0e2122] object-cover object-top" />
            ))}
          </span>
          <p>
            Written by{' '}
            <Link href={`/about/team#${author.slug}`} className="font-semibold text-white hover:underline">
              {author.name}
            </Link>
            , reviewed by{' '}
            <Link href={`/about/team#${reviewer.slug}`} className="font-semibold text-white hover:underline">
              {reviewer.name}
            </Link>
            <br />
            Updated <time dateTime={g.updated}>{longDate(g.updated)}</time> · {g.readMinutes} minute read
          </p>
        </div>
      </PageHero>
      <ReadingProgress />
      <Container className="py-10 sm:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[14rem_1fr] lg:gap-16 [&>*]:min-w-0">
          <nav aria-label="On this page" className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <p className="label mb-3 hidden lg:block">On this page</p>
            {/* A swipeable row of chips on phones, a vertical list on desktop. */}
            <ol className="-mx-4 flex gap-2 overflow-x-auto px-4 text-sm [scrollbar-width:none] lg:mx-0 lg:grid lg:gap-2 lg:overflow-visible lg:border-l lg:border-line lg:px-0">
              {toc.map((h) => (
                <li key={h.id} className="shrink-0">
                  <a href={`#${h.id}`} className="block rounded-full border border-line bg-surface px-3.5 py-1.5 whitespace-nowrap text-muted transition hover:text-ink lg:-ml-px lg:rounded-none lg:border-0 lg:border-l-2 lg:border-transparent lg:bg-transparent lg:py-1 lg:pl-4 lg:whitespace-normal lg:hover:border-brand-bright">
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
            <aside className="not-prose mt-10 flex gap-4 rounded-[var(--radius)] border border-line bg-surface p-5" aria-label="About the writer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={author.photo} alt="" width={64} height={64} loading="lazy" className="size-16 shrink-0 rounded-2xl object-cover object-top" />
              <div className="min-w-0">
                <p className="font-display font-semibold">
                  <Link href={`/about/team#${author.slug}`} className="hover:underline">
                    {author.name}
                  </Link>
                </p>
                <p className="text-sm font-semibold text-brand-ink">{author.role}</p>
                <p className="mt-2 text-sm text-muted">{author.bio}</p>
                <p className="mt-2 text-xs text-muted">
                  Reviewed by {reviewer.name}, {reviewer.role}.
                </p>
              </div>
            </aside>
            <p className="mt-10 text-sm text-muted">This guide is general information, not advice for your situation. Rules change, so check the official sources or talk to us before acting on it.</p>
          </article>
        </div>
      </Container>
      <Section tone="muted" label="More guides">
        <h2 className="text-2xl">More guides</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug}>
              <Link href={`/guides/${r.slug}`} className="card card-hover group flex h-full flex-col p-5">
                <span className="text-xs font-semibold text-brand-ink">{r.topic}</span>
                <span className="mt-1 flex-1 font-display font-semibold">{r.title}</span>
                <span className="link-arrow mt-3 text-sm">
                  Read <span aria-hidden="true">→</span>
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
