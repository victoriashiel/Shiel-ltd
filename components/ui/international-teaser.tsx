import Link from 'next/link';
import { ArrowRight, Globe2 } from 'lucide-react';

// Points Irish clients to the international options page.
export function InternationalTeaser() {
  return (
    <Link href="/countries/international" className="band grain group relative flex flex-col gap-4 overflow-hidden rounded-[var(--radius)] p-5 sm:flex-row sm:items-center sm:p-7">
      <Globe2 className="size-8 shrink-0 text-mint" aria-hidden="true" />
      <span className="flex-1">
        <span className="block font-display text-xl font-semibold text-white">Could your business work better elsewhere?</span>
        <span className="mt-1 block text-on-band/80">With Sovereignty Global, we help you explore Bulgarian companies, residency, tax planning and banking in Bulgaria and Georgia.</span>
      </span>
      <span className="btn btn-primary btn-sm shrink-0">
        International options
        <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
