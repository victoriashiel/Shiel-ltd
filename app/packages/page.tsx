import type { Metadata } from "next";
import Link from "next/link";
import { regionalPackages } from "@/lib/regional-packages";
import { regionList } from "@/lib/regions";
import styles from "./packages-global.module.css";

export const metadata: Metadata = {
  title: "Accounting Packages by Region",
  description:
    "Choose your region to see local accounting packages, scope and pricing for Ireland, the UK, UAE, Gibraltar and Spain.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Accounting Packages by Region | Shiel Accountants",
    description:
      "Local accounting packages and pricing for Ireland, the UK, UAE, Gibraltar and Spain.",
    url: "/packages",
  },
};

function startingPrice(slug: keyof typeof regionalPackages) {
  const set = regionalPackages[slug];
  const monthly = set.packages.filter((item) => item.billing !== "one-off");
  return monthly.length ? Math.min(...monthly.map((item) => item.price)) : null;
}

function formatCurrency(code: string, value: number) {
  if (code === "AED") return `AED ${value.toLocaleString("en-GB")}`;
  if (code === "GBP") return `£${value.toLocaleString("en-GB")}`;
  if (code === "GIP") return `£${value.toLocaleString("en-GB")} GIP`;
  return `€${value.toLocaleString("en-GB")}`;
}

export default function PackagesPage() {
  return (
    <>
      <section className={`section-pad ${styles.hero}`}>
        <p className="eyebrow">Packages</p>
        <h1>Choose the market you operate in.</h1>
        <p>
          Package scope, filing work and pricing differ by jurisdiction. Select the region that applies
          to the business to see the relevant accounting packages in local currency.
        </p>
      </section>

      <section className={`section-pad ${styles.regionGridSection}`}>
        <div className={styles.regionGrid}>
          {regionList.map((region) => {
            const set = regionalPackages[region.slug];
            const from = startingPrice(region.slug);

            return (
              <Link className={styles.regionCard} key={region.slug} href={`${region.path}/packages`}>
                <div>
                  <span>{region.name}</span>
                  <h2>{set.currency}</h2>
                  <p>{set.note}</p>
                </div>
                <div className={styles.regionCardFooter}>
                  <strong>{from ? `From ${formatCurrency(set.currency, from)} / month` : "View packages"}</strong>
                  <span>See local packages →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className={`section-pad ${styles.crossBorder}`}>
        <p className="eyebrow">More than one country?</p>
        <h2>We can scope the accounting around the actual structure.</h2>
        <p>
          If the company, owner, staff or tax obligations span more than one jurisdiction, use the international route rather than forcing the business into one local package.
        </p>
        <Link className="button button-dark" href="/international-accounting">
          International accounting <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}
