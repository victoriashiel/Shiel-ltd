'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, m } from 'motion/react';
import { ChevronDown, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { nav, type NavLink } from '@/lib/nav';
import { Logo } from '@/components/ui/primitives';
import { useShell } from './shell';

type Menu = { key: string; label: string; links: NavLink[]; all?: NavLink; feature: { title: string; text: string; href: string; cta: string } };

const menus: Menu[] = [
  { key: 'services', label: 'Services', links: nav.services, all: { href: '/services', label: 'All services' }, feature: { title: 'Not sure what you need?', text: 'Answer three quick questions and see your price.', href: '/packages#finder', cta: 'Find my package' } },
  { key: 'countries', label: 'Countries', links: nav.countries, all: { href: '/countries', label: 'All countries' }, feature: { title: 'Could your business work better elsewhere?', text: 'Bulgarian companies, residency and banking, with our partner Sovereignty Global.', href: '/countries/international', cta: 'International options' } },
  { key: 'resources', label: 'Resources', links: nav.resources, feature: { title: 'Switching is free', text: 'We handle the handover from your current accountant and pick up the next filing cycle.', href: '/guides/how-to-switch-accountant', cta: 'How switching works' } },
];

// The top bar in order: Services and Countries menus, a Pricing link, then Resources.
const bar: ({ menu: Menu } | { href: string; label: string })[] = [{ menu: menus[0] }, { menu: menus[1] }, { href: '/packages', label: 'Pricing' }, { menu: menus[2] }];

export function Header() {
  const pathname = usePathname();
  const { open } = useShell();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenu(null);
  }

  useEffect(() => {
    if (!menu) return;
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setMenu(null);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(null);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [menu]);

  const solid = scrolled || !!menu;
  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const enter = (k: string) => {
    clearTimeout(timer.current);
    setMenu(k);
  };
  const leave = () => {
    timer.current = setTimeout(() => setMenu(null), 160);
  };

  return (
    <header
      ref={ref}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${
        solid ? 'border-b border-line bg-bg/80 text-ink shadow-[0_8px_30px_-20px_rgb(0_0_0/0.4)] backdrop-blur-xl backdrop-saturate-150' : 'text-on-band'
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-clay focus:px-4 focus:py-2 focus:text-[#0b1718]">
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <Link
          href="/"
          className="rounded-xl"
          aria-label="Shiel Accountants home"
          onClick={() => {
            if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Logo />
        </Link>

        <nav aria-label="Main" className="ml-6 hidden lg:block">
          <ul className="flex items-center gap-1">
            {bar.map((item) => {
              if ('href' in item) {
                return (
                  <li key={item.href}>
                    <Link href={item.href} aria-current={active(item.href) ? 'page' : undefined} className="relative rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition hover:bg-current/8 aria-[current=page]:bg-current/8">
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const mn = item.menu;
              return (
                <li key={mn.key} onMouseEnter={() => enter(mn.key)} onMouseLeave={leave}>
                  <button
                    type="button"
                    aria-expanded={menu === mn.key}
                    aria-controls={`menu-${mn.key}`}
                    onClick={() => setMenu(menu === mn.key ? null : mn.key)}
                    className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition hover:bg-current/8 ${menu === mn.key ? 'bg-current/8' : ''}`}
                  >
                    {mn.label}
                    <ChevronDown className={`size-4 transition-transform duration-300 ${menu === mn.key ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => open('search')}
            className="flex h-10 items-center gap-2 rounded-full px-3 text-sm transition hover:bg-current/8 lg:border lg:border-current/15 lg:pr-2 lg:pl-3.5"
            aria-label="Search the site"
          >
            <Search className="size-5 lg:size-4" aria-hidden="true" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="hidden rounded-md border border-current/15 px-1.5 py-0.5 font-sans text-[0.7rem] opacity-70 lg:inline">⌘K</kbd>
          </button>
          <Link href="/contact" className="btn btn-primary btn-sm hidden lg:inline-flex">
            Talk to us
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {menus.map(
          (mn) =>
            menu === mn.key && (
              <m.div
                key={mn.key}
                id={`menu-${mn.key}`}
                onMouseEnter={() => enter(mn.key)}
                onMouseLeave={leave}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-full hidden border-b border-line bg-bg/95 text-ink shadow-lift backdrop-blur-xl lg:block"
              >
                <div className="mx-auto grid max-w-6xl grid-cols-[1fr_18rem] gap-8 px-8 py-8">
                  <ul className="grid grid-cols-2 gap-1">
                    {mn.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="group block rounded-2xl p-4 transition hover:bg-surface">
                          <span className="flex items-center gap-2 font-display font-semibold">
                            {l.label}
                            <span className="text-brand-bright opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" aria-hidden="true">
                              →
                            </span>
                          </span>
                          {l.text && <span className="mt-1 block text-sm text-muted">{l.text}</span>}
                        </Link>
                      </li>
                    ))}
                    {mn.all && (
                      <li className="col-span-2 px-4 pt-2">
                        <Link href={mn.all.href} className="link-arrow text-sm">
                          {mn.all.label} →
                        </Link>
                      </li>
                    )}
                  </ul>
                  <div className="band grain relative flex flex-col justify-between overflow-hidden rounded-3xl p-6">
                    <div>
                      <p className="font-display text-lg font-semibold">{mn.feature.title}</p>
                      <p className="mt-2 text-sm text-on-band/80">{mn.feature.text}</p>
                    </div>
                    <Link href={mn.feature.href} className="btn btn-primary btn-sm mt-6 self-start">
                      {mn.feature.cta}
                    </Link>
                  </div>
                </div>
              </m.div>
            ),
        )}
      </AnimatePresence>
    </header>
  );
}
