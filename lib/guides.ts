import { sources, type FAQ, type Source } from './content';

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'note'; text: string };

export type Guide = {
  slug: string;
  title: string;
  description: string;
  headline: string;
  answer: string;
  published: string;
  updated: string;
  readMinutes: number;
  topic: string;
  tool?: { href: string; label: string };
  body: Block[];
  faqs: FAQ[];
  sources: Source[];
};

export const guides: Guide[] = [
  {
    slug: 'uk-corporation-tax-rates-marginal-relief',
    title: 'UK Corporation Tax Rates & Marginal Relief Explained',
    description: 'UK Corporation Tax is 19% on profits up to £50,000 and 25% above £250,000, with Marginal Relief in between. How the calculation works, with worked examples.',
    headline: 'UK Corporation Tax rates and *Marginal Relief*, explained',
    answer: 'UK companies pay Corporation Tax at 19% on profits up to £50,000 and 25% on profits over £250,000. Between those limits the main rate of 25% applies, reduced by Marginal Relief, so the average rate rises gradually from 19% towards 25%.',
    published: '2026-10-26',
    updated: '2026-10-26',
    readMinutes: 5,
    topic: 'United Kingdom',
    tool: { href: '/tools/corporation-tax-calculator', label: 'Try the corporation tax calculator' },
    body: [
      { type: 'h2', id: 'rates', text: 'The rates for 2026/27' },
      { type: 'p', text: 'The UK has two Corporation Tax rates. The small profits rate of 19% applies when taxable profits are £50,000 or less, and the main rate of 25% applies when profits are above £250,000. A company with profits between the two pays the main rate and then claims Marginal Relief, which brings the bill down.' },
      { type: 'table', head: ['Taxable profits', 'What applies', 'Effective rate'], rows: [['Up to £50,000', 'Small profits rate', '19%'], ['£50,001 to £250,000', 'Main rate less Marginal Relief', 'Between 19% and 25%'], ['Over £250,000', 'Main rate', '25%']] },
      { type: 'h2', id: 'formula', text: 'How Marginal Relief is worked out' },
      { type: 'p', text: 'Marginal Relief uses a standard fraction of 3/200. The relief equals 3/200 multiplied by the difference between the upper limit and your profits. Where the company has no dividends from non-group companies, the calculation is straightforward.' },
      { type: 'note', text: 'Relief = (£250,000 − taxable profits) × 3/200. Tax due = taxable profits × 25% − relief.' },
      { type: 'h3', text: 'A worked example' },
      { type: 'p', text: 'A company with taxable profits of £100,000 would start at £25,000 of tax at the main rate. Marginal Relief is £150,000 × 3/200, which is £2,250, so the tax due is £22,750. That is an average rate of 22.75%.' },
      { type: 'p', text: 'One consequence worth knowing is that each extra pound of profit inside the band is taxed at 26.5%, which is higher than the main rate. That matters when you are deciding on the timing of a bonus, a pension contribution or a large purchase.' },
      { type: 'h2', id: 'associated', text: 'Associated companies and short periods' },
      { type: 'p', text: 'The £50,000 and £250,000 limits are shared between associated companies. If you control two companies, each one’s limits are halved to £25,000 and £125,000. The limits are also reduced proportionally when an accounting period is shorter than 12 months.' },
      { type: 'h2', id: 'deadlines', text: 'When the tax is due' },
      { type: 'p', text: 'For most small and medium companies, Corporation Tax is payable 9 months and 1 day after the end of the accounting period, while the CT600 return itself is due 12 months after the period ends. Larger companies pay in quarterly instalments.' },
    ],
    faqs: [
      { q: 'What is the UK Corporation Tax rate in 2026?', a: '19% on profits up to £50,000, 25% on profits over £250,000, and the main rate less Marginal Relief in between.' },
      { q: 'What is the Marginal Relief fraction?', a: 'The standard fraction is 3/200, applied to the difference between the upper limit and your taxable profits.' },
      { q: 'Do associated companies share the thresholds?', a: 'Yes. The limits are divided by the number of associated companies, so two companies get £25,000 and £125,000 each.' },
    ],
    sources: [sources.ukCT, sources.ukMR, sources.ukPay, sources.ukCT600],
  },
  {
    slug: 'irish-company-filing-deadlines',
    title: 'Irish Company Deadlines: CT1, Preliminary Tax & CRO B1',
    description: 'When Irish companies must file the CT1, pay preliminary and balancing tax and file the CRO B1 annual return, with worked dates for common year-ends.',
    headline: 'Irish company deadlines, *in the order they arrive*',
    answer: 'An Irish company filing through ROS must file its CT1 and pay any balance of corporation tax by the 23rd of the ninth month after its accounting period ends. Separately, the CRO B1 annual return is due within 56 days of the company’s Annual Return Date, which is not tied to the financial year-end.',
    published: '2026-10-26',
    updated: '2026-10-26',
    readMinutes: 6,
    topic: 'Ireland',
    tool: { href: '/tools/filing-deadlines', label: 'Work out your filing dates' },
    body: [
      { type: 'h2', id: 'ct1', text: 'The CT1 corporation tax return' },
      { type: 'p', text: 'The CT1 is the company’s corporation tax return to Revenue. Returns filed and paid through ROS are due by the 23rd day of the ninth month after the end of the accounting period. Any balance of tax still owed is paid on the same date.' },
      { type: 'table', head: ['Year-end', 'CT1 and balance due (ROS)'], rows: [['31 December 2025', '23 September 2026'], ['31 March 2026', '23 December 2026'], ['30 June 2026', '23 March 2027'], ['30 September 2026', '23 June 2027']] },
      { type: 'p', text: 'Late filing brings a surcharge on the tax due and can restrict certain reliefs, so it is worth treating the date as fixed.' },
      { type: 'h2', id: 'preliminary', text: 'Preliminary tax' },
      { type: 'p', text: 'Most companies also pay preliminary tax before the year has ended. A small company, broadly one whose corporation tax for the previous year was €200,000 or less, usually pays in one instalment by the 23rd of the eleventh month of the accounting period. Larger companies pay in two instalments, in the sixth and eleventh months. A newly trading company with a small first-year liability may not need to pay preliminary tax at all in its first period.' },
      { type: 'h2', id: 'b1', text: 'The CRO B1 annual return' },
      { type: 'p', text: 'Every Irish company, including dormant and non-trading companies, files a B1 annual return with the Companies Registration Office. It is due within 56 days of the Annual Return Date. Most companies attach financial statements, and those must be signed and made up to a date no more than nine months before the Annual Return Date.' },
      { type: 'p', text: 'Because the Annual Return Date and the financial year-end are different dates, many directors only discover the B1 when a late filing penalty arrives. Missing it can also cost the company its audit exemption for two years.' },
      { type: 'h2', id: 'other', text: 'The other recurring dates' },
      { type: 'ul', items: ['VAT returns, usually every two months, by the 23rd of the following month through ROS.', 'Payroll submissions to Revenue each time employees are paid, with the monthly liability due by the 23rd.', 'The director’s Form 11, normally due by 31 October, with an extended date for ROS filers each November.', 'Updates to the Register of Beneficial Ownership when owners change.'] },
    ],
    faqs: [
      { q: 'When is the CT1 due in Ireland?', a: 'For ROS filers, by the 23rd of the ninth month after the accounting period ends. A 31 December year-end gives 23 September.' },
      { q: 'Is the B1 due on the same date as the CT1?', a: 'No. The B1 is due within 56 days of the Annual Return Date set by the CRO, which is separate from the financial year-end.' },
      { q: 'Do dormant companies have to file?', a: 'Yes. Dormant companies still file the B1 and generally a CT1 unless Revenue has agreed otherwise.' },
    ],
    sources: [sources.ieCT1, sources.ieB1, sources.ieCT],
  },
  {
    slug: 'vat-registration-thresholds',
    title: 'VAT Registration Thresholds: Ireland, UK & Gibraltar',
    description: 'Ireland: €42,500 for services, €85,000 for goods. UK: £90,000. Gibraltar has no VAT. When you must register and what to watch for if you sell across borders.',
    headline: 'VAT registration thresholds in *Ireland, the UK and Gibraltar*',
    answer: 'In Ireland you must register for VAT once turnover exceeds €42,500 a year for services or €85,000 for goods. In the UK the threshold is £90,000 of taxable turnover in any rolling 12 months. Gibraltar has no VAT system, so local sales are not subject to VAT there.',
    published: '2026-10-26',
    updated: '2026-10-26',
    readMinutes: 5,
    topic: 'VAT',
    tool: { href: '/tools/vat-threshold-checker', label: 'Check your VAT position' },
    body: [
      { type: 'h2', id: 'summary', text: 'The thresholds side by side' },
      { type: 'table', head: ['Country', 'Registration threshold', 'How it is measured'], rows: [['Ireland (services)', '€42,500', 'Any continuous 12-month period'], ['Ireland (goods)', '€85,000', 'Where 90% or more of turnover is from goods'], ['United Kingdom', '£90,000', 'Rolling 12 months, or expected in the next 30 days alone'], ['Gibraltar', 'No VAT', 'Gibraltar does not operate a VAT system']] },
      { type: 'h2', id: 'ireland', text: 'Ireland' },
      { type: 'p', text: 'Irish businesses supplying services must register once turnover exceeds, or is likely to exceed, €42,500 in any continuous 12-month period. The €85,000 threshold applies only where at least 90% of turnover comes from supplying goods. Some activities have to register regardless of turnover, such as receiving certain services from abroad.' },
      { type: 'h2', id: 'uk', text: 'United Kingdom' },
      { type: 'p', text: 'UK businesses must register when taxable turnover for the previous 12 months goes over £90,000, or when they expect turnover in the next 30 days alone to exceed £90,000. Registration is due within 30 days of the end of the month in which the threshold was crossed. Businesses based outside the UK making taxable supplies there must usually register from the first sale.' },
      { type: 'h2', id: 'gibraltar', text: 'Gibraltar' },
      { type: 'p', text: 'Gibraltar does not have VAT. Its businesses are not part of the UK or Irish VAT systems, so where a Gibraltar company sells into the UK or the EU, the treatment depends on where the customer is and the type of supply.' },
      { type: 'h2', id: 'online', text: 'Selling online across borders' },
      { type: 'p', text: 'Distance sales of goods to consumers in other EU countries have a combined €10,000 EU-wide threshold. Above it, VAT is charged at the customer’s local rate, usually through the One Stop Shop (OSS) so that one return covers every EU country.' },
      { type: 'note', text: 'Registering voluntarily can make sense even below the threshold, for example if most of your customers are VAT-registered businesses. It is worth a conversation before you decide.' },
    ],
    faqs: [
      { q: 'What is the VAT threshold in Ireland in 2026?', a: '€42,500 for services and €85,000 for goods, where at least 90% of turnover is from goods.' },
      { q: 'What is the UK VAT threshold in 2026?', a: '£90,000 of taxable turnover in any rolling 12-month period.' },
      { q: 'Does Gibraltar charge VAT?', a: 'No. Gibraltar does not operate a VAT system.' },
    ],
    sources: [sources.ieVAT, sources.ukVAT, sources.giPwC],
  },
  {
    slug: 'how-to-switch-accountant',
    title: 'How to Switch Accountant in Ireland, the UK or Gibraltar',
    description: 'Switching accountant takes a few weeks and can happen at any point in the year. The steps, what to ask your current accountant for and how to time it.',
    headline: 'How to switch accountant *without missing a deadline*',
    answer: 'You can switch accountant at any point in the year. Your new accountant asks your current one for a handover, collects your latest accounts, returns and records, and picks up the next filing cycle, usually within two to four weeks and without you having to manage the conversation yourself.',
    published: '2026-10-26',
    updated: '2026-10-26',
    readMinutes: 4,
    topic: 'Switching',
    body: [
      { type: 'h2', id: 'when', text: 'When to switch' },
      { type: 'p', text: 'The easiest moment is just after a year-end filing, because the new accountant starts from a clean, agreed set of figures. That said, there is no bad time if the relationship is not working. What matters is that nobody loses sight of the next deadline during the handover.' },
      { type: 'h2', id: 'steps', text: 'The steps' },
      { type: 'ul', items: ['Choose your new accountant and agree the scope and fee in writing.', 'Give notice to your current accountant under the terms of your engagement letter.', 'Your new accountant writes to the old one for professional clearance and the handover information.', 'Agency access is updated with Revenue, HMRC or the Income Tax Office so the new accountant can file.', 'Records, bookkeeping access and the deadline calendar move across.', 'The next filing cycle is picked up, with any gaps flagged straight away.'] },
      { type: 'h2', id: 'documents', text: 'What gets handed over' },
      { type: 'ul', items: ['The last filed accounts and tax returns', 'Working papers and the trial balance', 'Bookkeeping software access or an export', 'Payroll records and employee details', 'Any open correspondence with the tax authority or registry', 'Registry details such as the Annual Return Date or confirmation statement date'] },
      { type: 'h2', id: 'cost', text: 'What it costs' },
      { type: 'p', text: 'At Shiel the switch itself is free. If the records are behind, catch-up bookkeeping is quoted at a published hourly rate before any work starts, so there are no surprises.' },
    ],
    faqs: [
      { q: 'Can I change accountant mid-year?', a: 'Yes. The new accountant picks up from your last filed accounts and the current records.' },
      { q: 'Do I need to tell my old accountant why I am leaving?', a: 'No. You give notice under your engagement terms and the new accountant handles the professional handover.' },
      { q: 'How long does it take?', a: 'Usually two to four weeks, depending on how quickly the previous accountant responds.' },
    ],
    sources: [],
  },
];

export const guideBySlug = Object.fromEntries(guides.map((g) => [g.slug, g]));
