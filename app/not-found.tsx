import Link from 'next/link';
import { PageHero } from '@/components/ui/hero';
import { Container } from '@/components/ui/primitives';
import { nav } from '@/lib/nav';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <PageHero headline="This page has *moved on*" answer="The link may be old or mistyped. Everything is still here, and the most useful places to start are below." primary={{ href: '/', label: 'Back to the homepage' }} secondary={{ href: '/packages', label: 'See prices' }} />
      <Container className="py-14">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[...nav.services.slice(0, 3), ...nav.tools].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="card card-hover block p-5 font-display font-semibold">
                {l.label} <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
