import raw from './data/packages.json';

// Pricing snapshot taken from the live shiel.ltd package pages on 26 October 2026.

export type Plan = {
  name: string;
  strap: string;
  price: number;
  billing?: 'one-off';
  popular?: boolean;
  features: string[];
  details: string[];
  limits: string;
  limitsLabel?: string;
};

export type CountryKey = 'ireland' | 'united-kingdom' | 'gibraltar';
export type SegmentKey = 'limited-company' | 'sole-trader' | 'contractor' | 'ecommerce';

type RawSegment = { label: string; intro: string; plans: Plan[] };
type RawCountry = { label: string; symbol: string; note: string; segments: Record<string, RawSegment> };

const data = raw as unknown as Record<CountryKey, RawCountry>;

export const countryKeys: CountryKey[] = ['ireland', 'united-kingdom', 'gibraltar'];
export const segmentKeys: SegmentKey[] = ['limited-company', 'sole-trader', 'contractor', 'ecommerce'];

// The live URLs say "limited-company"; the snapshot keys it as "company".
const segmentDataKey: Record<SegmentKey, string> = {
  'limited-company': 'company',
  'sole-trader': 'sole-trader',
  contractor: 'contractor',
  ecommerce: 'ecommerce',
};

export const countryMeta: Record<CountryKey, { label: string; short: string; currency: 'EUR' | 'GBP'; symbol: string; bespoke: number }> = {
  ireland: { label: 'Ireland', short: 'IE', currency: 'EUR', symbol: '€', bespoke: 499 },
  'united-kingdom': { label: 'United Kingdom', short: 'UK', currency: 'GBP', symbol: '£', bespoke: 429 },
  gibraltar: { label: 'Gibraltar', short: 'GI', currency: 'GBP', symbol: '£', bespoke: 479 },
};

export const segmentMeta: Record<SegmentKey, { label: string; plural: string; blurb: string }> = {
  'limited-company': { label: 'Limited company', plural: 'Limited companies', blurb: 'From dormant and pre-trade companies to established teams with payroll and monthly reporting.' },
  'sole-trader': { label: 'Sole trader', plural: 'Sole traders', blurb: 'Bookkeeping and your personal tax return, with a one-off setup if you are just registering.' },
  contractor: { label: 'Contractor', plural: 'Contractors', blurb: 'For contractor companies working across one or several clients, with a one-off setup option.' },
  ecommerce: { label: 'E-commerce', plural: 'Online sellers', blurb: 'Platform and payout reconciliation, VAT including OSS, and stock accounting as you grow.' },
};

export function segment(country: CountryKey, seg: SegmentKey) {
  const s = data[country].segments[segmentDataKey[seg]];
  return { ...s, note: data[country].note, symbol: data[country].symbol };
}

export function monthlyPlans(country: CountryKey, seg: SegmentKey) {
  return segment(country, seg).plans.filter((p) => p.billing !== 'one-off');
}

export function setupPlan(country: CountryKey, seg: SegmentKey) {
  return segment(country, seg).plans.find((p) => p.billing === 'one-off');
}

export function fromPrice(country: CountryKey, seg?: SegmentKey) {
  const segs = seg ? [seg] : segmentKeys;
  return Math.min(...segs.flatMap((s) => monthlyPlans(country, s).map((p) => p.price)));
}

export function money(country: CountryKey, amount: number) {
  return `${countryMeta[country].symbol}${amount.toLocaleString('en-IE')}`;
}

// Short plan names drop the segment prefix ("LTD Growth" -> "Growth").
export function shortName(name: string) {
  return name.replace(/^(LTD|Sole Trader|Contractor|E-commerce)\s+/i, '');
}

export const companyCore: Record<CountryKey, string[]> = {
  ireland: ['Named accountant', 'Year-end accounts', 'Corporation Tax return (CT1)', 'CRO Annual Return (B1)', 'RBO maintenance', 'Director Form 11', 'VAT returns where registered', 'Cloud bookkeeping and bank feeds where relevant'],
  'united-kingdom': ['Named accountant', 'Statutory year-end accounts', 'Company Tax Return (CT600)', 'Companies House confirmation statement', 'PSC register maintenance', 'Director Self Assessment', 'VAT returns where registered', 'Cloud bookkeeping and bank feeds where relevant'],
  gibraltar: ['Named accountant', 'Annual accounts', 'Corporate Tax Return (CT1)', 'Companies House Annual Return', 'UBO register maintenance', 'Director personal tax return', 'PAYE and employer reporting where applicable', 'Cloud bookkeeping and bank feeds where relevant'],
};

type AddOn = [string, string];
const s = (c: CountryKey) => countryMeta[c].symbol;
const registry = { ireland: 'CRO fees', 'united-kingdom': 'Companies House fees', gibraltar: 'Companies House Gibraltar fees' } as const;

