import { ClientPanel, PageHero } from '@/components/ui/hero';
import { Button, JsonLd, Rich, Section, SectionHead } from '@/components/ui/primitives';
import { promises, team } from '@/lib/content';
import { pageMeta, orgId, webPageLd } from '@/lib/seo';
import { proof, site } from '@/lib/site';

const title = 'About Shiel | A Family-Run Accounting Firm';
const description = 'Shiel is a family-run accounting firm with 12 people across Europe and five client-facing accountants, serving companies in Ireland, the UK and Gibraltar.';
export const metadata = pageMeta({ title, description, path: '/about', absoluteTitle: true });

const chapters = [
  { h: 'Why We Started', p: 'We started Shiel because owner-managed companies were too often left choosing between large firms whose fees were out of reach and online packages with little personal attention. We set out to offer qualified accountants who understand each client’s business, at a price that reflects the needs of a smaller company.' },
  { h: 'A Family Business', p: 'Shiel is our family name, and it remains a family business today. Members of the family oversee the running of the firm behind the scenes, while our five client-facing accountants work directly with you throughout the year.' },
  { h: 'Where We Work', p: `There are ${proof.people} of us, supporting companies in Ireland, the UK and Gibraltar as well as clients further afield. Each client has one named accountant, who brings in colleagues with the right specialism when a question needs it.` },
  { h: 'Our Approach', p: 'That means year-end accounts, tax returns and statutory filings handled carefully and on time, clear explanations of where things stand, and fees agreed before the work begins.' },
];

export default function Page() {
  return (
    <>
      <JsonLd data={{ ...webPageLd({ path: '/about', name: title, description, type: 'AboutPage' }), mainEntity: { '@id': orgId } }} />
      <PageHero
        trail={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]}
        headline="A family business that *understands yours*"
        answer={`${site.name} is a family-run firm of ${proof.people} people across Europe, with ${proof.accountants} client-facing accountants looking after companies, sole traders and online sellers in Ireland, the UK and Gibraltar. We have more than seven years of experience and work on fixed, published fees.`}
        chips={[`${proof.people} people`, `${proof.accountants} accountants`, `${proof.years} years`]}
        primary={{ href: '/about/team', label: 'Meet the team' }}
        secondary={{ href: '/contact', label: 'Talk to us' }}
      />
      <Section>
        <ol className="grid gap-14 sm:gap-20">
          {chapters.map((c, i) => (
            <li key={c.h} className="reveal grid gap-4 md:grid-cols-[6rem_1fr] md:gap-10">
              <span className="font-display text-5xl font-extrabold text-brand-bright/40 tabular-nums">0{i + 1}</span>
              <div className="max-w-3xl">
                <h2 className="text-[clamp(1.75rem,5vw,2.6rem)]">
                  <Rich text={c.h} />
                </h2>
                <p className="mt-4 text-lg text-muted">{c.p}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="muted" label="How we work">
        <SectionHead title="Our Promises" />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p) => (
            <li key={p.title} className="card p-6">
              <h3 className="text-xl">{p.title}</h3>
              <p className="mt-2 text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section label="Team preview">
        <SectionHead title="Meet the Team" action={<Button href="/about/team" variant="secondary" icon="none">Meet the team</Button>} />
        <ul className="flex flex-wrap gap-3">
          {team.map((t) => (
            <li key={t.slug} className="chip py-2 pr-4 pl-2">
              {t.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.photo} alt="" width={32} height={32} loading="lazy" className="size-8 rounded-full object-cover object-top" />
              ) : (
                <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-[#21a09a] to-[#0f5f5c] text-xs font-bold text-white" aria-hidden="true">
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </span>
              )}
              <span>
                <strong className="font-display">{t.name}</strong> <span className="text-muted">· {t.role}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>
      <ClientPanel text="We will talk through what you need and agree the fee before any work begins." />
    </>
  );
}
