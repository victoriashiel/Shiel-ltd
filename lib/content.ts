import type { CountryKey, SegmentKey } from './packages';

// Page copy lives here so pages, search, sitemap and structured data all read
// from one place. Headlines mark their highlighted words with *asterisks*.

export type FAQ = { q: string; a: string };
export type Step = { title: string; text: string };
export type Source = { label: string; url: string };

export const sources = {
  ieCT: { label: 'Revenue: Corporation Tax rates', url: 'https://www.revenue.ie/en/companies-and-charities/corporation-tax-for-companies/corporation-tax-rates/index.aspx' },
  ieCT1: { label: 'Revenue: Tax and Duty Manual Part 47-06-01, return filing dates', url: 'https://www.revenue.ie/en/tax-professionals/tdm/income-tax-capital-gains-tax-corporation-tax/part-47/47-06-01.pdf' },
  ieB1: { label: 'CRO: Annual Return filing', url: 'https://cro.ie/annual-return/' },
  ieVAT: { label: 'Revenue: VAT registration thresholds', url: 'https://www.revenue.ie/en/vat/vat-registration/who-should-register-for-vat/what-are-the-vat-thresholds.aspx' },
  ukCT: { label: 'GOV.UK: Corporation Tax rates and reliefs', url: 'https://www.gov.uk/corporation-tax-rates' },
  ukMR: { label: 'GOV.UK: Marginal Relief for Corporation Tax', url: 'https://www.gov.uk/guidance/corporation-tax-marginal-relief' },
  ukAccounts: { label: 'GOV.UK: File your company’s annual accounts', url: 'https://www.gov.uk/file-your-company-annual-accounts' },
  ukCT600: { label: 'GOV.UK: Company Tax Returns', url: 'https://www.gov.uk/company-tax-returns' },
  ukPay: { label: 'GOV.UK: Pay your Corporation Tax bill', url: 'https://www.gov.uk/pay-corporation-tax' },
  ukCS: { label: 'GOV.UK: File your confirmation statement', url: 'https://www.gov.uk/file-your-confirmation-statement-with-companies-house' },
  ukVAT: { label: 'GOV.UK: When to register for VAT', url: 'https://www.gov.uk/register-for-vat' },
  giCT: { label: 'HM Government of Gibraltar: Income Tax Office, corporate tax', url: 'https://www.gibraltar.gov.gi/new/corporate' },
  giPwC: { label: 'PwC Worldwide Tax Summaries: Gibraltar', url: 'https://taxsummaries.pwc.com/gibraltar' },
  ukMTD: { label: 'GOV.UK: Making Tax Digital for Income Tax', url: 'https://www.gov.uk/government/collections/making-tax-digital-for-income-tax' },
  ukMTDStart: { label: 'GOV.UK: Using Making Tax Digital for Income Tax for the first time', url: 'https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax/using-making-tax-digital-for-income-tax-for-the-first-time' },
  ukIR35: { label: 'GOV.UK: Understanding off-payroll working (IR35)', url: 'https://www.gov.uk/guidance/understanding-off-payroll-working-ir35' },
  ukIR35Clients: { label: 'GOV.UK: Off-payroll working for clients', url: 'https://www.gov.uk/guidance/off-payroll-working-for-clients' },
  euOSS: { label: 'European Commission: The One Stop Shop', url: 'https://vat-one-stop-shop.ec.europa.eu/one-stop-shop_en' },
  euOSSPay: { label: 'European Commission: Declare and pay in OSS', url: 'https://vat-one-stop-shop.ec.europa.eu/one-stop-shop/declare-and-pay-oss_en' },
  ieIOSS: { label: 'Revenue: Import One Stop Shop (IOSS)', url: 'https://www.revenue.ie/en/vat/vat-ecommerce/import-oss/index.aspx' },
  ieDirectors: { label: 'CRO: Requirements for directors (Leaflet 36)', url: 'https://cro.ie/information-leaflets/requirements-for-directors-leaflet-36/' },
  ieRealLink: { label: 'Revenue: Tax and Duty Manual Misc.10, company incorporation and economic activity', url: 'https://www.revenue.ie/en/tax-professionals/tdm/income-tax-capital-gains-tax-corporation-tax/misc/misc-10-20190510091429.pdf' },
} satisfies Record<string, Source>;

/* ---------------------------------------------------------------- services */

export type Service = {
  slug: string;
  name: string;
  short: string;
  icon: 'file' | 'percent' | 'book' | 'users' | 'chart' | 'building' | 'globe';
  title: string;
  description: string;
  promise: string;
  answer: string;
  card: string;
  scope: Step[];
  checks?: Step[];
  questions?: string[];
  faqs: FAQ[];
  needs: Step[];
  // The client's side of the work, in three short steps.
  yourPart: string[];
  audiences: string[];
};

