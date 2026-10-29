import { audiences, countries, services } from './content';
import { tools } from './routes';

export type NavLink = { href: string; label: string; text?: string };

export const nav = {
  services: services.map<NavLink>((s) => ({ href: `/${s.slug}`, label: s.name, text: s.card })),
  audiences: audiences.map<NavLink>((a) => ({ href: `/who-we-help/${a.slug}`, label: a.name, text: a.card })),
  countries: countries.map<NavLink>((c) => ({ href: `/countries/${c.key}`, label: c.name, text: `${c.authorities[0]} and ${c.authorities[1]} work, connected` })),
  tools: tools.map<NavLink>((t) => ({ href: `/tools/${t.slug}`, label: t.name })),
  company: [
    { href: '/about', label: 'Our story' },
    { href: '/about/team', label: 'Meet the team' },
    { href: '/guides', label: 'Guides' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ] as NavLink[],
};