// Monthly extras a visitor can add in the price builder. `from` marks a starting price.
export type Extra = { id: string; label: string; unit: string; price: number; from?: boolean; max: number; segments?: SegmentKey[] };
export const extras: Extra[] = [
  { id: 'staff', label: 'Extra employee on payroll', unit: 'each', price: 20, max: 10 },
  { id: 'tx', label: '10 extra transactions a month', unit: 'per 10', price: 15, max: 10 },
  { id: 'platform', label: 'Additional sales platform', unit: 'each', price: 25, from: true, max: 5, segments: ['ecommerce'] },
  { id: 'feed', label: 'Additional bank or payment feed', unit: 'each', price: 15, from: true, max: 5 },
];
const extra = (id: string) => extras.find((x) => x.id === id)!.price;

export function addOns(c: CountryKey): { group: string; items: AddOn[] }[] {
  const $ = s(c);
  const personal = { ireland: 'Additional director Form 11', 'united-kingdom': 'Additional director Self Assessment', gibraltar: 'Additional director personal tax return' }[c];
  const ownership = { ireland: 'RBO registration', 'united-kingdom': 'PSC register support', gibraltar: 'UBO registration' }[c];
  const historicTax = c === 'gibraltar' ? 'Historical tax compliance review' : 'Historical VAT returns';
  return [
    { group: 'Volume and bookkeeping', items: [['10 extra accounting transactions', `${$}${extra('tx')} / month`], ['Additional sales platform or feed', `From ${$}${extra('platform')} / month`], ['Additional bank or payment feed', `From ${$}${extra('feed')} / month`]] },
    { group: 'Payroll and people', items: [['Extra employee on payroll', `${$}${extra('staff')} / month`], [personal, `${$}175 / year`]] },
    { group: 'Registrations and tax', items: [['VAT or payroll tax registration', `${$}125 each`], [ownership, `${$}99`], ['Tax compliance certificate', `${$}65`]] },
    { group: 'Catch-up and historical work', items: [['Catch-up bookkeeping', `${$}35 / hour`], ['Historical accounts', `From ${$}650 / year`], [historicTax, `From ${$}120`], ['Urgent filing (under 5 days)', `${$}275`]] },
    { group: 'Company changes', items: [['Company formation', `${$}495 + ${registry[c]}`], ['Business name registration', `${$}75 + ${registry[c]}`], ['Voluntary strike-off', `${$}325`], ['Non-resident director support', 'Quoted'], ['Registered office or company secretary', 'Quoted']] },
  ];
}

export const transactionDefinition =
  'An accounting transaction is a bank item, settlement, purchase invoice or expense entry processed in the books. For e-commerce, customer orders are not counted one by one. Small occasional overages do not force an immediate plan change.';

// Compact pricing for client components, so the full snapshot stays server-side.
export function teaserData() {
  return {
    countries: countryKeys.map((k) => ({ key: k, label: countryMeta[k].short === 'UK' ? 'UK' : countryMeta[k].label, symbol: countryMeta[k].symbol })),
    segments: segmentKeys.map((k) => ({ key: k, label: segmentMeta[k].label, blurb: segmentMeta[k].blurb })),
    plans: Object.fromEntries(
      countryKeys.map((c) => [c, Object.fromEntries(segmentKeys.map((s) => [s, monthlyPlans(c, s).map((p) => ({ name: shortName(p.name), price: p.price, popular: p.popular }))]))]),
    ),
  };
}

export function explorerData() {
  return {
    countries: countryKeys.map((k) => ({ key: k, label: countryMeta[k].short === 'UK' ? 'UK' : countryMeta[k].label, symbol: countryMeta[k].symbol, note: data[k].note, bespoke: countryMeta[k].bespoke })),
    segments: segmentKeys.map((k) => ({ key: k, label: segmentMeta[k].label })),
    plans: Object.fromEntries(
      countryKeys.map((c) => [
        c,
        Object.fromEntries(
          segmentKeys.map((s) => {
            const block = segment(c, s);
            return [
              s,
              {
                intro: block.intro,
                plans: block.plans.map((p) => ({
                  name: p.name,
                  short: shortName(p.name),
                  strap: p.strap,
                  price: p.price,
                  oneOff: p.billing === 'one-off',
                  popular: !!p.popular,
                  features: p.features,
                  details: p.details,
                  limits: p.limits,
                  limitsLabel: p.limitsLabel ?? 'Plan limits',
                })),
              },
            ];
          }),
        ),
      ]),
    ),
    core: companyCore as Record<string, string[]>,
    definition: transactionDefinition,
  };
}
