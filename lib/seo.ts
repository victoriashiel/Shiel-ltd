import type { Metadata } from 'next';
import { INDEXABLE, absolute, proof, site } from './site';
import type { FAQ } from './content';

export function ogKey(path: string) {
  return path === '/' ? 'home' : path.slice(1).replace(/\//g, '--');
}

export function pageMeta({ title, description, path, absoluteTitle }: { title: string; description: string; path: string; absoluteTitle?: boolean }): Metadata {
  const image = `/og/${ogKey(path)}.png`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: 'en_IE',
      url: path,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
    robots: INDEXABLE ? { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } : { index: false, follow: false },
  };
}

/* --------------------------------------------------------------- JSON-LD */

export const orgId = `${site.url}/#organization`;

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['AccountingService', 'ProfessionalService'],
    '@id': orgId,
    name: site.name,
    alternateName: 'Shiel',
    url: site.url,
    logo: `${site.url}/icons/icon-512.png`,
    image: `${site.url}/og/home.png`,
    description: site.description,
    email: site.email,
    priceRange: '€79–€449 / £49–£429 per month',
    currenciesAccepted: 'EUR, GBP',
    areaServed: site.areaServed.map((name) => ({ '@type': 'Country', name })),
    knowsAbout: ['Corporation tax', 'Bookkeeping', 'Payroll', 'VAT', 'Company formation', 'Year-end accounts', 'Cross-border accounting', 'Irish tax', 'UK tax', 'Gibraltar tax'],
    contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer service', email: site.email, availableLanguage: ['English'], url: `${site.url}/contact` }],
    numberOfEmployees: { '@type': 'QuantitativeValue', value: proof.people },
    knowsLanguage: 'en',
    slogan: 'Let us handle your accounts, from €79 a month.',
    sameAs: [site.whatsapp],
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { '@id': orgId },
    inLanguage: 'en',
  };
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: absolute(t.path) })),
  };
}

export function faqLd(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function webPageLd({ path, name, description, type = 'WebPage' }: { path: string; name: string; description: string; type?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${absolute(path)}#webpage`,
    url: absolute(path),
    name,
    description,
    isPartOf: { '@id': `${site.url}/#website` },
    about: { '@id': orgId },
    dateModified: site.updated,
    author: { '@id': orgId },
    inLanguage: 'en',
  };
}

export function serviceLd({ path, name, description, offers }: { path: string; name: string; description: string; offers?: { name: string; price: number; currency: string; description?: string }[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absolute(path)}#service`,
    name,
    description,
    url: absolute(path),
    serviceType: name,
    provider: { '@id': orgId },
    areaServed: site.areaServed.map((n) => ({ '@type': 'Country', name: n })),
    ...(offers?.length
      ? {
          offers: offers.map((o) => ({
            '@type': 'Offer',
            name: o.name,
            description: o.description,
            price: o.price,
            priceCurrency: o.currency,
            url: absolute(path),
          })),
        }
      : {}),
  };
}
