import Link from 'next/link';
import { ArrowRight, MessageCircle, Receipt, Repeat, UserRound } from 'lucide-react';
import { CountUp } from '@/components/tools/count-up';
import { ClientPanel, PageHero } from '@/components/ui/hero';
import { JsonLd, Section, SectionHead } from '@/components/ui/primitives';
import { promises, team } from '@/lib/content';
import { pageMeta, orgId, webPageLd } from '@/lib/seo';
import { proof, site } from '@/lib/site';

const title = 'About Shiel | A Family-Run Accounting Firm';
const description = 'Shiel is a family-run accounting firm with 12 people across Europe and five client-facing accountants, serving companies in Ireland, the UK and Gibraltar.';
export const metadata = pageMeta({ title, description, path: '/about', absoluteTitle: true });

const stats = [
  { value: proof.people, label: 'people across Europe' },
  { value: proof.accountants, label: 'client-facing accountants' },
  { value: parseInt(proof.years), suffix: '+', label: 'years in practice' },
  { value: 3, label: 'countries we file in' },
];

const chapters = [
  { h: 'Why we started', p: 'Small companies were stuck between big firms they could not afford and online packages with nobody to call. We set out to offer qualified accountants who know each client, at a fair, fixed price.' },
  { h: 'A family business', p: 'Shiel is our family name. The family runs the firm behind the scenes, and five client-facing accountants work with you all year.' },
  { h: 'Where we work', p: `${proof.people} of us across Europe, looking after companies in Ireland, the UK and Gibraltar, and clients further afield.` },
  { h: 'How we work', p: 'One named accountant, every deadline tracked, plain explanations and the fee agreed before any work starts.' },
];

const promiseIcons = [UserRound, Receipt, Repeat, MessageCircle];

export default function Page() {
  const pictured = team.filter((t) => t.photo);
  return (
    <>
      <JsonLd data={{ ...webPageLd({ path: '/about', name: title, description, type: 'AboutPage' }), mainEntity: { '@id': orgId } }} />
      <PageHero
        trail={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]}
        headline="A family business that *understands yours*"
        answer={`${site.name} is a family-run firm with ${proof.accountants} client-facing accountants, looking after companies, sole traders and online sellers in Ireland, the UK and Gibraltar on fixed, published fees.`}
        primary={{ href: '/about/team', label: 'Meet the team' }}
        secondary={{ href: '/contact', label: 'Talk to us' }}
        aside={
          <dl className="grid grid-cols-2 gap-3 rounded-[1.75rem] border border-white/12 bg-white/[0.06] p-4 shadow-2xl backdrop-blur-xl sm:p-5">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col rounded-2xl bg-black/20 p-4">
                <dt className="order-2 text-sm text-on-band-muted">{s.label}</dt>
                <dd className="font-display text-4xl font-bold text-white tabular-nums">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
            <div className="col-span-2 flex flex-col rounded-2xl bg-mint/10 p-4">
              <dt className="order-2 text-sm text-on-band-muted">recovered for clients in the last two years</dt>
              <dd className="font-display text-4xl font-bold text-mint">
                <CountUp value={parseInt(proof.recovered.replace(/\D/g, ''))} prefix="€" suffix="k+" />
              </dd>
            </div>
          </dl>
        }
      />

      <Section label="Our story">
        <SectionHead title="Our *story*" />
        <ol className="rail lg:mx-0 lg:grid lg:grid-flow-row lg:grid-cols-4 lg:overflow-visible lg:px-0" role="region" aria-label="Our story, swipe for more" tabIndex={0}>
          {chapters.map((c, i) => (
            <li key={c.h} className="card flex w-[78vw] max-w-xs shrink-0 flex-col p-5 lg:w-auto lg:max-w-none">
              <span className="font-display text-3xl font-extrabold text-brand-bright/50 tabular-nums">0{i + 1}</span>
              <h2 className="mt-3 text-xl">{c.h}</h2>
              <p className="mt-2 text-muted">{c.p}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="muted" label="Our promises">
        <SectionHead title="What you can *count on*" />
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {promises.map((p, i) => {
            const Icon = promiseIcons[i];
            return (
              <li key={p.title} className="reveal card p-4 sm:p-6">
                <Icon className="size-6 text-brand-bright" aria-hidden="true" />
                <h3 className="mt-3 text-lg">{p.title}</h3>
                <p className="mt-1 text-sm text-muted sm:text-base">{p.text}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section label="Team">
        <Link href="/about/team" className="card card-hover group flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-7">
          <span className="flex -space-x-3" aria-hidden="true">
            {pictured.map((t) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={t.slug} src={t.photo} alt="" width={56} height={56} loading="lazy" className="size-14 rounded-full border-2 border-surface object-cover object-top transition duration-300 group-hover:translate-x-1" />
            ))}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-xl font-semibold">Meet the people who do your accounts</span>
            <span className="mt-1 block text-muted">{team.map((t) => t.name.split(' ')[0]).join(', ')}, and what each of them looks after.</span>
          </span>
          <ArrowRight className="size-5 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-ink" aria-hidden="true" />
        </Link>
      </Section>

      <ClientPanel text="We will talk through what you need and agree the fee before any work begins." />
    </>
  );
}