export const services: Service[] = [
  {
    slug: 'accounts',
    name: 'Company accounts',
    short: 'Accounts',
    icon: 'file',
    title: 'Year-End Company Accounts | Ireland, UK & Gibraltar',
    description: 'Year-end accounts prepared from reconciled records, kept in step with your company tax return and registry filing, by a named accountant on a fixed fee.',
    promise: 'Year-end accounts, *prepared and filed for you*',
    answer: 'Statutory accounts built from reconciled books, filed with the company registry and matched to your company tax return. You review and sign, and we handle the rest.',
    card: 'Statutory accounts built from reconciled books and filed alongside your company tax return.',
    scope: [
      { title: 'Year-end accounts', text: 'Statutory accounts in the format your company size and country require.' },
      { title: 'Balance sheet review', text: 'Every balance agreed to a statement, a schedule or a clear explanation.' },
      { title: 'Year-end adjustments', text: 'Accruals, prepayments, depreciation and stock, each one explained.' },
      { title: 'Tax-ready figures', text: 'Numbers that move straight into the company tax computation without rework.' },
      { title: 'Registry filing', text: 'Filing with the CRO, Companies House or Companies House Gibraltar where it is in scope.' },
      { title: 'Director questions', text: 'Help understanding the director’s loan account, dividends and what the accounts actually say.' },
    ],
    faqs: [
      { q: 'Can you take over accounts that are already late or incomplete?', a: 'Yes. We have taken over incomplete accounts four days before a deadline and had the company ready to file without an extension. We look at what exists, tell you what is missing and agree a plan before work starts.' },
      { q: 'Do I need to send everything at once?', a: 'No. We give you one checklist, collect what you have and follow up on gaps. Most clients find it easier because the bookkeeping has kept things current through the year.' },
      { q: 'Will the accounts match my tax return?', a: 'Yes. The same reconciled figures feed the accounts and the company tax return, which is the point of doing them together.' },
      { q: 'Does a company that is not trading still need accounts?', a: 'Yes. Dormant UK companies still file accounts with Companies House, and Irish companies file a CRO annual return every year even when they are not trading. We can prepare the simpler dormant or non-trading version so the company stays compliant.' },
    ],
    needs: [
      { title: 'Bank statements', text: 'Every business account for the full year, ending on your year-end date.' },
      { title: 'Sales and purchase invoices', text: 'Or access to your bookkeeping software if we do not already keep your books.' },
      { title: 'Loans and finance', text: 'Agreements for loans, hire purchase or leases, with the balance at year-end.' },
      { title: 'Assets bought or sold', text: 'Receipts for equipment, vehicles or property bought or sold in the year.' },
      { title: 'Stock at year-end', text: 'A count or a fair estimate on your year-end date, if you hold stock.' },
      { title: 'Personal spending and drawings', text: 'Anything you paid for the company personally, or took out that was not salary or dividends.' },
    ],
    yourPart: ['Send statements and paperwork', 'Answer a short list of questions', 'Approve and sign the accounts'],
    audiences: ['limited-companies', 'startups-new-companies', 'non-resident-directors'],
  },
  {
    slug: 'tax',
    name: 'Tax and compliance',
    short: 'Tax',
    icon: 'percent',
    title: 'Business & Personal Tax Returns | Shiel Accountants',
    description: 'Corporation tax, VAT, payroll taxes and personal returns in Ireland, the UK and Gibraltar, prepared from reconciled figures and reviewed before filing.',
    promise: 'Tax returns, *filed right and on time*',
    answer: 'Company, personal and VAT returns prepared from your accounts, with every relief checked before filing and a reminder ahead of each deadline.',
    card: 'Company, VAT and personal returns prepared from reconciled figures, with reliefs reviewed before filing.',
    scope: [
      { title: 'Company tax returns', text: 'CT1 in Ireland and Gibraltar, CT600 in the UK, from the final accounts.' },
      { title: 'Personal tax returns', text: 'Form 11, Self Assessment or the Gibraltar return for directors and sole traders.' },
      { title: 'VAT and indirect tax', text: 'Registration, returns and reconciliations, including OSS for online sellers.' },
      { title: 'Payroll taxes', text: 'The employer side of PAYE kept in line with payroll and the year-end accounts.' },
      { title: 'Registrations', text: 'The tax registrations a new or changing business needs, in the right order.' },
      { title: 'Planning reviews', text: 'Remuneration, timing and major costs looked at while there is still time to act.' },
    ],
    faqs: [
      { q: 'Can you find tax I have overpaid?', a: 'Sometimes, yes. One review uncovered €11,750 of overpaid tax a client could reclaim, and another took an expected €8,000 bill to nil once the treatment and reliefs were checked. Results depend on your circumstances, so we never promise a figure in advance.' },
      { q: 'Do you handle both the company and the director?', a: 'Yes. Director returns are included in company plans, because salary, dividends and benefits affect both sides.' },
      { q: 'Can you help with more than one country?', a: 'Yes. We set out which countries are involved and which returns each one needs, then bring in local specialist input where the rules call for it.' },
      { q: 'Do I need to file a personal tax return as a director?', a: 'Often, yes, but it depends on the country, how much of the company you own and how you are paid. We check this at the start and, where a return is needed, file it alongside the company’s so the salary and dividend figures match.' },
    ],
    needs: [
      { title: 'Your accounts or books', text: 'Company accounts, or income and expenses if you are a sole trader.' },
      { title: 'Other income', text: 'Rent, employment, pension, dividends or anything earned abroad.' },
      { title: 'End-of-year pay statements', text: 'Your P60 or Employment Detail Summary if you were on a payroll.' },
      { title: 'Tax already paid', text: 'Preliminary tax or payments on account made during the year.' },
      { title: 'Pension contributions', text: 'Personal contributions that can reduce your bill.' },
      { title: 'Access to your tax account', text: 'Authority for us to act as your agent with Revenue or HMRC.' },
    ],
    yourPart: ['Share your income details', 'Review the return before it is filed', 'Pay the tax due'],
    audiences: ['limited-companies', 'sole-traders', 'contractors-freelancers'],
  },
  {
    slug: 'bookkeeping',
    name: 'Bookkeeping',
    short: 'Bookkeeping',
    icon: 'book',
    title: 'Bookkeeping Services | Ireland, UK & Gibraltar | Shiel',
    description: 'Monthly bookkeeping with bank reconciliations, platform feeds and VAT-ready records, so you can use your numbers during the year and not only at year end.',
    promise: 'Bookkeeping, *done for you every month*',
    answer: 'Every bank, card and payment platform transaction coded and reconciled, so you always know where you stand and VAT returns and year-end are straightforward.',
    card: 'Monthly coding and reconciliations, so your books are current whenever you need them.',
    scope: [
      { title: 'Transaction bookkeeping', text: 'Sales, costs and transfers coded to a chart of accounts that fits your business.' },
      { title: 'Bank reconciliations', text: 'Every account and card agreed to its statement each period.' },
      { title: 'Payment platform feeds', text: 'Stripe, PayPal, Shopify and marketplace payouts split into sales, fees and refunds.' },
      { title: 'Customer and supplier balances', text: 'Who owes you and whom you owe, kept accurate.' },
      { title: 'VAT-ready records', text: 'Records coded so the VAT return comes straight out of the books.' },
      { title: 'Month-end review', text: 'A short check that the balances look right before the month closes.' },
    ],
    checks: [
      { title: 'Bank balances agree', text: 'Every account matches its statement.' },
      { title: 'Suspense stays small', text: 'Unknown items are chased, not parked.' },
      { title: 'Tax balances make sense', text: 'VAT and payroll liabilities match what was filed.' },
    ],
    faqs: [
      { q: 'Which software do you use?', a: 'We work in cloud bookkeeping software with bank feeds. If you already use a package, we review it with you first and agree how records will be shared.' },
      { q: 'How often are the books updated?', a: 'Monthly on most plans. The frequency and transaction limits are published on each package, so you know what to expect.' },
      { q: 'What counts as a transaction?', a: 'A bank item, settlement, purchase invoice or expense entry processed in the books. For online sellers, customer orders are not counted one by one.' },
      { q: 'Can you catch up on books that are months behind?', a: 'Yes. We look at how far behind the records are, quote the catch-up as a one-off job and then keep them current each month. You see the price before we start.' },
    ],
    needs: [
      { title: 'Bank feed access', text: 'A read-only connection to each business bank and card account.' },
      { title: 'Receipts as you go', text: 'Snap and forward them from your phone, so nothing piles up.' },
      { title: 'Sales platform reports', text: 'Stripe, PayPal, Shopify or marketplace payout access.' },
      { title: 'Answers to our queries', text: 'A short batch of questions each month about anything unclear.' },
      { title: 'Opening balances', text: 'Your last accounts or trial balance if you are switching to us.' },
    ],
    yourPart: ['Connect your bank once', 'Snap your receipts', 'Answer the monthly queries'],
    audiences: ['sole-traders', 'ecommerce-sellers', 'limited-companies'],
  },
  {
    slug: 'payroll',
    name: 'Payroll',
    short: 'Payroll',
    icon: 'users',
    title: 'Payroll Services for Small Businesses | Shiel Accountants',
    description: 'Payroll runs, starters and leavers, director pay and employer reporting in Ireland, the UK and Gibraltar, connected to your bookkeeping and year-end accounts.',
    promise: 'Payroll, *run on time every pay day*',
    answer: 'Payslips, starters and leavers, director pay and employer reporting, handled for a team of one or many and checked before anyone is paid.',
    card: 'Regular payroll runs and employer reporting, reviewed before payday and posted to your books.',
    scope: [
      { title: 'Regular payroll runs', text: 'Weekly, fortnightly or monthly, depending on your plan.' },
      { title: 'Starters and leavers', text: 'Registrations, final pay and the paperwork each change requires.' },
      { title: 'Variable pay', text: 'Overtime, bonuses, commission and expenses handled consistently.' },
      { title: 'Director payroll', text: 'Director salary set up with the company and personal tax position in view.' },
      { title: 'Employer reporting', text: 'PAYE reporting to Revenue, HMRC or the Income Tax Office each period.' },
      { title: 'Payroll reconciliations', text: 'Payroll liabilities agreed to what was reported and paid.' },
    ],
    checks: [
      { title: 'Changes are complete', text: 'Every starter, leaver and pay change is in before the run.' },
      { title: 'The run is reviewed', text: 'Totals compared to the last period, with differences explained.' },
      { title: 'The books are updated', text: 'Wages and liabilities posted so the accounts stay current.' },
    ],
    faqs: [
      { q: 'Can you fix payroll that has gone wrong in the past?', a: 'Yes. We corrected historic payroll issues for one client and recovered €17,200 in the process. We review the history first and explain what can be put right.' },
      { q: 'Is payroll included in my package?', a: 'On most company plans, yes, up to the employee number shown. Extra employees are a published add-on at 20 a month each in your currency.' },
      { q: 'Do you handle director-only payroll?', a: 'Yes. Many of our company clients run payroll for the director alone, set at a level that works with their personal tax.' },
      { q: 'What happens when someone joins or leaves?', a: 'Send us their details before the payroll cut-off and we handle the rest, including the starter or leaver reporting to Revenue or HMRC and the final payslip.' },
    ],
    needs: [
      { title: 'Employer registration', text: 'Your PAYE or employer number, or we can register you.' },
      { title: 'Employee details', text: 'Full names, dates of birth, addresses and PPS or National Insurance numbers.' },
      { title: 'Pay rates and pay day', text: 'Salaries or hourly rates, and how often you pay.' },
      { title: 'Changes before each run', text: 'Hours, overtime, bonuses, starters, leavers and leave, by the agreed cut-off.' },
      { title: 'Previous payroll records', text: 'Year-to-date figures if you are moving from another provider.' },
      { title: 'Pension scheme details', text: 'Your workplace pension provider, where one applies.' },
    ],
    yourPart: ['Send changes by the cut-off', 'Approve each run', 'Pay your team'],
    audiences: ['limited-companies', 'non-resident-directors', 'startups-new-companies'],
  },
  {
    slug: 'advisory',
    name: 'Advisory and growth',
    short: 'Advisory',
    icon: 'chart',
    title: 'Management Accounts & Business Advisory | Shiel',
    description: 'Management accounts, cash-flow forecasts, budgets and margin analysis for growing companies in Ireland, the UK and Gibraltar, so you decide with the numbers.',
    promise: 'Know the numbers *before you decide*',
    answer: 'Management accounts, cash-flow forecasts and side-by-side scenarios that show what a price rise, a new hire or a big purchase would do to your profit and cash.',
    card: 'Management accounts, forecasts and margin analysis for the decisions you are making now.',
    scope: [
      { title: 'Management accounts', text: 'Monthly or quarterly reporting that shows profit, cash and trends.' },
      { title: 'Cash-flow forecasting', text: 'A rolling view of what is coming in and going out over the next months.' },
      { title: 'Budgets and variance', text: 'A plan for the year and a clear explanation when reality differs.' },
      { title: 'Margin analysis', text: 'Which products, services or clients actually make you money.' },
      { title: 'Decision modelling', text: 'Hiring, pricing, investment or restructuring tested before you act.' },
      { title: 'Owner reporting', text: 'A short pack you can read in ten minutes and act on.' },
    ],
    questions: ['What happens if we raise prices?', 'Can the business afford the next hire?', 'Which part of the business deserves more investment?', 'Why is profit up while cash is down?'],
    faqs: [
      { q: 'Do I need to move all my accounting to you?', a: 'No. Tell us what you need. We will say honestly whether a standalone advisory engagement or a wider package would serve you better.' },
      { q: 'Which plans include management reports?', a: 'Company Growth plans include quarterly management reports and Scale plans include monthly reports, with review calls on the same rhythm.' },
      { q: 'Is this only for larger companies?', a: 'No. Owner-managed companies often benefit most, because one good decision on pricing or hiring is worth far more than the fee.' },
      { q: 'What does a management accounts pack include?', a: 'A profit and loss account, balance sheet and cash position for the period, compared with budget or last year, plus a short note on what changed and what to watch. Forecasts and scenarios are added where your plan includes them.' },
    ],
    needs: [
      { title: 'Up-to-date books', text: 'Or let us keep them for you through bookkeeping.' },
      { title: 'The decision you are weighing', text: 'Hiring, pricing, a big purchase, a loan or a new market.' },
      { title: 'Known income and costs ahead', text: 'Contracts, planned spending and seasonal patterns.' },
      { title: 'Bank balances and borrowing', text: 'Overdrafts, loans and what customers owe you.' },
      { title: 'Time to review together', text: 'A regular slot to go through the numbers with your accountant.' },
    ],
    yourPart: ['Tell us what you are deciding', 'Join the regular review', 'Make the call'],
    audiences: ['limited-companies', 'ecommerce-sellers', 'startups-new-companies'],
  },
  {
    slug: 'company-formation',
    name: 'Company formation',
    short: 'Formation',
    icon: 'building',
    title: 'Company Formation in Ireland, UK & Gibraltar | Shiel',
    description: 'Company formation with the tax registrations, ownership register, payroll and bookkeeping set up together, so your new company is ready to trade from day one.',
    promise: 'Set up your company, *ready to trade*',
    answer: 'We register the company, then set up the tax registrations, beneficial ownership filing, bookkeeping and payroll, so everything is in place before your first invoice.',
    card: 'Incorporation plus tax, ownership, payroll and bookkeeping setup, done together.',
    scope: [
      { title: 'Formation filing', text: 'The core information and registry filing to establish the company.' },
      { title: 'Owners and directors', text: 'Shareholders, directors and officers recorded correctly from the start.' },
      { title: 'Tax registrations', text: 'Corporation tax and, where needed, VAT registration once the company exists.' },
      { title: 'Payroll setup', text: 'Employer registration if the director or staff will be paid through payroll.' },
      { title: 'Beneficial ownership', text: 'The RBO, PSC or UBO register filing the jurisdiction requires.' },
      { title: 'Finance setup', text: 'Chart of accounts, bank feeds and the first year’s filing dates.' },
    ],
    faqs: [
      { q: 'Should I speak to an accountant before incorporating?', a: 'Yes, ideally. The choice of country, shareholders and year-end affects tax and filings for years, and it is far easier to set up well than to restructure later.' },
      { q: 'What does formation cost?', a: 'Formation is 495 in your currency plus the registry’s own fee. Registrations such as VAT or payroll are 125 each where they are not already part of your plan.' },
      { q: 'Can you help a non-resident director?', a: 'Yes, depending on the country and circumstances. We review the proposed setup before confirming what we can take on.' },
      { q: 'What happens after the company is formed?', a: 'We set up the tax registrations, bookkeeping and payroll the company needs, then walk you through the filing dates for the first year so nothing is missed.' },
    ],
    needs: [
      { title: 'Company name', text: 'Your first choice and a backup, so we can check availability.' },
      { title: 'Directors and shareholders', text: 'Names, addresses, dates of birth and nationality for each person.' },
      { title: 'Proof of identity and address', text: 'A passport or ID card and a recent utility bill for each person.' },
      { title: 'Registered office address', text: 'An address in the country where the company is registered.' },
      { title: 'What the business will do', text: 'A short description, used for the registry and tax registrations.' },
      { title: 'Share structure', text: 'How many shares there are and who owns them.' },
    ],
    yourPart: ['Choose a name', 'Share the people and address details', 'Sign the formation documents'],
    audiences: ['startups-new-companies', 'non-resident-directors', 'contractors-freelancers'],
  },
  {
    slug: 'international-accounting',
    name: 'International accounting',
    short: 'International',
    icon: 'globe',
    title: 'International & Cross-Border Accounting | Shiel',
    description: 'Accounting for owners, companies and income that cross borders between Ireland, the UK, Gibraltar and beyond, with local specialists where needed.',
    promise: 'Accounting *across more than one country*',
    answer: 'We keep your records consistent between countries, set out who files what and where, and work with your local advisers so nothing falls through the gaps.',
    card: 'Coordinated accounts and filings when your company, income or life spans more than one country.',
    scope: [
      { title: 'Jurisdiction review', text: 'Which countries are involved and what each one expects.' },
      { title: 'Cross-border coordination', text: 'One set of records shared sensibly between advisers.' },
      { title: 'Director and owner position', text: 'Pay, dividends and residence considered alongside the company.' },
      { title: 'Intercompany balances', text: 'Charges and balances between related companies kept tidy.' },
      { title: 'Indirect tax flags', text: 'Where cross-border sales may need VAT or other registrations.' },
      { title: 'Specialist input', text: 'Local specialists brought in for the questions that need them.' },
    ],
    faqs: [
      { q: 'Do you work with clients outside Europe?', a: 'Yes. Our core markets are Ireland, the UK and Gibraltar, and we look at other jurisdictions case by case, confirming scope before we accept the work.' },
      { q: 'Does living abroad change how my company is taxed?', a: 'Not automatically. It depends on where the company is managed, where the work happens and the rules of each country. We organise the facts first and say where local advice is needed.' },
      { q: 'Can you work with my adviser abroad?', a: 'Yes. We prepare the records they need and reconcile figures between advisers, so you are not translating one set of accounts into another.' },
      { q: 'Will I have one accountant for everything?', a: 'Yes. Your named accountant keeps the whole picture across countries and works with any local advisers, so you are not passing messages between firms yourself.' },
    ],
    needs: [
      { title: 'Where everything sits', text: 'The country of each director, shareholder, company and bank account.' },
      { title: 'Recent filings', text: 'The latest accounts and tax returns in each country.' },
      { title: 'Your local advisers', text: 'Contact details so we can work with them directly.' },
      { title: 'Agreements between entities', text: 'Recharges, loans or management fees between companies.' },
      { title: 'Time spent in each country', text: 'A rough travel record if residence could be a question.' },
    ],
    yourPart: ['Tell us where things are', 'Introduce your local advisers', 'Keep us posted on moves and travel'],
    audiences: ['non-resident-directors', 'ecommerce-sellers', 'contractors-freelancers'],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));


