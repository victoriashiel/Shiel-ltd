export type Segment = "company" | "sole-trader" | "contractor" | "ecommerce";

export type Plan = {
  name: string;
  strap: string;
  price: number;
  features: string[];
  details: string[];
  limits: string;
  popular?: boolean;
  billing?: "monthly" | "one-off";
  priceNote?: string;
  limitsLabel?: string;
};

export type AdvisoryOffer = {
  name: string;
  priceLabel: string;
  strap: string;
};

export type PackageSegment = {
  id: Segment;
  label: string;
  intro: string;
  advisoryOffer?: AdvisoryOffer;
  plans: Plan[];
};

export const segments: PackageSegment[] = [
  {
    id: "company",
    label: "Limited company",
    intro:
      "Company accounts, corporation tax, annual registry filing, VAT, bookkeeping and director tax support in one monthly fee.",
    plans: [
      {
        name: "Dormant & Pre-trade",
        strap: "For newly formed, pre-trading or dormant companies.",
        price: 79,
        features: ["Dormant or small-company accounts", "Corporation tax return and annual registry return", "Beneficial ownership and registry compliance", "1 director personal tax return"],
        details: ["Named accountant", "Compliance calendar and reminders", "Basic record review", "Bank feed where relevant"],
        limits: "Up to 10 accounting entries / month · sales up to €10k · no payroll",
      },
      {
        name: "LTD Starter",
        strap: "For new and small trading companies.",
        price: 179,
        features: ["Monthly bookkeeping", "Payroll & PAYE for up to 2 employees", "Corporation tax return, annual registry return and VAT returns", "1 director personal tax return"],
        details: ["Annual accountant review", "Named accountant", "Cloud bookkeeping software", "Bank feeds", "Beneficial ownership maintenance", "Payroll reporting where applicable"],
        limits: "Up to 30 transactions / month · sales up to €150k · 2 directors",
      },
      {
        name: "LTD Growth",
        strap: "For growing companies with staff and steady sales.",
        price: 279,
        popular: true,
        features: ["Everything in Starter", "Payroll for up to 6 employees", "Quarterly management reports", "EU sales returns (where applicable)"],
        details: ["Quarterly review call", "Personal tax returns for 2 directors", "Named accountant", "Cloud bookkeeping software", "Bank feeds", "Beneficial ownership maintenance", "Payroll reporting where applicable"],
        limits: "Up to 60 transactions / month · sales up to €400k · 3 directors",
      },
      {
        name: "LTD Scale",
        strap: "For established SMEs and more complex structures.",
        price: 449,
        features: ["Everything in Growth", "Payroll for up to 15 staff", "Monthly management reports", "Cash businesses, contractor withholding and group structures"],
        details: ["Weekly payroll runs where needed", "Monthly review call", "Personal tax returns for 3 directors", "Priority turnaround", "Named accountant", "Payroll reporting where applicable"],
        limits: "Up to 120 transactions / month · sales up to €1m · 4 directors",
      },
    ],
  },
  {
    id: "sole-trader",
    label: "Sole trader",
    intro:
      "Straightforward bookkeeping and personal tax return support, with VAT and payroll included where the plan calls for it.",
    plans: [
      {
        name: "Sole Trader Start-Up",
        strap: "For people registering as self-employed and getting the finance side set up properly.",
        price: 149,
        billing: "one-off",
        features: ["Income Tax registration", "Tax authority online account setup", "Bookkeeping setup", "VAT, payroll tax or contractor tax setup where needed"],
        details: ["Initial expense guidance", "Record-keeping setup", "Key filing dates explained", "Business name registration guidance where relevant"],
        limitsLabel: "Setup scope",
        limits: "One-off registration and finance setup · ongoing bookkeeping not included",
      },
      {
        name: "Sole Trader Essentials",
        strap: "For freelancers and newer self-employed clients.",
        price: 99,
        features: ["Monthly bookkeeping", "Annual accounts / profit & loss", "Annual personal tax return + preliminary or advance tax", "Named accountant"],
        details: ["Receipt capture and bank feed", "VAT returns if registered", "Deadline reminders", "Routine tax authority queries"],
        limits: "Up to 20 accounting transactions / month · turnover up to €80k",
      },
      {
        name: "Sole Trader Plus",
        strap: "For busy sole traders with staff or card payments.",
        price: 159,
        popular: true,
        features: ["Everything in Essentials", "Payroll & PAYE for up to 2 employees", "Quarterly management summary", "Card, Stripe and SumUp feeds"],
        details: ["VAT filing where registered", "Cloud bookkeeping", "Named accountant", "Deadline reminders"],
        limits: "Up to 60 accounting transactions / month · turnover up to €200k",
      },
      {
        name: "Sole Trader Scale",
        strap: "For established self-employed businesses with higher activity.",
        price: 299,
        features: ["Everything in Plus", "Payroll for up to 5 employees", "Monthly management reports", "Multiple income streams"],
        details: ["VAT filing", "Payment platform feeds", "Annual tax-planning review", "Priority turnaround", "Named accountant"],
        limits: "Up to 150 accounting transactions / month · turnover up to €500k",
      },
    ],
  },
  {
    id: "contractor",
    label: "Contractor",
    intro:
      "Accounting packages for contractors, from first setup through to multi-contract and higher-complexity work.",
    plans: [
      {
        name: "Contractor Setup",
        strap: "For new contractors setting up before the first invoice goes out.",
        price: 199,
        billing: "one-off",
        features: ["Tax and VAT registration", "Director payroll setup", "Bank feeds and software", "Review of the first contract"],
        details: ["Initial accounting setup", "Compliance calendar", "Opening bookkeeping structure", "First-year filing roadmap"],
        limitsLabel: "Setup scope",
        limits: "One-off contractor setup · ongoing monthly accounting not included",
      },
      {
        name: "Contractor Essentials",
        strap: "For single-client contractors with a simple setup.",
        price: 129,
        features: ["1 client and 1 director", "Up to 15 transactions a month", "Director payroll", "Year-end accounts, company tax return and annual return", "Director personal tax return"],
        details: ["Named accountant", "Cloud bookkeeping", "Bank feeds", "Deadline reminders"],
        limits: "1 client · 1 director · up to 15 transactions / month",
      },
      {
        name: "Contractor Plus",
        strap: "For contractors working across several contracts.",
        price: 169,
        popular: true,
        features: ["Everything in Essentials", "Up to 3 clients", "VAT returns", "Expense and mileage claims", "Salary and dividend planning", "Review of each new contract"],
        details: ["Named accountant", "Cloud bookkeeping", "Bank feeds", "Deadline reminders"],
        limits: "Up to 3 clients · standard contractor company setup",
      },
      {
        name: "Contractor Premium",
        strap: "For contractors with a higher-earning or more complex setup.",
        price: 249,
        features: ["Everything in Plus", "Unlimited contracts", "Second director or spouse on payroll", "Pension contribution planning", "Quarterly management accounts", "Support for contracts abroad"],
        details: ["Priority support", "Named accountant", "Cloud bookkeeping", "Bank feeds"],
        limits: "Unlimited contracts · higher-complexity contractor setup",
      },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    intro:
      "Built for online sellers that need platform reconciliation and EU VAT handled alongside the year-end accounts.",
    plans: [
      {
        name: "E-commerce Finance Setup",
        strap: "For stores that need the finance side set up properly before ongoing bookkeeping starts.",
        price: 249,
        billing: "one-off",
        features: ["Platform + payment feeds", "Chart of accounts", "Opening balances", "VAT / OSS readiness review"],
        details: ["Payment processor mapping", "Bookkeeping workflow setup", "Stock / COGS setup where relevant", "Handover into an ongoing plan if needed"],
        limitsLabel: "Setup scope",
        limits: "One-off finance setup · ongoing bookkeeping and VAT filing not included",
      },
      {
        name: "E-commerce Launch",
        strap: "For one-platform sellers getting the finance side organised.",
        price: 179,
        features: ["1 sales platform", "Stripe or PayPal feeds", "VAT returns including OSS", "Annual accounts"],
        details: ["Named accountant", "Cloud bookkeeping", "Bank feeds", "Deadline reminders", "Year-end accounts + relevant business or personal tax return", "Third-party app subscriptions excluded"],
        limits: "Up to 50 accounting transactions / month · sales up to €150k",
      },
      {
        name: "E-commerce Multi-channel",
        strap: "For sellers operating across several platforms or marketplaces.",
        price: 279,
        features: ["Multi-platform reconciliation", "OSS and IOSS", "Stock and COGS accounting", "Monthly margin report"],
        details: ["Named accountant", "Cloud bookkeeping", "Bank feeds", "Deadline reminders", "Year-end accounts + relevant business or personal tax return", "Additional country VAT registrations quoted separately", "Third-party app subscriptions excluded"],
        limits: "Up to 100 accounting transactions / month · sales up to €500k",
      },
      {
        name: "E-commerce Scale",
        strap: "For higher-volume stores that need finance reporting as well as bookkeeping.",
        price: 449,
        features: ["Everything in Multi-channel", "Multi-currency reconciliation", "Monthly management reports", "Channel and margin reporting"],
        details: ["Stock and COGS accounting", "OSS and IOSS", "Priority turnaround", "Year-end accounts + relevant business or personal tax return", "Additional country VAT registrations quoted separately", "Third-party app subscriptions excluded", "Named accountant"],
        limits: "Up to 200 accounting transactions / month · sales up to €1m",
      },
    ],
  },
];

export const commonCompany = [
  "Dedicated accountant",
  "Year-end accounts",
  "Corporation tax return",
  "Annual registry return",
  "Beneficial ownership maintenance",
  "Director personal tax return",
  "VAT returns (where registered)",
  "Cloud bookkeeping / bank feeds where relevant",
];

export const addOnGroups = [
  {
    title: "Volume & bookkeeping",
    items: [["10 extra accounting transactions", "€15 / month"], ["Additional sales platform or feed", "From €25 / month"], ["Additional bank / payment feed", "From €15 / month"]],
  },
  {
    title: "Payroll & people",
    items: [["Extra employee on payroll", "€20 / month"], ["Additional director personal tax return", "€175 / year"]],
  },
  {
    title: "Registrations & tax",
    items: [["VAT / payroll tax registration", "€125 each"], ["Beneficial ownership registration", "€99"], ["Tax compliance certificate", "€65"]],
  },
  {
    title: "Catch-up & historical work",
    items: [["Catch-up bookkeeping", "€35 / hour"], ["Historical accounts", "From €650 / year"], ["Historical VAT returns", "From €120"], ["Urgent filing (under 5 days)", "€275"]],
  },
  {
    title: "Company changes",
    items: [["Company formation + government fees", "€495 + government fees"], ["Business name registration", "€75 + government fees"], ["Strike-off (voluntary)", "€325"], ["Non-resident director support", "Quote"], ["Registered office address / company secretary", "Quote"]],
  },
];

export type FinderResult = {
  segment: Segment;
  name: string;
  priceLabel: string;
  reason: string;
};

export function recommendation({
  segment,
  startingOut,
  dormant,
  transactions,
  turnover,
  staff,
  directors,
  platforms,
  complex,
  companyThresholds = { dormant: 10_000, starter: 150_000, growth: 400_000, scale: 1_000_000 },
  companyPrices = { dormant: 79, starter: 179, growth: 279, scale: 449, bespoke: 499 },
  soleTraderPrices = { startup: 149, essentials: 99, plus: 159, scale: 299 },
  ecommercePrices = { setup: 249, launch: 179, multiChannel: 279, scale: 449 },
  contractorPrices = { setup: 199, essentials: 129, plus: 169, premium: 249 },
  currencySymbol = "€",
}: {
  segment: Segment;
  startingOut: boolean;
  dormant: boolean;
  transactions: number;
  turnover: number;
  staff: number;
  directors: number;
  platforms: "one" | "multi";
  complex: boolean;
  companyThresholds?: { dormant: number; starter: number; growth: number; scale: number };
  companyPrices?: { dormant: number; starter: number; growth: number; scale: number; bespoke: number };
  soleTraderPrices?: { startup: number; essentials: number; plus: number; scale: number };
  ecommercePrices?: { setup: number; launch: number; multiChannel: number; scale: number };
  contractorPrices?: { setup: number; essentials: number; plus: number; premium: number };
  currencySymbol?: "€" | "£";
}): FinderResult {
  if (startingOut) {
    if (segment === "sole-trader") {
      return {
        segment,
        name: "Sole Trader Start-Up",
        priceLabel: `${currencySymbol}${soleTraderPrices.startup} · one-off`,
        reason: "This gets the tax registrations and bookkeeping setup in place before regular trading begins.",
      };
    }

    if (segment === "contractor") {
      return {
        segment,
        name: "Contractor Setup",
        priceLabel: `${currencySymbol}${contractorPrices.setup} · one-off`,
        reason: "This gets the contractor setup, registrations, payroll and bookkeeping structure in place before the first invoice.",
      };
    }

    if (segment === "ecommerce") {
      return {
        segment,
        name: "E-commerce Finance Setup",
        priceLabel: `${currencySymbol}${ecommercePrices.setup} · one-off`,
        reason: "This sets up platform feeds, the bookkeeping structure and tax readiness before ongoing bookkeeping.",
      };
    }

    return {
      segment,
      name: "Dormant & Pre-trade",
      priceLabel: `${currencySymbol}${companyPrices.dormant} / month`,
      reason: "This is the entry company plan for newly formed, pre-trading or dormant companies.",
    };
  }

  if (segment === "ecommerce") {
    if (transactions > 200 || turnover > 1_000_000) {
      return {
        segment: "ecommerce",
        name: "Bespoke",
        priceLabel: `From ${currencySymbol}${ecommercePrices.scale} / month`,
        reason: "Your sales volume is above the published E-commerce Scale limit, so the work needs to be scoped.",
      };
    }

    if (transactions > 100 || turnover > 500_000) {
      return {
        segment: "ecommerce",
        name: "E-commerce Scale",
        priceLabel: `${currencySymbol}${ecommercePrices.scale} / month`,
        reason: "Your accounting volume or sales level is above Multi-channel and fits the higher-volume Scale tier.",
      };
    }

    if (platforms === "multi" || transactions > 50 || turnover > 150_000) {
      return {
        segment: "ecommerce",
        name: "E-commerce Multi-channel",
        priceLabel: `${currencySymbol}${ecommercePrices.multiChannel} / month`,
        reason: platforms === "multi"
          ? "You sell across more than one platform."
          : transactions > 50
            ? "Your accounting transaction volume is above the Launch plan limit."
            : `Your sales are above the Launch plan limit of ${currencySymbol}150k.`,
      };
    }

    return {
      segment: "ecommerce",
      name: "E-commerce Launch",
      priceLabel: `${currencySymbol}${ecommercePrices.launch} / month`,
      reason: `This fits one-platform selling with up to 50 accounting transactions a month and annual sales up to ${currencySymbol}150k.`,
    };
  }

  if (segment === "sole-trader") {
    if (transactions > 150 || turnover > 500_000 || staff > 5) {
      return {
        segment: "sole-trader",
        name: "Bespoke",
        priceLabel: `From ${currencySymbol}${soleTraderPrices.scale} / month`,
        reason: "At least one part of your activity is above the published Sole Trader Scale limits, so we will confirm the scope before onboarding.",
      };
    }

    if (transactions > 60 || turnover > 200_000 || staff > 2) {
      return {
        segment: "sole-trader",
        name: "Sole Trader Scale",
        priceLabel: `${currencySymbol}${soleTraderPrices.scale} / month`,
        reason: "Your activity is above Plus and fits the higher-volume Scale tier.",
      };
    }

    if (transactions > 20 || turnover > 80_000 || staff > 0) {
      return {
        segment: "sole-trader",
        name: "Sole Trader Plus",
        priceLabel: `${currencySymbol}${soleTraderPrices.plus} / month`,
        reason: "Your transaction level, turnover or payroll needs move you beyond Essentials.",
      };
    }

    return {
      segment: "sole-trader",
      name: "Sole Trader Essentials",
      priceLabel: `${currencySymbol}${soleTraderPrices.essentials} / month`,
      reason: `This fits up to 20 monthly accounting transactions and turnover up to ${currencySymbol}80k with no payroll.`,
    };
  }

  if (segment === "contractor") {
    if (complex || directors > 1 || staff > 0 || transactions > 60) {
      return {
        segment: "contractor",
        name: "Contractor Premium",
        priceLabel: `${currencySymbol}${contractorPrices.premium} / month`,
        reason: "Your setup is more complex, includes additional payroll or needs higher-capacity contractor support.",
      };
    }

    if (transactions > 15) {
      return {
        segment: "contractor",
        name: "Contractor Plus",
        priceLabel: `${currencySymbol}${contractorPrices.plus} / month`,
        reason: "Your activity is above Essentials and fits the multi-contract Plus tier.",
      };
    }

    return {
      segment: "contractor",
      name: "Contractor Essentials",
      priceLabel: `${currencySymbol}${contractorPrices.essentials} / month`,
      reason: "This fits a single-client, single-director contractor with up to 15 monthly transactions.",
    };
  }

  const companyResult = (): FinderResult => {
    if (transactions > 120 || turnover > companyThresholds.scale || staff > 15 || directors > 4) {
      return {
        segment: "company",
        name: "Bespoke",
        priceLabel: `From ${currencySymbol}${companyPrices.bespoke} / month`,
        reason: "At least one part of your company is above the published Scale limits.",
      };
    }

    if (dormant && transactions <= 10 && turnover <= companyThresholds.dormant && staff === 0 && directors <= 1 && !complex) {
      return {
        segment: "company",
        name: "Dormant & Pre-trade",
        priceLabel: `${currencySymbol}${companyPrices.dormant} / month`,
        reason: "This matches the dormant/pre-trade limits: minimal activity, no payroll and one director.",
      };
    }

    if (complex || transactions > 60 || turnover > companyThresholds.growth || staff > 6 || directors > 3) {
      return {
        segment: "company",
        name: "LTD Scale",
        priceLabel: `${currencySymbol}${companyPrices.scale} / month`,
        reason: complex
          ? "Cash businesses, contractor withholding or group structures are included from Scale."
          : "Your activity requires the published Scale limits.",
      };
    }

    if (transactions > 30 || turnover > companyThresholds.starter || staff > 2 || directors > 2) {
      return {
        segment: "company",
        name: "LTD Growth",
        priceLabel: `${currencySymbol}${companyPrices.growth} / month`,
        reason: "Your activity is above Starter but remains within the Growth limits.",
      };
    }

    return {
      segment: "company",
      name: "LTD Starter",
      priceLabel: `${currencySymbol}${companyPrices.starter} / month`,
      reason: `This fits up to 30 monthly transactions, ${currencySymbol}${Math.round(companyThresholds.starter / 1000)}k sales, 2 employees and 2 directors.`,
    };
  };

  return companyResult();
}
