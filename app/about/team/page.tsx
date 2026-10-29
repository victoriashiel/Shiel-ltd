import { TeamGrid } from '@/components/tools/team-grid';
import { ClientPanel, PageHero } from '@/components/ui/hero';
import { JsonLd, Section, SectionHead, Steps } from '@/components/ui/primitives';
import { team, type Person } from '@/lib/content';
import { pageMeta, orgId, webPageLd } from '@/lib/seo';
import { absolute } from '@/lib/site';

const title = 'Meet the Team | Shiel Accountants';
const description = 'Meet the accountants and tax advisers at Shiel: Irish, UK and Gibraltar tax, bookkeeping, management accounts and cross-border planning.';
export const metadata = pageMeta({ title, description, path: '/about/team', absoluteTitle: true });

export default function Page() {
  return (
    <>
      <JsonLd data={webPageLd({ path: '/about/team', name: title, description, type: 'AboutPage' })} />
      {team.map((t) => (
        <JsonLd
          key={t.slug}
          data={{
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': `${absolute('/about/team')}#${t.slug}`,
            name: t.name,
            jobTitle: t.role,
            ...(t.photo && { image: absolute(t.photo) }),
            description: t.bio,
            knowsAbout: t.specialties,
            worksFor: { '@id': orgId },
            url: `${absolute('/about/team')}#${t.slug}`,
          }}
        />
      ))}
      <PageHero
        trail={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
          { name: 'Team', path: '/about/team' },
        ]}
        headline="Meet the people who *do your accounts*"
        answer="Five accountants and tax advisers covering Ireland, the UK and Gibraltar. You get one of them as your named accountant, all year, and they bring in the others when your question needs it."
        primary={{ href: '/contact', label: 'Talk to the team' }}
        aside={
          <div className="relative mx-auto hidden w-full max-w-md lg:block">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[#21a09a]/25 via-transparent to-[#d4a24c]/20 blur-2xl" aria-hidden="true" />
            <ul className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#0e2122]/85 p-3 shadow-2xl backdrop-blur-xl">
              {team.map((t) => (
                <li key={t.slug}>
                  <a href={`#${t.slug}`} className="flex items-center gap-3 rounded-2xl p-2.5 transition hover:bg-white/5">
                    <Avatar person={t} className="size-11 rounded-full text-sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-display font-semibold text-white">{t.name}</span>
                      <span className="block truncate text-xs text-[#a9bbb8]">{t.role}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
      />
      <Section>
        <TeamGrid people={team} />
      </Section>
      <Section tone="muted" label="How we work together">
        <SectionHead title="How We Work" lead="Bookkeeping, reporting and tax decisions all describe the same business, so the people working on them talk to each other." />
        <Steps
          steps={[
            { title: 'Start with your situation', text: 'Tell us how you work, where you operate and what you need help with.' },
            { title: 'Bring the right people in', text: 'Your accountant connects the accounts, compliance and tax expertise around you.' },
            { title: 'Make the next step clear', text: 'You know what needs doing, what we need from you and when.' },
          ]}
        />
      </Section>
      <ClientPanel />
    </>
  );
}

function Avatar({ person, className = '', eager }: { person: Person; className?: string; eager?: boolean }) {
  if (person.photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={person.photo} alt={person.name} width={480} height={600} loading={eager ? 'eager' : 'lazy'} className={`object-cover object-top ${className}`} />;
  }
  return (
    <span className={`grid place-items-center bg-gradient-to-b from-[#ecebe7] to-[#d6d5d0] font-display font-bold text-[#0b1718]/35 ${className}`} aria-hidden="true">
      {person.name.split(' ').map((n) => n[0]).join('')}
    </span>
  );
}