/* --------------------------------------------------------------- audiences */

// A worry in the visitor's own words, and what we do about it. `where` limits it to one country.
export type Worry = { say: string; fix: string; where?: string; guide?: string };
// One beat in a typical year with us.
export type Beat = { when: string; title: string; text: string };

export type Audience = {
  slug: string;
  name: string;
  // How the visitor would describe themselves, used to help them find their page.
  me: string;
  title: string;
  description: string;
  promise: string;
  answer: string;
  card: string;
  segment: SegmentKey;
  fit: string[];
  worries: Worry[];
  year: { title: string; beats: Beat[] };
  // The opening line of a WhatsApp message, so the accountant knows who is asking.
  hello: string;
  services: string[];
  faqs: FAQ[];
};

export const audiences: Audience[] = [
  {
    slug: 'limited-companies',
    name: 'Limited companies',
    me: 'I run a limited company',
    title: 'Accountants for Limited Companies | Shiel Accountants',
    description: 'Fixed monthly accounting for limited companies in Ireland, the UK and Gibraltar: bookkeeping, payroll, year-end accounts, company tax and director returns.',
    promise: 'Accountants for limited companies, *from €79 a month*',
    answer: 'Bookkeeping, payroll, year-end accounts, company tax and your own director’s return, looked after by one named accountant for a fixed monthly fee.',
    card: 'Accounts, company tax, payroll and director returns on one monthly fee.',
    segment: 'limited-company',
    fit: ['You run a trading, dormant or newly formed company.', 'You want the company and director tax handled together.', 'You would like one named person who knows the business.', 'You prefer a published fee to an hourly bill.'],
    worries: [
      { say: 'I pay an accountant and I’m still the one chasing deadlines.', fix: 'Your accountant tracks every company and director deadline and messages you well before anything is due.' },
      { say: 'I never know how much to take as salary and how much as dividends.', fix: 'We set director pay with your personal tax in view, then check it again before the year-end.' },
      { say: 'The books only get looked at once a year.', fix: 'On trading plans the books are kept monthly from your bank feeds, so you can see where the company stands at any point.' },
      { say: 'Every quick question turns into another bill.', fix: 'Questions are part of the fee. Message your accountant on WhatsApp and get an answer within one business day.' },
    ],
    year: {
      title: 'A year with us',
      beats: [
        { when: 'Every month', title: 'Books kept', text: 'Bank feeds reconciled and anything unclear sent to you as one short list.' },
        { when: 'Every pay day', title: 'Payroll run', text: 'Payslips issued and the payroll filing made for you and any staff.' },
        { when: 'After year-end', title: 'Accounts and company tax', text: 'Year-end accounts, the company tax return and the registry filing, from the same records.' },
        { when: 'Once a year', title: 'Your own return', text: 'Your director’s personal return, prepared with the company figures to hand.' },
      ],
    },
    hello: 'Hi Shiel, I run a limited company and would like a quote.',
    services: ['accounts', 'tax', 'payroll', 'bookkeeping'],
    faqs: [
      { q: 'What do you actually handle?', a: 'Bookkeeping, payroll, year-end accounts, the company tax return, the registry annual return, beneficial ownership upkeep and the director’s personal return, depending on your plan.' },
      { q: 'Do I still need to do the bookkeeping?', a: 'No. On trading plans we do it from your bank feeds. You answer the occasional question and keep receipts flowing.' },
      { q: 'Can you take over from my current accountant?', a: 'Yes, and switching is free. We contact your previous accountant for the handover and pick up the next filing cycle.' },
      { q: 'Will I have one person to contact?', a: 'Yes. Every client has a named accountant, reachable directly on WhatsApp, with a one business day response target.' },
    ],
  },
  {
    slug: 'sole-traders',
    name: 'Sole traders',
    me: 'I’m self-employed',
    title: 'Accountants for Sole Traders | Shiel Accountants',
    description: 'Bookkeeping and personal tax returns for sole traders in Ireland, the UK and Gibraltar, with VAT where needed and a one-off setup for new businesses.',
    promise: 'Accountants for sole traders, *from €99 a month*',
    answer: 'Your bookkeeping and tax return done for you, plus a clear figure for what to set aside during the year, from one named accountant.',
    card: 'Bookkeeping and your personal return, with a one-off setup if you are just starting.',
    segment: 'sole-trader',
    fit: ['You are self-employed or about to register.', 'You want to know what to set aside for tax.', 'You would rather not do your own return.', 'You may outgrow sole trader status and want advice when it matters.'],
    worries: [
      { say: 'I dread the tax bill because I never know what’s coming.', fix: 'With your books kept monthly, we give you a figure to set aside during the year, so the bill is never a surprise.' },
      { say: 'My receipts live in a drawer, if I keep them at all.', fix: 'Snap them and send them on WhatsApp or through your software. We match each one to your bank and file it.' },
      { say: 'Making Tax Digital has me worried.', fix: 'We keep your records in MTD-compatible software and tell you if and when the quarterly updates apply to you.', where: 'UK', guide: '/guides/making-tax-digital-income-tax' },
      { say: 'Should I be a limited company by now?', fix: 'We watch your profits and tell you when a company would leave you better off, with the numbers to show it.' },
    ],
    year: {
      title: 'A year with us',
      beats: [
        { when: 'Every month', title: 'Books kept', text: 'Income and costs matched to your bank, with receipts attached.' },
        { when: 'During the year', title: 'Set-aside figure', text: 'A running estimate of your tax, so the money is there when it is due.' },
        { when: 'When registered', title: 'VAT returns', text: 'Filed on time if you are over the threshold or choose to register.' },
        { when: 'Once a year', title: 'Your tax return', text: 'Prepared, explained and filed, with any payment on account set out.' },
      ],
    },
    hello: 'Hi Shiel, I’m self-employed and would like a quote.',
    services: ['bookkeeping', 'tax'],
    faqs: [
      { q: 'What do you actually handle?', a: 'Your bookkeeping, your personal tax return and, where your plan includes it, VAT returns and a small payroll.' },
      { q: 'Do I need bookkeeping every month?', a: 'It helps. Keeping records current means fewer surprises and a far easier return at the end of the year.' },
      { q: 'Can you tell me what to put aside for tax?', a: 'Yes. Because the books are current, we can give you a sensible figure to set aside during the year.' },
      { q: 'What if I should be a limited company instead?', a: 'We will tell you. When profits reach a level where a company makes sense, we explain the trade-offs and help you switch if you choose to.' },
    ],
  },
  {
    slug: 'contractors-freelancers',
    name: 'Contractors and freelancers',
    me: 'I contract through my own company',
    title: 'Accountants for Contractors & Freelancers | Shiel',
    description: 'Accounting for contractors and freelancers in Ireland, the UK and Gibraltar: company accounts, director pay, expenses and multi-client work on a fixed fee.',
    promise: 'Accountants for contractors, *from €129 a month*',
    answer: 'Company accounts, director pay, expenses and your tax returns handled together, whether you have one client or several.',
    card: 'Company accounts, director pay and expenses for contractors on one or many contracts.',
    segment: 'contractor',
    fit: ['You contract through your own company or plan to.', 'You work with one client or several at once.', 'You want salary, dividends and expenses set up sensibly.', 'You sometimes work in more than one country.'],
    worries: [
      { say: 'I’m not sure my pay is set up the right way.', fix: 'We set salary and dividends together with your personal tax in view, and look again when your rate or contract changes.' },
      { say: 'A new contract has landed and I don’t know where I stand on IR35.', fix: 'We look at how each contract is set up and tell you when the IR35 position needs a closer review.', where: 'UK', guide: '/guides/ir35-off-payroll-working-explained' },
      { say: 'My client deducts tax before they pay me.', fix: 'We record the withholding against each invoice and set it against the company’s tax bill, so none of it is lost.', where: 'Ireland' },
      { say: 'I work for several clients, sometimes in other countries.', fix: 'Every contract is tracked in one set of books, and we flag when working abroad could bring local tax or payroll into play.' },
    ],
    year: {
      title: 'A year with us',
      beats: [
        { when: 'Every invoice', title: 'Income tracked', text: 'Each contract’s income and costs kept apart inside one set of books.' },
        { when: 'Every month', title: 'Director pay', text: 'Salary run through payroll and dividends paperwork kept in order.' },
        { when: 'Every quarter', title: 'VAT returns', text: 'Prepared from the books and filed for you when your plan includes VAT.' },
        { when: 'Once a year', title: 'Accounts and returns', text: 'Company accounts, company tax and your personal return, done together.' },
      ],
    },
    hello: 'Hi Shiel, I’m a contractor and would like a quote.',
    services: ['tax', 'accounts', 'payroll'],
    faqs: [
      { q: 'Can you handle more than one client or contract?', a: 'Yes. We track each contract’s income and costs inside one set of books.' },
      { q: 'Do you deal with director salary and expenses?', a: 'Yes. We set salary and dividends with your personal tax in view and keep expense claims properly supported.' },
      { q: 'What if I work in more than one country?', a: 'We map where the work happens and flag where local tax or payroll may need checking before it becomes a problem.' },
      { q: 'Can you take over mid-contract?', a: 'Yes. We pick up from your last accounts and records without interrupting your invoicing.' },
    ],
  },
  {
    slug: 'ecommerce-sellers',
    name: 'E-commerce sellers',
    me: 'I sell online',
    title: 'Accountants for E-commerce & Online Sellers | Shiel',
    description: 'E-commerce accounting for Shopify, Amazon, Stripe and PayPal sellers in Ireland, the UK and Gibraltar: payout reconciliation, OSS VAT and stock accounting.',
    promise: 'Accountants for online sellers, *from €179 a month*',
    answer: 'We reconcile every platform payout back to sales, fees and refunds, handle VAT including OSS, and show you the margin you are actually making.',
    card: 'Payout reconciliation, OSS VAT and stock accounting for online stores.',
    segment: 'ecommerce',
    fit: ['You sell through Shopify, Amazon, Etsy or your own site.', 'Payouts land in the bank net of fees and refunds.', 'You sell to customers in other countries.', 'You hold stock and want to know your real margins.'],
    worries: [
      { say: 'My bank shows payouts, not sales.', fix: 'We break each payout back into sales, platform fees, refunds and chargebacks, so the accounts show what really happened.' },
      { say: 'I sell to customers all over the EU.', fix: 'We file your OSS returns and tell you when holding stock abroad, in a marketplace warehouse for example, needs a local VAT registration too.', guide: '/guides/eu-vat-one-stop-shop-oss' },
      { say: 'I don’t know what I make on each order.', fix: 'With stock and cost of sales accounted for, you see margin after fees, postage and returns, not just revenue.' },
      { say: 'Every new marketplace adds more admin.', fix: 'Each new channel feeds the same books, from Shopify and Amazon to Etsy, eBay, Stripe and PayPal.' },
    ],
    year: {
      title: 'A year with us',
      beats: [
        { when: 'Every payout', title: 'Reconciled', text: 'Sales, fees and refunds matched for every platform and processor.' },
        { when: 'Every quarter', title: 'VAT and OSS', text: 'Domestic VAT and OSS returns prepared from the same figures.' },
        { when: 'As you grow', title: 'Margin reporting', text: 'Stock and cost of sales tracked so you can see profit by period.' },
        { when: 'Once a year', title: 'Accounts and tax', text: 'Year-end accounts and returns, with stock valued properly.' },
      ],
    },
    hello: 'Hi Shiel, I sell online and would like a quote.',
    services: ['bookkeeping', 'tax', 'advisory'],
    faqs: [
      { q: 'Can you handle multiple sales channels?', a: 'Yes. We reconcile several platforms and processors so sales, fees, refunds and settlements stay consistent.' },
      { q: 'What about Shopify, Stripe, PayPal or marketplaces?', a: 'Yes. We reconcile settlement data, so bank deposits are never booked as unexplained sales income.' },
      { q: 'Can you help with cross-border VAT?', a: 'Yes. The treatment depends on where the goods are, where the customer is and whether the sale goes through a marketplace. We handle OSS and IOSS and flag when another registration may be needed.' },
      { q: 'Do you work with growing stores?', a: 'Yes. Plans run from a single platform up to multi-channel, multi-currency stores with monthly management reports.' },
    ],
  },
  {
    slug: 'non-resident-directors',
    name: 'Non-resident directors',
    me: 'I live abroad, my company doesn’t',
    title: 'Accounting for Non-resident Directors | Shiel',
    description: 'Accounting for directors who live outside the country their company is registered in: company accounts, director pay and cross-border adviser coordination.',
    promise: 'Accounting for directors who *live abroad*',
    answer: 'Your company’s accounts, director pay and filings handled where it is registered, with your personal tax position checked alongside and your advisers abroad kept in the loop.',
    card: 'Company accounts and director pay kept connected when you live somewhere else.',
    segment: 'limited-company',
    fit: ['You live in a different country from your company.', 'You want company and personal tax looked at together.', 'You travel for work and are unsure when local rules apply.', 'You already have advisers in more than one country.'],
    worries: [
      { say: 'Does living abroad change where my company pays tax?', fix: 'Where a company is run from can affect where it is tax resident. We set out the facts and tell you when local advice is needed.' },
      { say: 'My Irish company has no director living in the EEA.', fix: 'It will generally need a non-resident director bond or proof of a real link to Ireland. We tell you which applies and handle the filing.', where: 'Ireland', guide: '/guides/irish-company-non-resident-director' },
      { say: 'I’m paid by the company in one country and live in another.', fix: 'Director pay can be taxed where the company is as well as where you live. We check the payroll treatment before it runs.' },
      { say: 'My advisers in each country don’t talk to each other.', fix: 'We prepare the figures your adviser abroad needs and reconcile both sides, so nothing falls between them.' },
    ],
    year: {
      title: 'A year with us',
      beats: [
        { when: 'Every month', title: 'Books kept', text: 'Company records kept current, wherever you happen to be.' },
        { when: 'Every pay run', title: 'Director pay checked', text: 'Payroll processed with the cross-border treatment confirmed first.' },
        { when: 'After year-end', title: 'Company filings', text: 'Accounts, company tax and the registry return in the company’s country.' },
        { when: 'Once a year', title: 'Your adviser briefed', text: 'Figures for your personal return abroad, sent in the format they need.' },
      ],
    },
    hello: 'Hi Shiel, I’m a director living outside my company’s country and would like a quote.',
    services: ['international-accounting', 'payroll', 'accounts'],
    faqs: [
      { q: 'Does living abroad change how the company is taxed?', a: 'Not automatically. It depends on where the company is managed, where activity takes place and the rules of each country. We organise the facts and say where local advice is needed.' },
      { q: 'What about my director salary or fees?', a: 'Director pay can raise payroll and tax questions in more than one country. We make sure the local treatment is checked before pay is processed.' },
      { q: 'Can you work with my accountant abroad?', a: 'Yes. We prepare the records they need and reconcile figures between advisers.' },
      { q: 'Can you take over an existing company?', a: 'Yes. We review the latest accounts, payroll and filings, then map any cross-border points before the next deadline.' },
    ],
  },
  {
    slug: 'startups-new-companies',
    name: 'Start-ups and new companies',
    me: 'I’m starting a company',
    title: 'Accountants for Start-ups & New Companies | Shiel',
    description: 'Accounting for new companies in Ireland, the UK and Gibraltar: formation, registrations, bookkeeping setup and first-year deadlines, from €79 a month.',
    promise: 'Accountants for new companies, *from day one*',
    answer: 'We form the company, register it for tax, set up the books and keep track of your first-year deadlines, on plans from €79 a month while you get going.',
    card: 'Formation, registrations and first-year setup, with low-cost plans before you trade.',
    segment: 'limited-company',
    fit: ['You are about to form a company or just have.', 'You have not started trading yet.', 'You want registrations done in the right order.', 'You would like your first-year deadlines in one place.'],
    worries: [
      { say: 'I don’t know what to register for, or when.', fix: 'We handle the tax, VAT, payroll and beneficial ownership registrations in the right order and explain what each one means.' },
      { say: 'We haven’t started trading yet.', fix: 'The Dormant and Pre-trade plan covers the filings a non-trading company still has, until you are ready to move up.' },
      { say: 'I’m worried about missing a first-year deadline.', fix: 'First-year dates follow different rules from later years. We put every one in your calendar from the day you incorporate.' },
      { say: 'I’m not sure which country to set up in.', fix: 'We form companies in Ireland, the UK and Gibraltar, and walk you through the trade-offs before you commit.' },
    ],
    year: {
      title: 'Your first year',
      beats: [
        { when: 'Day one', title: 'Company formed', text: 'Incorporation, constitution and the beneficial ownership filing.' },
        { when: 'First weeks', title: 'Registered for tax', text: 'Company tax, VAT and payroll registrations, in the order you need them.' },
        { when: 'First sale', title: 'Books running', text: 'Bank feeds and software set up so every transaction is captured.' },
        { when: 'First year-end', title: 'First accounts', text: 'Your first accounts, tax return and annual return, with dates tracked from day one.' },
      ],
    },
    hello: 'Hi Shiel, I’m starting a company and would like some help.',
    services: ['company-formation', 'bookkeeping', 'advisory'],
    faqs: [
      { q: 'Should I speak to an accountant before incorporating?', a: 'Yes, if you can. Country, shareholders and year-end are far easier to get right at the start than to change later.' },
      { q: 'Can you handle the formation and the accounting?', a: 'Yes. Formation flows straight into an ongoing plan so nothing is set up twice.' },
      { q: 'When should the bookkeeping start?', a: 'From the first transaction. Starting early costs little and avoids an expensive catch-up later.' },
      { q: 'What if the company has not started trading?', a: 'Our Dormant and Pre-trade plan covers the filings a non-trading company still has, from €79 a month in Ireland, £49 in the UK and £69 in Gibraltar.' },
    ],
  },
];

