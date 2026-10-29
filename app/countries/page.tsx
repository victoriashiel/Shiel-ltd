import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Globe2, Sprout } from 'lucide-react';
import { ClientPanel, PageHero } from '@/components/ui/hero';
import { FaqList, JsonLd, Section, SectionHead } from '@/components/ui/primitives';
import { countries } from '@/lib/content';
import { countryMeta, fromPrice } from '@/lib/packages';
import { pageMeta, webPageLd } from '@/lib/seo';

const title = 'Accountants in Ireland, the UK & Gibraltar | Shiel';
const description = 'Compare corporation tax rates, company filings and accounting prices across Ireland, the United Kingdom and Gibraltar, with links to official sources.';
export const metadata = pageMeta({ title, description, path: '/countries', absoluteTitle: true });

const rows: [string, string, string, string][] = [
  ['Corporation tax', '12.5% on trading income', '19% to 25%', '15%'],
  ['Company tax return', 'CT1', 'CT600', 'CT1'],
  ['Personal tax return', 'Form 11', 'Self Assessment', 'Personal return'],
  ['Tax authority', 'Revenue', 'HMRC', 'Income Tax Office'],
  ['Company registry', 'CRO', 'Companies House', 'Companies House'],
  ['VAT', 'Irish VAT', 'UK VAT', 'No VAT'],
];

const faqs = [
  { q: 'Which country has the lowest corporation tax?', a: 'For most small trading companies, Ireland at 12.5% on trading income, then Gibraltar at 15%. UK companies pay 19% on profits up to £50,000 and 25% above £250,000, with Marginal Relief in between. Where you can register depends on where the business is really run, so we look at that first.' },
  { q: 'Do I need to live in the country to have a company there?', a: 'Not always. A UK company can have directors who live anywhere. An Irish company generally needs a director resident in the EEA, or a bond or proof of a real link to Ireland instead. Gibraltar has its own rules on where a company is managed. We explain the position before you incorporate.' },
  { q: 'Can one accountant handle businesses in more than one of these countries?', a: 'Yes. Your named accountant looks after each one, keeps the records consistent and flags where the countries interact, for example director pay or where the company is managed from.' },
  { q: 'Are prices the same in each country?', a: `No. Each country has its own published plans in its own currency, starting from ${countryMeta.ireland.symbol}${fromPrice('ireland')} a month in Ireland, ${countryMeta['united-kingdom'].symbol}${fromPrice('united-kingdom')} in the UK and ${countryMeta.gibraltar.symbol}${fromPrice('gibraltar')} in Gibraltar.` },
];

