import legal from '@/lib/data/legal.json';
import { PageHero } from './hero';
import { Container, JsonLd } from './primitives';
import { webPageLd } from '@/lib/seo';

// Legal text is kept word for word from the live site.
export function LegalPage({ kind, path }: { kind: keyof typeof legal; path: string }) {
  const doc = legal[kind];
  return (
    <>
      <JsonLd data={webPageLd({ path, name: doc.title, description: doc.title })} />
      <PageHero trail={[{ name: 'Home', path: '/' }, { name: doc.title, path }]} headline={doc.title} answer={`Last updated ${doc.updated}.`} primary={null} />
      <Container className="py-14 sm:py-20">
        <article className="prose-shiel max-w-[42rem]">
          {doc.sections.map((s) => (
            <section key={s.h}>
              <h2 className="!mt-10 text-2xl first:!mt-0">{s.h}</h2>
              {s.p.map((p) => (
                <p key={p} className="mt-3 text-ink-2">{p}</p>
              ))}
            </section>
          ))}
        </article>
      </Container>
    </>
  );
}