export const audienceBySlug = Object.fromEntries(audiences.map((a) => [a.slug, a]));

/* --------------------------------------------------------------- countries */

// `who` says which kinds of business file it: companies (including contractor and
// online-seller companies) or sole traders.
export type Filing = { code: string; name: string; authority: string; who: ('company' | 'sole')[]; when: string; text: string; source?: Source };

export type Country = {
  key: CountryKey;
  name: string;
  title: string;
  description: string;
  promise: string;
  answer: string;
  authorities: [string, string];
  facts: { value: string; label: string; text: string; source: Source }[];
  // Every recurring filing, who it applies to and when, so visitors can see their own year.
  filings: Filing[];
  // How a move from another local accountant works in this country.
  switching: Step[];
  faqs: FAQ[];
};

export const countries: Country[] = [
  {
    key: 'ireland',
    name: 'Ireland',
    title: 'Accountants in Ireland | Revenue & CRO | Shiel',
    description: 'Accountants for Irish companies and sole traders: CT1, CRO B1, Form 11, VAT and payroll on fixed monthly fees from €79, with a named accountant.',
    promise: 'Accountants in Ireland, *from €79 a month*',
    answer: 'Your CT1, CRO annual return, VAT, payroll and Form 11, handled by a named accountant who deals with Revenue and the CRO for you.',
    authorities: ['Revenue', 'CRO'],
    facts: [
      { value: '12.5%', label: 'Trading corporation tax', text: 'The standard rate on trading income. Non-trading income is generally taxed at 25%.', source: sources.ieCT },
      { value: 'CT1', label: 'Company tax return', text: 'Filed through ROS by the 23rd of the ninth month after the accounting period ends.', source: sources.ieCT1 },
      { value: 'B1', label: 'CRO annual return', text: 'Required every year, including for companies that are not trading.', source: sources.ieB1 },
      { value: '56 days', label: 'B1 filing window', text: 'The usual window to file after the company’s Annual Return Date.', source: sources.ieB1 },
    ],
    filings: [
      { code: 'CT1', name: 'Corporation tax return', authority: 'Revenue', who: ['company'], when: '23rd of the 9th month after year-end', text: 'Filed on ROS, with any balance of tax paid at the same time.', source: sources.ieCT1 },
      { code: 'B1', name: 'CRO annual return', authority: 'CRO', who: ['company'], when: 'Within 56 days of your Annual Return Date', text: 'Filed every year with the financial statements, even if the company is not trading.', source: sources.ieB1 },
      { code: 'RBO', name: 'Beneficial ownership', authority: 'RBO', who: ['company'], when: 'Whenever ownership changes', text: 'The register of who ultimately owns or controls the company, kept up to date.' },
      { code: 'Form 11', name: 'Income tax return', authority: 'Revenue', who: ['company', 'sole'], when: '31 October, later if filed on ROS', text: 'Your personal return, with preliminary tax for the current year paid alongside.' },
      { code: 'VAT3', name: 'VAT return', authority: 'Revenue', who: ['company', 'sole'], when: 'Usually every two months', text: 'Due once you pass the registration threshold or choose to register.', source: sources.ieVAT },
      { code: 'PAYE', name: 'Payroll submissions', authority: 'Revenue', who: ['company', 'sole'], when: 'On or before every pay day', text: 'Reported in real time for directors and staff, with a monthly statement to pay.' },
    ],
    switching: [
      { title: 'Professional clearance', text: 'We write to your current accountant and collect the latest accounts, returns and working papers.' },
      { title: 'Agent access on ROS', text: 'We are linked to your Revenue record as your tax agent, so we can see what is filed and what is due.' },
      { title: 'Next filing covered', text: 'We check what is coming up with Revenue and the CRO and take the next deadline from there.' },
    ],
    faqs: [
      { q: 'Do you handle both Revenue and CRO work?', a: 'Yes. Where it is in your plan, we keep the accounts, CT1 and B1 cycle connected rather than treating each filing as a separate job.' },
      { q: 'Can you take over from another Irish accountant?', a: 'Yes. We review the latest accounts and tax position, agree the handover and pick up the next cycle. Switching is free.' },
      { q: 'Do you work with sole traders as well as companies?', a: 'Yes. We have separate plans for limited companies, sole traders, contractors and online sellers.' },
      { q: 'Can you help if part of the business is outside Ireland?', a: 'Yes. We coordinate the Irish accounting with overseas advisers and flag where extra registrations or local advice may be needed.' },
    ],
  },
  {
    key: 'united-kingdom',
    name: 'United Kingdom',
    title: 'UK Accountants | HMRC & Companies House | Shiel',
    description: 'Accountants for UK limited companies and sole traders: CT600, statutory accounts, Self Assessment, VAT and payroll on fixed monthly fees from £49.',
    promise: 'Accountants in the UK, *from £49 a month*',
    answer: 'Your CT600, Companies House accounts, VAT, payroll and Self Assessment, handled by a named accountant who deals with HMRC and Companies House for you.',
    authorities: ['HMRC', 'Companies House'],
    facts: [
      { value: '19–25%', label: 'Corporation tax', text: '19% on profits up to £50,000 and 25% above £250,000, with Marginal Relief in between.', source: sources.ukCT },
      { value: 'CT600', label: 'Company Tax Return', text: 'Due 12 months after the accounting period ends. Tax is usually due 9 months and 1 day after.', source: sources.ukCT600 },
      { value: '9 months', label: 'Accounts to Companies House', text: 'A private company’s usual deadline after its year-end, including dormant companies.', source: sources.ukAccounts },
      { value: '12 months', label: 'Confirmation statement', text: 'At least one confirmation statement is filed in every 12-month review period.', source: sources.ukCS },
    ],
    filings: [
      { code: 'CT600', name: 'Company Tax Return', authority: 'HMRC', who: ['company'], when: '12 months after year-end', text: 'The tax itself is usually due earlier, 9 months and 1 day after year-end.', source: sources.ukCT600 },
      { code: 'Accounts', name: 'Annual accounts', authority: 'Companies House', who: ['company'], when: '9 months after year-end', text: 'Filed every year, including by dormant companies.', source: sources.ukAccounts },
      { code: 'CS01', name: 'Confirmation statement', authority: 'Companies House', who: ['company'], when: 'At least once every 12 months', text: 'Confirms the company’s officers, shareholders and people with significant control.', source: sources.ukCS },
      { code: 'SA100', name: 'Self Assessment return', authority: 'HMRC', who: ['company', 'sole'], when: '31 January online', text: 'Your personal return, with payments on account on 31 January and 31 July where they apply.' },
      { code: 'MTD', name: 'Quarterly updates', authority: 'HMRC', who: ['sole'], when: 'Every quarter, once it applies to you', text: 'Making Tax Digital for Income Tax, phased in by income level from April 2026.' },
      { code: 'VAT', name: 'VAT return', authority: 'HMRC', who: ['company', 'sole'], when: 'Usually quarterly', text: 'Filed through MTD software once you are registered.', source: sources.ukVAT },
      { code: 'RTI', name: 'Payroll submissions', authority: 'HMRC', who: ['company', 'sole'], when: 'On or before every pay day', text: 'Real Time Information for directors and staff.' },
    ],
    switching: [
      { title: 'Professional clearance', text: 'We write to your current accountant and collect the latest accounts, returns and working papers.' },
      { title: 'HMRC agent authorisation', text: 'You approve us as your agent with HMRC, and we take over the Companies House authentication code.' },
      { title: 'Next filing covered', text: 'We check what is due with HMRC and Companies House and take the next deadline from there.' },
    ],
    faqs: [
      { q: 'Do you handle both HMRC and Companies House work?', a: 'Yes. Where it is in your plan, we keep the accounts, CT600 and Companies House filings connected.' },
      { q: 'Can you take over from another UK accountant?', a: 'Yes. We review your latest accounts, tax position and books, agree the handover and pick up the next cycle. Switching is free.' },
      { q: 'Do you support directors as well as the company?', a: 'Yes. Director payroll and Self Assessment are included where relevant, so company and personal tax are looked at together.' },
      { q: 'Can you help with a UK company if I live abroad?', a: 'Yes. We keep the UK company organised and coordinate with overseas advisers where your residence adds another layer.' },
    ],
  },
  {
    key: 'gibraltar',
    name: 'Gibraltar',
    title: 'Accountants in Gibraltar | ITO & Companies House | Shiel',
    description: 'Accountants for Gibraltar companies: annual accounts, Corporate Tax Return (CT1), PAYE and Companies House filings on fixed monthly fees from £69.',
    promise: 'Accountants in Gibraltar, *from £69 a month*',
    answer: 'Your Corporate Tax Return, annual accounts, PAYE and Companies House filings, handled by a named accountant who deals with the Income Tax Office for you.',
    authorities: ['Income Tax Office', 'Companies House'],
    facts: [
      { value: '15%', label: 'Corporation tax', text: 'The standard rate for accounting periods from 1 July 2024. Some utility and dominant-market businesses pay 20%.', source: sources.giPwC },
      { value: 'CT1', label: 'Corporate Tax Return', text: 'Due nine months after the end of the month in which the accounting period ends.', source: sources.giCT },
      { value: 'Annual', label: 'Companies House return', text: 'The annual return forms part of the recurring Companies House cycle.', source: sources.giCT },
      { value: 'Own VAT', label: 'Not UK or Irish VAT', text: 'Gibraltar does not follow the UK or Irish domestic VAT systems.', source: sources.giPwC },
    ],
    filings: [
      { code: 'CT1', name: 'Corporate Tax Return', authority: 'Income Tax Office', who: ['company'], when: '9 months after the end of the month your year ends', text: 'Filed with the company’s accounts.', source: sources.giCT },
      { code: 'Annual return', name: 'Companies House return', authority: 'Companies House', who: ['company'], when: 'Every year', text: 'Part of the recurring Companies House cycle, along with any accounts the company must file.', source: sources.giCT },
      { code: 'UBO', name: 'Beneficial ownership', authority: 'Companies House', who: ['company'], when: 'Whenever ownership changes', text: 'The register of the people who ultimately own or control the company, kept current.' },
      { code: 'Personal return', name: 'Personal tax return', authority: 'Income Tax Office', who: ['company', 'sole'], when: 'Each tax year, which runs July to June', text: 'Your own return, with payments on account set out in advance.' },
      { code: 'PAYE', name: 'Payroll', authority: 'Income Tax Office', who: ['company', 'sole'], when: 'Every month, plus an annual return', text: 'Deductions for directors and staff paid over, with the employer’s year-end return.' },
    ],
    switching: [
      { title: 'Professional clearance', text: 'We write to your current accountant and collect the latest accounts, returns and working papers.' },
      { title: 'Authorised with the ITO', text: 'You authorise us to act for you with the Income Tax Office, so we can deal with them directly.' },
      { title: 'Next filing covered', text: 'We check what is due with the Income Tax Office and Companies House and take the next deadline from there.' },
    ],
    faqs: [
      { q: 'Do you handle both Income Tax Office and Companies House work?', a: 'Yes. Where it is in your plan, we keep the accounts, Corporate Tax Return and Companies House filings connected.' },
      { q: 'Can you take over from another Gibraltar accountant?', a: 'Yes. We review the latest accounts and tax position, agree the handover and pick up the next cycle.' },
      { q: 'Do you work with directors who live outside Gibraltar?', a: 'Yes. We keep the company organised and coordinate with advisers where your residence adds another jurisdiction.' },
      { q: 'Does Gibraltar have the same VAT as the UK or Ireland?', a: 'No. Gibraltar is outside both domestic VAT systems, so where cross-border sales matter we look at the actual transaction flow.' },
    ],
  },
];

