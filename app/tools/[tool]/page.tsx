import type { ReactNode } from 'react';
import { CorporationTaxCalculator, DeadlineFinder, VatChecker } from '@/components/tools/calculators';
import { ClientPanel, PageHero } from '@/components/ui/hero';
import { Updated } from '@/components/ui/parts';
import { ArrowLink, FaqList, JsonLd, Section, Sources } from '@/components/ui/primitives';
import { sources, type FAQ, type Source } from '@/lib/content';
import { tools } from '@/lib/routes';
import { pageMeta, webPageLd } from '@/lib/seo';
import { absolute, site } from '@/lib/site';

export const dynamicParams = false;
export const generateStaticParams = () => tools.map((t) => ({ tool: t.slug }));

type ToolPage = { answer: string; tool: ReactNode; explain: { title: string; text: string }[]; faqs: FAQ[]; sources: Source[]; guide: { href: string; label: string } };

const pages: Record<string, ToolPage> = {
  'corporation-tax-calculator': {
    answer: 'Corporation tax is 12.5% on Irish trading profits, 15% in Gibraltar, and in the UK 19% up to £50,000 of profit and 25% above £250,000, with Marginal Relief between the two. Enter your profit below to see an estimate with the working shown.',
    tool: <CorporationTaxCalculator />,
    explain: [
      { title: 'Ireland', text: 'Trading income is taxed at 12.5%. Non-trading income such as rent and most interest is taxed at 25%. Close company surcharges on undistributed investment income are not included in this estimate.' },
      { title: 'United Kingdom', text: 'Profits up to £50,000 pay 19%, profits over £250,000 pay 25%, and in between the main rate is reduced by Marginal Relief at 3/200. The limits are divided between associated companies and reduced for short periods.' },
      { title: 'Gibraltar', text: 'Companies pay 15% on income accrued in or derived from Gibraltar. Utility, energy and fuel suppliers, and companies abusing a dominant market position, pay 20%.' },
    ],
    faqs: [
      { q: 'Is this calculator accurate enough to file with?', a: 'No. It is an estimate based on the headline rules. Losses, reliefs, capital allowances and group positions can all change the figure, so the final computation should always be prepared from your accounts.' },
      { q: 'What profit figure should I enter?', a: 'Taxable profit, which is your accounting profit adjusted for items that are not deductible, such as entertainment and depreciation, and after capital allowances.' },
      { q: 'Why is the UK marginal rate higher than 25%?', a: 'Inside the Marginal Relief band each extra pound is effectively taxed at 26.5%, because the relief shrinks as profit rises. The average rate still stays between 19% and 25%.' },
    ],
    sources: [sources.ieCT, sources.ukCT, sources.ukMR, sources.giPwC],
    guide: { href: '/guides/uk-corporation-tax-rates-marginal-relief', label: 'Read the guide to UK Marginal Relief' },
  },
  'filing-deadlines': {
    answer: 'An Irish company files its CT1 by the 23rd of the ninth month after its year-end. A UK company pays corporation tax 9 months and 1 day after year-end and files its CT600 within 12 months. A Gibraltar company files its CT1 nine months after the end of the month its period ends. Enter your year-end to see your own dates.',
    tool: <DeadlineFinder />,
    explain: [
      { title: 'Ireland', text: 'The CT1 and any balance of tax are due through ROS on the 23rd of the ninth month after the period ends. Small companies pay preliminary tax by the 23rd of the eleventh month of the period. The CRO B1 is due within 56 days of the Annual Return Date, which is set separately from the year-end.' },
      { title: 'United Kingdom', text: 'Corporation tax is payable 9 months and 1 day after the period ends for most companies, and the CT600 is due 12 months after. A private company files its accounts with Companies House within 9 months of its year-end.' },
      { title: 'Gibraltar', text: 'The Corporate Tax Return (CT1) and any balance of tax are due nine months after the end of the month in which the accounting period ends, so a 31 December year-end gives 30 September.' },
    ],
    faqs: [
      { q: 'Can I add these dates to my calendar?', a: 'Yes. Use the Add to calendar button to download the dates as a calendar file with a reminder two weeks before each one.' },
      { q: 'What if this is my company’s first year?', a: 'First accounting periods can be longer or shorter than 12 months and the first accounts deadline is often different, so ask us to confirm your dates.' },
      { q: 'What happens if I miss a deadline?', a: 'Each country charges late filing penalties or surcharges, and in Ireland a late B1 can cost the company its audit exemption. If you are already late, tell us and we will prioritise the filing.' },
    ],
    sources: [sources.ieCT1, sources.ieB1, sources.ukPay, sources.ukAccounts, sources.ukCT600, sources.giCT],
    guide: { href: '/guides/irish-company-filing-deadlines', label: 'Read the guide to Irish company deadlines' },
  },
  'vat-threshold-checker': {
    answer: 'You must register for VAT in Ireland once turnover passes €42,500 for services or €85,000 for goods, and in the UK once taxable turnover passes £90,000 in a rolling 12 months. Gibraltar has no VAT. Enter your turnover below to see where you stand.',
    tool: <VatChecker />,
    explain: [
      { title: 'Ireland', text: 'The €42,500 threshold applies to services and the €85,000 threshold applies where at least 90% of turnover comes from goods. Both are measured over any continuous 12-month period.' },
      { title: 'United Kingdom', text: 'Register when taxable turnover in the last 12 months goes over £90,000, or when sales in the next 30 days alone are expected to exceed it.' },
      { title: 'Gibraltar', text: 'Gibraltar does not operate a VAT system. Sales into the UK or EU follow the rules of the customer’s country.' },
    ],
    faqs: [
      { q: 'Should I register voluntarily?', a: 'Sometimes. If most customers are VAT-registered businesses, registering lets you reclaim VAT on costs without making you more expensive to them. For consumer-facing businesses it usually raises prices.' },
      { q: 'What about selling online to other EU countries?', a: 'Distance sales of goods to EU consumers have a combined €10,000 threshold. Above it you charge the customer’s local VAT, usually through the One Stop Shop.' },
      { q: 'Do e-commerce plans include OSS?', a: 'Yes. Our e-commerce plans include VAT returns with OSS, and multi-channel plans add IOSS.' },
    ],
    sources: [sources.ieVAT, sources.ukVAT, sources.giPwC],
    guide: { href: '/guides/vat-registration-thresholds', label: 'Read the guide to VAT thresholds' },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  const t = tools.find((x) => x.slug === tool)!;
  return pageMeta({ title: t.title, description: t.description, path: `/tools/${t.slug}` });
}

export default async function Page({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  const t = tools.find((x) => x.slug === tool)!;
  const p = pages[t.slug];
  const path = `/tools/${t.slug}`;
  return (
    <>
      <JsonLd data={webPageLd({ path, name: t.title, description: t.description })} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: t.name,
          url: absolute(path),
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Any',
          browserRequirements: 'Requires JavaScript',
          offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR' },
          publisher: { '@id': `${site.url}/#organization` },
        }}
      />
      <PageHero
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Tools', path: '/tools' },
          { name: t.name, path },
        ]}
        headline={t.headline}
        answer={p.answer}
        primary={null}
      />
      <Section label={t.name} className="!pt-10 sm:!pt-14">
        {p.tool}
      </Section>
      <Section tone="muted" label="How it works">
        <h2 className="text-[clamp(1.85rem,5.5vw,3rem)]">
          How It’s Calculated
        </h2>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {p.explain.map((e) => (
            <div key={e.title} className="card p-6">
              <h3 className="text-xl">{e.title}</h3>
              <p className="mt-2 text-muted">{e.text}</p>
            </div>
          ))}
        </div>
        <ArrowLink href={p.guide.href} className="mt-8">
          {p.guide.label}
        </ArrowLink>
      </Section>
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-[clamp(1.85rem,5.5vw,3rem)]">
              Frequently Asked Questions
            </h2>
            <div className="mt-6">
              <Updated />
            </div>
          </div>
          <div>
            <FaqList faqs={p.faqs} />
            <Sources items={p.sources} updated={site.updatedLabel} />
          </div>
        </div>
      </Section>
      <ClientPanel />
    </>
  );
}
