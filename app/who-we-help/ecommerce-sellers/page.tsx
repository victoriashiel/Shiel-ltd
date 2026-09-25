import type { Metadata } from "next";
import Link from "next/link";
import styles from "./ecommerce-sellers.module.css";
import {
  AnswerCards,
  AudienceClosing,
  AudienceHero,
  AudienceProof,
  QuickFit,
} from "@/components/who-we-help-sections";
import { safeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accounting for E-commerce Sellers",
  description:
    "Accounting, bookkeeping and tax support for e-commerce sellers using multiple sales channels, payment processors and cross-border platforms.",
  alternates: { canonical: "/who-we-help/ecommerce-sellers" },
  openGraph: {
    title: "Accounting for E-commerce Sellers | Shiel Accountants",
    description:
      "E-commerce accounting that connects sales channels, payment processors, fees, refunds and tax reporting into one set of books.",
    url: "/who-we-help/ecommerce-sellers",
  },
};

const fit = [
  "You sell through one or more platforms and your payouts no longer match neatly to individual sales.",
  "Fees, refunds, shipping and processor charges make the bookkeeping harder than the bank statement suggests.",
  "You want stock, sales and tax reporting to use the same underlying records.",
  "You are selling across borders or channels and need the accounting picture kept coherent as the business grows.",
] as const;

const answers = [
  {
    question: "Can you handle multiple sales channels?",
    answer:
      "Yes. We can structure the bookkeeping around several platforms and processors so sales, fees, refunds and settlements are reconciled consistently.",
  },
  {
    question: "What about Shopify, Stripe, PayPal or marketplaces?",
    answer:
      "Those feeds can form part of the bookkeeping workflow. The aim is to reconcile the settlement data rather than treating each bank deposit as unexplained sales income.",
  },
  {
    question: "Can you help with cross-border tax?",
    answer:
      "We can coordinate the accounting and relevant indirect-tax work where it falls within scope, and flag when local specialist input or an overseas registration is needed.",
  },
  {
    question: "Do you work with growing stores, not just small sellers?",
    answer:
      "Yes. The package structure scales from initial finance setup through multi-channel and higher-volume support as transaction counts and reporting needs increase.",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Accounting for E-commerce Sellers",
  url: `${siteConfig.url}/who-we-help/ecommerce-sellers`,
  description:
    "Accounting, bookkeeping and tax support for e-commerce sellers using multiple sales channels, payment processors and cross-border platforms.",
  provider: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
  },
  areaServed: ["Ireland", "United Kingdom", "Gibraltar"],
};

export default function EcommerceSellersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />

      <AudienceHero
        eyebrow="E-commerce sellers"
        title="Your payouts are not your sales."
        copy="We reconcile the moving parts behind an online store — sales, fees, refunds, processors and tax — so the books reflect what actually happened, not just what landed in the bank."
        primaryLabel="See e-commerce pricing"
        primaryHref="#pricing"
        visual={
          <div className={styles.ecomVisual} role="img" aria-label="Illustration showing sales channels and payment processors flowing into reconciled e-commerce books">
            <div className={styles.visualTop}>
              <span>Store finance</span>
              <strong>Reconciled</strong>
            </div>

            <div className={styles.channelRow}>
              <div><span>Store</span><strong>Sales</strong></div>
              <div><span>Marketplace</span><strong>Orders</strong></div>
              <div><span>Processor</span><strong>Payouts</strong></div>
            </div>

            <div className={styles.settlementCard}>
              <div><span>Gross sales</span><i /></div>
              <div><span>Fees + refunds</span><i /></div>
              <div><span>Net settlement</span><i /></div>
            </div>

            <div className={styles.booksOutput}>
              <span>Accounting output</span>
              <strong>Sales that reconcile</strong>
              <small>channel data · fees · refunds · payouts</small>
            </div>
          </div>
        }
      />

      <AudienceProof
        items={[
          ["From €179/mo", "UK from £149/mo"],
          ["Multi", "channel support"],
          ["Direct", "WhatsApp access"],
          ["Fixed", "monthly fees"],
        ]}
      />

      <QuickFit title="This is probably for you if..." items={fit} />

      <section className={`section-pad ${styles.reconcileSection}`}>
        <div className={styles.reconcileLead}>
          <p className="eyebrow">What needs reconciling</p>
          <h2>The bank deposit is only the end of the story.</h2>
          <p>
            E-commerce bookkeeping works when the settlement is broken back into the sales, refunds, fees and other
            movements that produced it. That is what makes the tax and management numbers usable.
          </p>
          <Link className="text-link" href="#pricing">See e-commerce packages <span aria-hidden="true">↗</span></Link>
        </div>

        <div className={styles.reconcileVisual} role="img" aria-label="E-commerce settlement reconciliation from gross orders to net payout">
          <div className={styles.grossCard}>
            <span>Orders</span>
            <strong>Gross sales</strong>
            <small>all channels</small>
          </div>
          <div className={styles.minusStack}>
            <div><span>−</span><p>Refunds</p></div>
            <div><span>−</span><p>Platform fees</p></div>
            <div><span>−</span><p>Processor fees</p></div>
          </div>
          <div className={styles.equalsMark} aria-hidden="true">=</div>
          <div className={styles.netCard}>
            <span>Bank</span>
            <strong>Net payout</strong>
            <small>fully explained</small>
          </div>
        </div>
      </section>

      <section className={`section-pad ${styles.priceRoute}`} id="pricing">
        <div>
          <p className="eyebrow">Pricing</p>
          <h2>Choose your country, then the stage your store is at.</h2>
          <p>
            Packages scale from one-off finance setup through launch, multi-channel and higher-volume support.
            The right level depends on transactions, platforms and reporting complexity.
          </p>
        </div>
        <div className={styles.priceLinks}>
          <Link href="/packages/ireland/ecommerce"><span>Ireland</span><strong>From €179 / month</strong><i>↗</i></Link>
          <Link href="/packages/united-kingdom/ecommerce"><span>United Kingdom</span><strong>From £149 / month</strong><i>↗</i></Link>
          <Link href="/packages/gibraltar/ecommerce"><span>Gibraltar</span><strong>From £169 / month</strong><i>↗</i></Link>
        </div>
      </section>

      <AnswerCards
        eyebrow="The questions we get most"
        title="The short answers."
        items={answers}
      />

      <AudienceClosing
        eyebrow="Store getting busier?"
        title="Fix the finance flow before transaction volume makes it harder."
        copy="Tell us which platforms and processors you use, roughly how many transactions you have and where you sell. We can point you to the right finance setup and ongoing package."
      />
    </>
  );
}