export const countryByKey = Object.fromEntries(countries.map((c) => [c.key, c])) as Record<CountryKey, Country>;

/* --------------------------------------------------------- people & proof */

export type Person = { slug: string; name: string; role: string; bio: string; specialties: string[]; countries: string[]; photo?: string };

export const team: Person[] = [
  { slug: 'thomas-langford', name: 'Thomas Langford', role: 'Managing Partner', bio: 'Thomas leads strategic tax planning and advice on more complex structures. He keeps the wider client position in view and oversees the quality review of our work.', specialties: ['Strategic tax planning', 'Complex structures', 'Client advice', 'Quality review'], countries: ['Ireland', 'United Kingdom', 'Gibraltar'], photo: '/team/thomas-langford.webp' },
  { slug: 'victoria-locke', name: 'Victoria Locke', role: 'Senior Tax Consultant', bio: 'Victoria supports Irish businesses and individuals with corporation tax, personal tax and self-assessment, including VAT, RCT and the reliefs and exemptions that apply to each client.', specialties: ['Irish corporation tax', 'Personal tax', 'VAT', 'RCT', 'Irish reliefs'], countries: ['Ireland'], photo: '/team/victoria-locke.webp' },
  { slug: 'amelia-fraser', name: 'Amelia Fraser', role: 'Junior Tax Consultant', bio: 'Amelia works on the detail behind corporate tax decisions, from elections and reliefs to group structures and timing, with a particular focus on Gibraltar and cross-border planning.', specialties: ['Corporate elections and reliefs', 'Group structures', 'Gibraltar tax', 'Cross-border tax'], countries: ['Gibraltar', 'United Kingdom'], photo: '/team/amelia-fraser.webp' },
  { slug: 'daniel-brooks', name: 'Daniel Brooks', role: 'Tax Advisor', bio: 'Daniel helps individuals and businesses with personal and corporate tax compliance and planning, and with understanding the reliefs that apply to their position.', specialties: ['Personal tax', 'Corporate tax', 'Tax planning', 'Reliefs and exemptions'], countries: ['United Kingdom', 'Ireland'], photo: '/team/daniel-brooks.webp' },
  { slug: 'elena-rossi', name: 'Elena Rossi', role: 'Accounts and Compliance Manager', bio: 'Elena brings together the records, reporting and filings that keep accounts in order, from day-to-day bookkeeping and management accounts to VAT and annual filings.', specialties: ['Bookkeeping', 'Management accounts', 'VAT compliance', 'Annual filings'], countries: ['Ireland', 'United Kingdom', 'Gibraltar'], photo: '/team/elena-rossi.webp' },
];

