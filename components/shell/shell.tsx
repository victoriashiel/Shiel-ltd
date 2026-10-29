'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { LazyMotion } from 'motion/react';
import { Header } from './header';
import { TabBar } from './tab-bar';

// Sheets and search are only fetched once someone opens them.
const TalkSheet = dynamic(() => import('./sheets').then((m) => m.TalkSheet), { ssr: false });
const MoreSheet = dynamic(() => import('./sheets').then((m) => m.MoreSheet), { ssr: false });
const ServicesSheet = dynamic(() => import('./sheets').then((m) => m.ServicesSheet), { ssr: false });
const SearchPalette = dynamic(() => import('./search').then((m) => m.SearchPalette), { ssr: false });
const loadFeatures = () => import('./motion-features').then((m) => m.default);

type SheetKind = 'talk' | 'more' | 'services' | 'search' | null;
type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

const ShellContext = createContext<{ open: (k: SheetKind) => void; install: InstallEvent | null; clearInstall: () => void }>({
  open: () => {},
  install: null,
  clearInstall: () => {},
});

export const useShell = () => useContext(ShellContext);

export function Shell({ children }: { children: ReactNode }) {
  const [sheet, setSheetState] = useState<SheetKind>(null);
  const [used, setUsed] = useState<Set<string>>(() => new Set());
  const setSheet = useCallback((k: SheetKind | ((s: SheetKind) => SheetKind)) => {
    setSheetState((prev) => {
      const next = typeof k === 'function' ? k(prev) : k;
      if (next) setUsed((u) => (u.has(next) ? u : new Set(u).add(next)));
      return next;
    });
  }, []);
  const [install, setInstall] = useState<InstallEvent | null>(null);
  const pathname = usePathname();
  const close = useCallback(() => setSheet(null), [setSheet]);

  // Close any sheet when the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setSheetState(null);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSheet((s) => (s === 'search' ? null : 'search'));
      }
    };
    const onInstall = (e: Event) => {
      e.preventDefault();
      setInstall(e as InstallEvent);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('beforeinstallprompt', onInstall);
    // Fetch the sheets once the page is idle so the first tap opens them instantly.
    const warm = () => void import('./sheets');
    const idle = typeof requestIdleCallback === 'function' ? requestIdleCallback(warm) : setTimeout(warm, 2000);
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('beforeinstallprompt', onInstall);
      if (typeof cancelIdleCallback === 'function') cancelIdleCallback(idle as number);
      else clearTimeout(idle);
    };
  }, [setSheet]);

  const value = useMemo(() => ({ open: setSheet, install, clearInstall: () => setInstall(null) }), [install, setSheet]);

  return (
    <ShellContext.Provider value={value}>
      <LazyMotion features={loadFeatures} strict>
        <Header />
        {children}
        <TabBar />
        {used.has('talk') && <TalkSheet open={sheet === 'talk'} onClose={close} />}
        {used.has('more') && <MoreSheet open={sheet === 'more'} onClose={close} />}
        {used.has('services') && <ServicesSheet open={sheet === 'services'} onClose={close} />}
        {used.has('search') && <SearchPalette open={sheet === 'search'} onClose={close} />}
      </LazyMotion>
    </ShellContext.Provider>
  );
}

/* Lets server-rendered pages open a sheet from a button. */
export function OpenSheet({ kind, className, children, label }: { kind: Exclude<SheetKind, null>; className?: string; children: ReactNode; label?: string }) {
  const { open } = useShell();
  return (
    <button type="button" className={className} onClick={() => open(kind)} aria-label={label} aria-haspopup="dialog">
      {children}
    </button>
  );
}
