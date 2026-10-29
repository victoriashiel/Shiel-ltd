import Link from 'next/link';
import { Mail } from 'lucide-react';
import { site, whatsappLink } from '@/lib/site';
import { Logo, WhatsAppIcon } from '@/components/ui/primitives';

export function Footer() {
  const col = (title: string, links: { href: string; label: string }[]) => (
    <div>
      <h2 className="mb-4 font-display text-xs font-semibold tracking-[0.12em] text-on-band-muted uppercase">{title}</h2>
      <ul className="grid gap-2.5 text-[0.95rem] lg:whitespace-nowrap">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-on-band/75 transition hover:text-on-band">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  const iconLink = 'grid size-10 place-items-center rounded-full border border-white/15 text-on-band/80 transition hover:border-mint hover:text-mint';

  return (
    <footer className="band safe-bottom relative">
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8 lg:pb-10">
        <div className="grid gap-12 sm:grid-cols-[minmax(0,17rem)_1fr] lg:gap-16">
          <div>
            <Link href="/" aria-label="Shiel Accountants home" className="inline-block rounded-xl">
              <Logo className="[&_rect]:fill-[#f6f5f0] [&_path]:fill-[#0b1718]" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-on-band-muted">
              Family-run accountants for businesses in Ireland, the UK and Gibraltar.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={whatsappLink()} target="_blank" rel="noopener" aria-label="Message us on WhatsApp" className={iconLink}>
                <WhatsAppIcon className="size-5" />
              </a>
              <a href={`mailto:${site.email}`} aria-label={`Email ${site.email}`} className={iconLink}>
                <Mail className="size-5" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:flex sm:justify-end sm:gap-24">
            {col('Resources', [
              { href: '/guides', label: 'Guides' },
              { href: '/faq', label: 'FAQ' },
              { href: '/terms', label: 'Terms' },
              { href: '/privacy', label: 'Privacy policy' },
              { href: '/cookies', label: 'Cookie policy' },
            ])}
            {col('Company', [
              { href: '/about', label: 'Our story' },
              { href: '/about/team', label: 'Meet the team' },
              { href: '/tools', label: 'Free tools' },
              { href: '/contact', label: 'Contact' },
            ])}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-on-band-muted lg:flex-row lg:items-center lg:justify-between">
          <a href={site.partner.url} target="_blank" rel="noopener" className="group flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <span className="text-on-band-muted">In partnership with</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.partner.logo} alt={site.partner.name} width={192} height={36} loading="lazy" className="h-8 w-auto self-start opacity-90 transition group-hover:opacity-100 sm:h-9 sm:self-auto" />
          </a>
          <p>© {new Date().getFullYear()} {site.legalName}</p>
        </div>
      </div>
    </footer>
  );
}
