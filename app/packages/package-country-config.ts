import type { Segment } from "./packages-data";
export type PackageCountry = "ireland" | "united-kingdom" | "gibraltar";

export type CountryPackageConfig = {
  label: string;
  symbol: "€" | "£";
  currencyCode: "EUR" | "GBP";
  companyIntro: string;
  companyPrices: {
    dormant: number;
    starter: number;
    growth: number;
    scale: number;
    bespoke: number;
  };
  soleTraderPrices: {
    startup: number;
    essentials: number;
    plus: number;
    scale: number;
  };
  ecommercePrices: {
    setup: number;
    launch: number;
    multiChannel: number;
    scale: number;
  };
  contractorPrices: {
    setup: number;
    essentials: number;
    plus: number;
    premium: number;
  };
  companyTurnover: {
    dormant: string;
    starter: string;
    growth: string;
    scale: string;
    bespokeNote?: string;
  };
  companyTurnoverValues: {
    dormant: number;
    starter: number;
    growth: number;
    scale: number;
  };
  priceNote: string;
  terminology: Record<string, string>;
  companyCommon: string[];
};

export const countryPackageConfig: Record<PackageCountry, CountryPackageConfig> = {
  ireland: {
    label: "Ireland",
    symbol: "€",
    currencyCode: "EUR",
    companyIntro:
      "Company accounts, Corporation Tax (CT1), CRO Annual Return (B1), VAT, bookkeeping and director tax support in one monthly fee.",
    companyPrices: { dormant: 79, starter: 179, growth: 279, scale: 449, bespoke: 499 },
    soleTraderPrices: { startup: 149, essentials: 99, plus: 159, scale: 299 },
    ecommercePrices: { setup: 249, launch: 179, multiChannel: 279, scale: 449 },
    contractorPrices: { setup: 199, essentials: 129, plus: 169, premium: 249 },
    companyTurnover: {
      dormant: "€10k",
      starter: "€150k",
      growth: "€400k",
      scale: "€1m",
    },
    companyTurnoverValues: { dormant: 10_000, starter: 150_000, growth: 400_000, scale: 1_000_000 },
    priceNote: "Prices exclude VAT where applicable.",
    terminology: {
      "Corporation tax return": "Corporation Tax return (CT1)",
      "corporation tax return": "Corporation Tax return (CT1)",
      "Corporation tax": "Corporation Tax",
      "annual registry return": "CRO Annual Return (B1)",
      "Annual registry return": "CRO Annual Return (B1)",
      "Beneficial ownership maintenance": "RBO maintenance",
      "Beneficial ownership registration": "RBO registration",
      "Beneficial ownership and registry compliance": "RBO and CRO compliance",
      "Tax authority online account setup": "ROS setup",
      "tax authority": "Revenue",
      "government fees": "CRO fees",
      "EU sales returns (where applicable)": "VIES / EU sales returns (where applicable)",
      "Director personal tax return": "Director Form 11",
      "director personal tax return": "director Form 11",
      "Personal tax returns for 2 directors": "Form 11 returns for 2 directors",
      "Personal tax returns for 3 directors": "Form 11 returns for 3 directors",
      "Tax and VAT registration": "Revenue tax and VAT registration",
      "Year-end accounts, company tax return and annual return": "Year-end accounts, CT1 and CRO Annual Return (B1)",
      "VAT, payroll tax or contractor tax setup where needed": "VAT, PAYE or RCT setup where needed",
      "Annual personal tax return + preliminary or advance tax": "Form 11 + preliminary tax",
      "contractor withholding": "RCT",
    },
    companyCommon: [
      "Dedicated accountant",
      "Year-end accounts",
      "Corporation Tax return (CT1)",
      "CRO Annual Return (B1)",
      "RBO maintenance",
      "Director Form 11",
      "VAT returns (where registered)",
      "Cloud bookkeeping / bank feeds where relevant",
    ],
  },

  "united-kingdom": {
    label: "United Kingdom",
    symbol: "£",
    currencyCode: "GBP",
    companyIntro:
      "Statutory accounts, Company Tax Return (CT600), Companies House confirmation statement, VAT, bookkeeping and director Self Assessment support in one monthly fee.",
    companyPrices: { dormant: 49, starter: 149, growth: 239, scale: 389, bespoke: 429 },
    soleTraderPrices: { startup: 99, essentials: 59, plus: 99, scale: 199 },
    ecommercePrices: { setup: 199, launch: 149, multiChannel: 239, scale: 389 },
    contractorPrices: { setup: 149, essentials: 99, plus: 129, premium: 189 },
    companyTurnover: {
      dormant: "£10k",
      starter: "£130k",
      growth: "£350k",
      scale: "£850k",
    },
    companyTurnoverValues: { dormant: 10_000, starter: 130_000, growth: 350_000, scale: 850_000 },
    priceNote: "Prices exclude VAT where applicable.",
    terminology: {
      "Dormant or small-company accounts": "Dormant or small-company statutory accounts",
      "Corporation tax return": "Company Tax Return (CT600)",
      "corporation tax return": "Company Tax Return (CT600)",
      "Annual registry return": "Companies House confirmation statement",
      "annual registry return": "Companies House confirmation statement",
      "Beneficial ownership maintenance": "PSC register maintenance",
      "Beneficial ownership registration": "PSC register support",
      "Beneficial ownership and registry compliance": "PSC and Companies House compliance",
      "Tax authority online account setup": "HMRC online account setup",
      "tax authority": "HMRC",
      "government fees": "Companies House fees",
      "EU sales returns (where applicable)": "VAT reporting (where applicable)",
      "Annual personal tax return + preliminary or advance tax": "Self Assessment tax return",
      "Director personal tax return": "Director Self Assessment",
      "director personal tax return": "director Self Assessment",
      "Personal tax returns for 2 directors": "Self Assessment returns for 2 directors",
      "Personal tax returns for 3 directors": "Self Assessment returns for 3 directors",
      "Income Tax registration": "Self Assessment registration",
      "VAT returns including OSS": "UK and cross-border VAT support",
      "VAT / OSS readiness review": "UK and cross-border VAT readiness review",
      "OSS and IOSS": "Cross-border VAT / OSS support",
      "EU VAT": "cross-border VAT",
      "Tax and VAT registration": "HMRC tax and VAT registration",
      "Year-end accounts, company tax return and annual return": "Statutory accounts, CT600 and Companies House confirmation statement",
      "VAT returns": "VAT returns",
      "VAT, payroll tax or contractor tax setup where needed": "VAT, PAYE or CIS setup where needed",
      "contractor withholding": "CIS",
      "Corporation tax, annual registry and VAT compliance": "CT600, confirmation statement and VAT compliance",
    },
    companyCommon: [
      "Dedicated accountant",
      "Statutory year-end accounts",
      "Company Tax Return (CT600)",
      "Companies House confirmation statement",
      "PSC register maintenance",
      "Director Self Assessment",
      "VAT returns (where registered)",
      "Cloud bookkeeping / bank feeds where relevant",
    ],
  },

  gibraltar: {
    label: "Gibraltar",
    symbol: "£",
    currencyCode: "GBP",
    companyIntro:
      "Annual accounts, Corporate Tax Return (CT1), Companies House Gibraltar Annual Return, bookkeeping, PAYE and company compliance support in one monthly fee.",
    companyPrices: { dormant: 69, starter: 169, growth: 269, scale: 429, bespoke: 479 },
    soleTraderPrices: { startup: 129, essentials: 79, plus: 129, scale: 249 },
    ecommercePrices: { setup: 229, launch: 169, multiChannel: 269, scale: 429 },
    contractorPrices: { setup: 179, essentials: 119, plus: 149, premium: 219 },
    companyTurnover: {
      dormant: "£10k",
      starter: "£130k",
      growth: "£350k",
      scale: "£850k",
      bespokeNote: "Audit requirements are reviewed separately above £1.75m turnover.",
    },
    companyTurnoverValues: { dormant: 10_000, starter: 130_000, growth: 350_000, scale: 850_000 },
    priceNote: "Government filing fees and other third-party charges are excluded unless stated.",
    terminology: {
      "Corporation tax return": "Corporate Tax Return (CT1)",
      "corporation tax return": "Corporate Tax Return (CT1)",
      "Corporation tax": "Corporate Tax",
      "Annual registry return": "Companies House Annual Return",
      "annual registry return": "Companies House Annual Return",
      "Beneficial ownership maintenance": "UBO register maintenance",
      "Beneficial ownership registration": "UBO registration",
      "Beneficial ownership and registry compliance": "UBO and Companies House compliance",
      "Tax authority online account setup": "Income Tax Office registration",
      "tax authority": "Income Tax Office",
      "government fees": "Companies House Gibraltar fees",
      "Corporation tax return, annual registry return and VAT returns": "Corporate Tax Return (CT1), Companies House Annual Return and annual accounts",
      "VAT returns (where registered)": "PAYE and employer reporting (where applicable)",
      "VAT returns if registered": "PAYE reporting where applicable",
      "VAT filing where registered": "PAYE reporting where applicable",
      "VAT filing": "PAYE reporting",
      "EU sales returns (where applicable)": "Quarterly tax and compliance review",
      "Director personal tax return": "Director personal tax return",
      "director personal tax return": "director personal tax return",
      "Tax and VAT registration": "Income Tax Office registration",
      "Year-end accounts, company tax return and annual return": "Annual accounts, Corporate Tax Return (CT1) and Companies House Annual Return",
      "VAT returns": "Tax compliance review",
      "VAT returns including OSS": "Cross-border indirect tax support where relevant",
      "VAT / OSS readiness review": "Cross-border tax readiness review",
      "OSS and IOSS": "Cross-border indirect tax support",
      "EU VAT": "cross-border indirect tax",
      "Additional country VAT registrations quoted separately": "Additional overseas tax registrations quoted separately",
      "ongoing bookkeeping and VAT filing not included": "ongoing bookkeeping and tax filing not included",
      "VAT, payroll tax or contractor tax setup where needed": "PAYE and tax registrations where needed",
      "Corporation tax, annual registry and VAT compliance": "Corporate Tax Return (CT1), Annual Return and company compliance",
      "Cross-border VAT guidance where relevant": "Cross-border tax guidance where relevant",
    },
    companyCommon: [
      "Dedicated accountant",
      "Annual accounts",
      "Corporate Tax Return (CT1)",
      "Companies House Annual Return",
      "UBO register maintenance",
      "Director personal tax return",
      "PAYE and employer reporting (where applicable)",
      "Cloud bookkeeping / bank feeds where relevant",
    ],
  },
};

