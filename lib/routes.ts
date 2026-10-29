import { audiences, countries, services } from './content';
import { guides } from './guides';
import { countryKeys, countryMeta, segmentKeys, segmentMeta } from './packages';

export type Route = { path: string; title: string; headline: string; description: string; section: string; priority: number };

export const plain = (s: string) => s.replace(/\*/g, '');

export const tools = [
  { slug: 'corporation-tax-calculator', name: 'Corporation tax calculator', title: 'Corporation Tax Calculator: Ireland, UK & Gibraltar', headline: 'Corporation tax, *worked out* in seconds', guides: ['uk-corporation-tax-rates-marginal-relief', 'gibraltar-corporate-tax', 'sole-trader-or-limited-company-uk'], description: 'Estimate corporation tax for a company in Ireland, the UK or Gibraltar, including UK Marginal Relief and associated companies. Free, with the workings shown.' },
  { slug: 'filing-deadlines', name: 'Filing deadline finder', title: 'Filing Deadline Calculator: Ireland, UK & Gibraltar', headline: 'Your company’s *next deadlines*, from one date', guides: ['irish-company-filing-deadlines', 'making-tax-digital-income-tax'], description: 'Enter your year-end to see the corporation tax return, payment and accounts deadlines for a company in Ireland, the UK or Gibraltar.' },
  { slug: 'vat-threshold-checker', name: 'VAT threshold checker', title: 'VAT Threshold Checker: Do I Need to Register?', headline: 'Do you need to *register for VAT*?', guides: ['vat-registration-thresholds', 'eu-vat-one-stop-shop-oss'], description: 'Check your turnover against the VAT registration thresholds in Ireland and the UK, and see how Gibraltar differs. Free, instant and based on official figures.' },
];

export function allRoutes(): Route[] {
  const r: Route[] = [
    { path: '/', title: 'Accountants for Ireland, the UK & Gibraltar', headline: 'Let us handle your accounts, *from €79 a month*', description: 'Fixed-fee accounting, tax, bookkeeping and payroll with a named accountant.', section: 'Home', priority: 1 },
    { path: '/services', title: 'Accounting Services', headline: 'Every accounting service, *one fixed fee*', description: 'Accounts, tax, bookkeeping, payroll, advisory, formation and international accounting.', section: 'Services', priority: 0.9 },
    { path: '/who-we-help', title: 'Who We Help', headline: 'Accountants for *the way you work*', description: 'Limited companies, sole traders, contractors, online sellers, non-resident directors and start-ups.', section: 'Who we help', priority: 0.8 },
    { path: '/countries', title: 'Countries We Cover', headline: 'Accountants in Ireland, the UK *and Gibraltar*', description: 'Ireland, the United Kingdom and Gibraltar.', section: 'Countries', priority: 0.8 },
    { path: '/packages', title: 'Accounting Packages & Prices', headline: 'Published prices, *clear limits*', description: 'Fixed monthly accounting packages for Ireland, the UK and Gibraltar.', section: 'Pricing', priority: 0.95 },
    { path: '/about', title: 'About Shiel', headline: 'A family business that *understands yours*', description: 'Why Shiel exists and how we work.', section: 'About', priority: 0.6 },
    { path: '/about/team', title: 'Meet the Team', headline: 'Good with numbers, *better with people*', description: 'The accountants looking after your business.', section: 'About', priority: 0.6 },
    { path: '/contact', title: 'Contact Shiel', headline: 'Tell us what you *need help with*', description: 'WhatsApp or an enquiry, answered within one business day.', section: 'Contact', priority: 0.8 },
    { path: '/tools', title: 'Free Accounting Tools', headline: 'Quick answers to *common questions*', description: 'Corporation tax, filing deadlines and VAT thresholds.', section: 'Tools', priority: 0.7 },
    { path: '/guides', title: 'Guides', headline: 'Plain-English *guides*', description: 'Rates, deadlines and how-tos for Ireland, the UK and Gibraltar.', section: 'Guides', priority: 0.7 },
    { path: '/faq', title: 'Frequently Asked Questions', headline: 'Questions, *answered first*', description: 'Pricing, switching, scope and how we work.', section: 'FAQ', priority: 0.6 },
    { path: '/privacy', title: 'Privacy Policy', headline: 'Privacy policy', description: 'How we handle personal data.', section: 'Legal', priority: 0.2 },
    { path: '/cookies', title: 'Cookie Policy', headline: 'Cookie policy', description: 'How this website uses cookies.', section: 'Legal', priority: 0.2 },
    { path: '/terms', title: 'Terms of Use', headline: 'Terms of use', description: 'The terms for using this website.', section: 'Legal', priority: 0.2 },
  ];
  for (const s of services) r.push({ path: `/${s.slug}`, title: s.title, headline: s.promise, description: s.description, section: 'Services', priority: 0.85 });
  for (const a of audiences) r.push({ path: `/who-we-help/${a.slug}`, title: a.title, headline: a.promise, description: a.description, section: 'Who we help', priority: 0.8 });
  for (const c of countries) r.push({ path: `/countries/${c.key}`, title: c.title, headline: c.promise, description: c.description, section: 'Countries', priority: 0.85 });
  r.push({ path: '/countries/international', title: 'International Options: Bulgaria & Georgia', headline: 'Could your business work *better elsewhere*?', description: 'International structures with Sovereignty Global: Bulgarian companies, residency, tax planning and banking.', section: 'Countries', priority: 0.6 });
  for (const c of countryKeys) {
    r.push({ path: `/packages/${c}`, title: `${countryMeta[c].label} Accounting Packages & Prices`, headline: `${countryMeta[c].label} prices, *in one place*`, description: `Fixed monthly accounting packages in ${countryMeta[c].label}.`, section: 'Pricing', priority: 0.85 });
    for (const s of segmentKeys)
      r.push({ path: `/packages/${c}/${s}`, title: `${segmentMeta[s].label} Accounting Packages ${countryMeta[c].label}`, headline: `${segmentMeta[s].label} packages in *${countryMeta[c].label}*`, description: segmentMeta[s].blurb, section: 'Pricing', priority: 0.8 });
  }
  for (const t of tools) r.push({ path: `/tools/${t.slug}`, title: t.title, headline: t.headline, description: t.description, section: 'Tools', priority: 0.75 });
  for (const g of guides) r.push({ path: `/guides/${g.slug}`, title: g.title, headline: g.headline, description: g.description, section: 'Guides', priority: 0.7 });
  return r;
}
