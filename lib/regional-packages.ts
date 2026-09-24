import type { RegionSlug } from "@/lib/regions";

export type RegionalPackage = {
  name: string;
  strap: string;
  price: number;
  billing?: "monthly" | "one-off";
  features: string[];
  limit?: string;
  popular?: boolean;
};

export type RegionalPackageSet = {
  currency: "EUR" | "GBP" | "AED" | "GIP";
  startingFrom?: number;
  note: string;
  packages: RegionalPackage[];
};

export const regionalPackages: Record<RegionSlug, RegionalPackageSet> = {
  ireland: {
    currency: "EUR",
    startingFrom: 79,
    note: "Irish prices exclude VAT where applicable. Full Irish package detail is available on the packages page.",
    packages: [
      {
        name: "Sole Trader Essentials",
        strap: "For freelancers and newer self-employed clients.",
        price: 99,
        features: ["Monthly bookkeeping", "Annual accounts / profit & loss", "Form 11 + preliminary tax", "Named accountant"],
        limit: "Up to 20 accounting transactions / month · turnover up to €80k",
      },
      {
        name: "LTD Starter",
        strap: "For new and small Irish trading companies.",
        price: 179,
        features: ["Monthly bookkeeping", "Payroll for up to 2 employees", "CT1, B1, VAT3 and RTD", "1 director Form 11"],
        limit: "Up to 30 transactions / month · sales up to €150k",
        popular: true,
      },
      {
        name: "Contractor",
        strap: "For single-director companies with one main client.",
        price: 119,
        features: ["CT1, B1 and VAT compliance", "Director payroll", "Director Form 11", "Expense and subsistence guidance"],
        limit: "Up to 15 transactions / month · sales up to €150k",
      },
      {
        name: "E-commerce Launch",
        strap: "For one-platform sellers getting the finance side organised.",
        price: 179,
        features: ["1 sales platform", "Stripe or PayPal feeds", "VAT including OSS", "Annual accounts"],
        limit: "Up to 50 accounting transactions / month · sales up to €150k",
      },
    ],
  },
  uk: {
    currency: "GBP",
    note: "UK prices exclude VAT where applicable and assume clean digital records. Companies House filing fees are charged separately where applicable.",
    packages: [
      {
        name: "Sole Trader",
        strap: "For freelancers and self-employed clients with straightforward books.",
        price: 65,
        features: ["Monthly bookkeeping", "Self Assessment", "Tax-payment planning", "VAT where registered"],
        limit: "Up to 30 accounting transactions / month",
      },
      {
        name: "LTD Starter",
        strap: "For small UK limited companies that need the core compliance handled.",
        price: 125,
        features: ["Monthly bookkeeping", "Statutory accounts", "CT600", "Confirmation statement"],
        limit: "Up to 50 accounting transactions / month · 1 director",
        popular: true,
      },
      {
        name: "Contractor",
        strap: "For single-director contractor companies.",
        price: 109,
        features: ["Statutory accounts + CT600", "Director payroll", "Self Assessment", "VAT where registered"],
        limit: "Up to 30 accounting transactions / month · 1 director",
      },
      {
        name: "LTD Growth",
        strap: "For companies that need payroll and regular management reporting.",
        price: 195,
        features: ["Everything in Starter", "Payroll for up to 5 staff", "Quarterly management accounts", "VAT returns"],
        limit: "Up to 120 accounting transactions / month",
      },
    ],
  },
  uae: {
    currency: "AED",
    note: "UAE prices exclude VAT where applicable and assume records are provided digitally. Audit, transfer-pricing documentation and specialist free-zone opinions are separately scoped.",
    packages: [
      {
        name: "Freelancer",
        strap: "For consultants and small professional businesses with light monthly activity.",
        price: 590,
        features: ["Monthly bookkeeping", "Corporate Tax support where applicable", "VAT where registered", "Year-end financial summary"],
        limit: "Up to 30 accounting transactions / month",
      },
      {
        name: "Business Starter",
        strap: "For small UAE companies that need bookkeeping, VAT and Corporate Tax connected.",
        price: 790,
        features: ["Monthly bookkeeping", "Corporate Tax return", "VAT returns", "Profit & loss + balance sheet"],
        limit: "Up to 50 accounting transactions / month",
        popular: true,
      },
      {
        name: "Business Growth",
        strap: "For growing businesses needing payroll support and richer reporting.",
        price: 1490,
        features: ["Everything in Starter", "Payroll support for up to 5 staff", "Quarterly management accounts", "Multi-currency bookkeeping"],
        limit: "Up to 150 accounting transactions / month",
      },
      {
        name: "Business Scale",
        strap: "For higher-volume or multi-entity UAE operations.",
        price: 2490,
        features: ["Monthly management accounts", "Multi-currency records", "VAT + Corporate Tax compliance", "Priority review support"],
        limit: "Up to 300 accounting transactions / month",
      },
    ],
  },
  gibraltar: {
    currency: "GIP",
    note: "Gibraltar prices are shown in Gibraltar pounds. Statutory registry fees, audit work and licensed corporate-service work are separately scoped where required.",
    packages: [
      {
        name: "Self-Employed",
        strap: "For Gibraltar-based self-employed clients with straightforward records.",
        price: 95,
        features: ["Bookkeeping", "Income and expense records", "Tax return support", "Payment planning"],
        limit: "Up to 30 accounting transactions / month",
      },
      {
        name: "Company Starter",
        strap: "For small Gibraltar companies needing bookkeeping and core annual compliance.",
        price: 175,
        features: ["Monthly bookkeeping", "Company accounts", "CT1", "Companies House filing support"],
        limit: "Up to 50 accounting transactions / month",
        popular: true,
      },
      {
        name: "Company Growth",
        strap: "For trading companies with payroll or greater bookkeeping volume.",
        price: 295,
        features: ["Everything in Starter", "Payroll for up to 5 staff", "Quarterly management accounts", "PAYE reconciliations"],
        limit: "Up to 120 accounting transactions / month",
      },
      {
        name: "Company Scale",
        strap: "For higher-volume and more internationally connected Gibraltar businesses.",
        price: 495,
        features: ["Monthly management accounts", "Multi-currency bookkeeping", "Payroll support", "Cross-border information packs"],
        limit: "Up to 250 accounting transactions / month",
      },
    ],
  },
  spain: {
    currency: "EUR",
    note: "Spain prices exclude VAT where applicable. Payroll, SII, complex international reporting and filings outside the standard package are separately scoped.",
    packages: [
      {
        name: "Autónomo Essentials",
        strap: "For self-employed professionals with straightforward recurring filings.",
        price: 69,
        features: ["Bookkeeping", "IVA / Modelo 303 where applicable", "IRPF payment filings where applicable", "Annual tax support"],
        limit: "Up to 30 accounting transactions / month",
        popular: true,
      },
      {
        name: "Autónomo Plus",
        strap: "For busier autónomos with more activity or additional filing needs.",
        price: 119,
        features: ["Everything in Essentials", "Up to 80 accounting transactions", "Withholding returns where relevant", "Quarterly review"],
        limit: "Up to 80 accounting transactions / month",
      },
      {
        name: "SL Starter",
        strap: "For small Spanish limited companies needing bookkeeping and recurring tax compliance.",
        price: 175,
        features: ["Monthly bookkeeping", "IVA / Modelo 303", "Modelo 200", "Periodic withholding returns where relevant"],
        limit: "Up to 60 accounting transactions / month",
      },
      {
        name: "SL Growth",
        strap: "For companies needing higher-volume books and regular management reporting.",
        price: 295,
        features: ["Everything in Starter", "Quarterly management accounts", "Payroll coordination", "Multi-currency bookkeeping"],
        limit: "Up to 150 accounting transactions / month",
      },
    ],
  },
};

export function formatRegionalPrice(currency: RegionalPackageSet["currency"], price: number) {
  if (currency === "AED") return `AED ${price.toLocaleString("en-GB")}`;
  if (currency === "GIP") return `£${price.toLocaleString("en-GB")} GIP`;
  if (currency === "GBP") return `£${price.toLocaleString("en-GB")}`;
  return `€${price.toLocaleString("en-GB")}`;
}