export const contractorPlanKeys: Record<string, keyof CountryPackageConfig["contractorPrices"]> = {
  "Contractor Setup": "setup",
  "Contractor Essentials": "essentials",
  "Contractor Plus": "plus",
  "Contractor Premium": "premium",
};

export const ecommercePlanKeys: Record<string, keyof CountryPackageConfig["ecommercePrices"]> = {
  "E-commerce Finance Setup": "setup",
  "E-commerce Launch": "launch",
  "E-commerce Multi-channel": "multiChannel",
  "E-commerce Scale": "scale",
};

export const soleTraderPlanKeys: Record<string, keyof CountryPackageConfig["soleTraderPrices"]> = {
  "Sole Trader Start-Up": "startup",
  "Sole Trader Essentials": "essentials",
  "Sole Trader Plus": "plus",
  "Sole Trader Scale": "scale",
};

export const companyPlanKeys: Record<string, Exclude<keyof CountryPackageConfig["companyPrices"], "bespoke">> = {
  "Dormant & Pre-trade": "dormant",
  "LTD Starter": "starter",
  "LTD Growth": "growth",
  "LTD Scale": "scale",
};

export const segmentSlugs: Record<Segment, string> = {
  company: "limited-company",
  "sole-trader": "sole-trader",
  contractor: "contractor",
  ecommerce: "ecommerce",
};

export function localisePackageCopy(country: PackageCountry, text: string) {
  const config = countryPackageConfig[country];
  let output = text.replaceAll("€", config.symbol);

  const replacements = Object.entries(config.terminology)
    .sort(([a], [b]) => b.length - a.length);

  for (const [from, to] of replacements) {
    output = output.replaceAll(from, to);
  }

  return output;
}
