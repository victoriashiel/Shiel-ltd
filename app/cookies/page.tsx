import { LegalPage } from '@/components/ui/legal';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({ title: 'Cookie Policy', description: 'How the Shiel Accountants website uses cookies and similar technologies, and how to control them in your browser.', path: '/cookies' });

export default function Page() {
  return <LegalPage kind="cookies" path="/cookies" />;
}
