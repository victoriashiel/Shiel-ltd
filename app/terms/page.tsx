import { LegalPage } from '@/components/ui/legal';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({ title: 'Website Terms', description: 'The terms that apply to using the Shiel Accountants website, operated by Shiel Ltd.', path: '/terms' });

export default function Page() {
  return <LegalPage kind="terms" path="/terms" />;
}
