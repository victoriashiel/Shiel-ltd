'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { m } from 'motion/react';
import { Grid2x2, House, LayoutList, MessageCircle, Tag } from 'lucide-react';
import { useShell } from './shell';

const tabs = [
  { href: '/', label: 'Home', Icon: House, match: (p: string) => p === '/' },
  { href: '/services', label: 'Services', Icon: LayoutList, match: (p: string) => ['/services', '/accounts', '/tax', '/bookkeeping', '/payroll', '/advisory', '/company-formation', '/international-accounting'].some((x) => p === x) },
  { href: '/packages', label: 'Pricing', Icon: Tag, match: (p: string) => p.startsWith('/packages') },
];

export function TabBar() {
  const pathname = usePathname();
  const { open } = useShell();
  const current = tabs.find((t) => t.match(pathname))?.href;

  const item = (t: (typeof tabs)[number]) => {
    const on = current === t.href;
    return (
      <li key={t.href} className="flex-1">
        <Link href={t.href} aria-current={on ? 'page' : undefined} className="relative flex h-14 flex-col items-center justify-center gap-0.5 text-[0.7rem] font-semibold">
          {on && <m.span layoutId="tab-pill" className="absolute inset-x-2 inset-y-1.5 rounded-2xl bg-brand-pale" transition={{ type: 'spring', stiffness: 420, damping: 34 }} aria-hidden="true" />}
          <t.Icon className={`relative size-[1.35rem] transition-transform ${on ? 'scale-110 text-brand-ink' : 'text-muted'}`} aria-hidden="true" strokeWidth={on ? 2.3 : 1.9} />
          <span className={`relative ${on ? 'text-ink' : 'text-muted'}`}>{t.label}</span>
        </Link>
      </li>
    );
  };

  return (
    <nav aria-label="App" className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
      <div className="mx-3 mb-[max(0.6rem,env(safe-area-inset-bottom))] rounded-[1.6rem] border border-line bg-bg/85 px-1.5 shadow-[0_18px_40px_-14px_rgb(0_0_0/0.45)] backdrop-blur-xl backdrop-saturate-150">
        <ul className="flex items-center">
          {item(tabs[0])}
          <li className="flex-1">
            <button type="button" onClick={() => open('services')} className="relative flex h-14 w-full flex-col items-center justify-center gap-0.5 text-[0.7rem] font-semibold" aria-haspopup="dialog">
              {current === tabs[1].href && <m.span layoutId="tab-pill" className="absolute inset-x-2 inset-y-1.5 rounded-2xl bg-brand-pale" transition={{ type: 'spring', stiffness: 420, damping: 34 }} aria-hidden="true" />}
              <LayoutList className={`relative size-[1.35rem] transition-transform ${current === tabs[1].href ? 'scale-110 text-brand-ink' : 'text-muted'}`} aria-hidden="true" strokeWidth={current === tabs[1].href ? 2.3 : 1.9} />
              <span className={`relative ${current === tabs[1].href ? 'text-ink' : 'text-muted'}`}>Services</span>
            </button>
          </li>
          <li className="flex flex-1 justify-center">
            <m.button
              type="button"
              onClick={() => open('talk')}
              whileTap={{ scale: 0.9 }}
              className="-mt-7 flex size-[3.7rem] flex-col items-center justify-center rounded-[1.35rem] bg-clay text-[#0b1718] shadow-[0_12px_26px_-8px_rgb(212_162_76/0.75)] ring-4 ring-bg"
              aria-haspopup="dialog"
            >
              <MessageCircle className="size-6" aria-hidden="true" />
              <span className="text-[0.65rem] font-bold">Talk</span>
            </m.button>
          </li>
          {item(tabs[2])}
          <li className="flex-1">
            <button type="button" onClick={() => open('more')} className="flex h-14 w-full flex-col items-center justify-center gap-0.5 text-[0.7rem] font-semibold text-muted" aria-haspopup="dialog">
              <Grid2x2 className="size-[1.35rem]" aria-hidden="true" strokeWidth={1.9} />
              More
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
