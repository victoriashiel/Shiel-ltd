import Link from 'next/link';
import { ArrowUpRight, Building2, CheckCircle2, Globe2, Landmark, Plane, ShieldCheck } from 'lucide-react';
import { ClientPanel, PageHero } from '@/components/ui/hero';
import { FaqList, JsonLd, Section, SectionHead, Sources } from '@/components/ui/primitives';
import { sources } from '@/lib/content';
import { pageMeta, webPageLd } from '@/lib/seo';
import { site, whatsappLink } from '@/lib/site';

const title = 'International Structures: Bulgaria & Georgia | Shiel';
const description = 'Already registered in Ireland or setting up? With Sovereignty Global we help you explore whether a Bulgarian company, residency and Georgian banking could suit you.';
export const metadata = pageMeta({ title, description, path: '/countries/international', absoluteTitle: true });

const sg = site.partner.url;

// What Sovereignty Global handles, each linking to the matching page on their site.
const support = [
  { icon: Building2, title: 'Bulgarian company formation', text: 'A Bulgarian company set up and registered, usually in days once documents are ready.', href: `${sg}/company-formation` },
  { icon: Plane, title: 'Residency', text: 'Bulgarian residence and the steps to genuine tax residence, if you plan to move.', href: `${sg}/residency` },
  { icon: Landmark, title: 'Tax planning', text: 'A structure built around how you actually live and work, with real substance.', href: `${sg}/tax-strategy` },
  { icon: Globe2, title: 'International banking', text: 'Business and personal accounts in Bulgaria and Georgia, prepared for approval.', href: `${sg}/banking` },
];

const ours = ['Your Irish accounts, CT1 and B1 kept up to date', 'Your Irish tax position checked before anything moves', 'Closing down or continuing the Irish company properly', 'One set of figures shared with Sovereignty Global'];

const steps = [
  { title: 'A straight answer first', text: 'We look at your Irish position and tell you whether a move is worth exploring, or whether staying put is better.' },
  { title: 'Sovereignty Global plans it', text: 'If it is, they design the structure and handle the company, residency and banking.' },
  { title: 'Both sides kept in order', text: 'We look after the Irish filings through the change, so nothing is missed on either side.' },
];

const faqs = [
  { q: 'Is moving my business to Bulgaria legal?', a: 'Yes, when it is done properly. The structure has to reflect where you really live and where the business is really run, with full disclosure in every country involved. Moving on paper alone does not work and is not something we or Sovereignty Global will set up.' },
  { q: 'What tax rates apply in Bulgaria?', a: 'Bulgaria taxes company profits at a flat 10%, dividends at 5%, and personal income at a flat 10% for people who are genuinely tax resident there. Sovereignty Global confirms how these apply to your plans.' },
  { q: 'Do I have to move to Bulgaria?', a: 'Not always. Some clients only need a company or banking. The 10% personal rate does need genuine Bulgarian tax residence, which depends on where you live and spend your time.' },
  { q: 'What happens to my Irish company?', a: 'It depends on the plan. Some clients keep it, some close it down. Either way, we handle the Irish filings and make sure the Irish tax position is dealt with before and after the change.' },
  { q: 'Who is Sovereignty Global?', a: 'Our partner for international structures. They specialise in Bulgarian company formation, residency, tax planning and banking in Bulgaria and Georgia, while we look after the Irish side.' },
];

