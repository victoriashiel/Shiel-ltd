'use client';

import Link from 'next/link';
import { ArrowRight, Download, FileText, Monitor, Moon, Sparkles, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { nav } from '@/lib/nav';
import { proof, whatsappLink } from '@/lib/site';
import { serviceIcons, WhatsAppIcon } from '@/components/ui/primitives';
import { services } from '@/lib/content';
import { Sheet } from './sheet';
import { useShell } from './shell';

export function TalkSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Sheet open={open} onClose={onClose} title="Talk to Shiel">
      <p className="text-muted">Your named accountant replies within one business day. Tell us a little about the business and what is coming up.</p>
      <div className="mt-5 grid gap-3">
        <a
          data-autofocus
          href={whatsappLink('Hi Shiel, I would like to talk about accounting for my business.')}
          target="_blank"
          rel="noopener"
          className="group flex items-center gap-4 rounded-2xl bg-[#25d366] p-4 text-[#06261a] transition active:scale-[0.98]"
        >
          <span className="relative grid size-12 place-items-center rounded-xl bg-[#06261a]/10">
            <WhatsAppIcon className="size-6" />
            <span className="pulse-dot absolute -top-0.5 -right-0.5 size-3 rounded-full border-2 border-[#25d366] bg-[#06261a]" aria-hidden="true" />
          </span>
          <span className="flex-1">
            <span className="block font-display text-lg font-bold">Message on WhatsApp</span>
            <span className="block text-sm opacity-80">Replies within one business day</span>
          </span>
          <ArrowRight className="size-5 transition group-hover:translate-x-1" aria-hidden="true" />
        </a>
        <Link href="/contact" className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition hover:border-line-strong active:scale-[0.98]">
          <span className="grid size-12 place-items-center rounded-xl bg-brand-pale text-brand-ink">
            <FileText className="size-6" aria-hidden="true" />
          </span>
          <span className="flex-1">
            <span className="block font-display text-lg font-bold">Send an enquiry</span>
            <span className="block text-sm text-muted">Three short steps, about a minute</span>
          </span>
          <ArrowRight className="size-5 transition group-hover:translate-x-1" aria-hidden="true" />
        </Link>
        <Link href="/packages#finder" className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition hover:border-line-strong active:scale-[0.98]">
          <span className="grid size-12 place-items-center rounded-xl bg-clay-soft text-clay-ink">
            <Sparkles className="size-6" aria-hidden="true" />
          </span>
          <span className="flex-1">
            <span className="block font-display text-lg font-bold">Find my package</span>
            <span className="block text-sm text-muted">
              From {proof.fromIE} or {proof.fromUK} a month
            </span>
          </span>
          <ArrowRight className="size-5 transition group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
      <p className="mt-5 text-center text-xs text-muted">Please do not send bank details, passwords or tax numbers in a first message.</p>
    </Sheet>
  );
}

/* ------------------------------------------------------------------ theme */

type Theme = 'system' | 'light' | 'dark';
const listeners = new Set<() => void>();
function readTheme(): Theme {
  try {
    return (localStorage.getItem('shiel-theme') as Theme) || 'system';
  } catch {
    return 'system';
  }
}
export function setTheme(t: Theme) {
  try {
    if (t === 'system') localStorage.removeItem('shiel-theme');
    else localStorage.setItem('shiel-theme', t);
  } catch {}
  if (t === 'system') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.dataset.theme = t;
  listeners.forEach((l) => l());
}
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function ThemeSwitch() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'system' as Theme);
  const options: { v: Theme; label: string; Icon: typeof Sun }[] = [
    { v: 'system', label: 'Auto', Icon: Monitor },
    { v: 'light', label: 'Light', Icon: Sun },
    { v: 'dark', label: 'Dark', Icon: Moon },
  ];
  return (
    <div role="radiogroup" aria-label="Colour theme" className="grid grid-cols-3 gap-1 rounded-2xl bg-surface-2 p-1">
      {options.map(({ v, label, Icon }) => (
        <button
          key={v}
          type="button"
          role="radio"
          aria-checked={theme === v}
          onClick={() => setTheme(v)}
          className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-muted transition aria-checked:bg-surface aria-checked:text-ink aria-checked:shadow-sm"
        >
          <Icon className="size-4" aria-hidden="true" />
          {label}
        </button>
      ))}
    </div>
  );
}

export function ServicesSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Sheet open={open} onClose={onClose} title="Services">
      <ul className="overflow-hidden rounded-2xl border border-line bg-surface">
        {services.map((s, i) => {
          const Icon = serviceIcons[s.icon];
          return (
            <li key={s.slug} className={i ? 'border-t border-line' : ''}>
              <Link href={`/${s.slug}`} data-autofocus={i === 0 || undefined} className="flex items-center gap-3.5 px-4 py-3.5 transition active:bg-surface-2">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-pale text-brand-ink">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{s.name}</span>
                  <span className="block truncate text-sm text-muted">{s.card}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
      <Link href="/services" className="mt-4 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-brand-ink">
        Compare all services
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </Sheet>
  );
}

export function MoreSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { install, clearInstall } = useShell();
  const group = (title: string, links: { href: string; label: string }[]) => (
    <div>
      <h3 className="mb-2 px-1 text-sm font-semibold text-muted">{title}</h3>
      <ul className="overflow-hidden rounded-2xl border border-line bg-surface">
        {links.map((l, i) => (
          <li key={l.href} className={i ? 'border-t border-line' : ''}>
            <Link href={l.href} className="flex items-center justify-between px-4 py-3.5 font-medium transition active:bg-surface-2">
              {l.label}
              <ArrowRight className="size-4 text-muted" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Sheet open={open} onClose={onClose} title="More from Shiel">
      <div className="grid gap-6">
        {group('Who we help', nav.audiences)}
        {group('Countries', nav.countries)}
        {group('Free tools', nav.tools)}
        {group('Shiel', nav.company)}
        <div>
          <h3 className="mb-2 px-1 text-sm font-semibold text-muted">Appearance</h3>
          <ThemeSwitch />
        </div>
        {install && (
          <button
            type="button"
            onClick={async () => {
              await install.prompt();
              clearInstall();
            }}
            className="btn btn-dark btn-block"
          >
            <Download className="size-5" aria-hidden="true" />
            Add Shiel to your home screen
          </button>
        )}
      </div>
    </Sheet>
  );
}