export const results = [
  { figure: '€17,200', label: 'recovered', text: 'We corrected historic payroll issues and recovered €17,200 for the client.', service: 'payroll', image: '/results/payroll-recovered.webp' },
  { figure: '4 days', label: 'before the deadline', text: 'We took over incomplete accounts four days before the deadline and had the company ready to file without an extension.', service: 'accounts', image: '/results/four-days.webp' },
  { figure: '€11,750', label: 'overpaid tax found', text: 'One review uncovered €11,750 of overpaid tax the client had not realised they could reclaim.', service: 'tax', image: '/results/overpaid-tax.webp' },
  { figure: '€8,000 → €0', label: 'tax bill', text: 'A business expecting an €8,000 tax bill had a final liability of nil once the treatment and reliefs were reviewed.', service: 'tax', image: '/results/tax-bill-nil.webp' },
];

export const promises = [
  { title: 'A named accountant', text: 'One person who knows your business, reachable directly on WhatsApp.' },
  { title: 'Fixed monthly fees', text: 'Published prices and limits, agreed before work starts. No hourly billing.' },
  { title: 'Free switching', text: 'We handle the handover from your current accountant at no charge.' },
  { title: 'One business day', text: 'Our target for replying to every client message.' },
];

export const homeFaqs: FAQ[] = [
  { q: 'How much does an accountant cost with Shiel?', a: 'Plans start at €79 a month in Ireland, £49 in the UK and £69 in Gibraltar for dormant or pre-trade companies. Trading company plans start at €179, £149 and £169. Every price and limit is published on our packages pages.' },
  { q: 'Do you work with clients outside Europe?', a: 'Yes. Our core markets are Ireland, the UK and Gibraltar, and we consider other jurisdictions case by case, confirming the scope before we accept work.' },
  { q: 'Can you handle bookkeeping and payroll as well as the year-end?', a: 'Yes. Most plans include monthly bookkeeping and payroll, so the year-end accounts are built from records that are already current.' },
  { q: 'How do I switch accountant?', a: 'Tell us who looks after you now. We contact them for the handover, review the latest accounts and pick up the next filing cycle, and switching is free.' },
  { q: 'Can you help when more than one country is involved?', a: 'Yes. We map which countries are involved and what each one needs, keep the accounting consistent and bring in local specialists where the rules call for it.' },
];
