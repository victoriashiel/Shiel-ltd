// Business identity, contact routes and build flags shared by every page.

export const INDEXABLE = process.env.NEXT_PUBLIC_INDEX === 'true';

export const site = {
  name: 'Shiel Accountants',
  shortName: 'Shiel',
  legalName: 'Shiel Ltd',
  url: 'https://www.shiel.ltd',
  previewUrl: 'https://quillow.uk',
  tagline: 'Accountants for companies in Ireland, the UK and Gibraltar',
  description:
    'Fixed-fee accounting, tax, bookkeeping, payroll and advisory for companies, sole traders, contractors and online sellers in Ireland, the UK and Gibraltar, with a named accountant you can message directly.',
  whatsapp: 'https://wa.me/13323556072',
  email: 'victoria@shiel.ltd',
  updated: '2026-10-29',
  updatedLabel: '29 October 2026',
  areaServed: ['Ireland', 'United Kingdom', 'Gibraltar'],
  partner: { name: 'Sovereignty Global', url: 'https://www.sovereigntyglobal.org', logo: '/partners/sovereignty-global.webp' },
} as const;

export const proof = {
  years: '7+',
  recovered: '€49k+',
  people: 12,
  accountants: 5,
  fromIE: '€79',
  fromUK: '£49',
  fromGI: '£69',
};

export function whatsappLink(text?: string) {
  return text ? `${site.whatsapp}?text=${encodeURIComponent(text)}` : site.whatsapp;
}

export function absolute(path: string) {
  return `${site.url}${path === '/' ? '' : path}`;
}
