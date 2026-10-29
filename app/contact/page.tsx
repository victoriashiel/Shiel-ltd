import { Clock, MessageCircle, ShieldCheck } from 'lucide-react';
import { Enquiry } from '@/components/tools/enquiry';
import { PageHero } from '@/components/ui/hero';
import { Button, Container, JsonLd, WhatsAppIcon } from '@/components/ui/primitives';
import { pageMeta, webPageLd } from '@/lib/seo';
import { whatsappLink } from '@/lib/site';

const title = 'Contact Shiel Accountants | WhatsApp or Enquiry';
const description = 'Message a Shiel accountant on WhatsApp or send a short enquiry about tax, bookkeeping, payroll or pricing. We reply within one business day.';
export const metadata = pageMeta({ title, description, path: '/contact', absoluteTitle: true });

export default function Page() {
  return (
    <>
      <JsonLd data={webPageLd({ path: '/contact', name: title, description, type: 'ContactPage' })} />
      <PageHero
        trail={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]}
        headline="Tell us what you *need help with*"
        answer="Message us on WhatsApp or send a short enquiry with where you are based and any deadline in view. Your named accountant replies within one business day, and we agree the scope and fee before any work starts."
        primary={null}
      >
        <div className="lift lift-3 mt-8">
          <Button href={whatsappLink('Hi Shiel, I would like to talk about accounting for my business.')} variant="whatsapp" icon="none">
            <WhatsAppIcon className="size-5" />
            Message us on WhatsApp
          </Button>
        </div>
      </PageHero>
      <Container className="relative z-10 -mt-6 pb-20 sm:-mt-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <Enquiry />
          <ul className="grid content-start gap-3">
            {[
              { Icon: Clock, t: 'One business day', d: 'Our target for replying to every message.' },
              { Icon: MessageCircle, t: 'A real accountant', d: 'You speak to the person who would look after you, not a sales team.' },
              { Icon: ShieldCheck, t: 'Nothing sensitive yet', d: 'Please leave out bank details, passwords and tax numbers. We arrange secure sharing once the scope is agreed.' },
            ].map(({ Icon, t, d }) => (
              <li key={t} className="card flex gap-4 p-5">
                <Icon className="mt-0.5 size-5 shrink-0 text-brand-ink" aria-hidden="true" />
                <div>
                  <p className="font-display font-semibold">{t}</p>
                  <p className="mt-1 text-sm text-muted">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
}
