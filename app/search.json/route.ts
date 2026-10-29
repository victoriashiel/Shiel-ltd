import { audiences, countries, homeFaqs, services } from '@/lib/content';
import { guides } from '@/lib/guides';
import { allRoutes } from '@/lib/routes';

export const dynamic = 'force-static';

// The site search index, fetched by the search palette the first time it opens.
export function GET() {
  const pages = allRoutes()
    .filter((r) => r.section !== 'Legal')
    .map((r) => ({ title: r.title.replace(/ \|.*$/, ''), url: r.path, text: r.description, section: r.section }));
  const faqs = [
    ...homeFaqs.map((f) => ({ f, url: '/faq' })),
    ...services.flatMap((s) => s.faqs.map((f) => ({ f, url: `/${s.slug}` }))),
    ...audiences.flatMap((a) => a.faqs.map((f) => ({ f, url: `/who-we-help/${a.slug}` }))),
    ...countries.flatMap((c) => c.faqs.map((f) => ({ f, url: `/countries/${c.key}` }))),
    ...guides.flatMap((g) => g.faqs.map((f) => ({ f, url: `/guides/${g.slug}` }))),
  ].map(({ f, url }) => ({ title: f.q, url, text: f.a, section: 'Answer' }));
  return Response.json([...pages, ...faqs]);
}
