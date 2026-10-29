import type { ReactNode } from 'react';
import { Breadcrumbs, Button, Container, Rich, WhatsAppIcon } from './primitives';
import { whatsappLink } from '@/lib/site';

type Cta = { href: string; label: string };

export function PageHero({
  trail,
  headline,
  answer,
  chips = [],
  primary = { href: '/contact', label: 'Talk to us' },
  secondary,
  aside,
  children,
}: {
  trail?: { name: string; path: string }[];
  headline: string;
  answer: string;
  chips?: string[];
  primary?: Cta | null;
  secondary?: Cta;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="band grain relative overflow-hidden pt-20 pb-10 sm:pt-32 sm:pb-20">
      <HeroGlow />
      <Container className="relative">
        <div className={`grid items-center gap-8 sm:gap-10 [&>*]:min-w-0 ${aside ? 'lg:grid-cols-[1.15fr_0.85fr] lg:gap-14' : ''}`}>
          <div className="max-w-3xl">
            {trail && <Breadcrumbs trail={trail} />}
            <h1 className="lift text-[clamp(2.35rem,8.5vw,4.4rem)] leading-[1.02]">
              <Rich text={headline} />
            </h1>
            <p className="lift lift-1 mt-4 max-w-2xl leading-relaxed text-on-band/90 sm:mt-6 sm:text-xl">{answer}</p>
            {chips.length > 0 && (
              <ul className="lift lift-2 mt-7 hidden flex-wrap gap-2 sm:flex" aria-label="Key facts">
                {chips.map((c) => (
                  <li key={c} className="chip border-white/12 bg-white/5 backdrop-blur">
                    <span className="size-1.5 rounded-full bg-mint" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            )}
            {(primary || secondary) && (
              <div className="lift lift-3 mt-6 flex flex-wrap gap-3 sm:mt-8">
                {primary && <Button href={primary.href}>{primary.label}</Button>}
                {secondary && (
                  <Button href={secondary.href} variant="secondary" icon="none">
                    {secondary.label}
                  </Button>
                )}
              </div>
            )}
            {children}
          </div>
          {aside && <div className="lift lift-4">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}

export function HeroGlow({ id = 'hero' }: { id?: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="float absolute -top-32 -right-24 size-[28rem] rounded-full bg-[#21a09a]/25 blur-[90px]" />
      <div className="absolute -bottom-40 -left-24 size-[26rem] rounded-full bg-[#d4a24c]/15 blur-[100px]" />
      <svg className="absolute inset-0 size-full opacity-[0.07]" aria-hidden="true">
        <defs>
          <pattern id={`${id}-grid`} width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M44 0H0v44" fill="none" stroke="#f6f5f0" strokeWidth="1" />
          </pattern>
          <radialGradient id={`${id}-fade`} cx="70%" cy="20%" r="80%">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id={`${id}-mask`}>
            <rect width="100%" height="100%" fill={`url(#${id}-fade)`} />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id}-grid)`} mask={`url(#${id}-mask)`} />
      </svg>
    </div>
  );
}

export function ClientPanel({ title = 'Get in Touch', text = 'Send us a short message about your business and any deadline you are working towards. Your named accountant will reply within one business day, and the fee is agreed before anything starts.' }: { title?: string; text?: string }) {
  return (
    <section aria-labelledby="client-panel" className="px-4 pt-4 pb-10 sm:px-6 sm:pt-6 sm:pb-24">
      <div className="band grain relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-6 py-9 sm:px-12 sm:py-16">
        <HeroGlow id="panel" />
        <div className="relative grid items-end gap-6 sm:gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 id="client-panel" className="reveal text-[clamp(2rem,6vw,3.25rem)]">
              <Rich text={title} />
            </h2>
            <p className="mt-3 max-w-xl text-on-band/85 sm:mt-4 sm:text-lg">{text}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:w-80 lg:grid-cols-1 lg:justify-self-end">
            <Button href="/contact" block>
              Start an enquiry
            </Button>
            <Button href={whatsappLink('Hi Shiel, I would like to talk about accounting for my business.')} variant="whatsapp" icon="none" block>
              <WhatsAppIcon className="size-5" />
              Message on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