export default function Page() {
  return (
    <>
      <JsonLd data={webPageLd({ path: '/countries', name: title, description, type: 'CollectionPage' })} />
      <PageHero
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Countries', path: '/countries' },
        ]}
        headline="Accountants in Ireland, the UK *and Gibraltar*"
        answer="Each country has its own taxes, returns and registry. Your accountant knows the local system, files everything for you and keeps it all on one fixed fee."
        primary={null}
        aside={
          <div className="min-w-0 rounded-[1.75rem] border border-white/12 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl sm:p-6">
            <p className="font-display text-lg font-semibold">Where is your business registered?</p>
            <ul className="mt-4 grid gap-2">
              {countries.map((c) => (
                <li key={c.key}>
                  <Link href={`/countries/${c.key}`} className="group flex items-center gap-4 rounded-2xl bg-black/20 px-4 py-3.5 transition hover:bg-black/30 active:scale-[0.99]">
                    <span className="min-w-0 flex-1">
                      <span className="block font-display font-semibold text-white">{c.name}</span>
                      <span className="block text-xs text-on-band-muted">
                        {c.authorities[0]} and {c.authorities[1]} · from {countryMeta[c.key].symbol}
                        {fromPrice(c.key)} a month
                      </span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-on-band-muted transition group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true" />
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/who-we-help/startups-new-companies" className="group flex items-center gap-4 rounded-2xl border border-dashed border-white/15 px-4 py-3.5 transition hover:border-white/30">
                  <Sprout className="size-6 shrink-0 text-mint" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-display font-semibold text-white">Not set up yet</span>
                    <span className="block text-xs text-on-band-muted">We can help you choose and form the company</span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-on-band-muted transition group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        }
      />

      <Section>
        <SectionHead title="Side by *side*" lead="The headline differences. Open a country for every filing, its deadline and the official source." />
        <ul className="rail md:hidden" role="region" aria-label="Country comparison, swipe for more" tabIndex={0}>
          {countries.map((c, ci) => (
            <li key={c.key} className="card w-[80vw] max-w-xs shrink-0 p-5">
              <Link href={`/countries/${c.key}`} className="flex items-center gap-2 font-display text-lg font-semibold">
                {c.name}
                <ArrowRight className="ml-auto size-4 text-muted" aria-hidden="true" />
              </Link>
              <dl className="mt-3 divide-y divide-line text-sm">
                {[...rows, ['Plans from', ...countries.map((x) => `${countryMeta[x.key].symbol}${fromPrice(x.key)} a month`)]].map(([label, ...vals]) => (
                  <div key={label} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-muted">{label}</dt>
                    <dd className="text-right font-display font-semibold">{vals[ci]}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
        <div className="reveal hidden overflow-x-auto rounded-[var(--radius)] border border-line bg-surface md:block" role="region" aria-label="Country comparison table" tabIndex={0}>
          <table className="w-full min-w-[40rem] text-left">
            <thead>
              <tr className="border-b border-line">
                <td className="p-5" />
                {countries.map((c) => (
                  <th key={c.key} scope="col" className="p-5 font-display text-lg">
                    <Link href={`/countries/${c.key}`} className="inline-flex items-center gap-2 hover:underline">
                      {c.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...rows, ['Plans from', ...countries.map((c) => `${countryMeta[c.key].symbol}${fromPrice(c.key)} a month`)] as [string, string, string, string]].map(([label, ...vals]) => (
                <tr key={label} className="border-b border-line last:border-0">
                  <th scope="row" className="p-5 text-sm font-semibold text-muted">{label}</th>
                  {vals.map((v, i) => (
                    <td key={i} className="p-5 font-display font-semibold">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="muted" label="Choosing">
        <ul className="grid gap-4 md:grid-cols-2">
          <li className="reveal">
            <Link href="/company-formation" className="card card-hover group flex h-full flex-col p-6 sm:p-8">
              <Sprout className="size-7 text-brand-bright" aria-hidden="true" />
              <h2 className="mt-4 text-2xl">Deciding where to set up?</h2>
              <p className="mt-2 flex-1 text-muted">We form companies in all three and talk you through tax, directors and running costs before you commit.</p>
              <span className="link-arrow mt-5 text-sm">Company formation <span aria-hidden="true">→</span></span>
            </Link>
          </li>
          <li className="reveal">
            <Link href="/international-accounting" className="card card-hover group flex h-full flex-col p-6 sm:p-8">
              <Globe2 className="size-7 text-brand-bright" aria-hidden="true" />
              <h2 className="mt-4 text-2xl">Business in more than one?</h2>
              <p className="mt-2 flex-1 text-muted">One accountant for every country you trade in, with director pay and management checked across the border.</p>
              <span className="link-arrow mt-5 text-sm">International accounting <span aria-hidden="true">→</span></span>
            </Link>
          </li>
        </ul>
        <Link href="/tools/corporation-tax-calculator" className="card card-hover group mt-4 flex items-center gap-4 p-5">
          <span className="flex-1">
            <span className="block font-display text-lg font-semibold">Compare the tax on your profit</span>
            <span className="block text-sm text-muted">The corporation tax calculator works for all three countries.</span>
          </span>
          <ArrowUpRight className="size-5 text-muted transition group-hover:text-ink" aria-hidden="true" />
        </Link>
      </Section>

      <Section label="Questions">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-[clamp(1.85rem,5.5vw,3rem)]">Frequently Asked Questions</h2>
          <FaqList faqs={faqs} />
        </div>
      </Section>

      <ClientPanel />
    </>
  );
}
