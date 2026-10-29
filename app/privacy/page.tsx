import { LegalPage } from '@/components/ui/legal';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({ title: 'Privacy Policy', description: 'How Shiel Ltd, trading as Shiel Accountants, collects, uses and protects personal information from website visitors and enquiries.', path: '/privacy' });

export default function Page() {
  return <LegalPage kind="privacy" path="/privacy" />;
}
