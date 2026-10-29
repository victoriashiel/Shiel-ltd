import { PackagesPage } from '@/components/ui/packages-page';
import { pageMeta } from '@/lib/seo';

const title = 'Accounting Packages & Prices | Shiel Accountants';
const description = 'Fixed monthly accounting packages from €79 in Ireland, £49 in the UK and £69 in Gibraltar, for companies, sole traders, contractors and online sellers.';
export const metadata = pageMeta({ title, description, path: '/packages', absoluteTitle: true });

export default function Page() {
  return (
    <PackagesPage
      path="/packages"
      title={title}
      description={description}
      trail={[{ name: 'Home', path: '/' }, { name: 'Packages', path: '/packages' }]}
      headline="Accounting packages, *from €79 a month*"
      answer="Plans start at €79 a month in Ireland, £49 in the UK and £69 in Gibraltar. Build your price below and see exactly what you would pay before you speak to anyone."
    />
  );
}
