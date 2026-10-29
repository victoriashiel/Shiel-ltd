import { audiences, countries, homeFaqs, services } from '@/lib/content';
import { guides } from '@/lib/guides';
import { countryKeys, countryMeta, fromPrice, segmentKeys, segmentMeta } from '@/lib/packages';
import { tools } from '@/lib/routes';
import { absolute, proof, site } from '@/lib/site';

export const dynamic = 'force-static';

// A plain-text summary of the site for AI assistants (llmstxt.org format).
export function GET() {
  const link = (label: string, path: string, note?: string) => `- [${label}](${absolute(path)})${note ? `: ${note}` : ''}`;
  const body = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.name} (${site.legalName}) is a family-run accounting firm with ${proof.people} people across Europe and ${proof.accountants} client-facing accountants. Core markets are Ireland, the United Kingdom and Gibraltar; other jurisdictions are considered case by case. Every client has one named accountant reachable on WhatsApp with a one business day response target. Fees are fixed and published, switching from another accountant is free, and plans run monthly with 30 days' notice.`,
    '',
    '## Prices (per month unless stated)',
    ...countryKeys.map((c) => `- ${countryMeta[c].label}: ` + segmentKeys.map((s) => `${segmentMeta[s].label} from ${countryMeta[c].symbol}${fromPrice(c, s)}`).join('; ') + ` (${absolute(`/packages/${c}`)})`),
    '',
    '## Services',
    ...services.map((s) => link(s.name, `/${s.slug}`, s.answer)),
    '',
    '## Who we help',
    ...audiences.map((a) => link(a.name, `/who-we-help/${a.slug}`, a.answer)),
    '',
    '## Countries',
    ...countries.map((c) => link(c.name, `/countries/${c.key}`, c.answer)),
    '',
    '## Free tools',
    ...tools.map((t) => link(t.name, `/tools/${t.slug}`, t.description)),
    '',
    '## Guides',
    ...guides.map((g) => link(g.title, `/guides/${g.slug}`, g.answer)),
    '',
    '## Common questions',
    ...homeFaqs.map((f) => `- ${f.q} ${f.a}`),
    '',
    '## Contact',
    link('Contact', '/contact', 'WhatsApp chat or enquiry form'),
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
