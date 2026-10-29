import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { team } from '@/lib/content';
import { guideBySlug } from '@/lib/guides';

// Compact links to guides, each with its writer's photo, for the end of service and country pages.
export function GuideLinks({ slugs, title = 'Guides on this' }: { slugs: string[]; title?: string }) {
  if (!slugs.length) return null;
  return (
    <div className="mt-8">
      <h3 className="text-lg">{title}</h3>
      <ul className="mt-3 grid gap-2">
        {slugs.map((slug) => {
          const g = guideBySlug[slug];
          const a = team.find((t) => t.slug === g.author);
          return (
            <li key={slug}>
              <Link href={`/guides/${slug}`} className="card card-hover group flex items-center gap-3 p-3.5">
                {a?.photo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.photo} alt="" width={36} height={36} loading="lazy" className="size-9 shrink-0 rounded-full object-cover object-top" />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{g.title}</span>
                  <span className="block text-xs text-muted">
                    By {a?.name} · {g.readMinutes} min read
                  </span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-ink" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
