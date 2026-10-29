import { PackagesPage } from '@/components/ui/packages-page';
import { countryKeys, countryMeta, fromPrice, type CountryKey } from '@/lib/packages';
import { pageMeta } from '@/lib/seo';

export const dynamicParams = false;
export const generateStaticParams = () => countryKeys.map((country) => ({ country }));

const copy = (c: CountryKey) => {
  const m = countryMeta[c];
  return {
    title: `Accounting Packages in ${c === 'united-kingdom' ? 'the UK' : m.label} from ${m.symbol}${fromPrice(c)} a Month`,
    description: `Fixed monthly accounting packages in ${m.label} for companies, sole traders, contractors and online sellers, from ${m.symbol}${fromPrice(c)} a month with a named accountant.`,
  };
};

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }) {
  const c = (await params).country as CountryKey;
  return pageMeta({ ...copy(c), path: `/packages/${c}` });
}

export default async function Page({ params }: { params: Promise<{ country: string }> }) {
  const c = (await params).country as CountryKey;
  const m = countryMeta[c];
  const { title, description } = copy(c);
  return (
    <PackagesPage
      country={c}
      path={`/packages/${c}`}
      title={title}
      description={description}
      trail={[{ name: 'Home', path: '/' }, { name: 'Packages', path: '/packages' }, { name: m.label, path: `/packages/${c}` }]}
      headline={`Accounting packages in ${c === 'united-kingdom' ? 'the UK' : m.label}, *from ${m.symbol}${fromPrice(c)} a month*`}
      answer={`From ${m.symbol}${fromPrice(c)} for a dormant or pre-trade company, ${m.symbol}${fromPrice(c, 'sole-trader')} for sole traders, ${m.symbol}${fromPrice(c, 'contractor')} for contractors and ${m.symbol}${fromPrice(c, 'ecommerce')} for online sellers. Build your price below.`}
    />
  );
}