export default function Page() {
  return (
    <>
      <JsonLd data={webPageLd({ path: '/countries/international', name: title, description })} />
      <PageHero
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Countries', path: '/countries' },
          { name: 'International options', path: '/countries/international' },
        ]}
        headline="Could your business work *better elsewhere*?"
        answer="Already registered in Ireland, or considering setting up? Alongside our Irish accounting services, we work with Sovereignty Global to help you explore whether an international structure could suit your plans."
        primary={{ href: whatsappLink('Hi Shiel, I’d like to explore whether an international structure could suit my business.'), label: 'Talk it through' }}
        secondary={{ href: sg, label: 'Visit Sovereignty Global' }}
        aside={
          <div className="grid grid-cols-3 gap-2 rounded-[1.75rem] sm:gap-3 border border-white/12 bg-white/[0.06] p-4 shadow-2xl backdrop-blur-xl sm:p-5">
            <div className="rounded-2xl bg-black/20 p-3 sm:p-4">
              <p className="font-display text-3xl font-bold text-white sm:text-4xl">10%</p>
              <p className="text-xs text-on-band-muted sm:text-sm">Bulgarian corporate tax</p>
            </div>
            <div className="rounded-2xl bg-black/20 p-3 sm:p-4">
              <p className="font-display text-3xl font-bold text-white sm:text-4xl">10%</p>
              <p className="text-xs text-on-band-muted sm:text-sm">Bulgarian personal income tax, for residents</p>
            </div>
            <div className="rounded-2xl bg-black/20 p-3 sm:p-4">
              <p className="font-display text-3xl font-bold text-white sm:text-4xl">5%</p>
              <p className="text-xs text-on-band-muted sm:text-sm">Bulgarian tax on dividends</p>
            </div>
            <div className="col-span-3 flex items-center gap-3 rounded-2xl bg-mint/10 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={site.partner.logo} alt={site.partner.name} width={140} height={32} className="h-6 w-auto" />
              <p className="text-sm text-on-band-muted">Our partner for Bulgaria and Georgia</p>
            </div>
          </div>
        }
      />

      <Section label="Who does what">
        <SectionHead title="How we *work together*" lead="Sovereignty Global handles the international side. We keep your Irish side in order, before, during and after." />
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <ul className="grid gap-3 sm:grid-cols-2">
            {support.map((s) => (
              <li key={s.title}>
                <a href={s.href} target="_blank" rel="noopener" className="card card-hover group flex h-full flex-col p-5">
                  <span className="flex items-center justify-between">
                    <s.icon className="size-6 text-brand-bright" aria-hidden="true" />
                    <ArrowUpRight className="size-4 text-muted transition group-hover:text-ink" aria-hidden="true" />
                  </span>
                  <span className="mt-3 font-display font-semibold">{s.title}</span>
                  <span className="mt-1 text-sm text-muted">{s.text}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="band grain relative overflow-hidden rounded-[var(--radius)] p-5 sm:p-6">
            <p className="font-display font-semibold text-white">What Shiel looks after</p>
            <ul className="mt-4 grid gap-3">
              {ours.map((o) => (
                <li key={o} className="flex gap-3 text-on-band/90">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-mint" aria-hidden="true" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="muted" label="How it works">
        <SectionHead title="How it *works*" />
        <ol className="grid gap-3 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="reveal card flex gap-4 p-5 md:block">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-pale font-display font-bold text-brand-ink">{i + 1}</span>
              <div>
                <h3 className="text-lg md:mt-3">{s.title}</h3>
                <p className="mt-1 text-[0.95rem] text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 flex max-w-3xl gap-3 rounded-2xl border border-line bg-surface p-4 text-sm text-muted">
          <ShieldCheck className="size-5 shrink-0 text-brand-bright" aria-hidden="true" />
          <span>
            International structures only work with real substance: where you live, where decisions are made and where the work is done. Every arrangement is fully disclosed in each country involved.{' '}
            <a href={`${sg}/resources/legal-tax-reduction-vs-evasion`} target="_blank" rel="noopener" className="font-semibold text-brand-ink hover:underline">
              Legal tax reduction vs evasion
            </a>
          </span>
        </p>
      </Section>

      <Section label="Questions">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-[clamp(1.85rem,5.5vw,3rem)]">Frequently Asked Questions</h2>
            <Link href="/countries/ireland" className="link-arrow mt-6 inline-flex text-sm">
              Accounting in Ireland <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div>
            <FaqList faqs={faqs} />
            <Sources items={[sources.bgPwC]} updated={site.updatedLabel} />
          </div>
        </div>
      </Section>

      <ClientPanel title="Start with a *straight answer*" text="Tell us about your business and your plans. We will tell you honestly whether an international structure is worth exploring, before anyone spends a cent." />
    </>
  );
}
