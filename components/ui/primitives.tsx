import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, Building2, ChartLine, ChevronRight, FileText, Globe2, Percent, Plus, Users } from 'lucide-react';
import type { FAQ, Source, Step } from '@/lib/content';
import { breadcrumbLd, faqLd } from '@/lib/seo';

/* Headlines mark their highlighted words with *asterisks*. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/g);
  return <>{parts.map((p, i) => (i % 2 ? <span key={i} className="em">{p}</span> : p))}</>;
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'dark' | 'whatsapp';
  size?: 'sm' | 'md';
  icon?: 'arrow' | 'up' | 'whatsapp' | 'none';
  block?: boolean;
  className?: string;
} & Omit<ComponentProps<'a'>, 'href'>;

export function Button({ href, children, variant = 'primary', size = 'md', icon = 'arrow', block, className = '', ...rest }: BtnProps) {
  const cls = `btn btn-${variant} ${size === 'sm' ? 'btn-sm' : ''} ${block ? 'btn-block' : ''} ${className}`;
  const glyph =
    icon === 'none' ? null : (
      <span className="btn-icon" aria-hidden="true">
        {icon === 'whatsapp' ? <WhatsAppIcon className="size-4" /> : icon === 'up' ? <ArrowUpRight className="size-4" /> : <ArrowRight className="size-4" />}
      </span>
    );
  const external = href.startsWith('http');
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener" {...rest}>
        {children}
        {glyph}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
      {glyph}
    </Link>
  );
}

export function ArrowLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`link-arrow ${className}`}>
      {children}
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Section({ children, className = '', id, tone, label }: { children: ReactNode; className?: string; id?: string; tone?: 'band' | 'muted'; label?: string }) {
  const toneCls = tone === 'band' ? 'band grain relative' : tone === 'muted' ? 'bg-surface-2/60' : '';
  return (
    <section id={id} aria-label={label} className={`${toneCls} py-12 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHead({ title, lead, action, center, id }: { title: string; lead?: string; action?: ReactNode; center?: boolean; id?: string }) {
  return (
    <div className={`reveal mb-6 flex flex-col gap-4 sm:mb-12 ${center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}>
      <div className={center ? 'max-w-2xl' : 'max-w-2xl'}>
        <h2 id={id} className="text-[clamp(1.85rem,5.5vw,3rem)]">
          <Rich text={title} />
        </h2>
        {lead && <p className="mt-3 text-muted sm:mt-4 sm:text-lg">{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-on-band-muted">
          {trail.map((t, i) => (
            <li key={t.path} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />}
              {i < trail.length - 1 ? (
                <Link href={t.path} className="rounded px-1 py-1 hover:text-on-band hover:underline">
                  {t.name}
                </Link>
              ) : (
                <span aria-current="page" className="px-1 text-on-band">
                  {t.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(trail)} />
    </>
  );
}

export function Steps({ steps, numbered = true }: { steps: Step[]; numbered?: boolean }) {
  return (
    <ol className="relative grid gap-3 md:grid-cols-4 md:gap-4">
      <span aria-hidden="true" className="absolute top-6 left-6 hidden h-px w-[calc(100%-3rem)] bg-gradient-to-r from-brand-bright/60 via-line-strong to-transparent md:block" />
      {steps.map((s, i) => (
        <li key={s.title} className="reveal relative flex gap-4 md:flex-col">
          <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface font-display font-bold text-brand-ink shadow-sm md:size-12 md:rounded-2xl md:text-lg">
            {numbered ? String(i + 1).padStart(2, '0') : '✓'}
          </span>
          <div>
            <h3 className="text-lg md:text-xl">{s.title}</h3>
            <p className="mt-1 text-[0.95rem] text-muted md:mt-1.5 md:text-base">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}


export function Checklist({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`grid gap-3 ${className}`}>
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span aria-hidden="true" className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-brand-pale text-brand-ink">
            <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 6.2 5 8.5l4.5-5" />
            </svg>
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function FaqList({ faqs, schema = true }: { faqs: FAQ[]; schema?: boolean }) {
  return (
    <>
      <div className="divide-y divide-line overflow-hidden rounded-[var(--radius)] border border-line bg-surface">
        {faqs.map((f) => (
          <details key={f.q} className="acc group">
            <summary className="flex items-center justify-between gap-6 px-5 py-4 text-left font-display font-semibold sm:px-7 sm:py-5 sm:text-lg">
              <span>{f.q}</span>
              <span className="acc-icon grid size-9 shrink-0 place-items-center rounded-full bg-surface-2 text-ink" aria-hidden="true">
                <Plus className="size-4" />
              </span>
            </summary>
            <p className="px-5 pb-6 text-muted sm:px-7">{f.a}</p>
          </details>
        ))}
      </div>
      {schema && <JsonLd data={faqLd(faqs)} />}
    </>
  );
}

export function Sources({ items, updated }: { items: Source[]; updated?: string }) {
  if (!items.length) return null;
  return (
    <details className="acc mt-10 rounded-2xl border border-line bg-surface">
      <summary className="flex items-center justify-between gap-4 px-5 py-4 text-sm font-semibold">
        <span>
          Sources ({items.length}){updated && <span className="ml-2 font-normal text-muted">Checked {updated}</span>}
        </span>
        <Plus className="acc-icon size-4" aria-hidden="true" />
      </summary>
      <ul className="grid gap-2 px-5 pb-5 text-sm">
        {items.map((s) => (
          <li key={s.url}>
            <a href={s.url} className="text-brand-ink underline decoration-line-strong underline-offset-4 hover:decoration-current" target="_blank" rel="noopener">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

export function WorthKnowing({ children }: { children: ReactNode }) {
  return (
    <div role="note" className="mt-8 rounded-2xl border border-line bg-clay-soft/50 p-5 text-sm text-ink-2 sm:p-6">
      <p className="mb-1 font-display font-semibold text-ink">Worth knowing</p>
      {children}
    </div>
  );
}

export const serviceIcons = { file: FileText, percent: Percent, book: BookOpen, users: Users, chart: ChartLine, building: Building2, globe: Globe2 };

export function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function Logo({ className = '', withWord = true }: { className?: string; withWord?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 64 64" className="size-9 shrink-0" aria-hidden="true">
        <rect width="64" height="64" rx="16" fill="#0b1718" />
        <path d="M18 20.5c0-5 4.2-8.5 10.7-8.5 5.1 0 9.1 1.7 12.1 4.7l-5.2 5.6c-1.8-1.8-4.1-2.8-6.8-2.8-2.3 0-3.6.8-3.6 2.1 0 1.5 1.7 2.1 6.3 3.4 7.3 2 11.3 5.1 11.3 11.7 0 8.5-6.8 13.3-15.5 13.3-6.7 0-12.1-2.4-15.7-6.4l5.6-5.6c2.7 2.9 6.1 4.5 10.2 4.5 4 0 6.1-1.6 6.1-4.2 0-2.1-1.7-3.1-6.7-4.5C20.8 32 18 28.5 18 20.5Z" fill="#f6f5f0" />
        <circle cx="48" cy="47" r="4" fill="#21a09a" />
      </svg>
      {withWord && (
        // The letters take the surrounding text colour; the dot and "Accountants" stay teal.
        <span className="relative block aspect-[1580/689] h-9">
          <span
            className="absolute inset-0 bg-current"
            style={{ maskImage: 'url(/brand/wordmark-letters-v2.webp)', WebkitMaskImage: 'url(/brand/wordmark-letters-v2.webp)', maskSize: '100% 100%', WebkitMaskSize: '100% 100%' }}
            aria-hidden="true"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/wordmark-accent-v2.webp" alt="" width={300} height={131} className="absolute inset-0 size-full" />
          <span className="sr-only">Shiel Accountants</span>
        </span>
      )}
    </span>
  );
}
