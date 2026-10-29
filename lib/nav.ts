import { audiences, countries, services } from './content';
import { tools } from './routes';

export type NavLink = { href: string; label: string; text?: string };

export const nav = {
  services: services.map<NavLink>((s) => ({ href: `/${s.slug}`, label: s.name, text: s.card })),
  audiences: audiences.map<NavLink>((a) => ({ href: `/who-we-help/${a.slug}`, label: a.name, text: a.card })),
  countries: [
    ...countries.map<NavLink>((c) => ({ href: `/countries/${c.key}`, label: c.name, text: `${c.authorities[0]} and ${c.authorities[1]} work, connected` })),
    { href: '/countries/international', label: 'International options', text: 'Could your business work better elsewhere?' },
  ],
  tools: tools.map<NavLink>((t) => ({ href: `/tools/${t.slug}`, label: t.name })),
  resources: [
    { href: '/about', label: 'About us', text: 'A family-run firm with five client-facing accountants.' },
    { href: '/who-we-help', label: 'Who we help', text: 'Companies, sole traders, contractors, online sellers and more.' },
    { href: '/tools', label: 'Free tools', text: 'Corporation tax, filing deadlines and VAT, worked out.' },
    { href: '/about/team', label: 'Meet the team', text: 'The people who do your accounts.' },
  ] as NavLink[],
};
