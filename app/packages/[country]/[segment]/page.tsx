import { PackagesPage } from '@/components/ui/packages-page';
import { countryKeys, countryMeta, fromPrice, monthlyPlans, segmentKeys, segmentMeta, setupPlan, type CountryKey, type SegmentKey } from '@/lib/packages';
import { pageMeta } from '@/lib/seo';

export const dynamicParams = false;
export const generateStaticParams = () => countryKeys.flatMap((country) => segmentKeys.map((segment) => ({ country, segment })));

const titleCase: Record<SegmentKey, string> = { 'limited-company': 'Limited Company', 'sole-trader': 'Sole Trader', contractor: 'Contractor', ecommerce: 'E-commerce' };

type P = { params: Promise<{ country: string; segment: string }> };

const copy = (c: CountryKey, s: SegmentKey) => {
  const m = countryMeta[c];
  const label = segmentMeta[s].label;
  return {
    title: `${titleCase[s]} Accounting Packages in ${c === 'united-kingdom' ? 'the UK' : m.label} | Shiel`,
    description: `${label} accounting in ${m.label} from ${m.symbol}${fromPrice(c, s)} a month. ${segmentMeta[s].blurb} Published limits and a named accountant.`.slice(0, 160),
  };
};

export async function generateMetadata({ params }: P) {
  const { country, segment } = await params;
  const c = country as CountryKey;
  const s = segment as SegmentKey;
  return pageMeta({ ...copy(c, s), path: `/packages/${c}/${s}`, absoluteTitle: true });
}

export default async function Page({ params }: P) {
  const { country, segment } = await params;
  const c = country as CountryKey;
  const s = segment as SegmentKey;
  const m = countryMeta[c];
  const plans = monthlyPlans(c, s);
  const setup = setupPlan(c, s);
  const { title, description } = copy(c, s);
  const list = plans.map((p) => `${p.name.replace(/^LTD /, '')} at ${m.symbol}${p.price}`).join(', ');
  return (
    <PackagesPage
      country={c}
      segment={s}
      path={`/packages/${c}/${s}`}
      title={title}
      description={description}
      trail={[
        { name: 'Home', path: '/' },
        { name: 'Packages', path: '/packages' },
        { name: m.label, path: `/packages/${c}` },
        { name: segmentMeta[s].label, path: `/packages/${c}/${s}` },
      ]}
      headline={`${segmentMeta[s].label} packages in ${c === 'united-kingdom' ? 'the UK' : m.label}, *from ${m.symbol}${fromPrice(c, s)} a month*`}
      answer={`${segmentMeta[s].label} plans in ${m.label} are ${list} a month${setup ? `, with an optional one-off ${setup.name.toLowerCase()} at ${m.symbol}${setup.price}` : ''}. Every plan has a named accountant and published limits.`}
    />
  );
}
