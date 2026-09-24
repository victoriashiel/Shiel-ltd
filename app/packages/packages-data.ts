export type Segment = "company" | "sole-trader" | "contractor" | "ecommerce";

export type Plan = {
  name: string;
  strap: string;
  price: number;
  features: string[];
  details: string[];
  limits: string;
  popular?: boolean;
};

export const segments: { id: Segment; label: string; intro: string; plans: Plan[] }[] = [
  {
    id: "company",
    label: "Limited company",
    intro:
      "Company accounts, Corporation Tax, CRO filing, VAT, bookkeeping and director tax support in one monthly fee.",
    plans: [
      {
        name: "Dormant & Pre-trade",
        strap: "For newly formed, holding or dormant companies.",
        price: 79,
        features: ["Abridged or dormant accounts", "Nil CT1 and B1 filing", "RBO and CRO compliance", "1 director Form 11"],
        details: ["Named accountant", "Cloud bookkeeping software", "Bank feeds where relevant", "Deadline calendar and reminders"],
        limits: "Up to 10 transactions / month · sales up to €10k · no payroll",
      },
      {
        name: "LTD Starter",
        strap: "For new and small trading companies.",
        price: 179,
        features: ["Monthly bookkeeping", "Payroll for up to 2 employees", "CT1, B1, VAT3 and RTD", "1 director Form 11"],
        details: ["Annual accountant review", "Named accountant", "Cloud bookkeeping software", "Bank feeds", "RBO maintenance"],
        limits: "Up to 30 transactions / month · sales up to €150k · 2 directors",
      },
      {
        name: "LTD Growth",
        strap: "For growing companies with staff and steady sales.",
        price: 279,
        popular: true,
        features: ["Everything in Starter", "Payroll for up to 6 employees", "Quarterly management accounts", "VIES returns"],
        details: ["Quarterly review call", "Form 11 for 2 directors", "Named accountant", "Cloud bookkeeping software", "Bank feeds", "RBO maintenance"],
        limits: "Up to 60 transactions / month · sales up to €400k · 3 directors",
      },
      {
        name: "LTD Scale",
        strap: "For established SMEs and more complex structures.",
        price: 449,
        features: ["Everything in Growth", "Payroll for up to 15 staff", "Monthly management accounts", "Cash, RCT and group structures"],
        details: ["Weekly payroll runs where needed", "Monthly review call", "Form 11 for 3 directors", "Priority turnaround", "Named accountant"],
        limits: "Up to 120 transactions / month · sales up to €1m · 4 directors",
      },
    ],
  },
  {
    id: "sole-trader",
    label: "Sole trader",
    intro:
      "Straightforward bookkeeping and Form 11 support, with VAT and payroll included where the plan calls for it.",
    plans: [
      {
        name: "Sole Trader Essentials",
        strap: "For freelancers and newer self-employed clients.",
        price: 99,
        features: ["Bookkeeping and receipt capture", "Form 11 and preliminary tax calculation", "VAT returns if registered", "Named accountant"],
        details: ["Deadline reminders", "Cloud bookkeeping", "Support with routine Revenue queries"],
        limits: "Up to 30 transactions / month · turnover up to €80k",
      },
      {
        name: "Sole Trader Plus",
        strap: "For busy sole traders with staff or card payments.",
        price: 159,
        popular: true,
        features: ["Everything in Essentials", "Payroll for up to 2 employees", "Quarterly management summary", "Card, Stripe and SumUp feeds"],
        details: ["Named accountant", "Cloud bookkeeping", "Deadline reminders"],
        limits: "Up to 80 transactions / month · turnover up to €250k",
      },
    ],
  },
  {
    id: "contractor",
    label: "Contractor",
    intro:
      "A lean company package for single-director contractors with one main client and a simple monthly invoicing pattern.",
    plans: [
      {
        name: "Contractor",
        strap: "For single-director companies with one client and a monthly invoice.",
        price: 119,
        features: ["Full company compliance: CT1, B1 and VAT", "Director payroll", "Director Form 11", "Expense and subsistence guidance"],
        details: ["Named accountant", "Cloud bookkeeping", "Bank feeds", "Deadline calendar and reminders"],
        limits: "Up to 15 transactions / month · sales up to €150k",
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
        name: "E-commerce Launch",
        strap: "For one-platform sellers getting the finance side organised.",
        price: 179,
        features: ["1 sales platform", "Stripe or PayPal feeds", "VAT returns including OSS", "Annual accounts"],
        details: ["Named accountant", "Cloud bookkeeping", "Bank feeds", "Deadline reminders"],
        limits: "Sales up to €150k",
      },
      {
        name: "E-commerce Multi-channel",
        strap: "For sellers operating across several platforms or marketplaces.",
        price: 279,
        features: ["Multi-platform reconciliation", "OSS and IOSS", "Stock and COGS accounting", "Monthly margin report"],
        details: ["Named accountant", "Cloud bookkeeping", "Bank feeds", "Deadline reminders"],
        limits: "Sales up to €500k",
      },
    ],
  },
];

export const commonCompany = [
  "Dedicated accountant",
  "Cloud bookkeeping software",
  "Bank feeds",
  "Annual financial statements",
  "Corporation Tax return (CT1)",
  "CRO Annual Return (B1)",
  "VAT3 and RTD returns",
  "RBO maintenance",
  "Director Form 11",
];

export const addOnGroups = [
  {
    title: "Payroll & people",
    items: [["Extra employee on payroll", "€20 / month"], ["Additional director Form 11", "€175 / year"]],
  },
  {
    title: "Registrations & Revenue",
    items: [["VAT / PAYE registration", "€125 each"], ["RBO registration", "€99"], ["Tax clearance certificate", "€65"]],
  },
  {
    title: "Catch-up & historical work",
    items: [["Catch-up bookkeeping", "€35 / hour"], ["Historical accounts", "From €650 / year"], ["Historical VAT returns", "From €120"], ["Urgent filing (under 5 days)", "€275"]],
  },
  {
    title: "Company changes",
    items: [["Company formation + first-year bundle", "€199 + CRO fee"], ["Strike-off (voluntary)", "€325"], ["Non-resident director support", "Quote"], ["Registered office / company secretary", "Quote"]],
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
  dormant,
  transactions,
  turnover,
  staff,
  directors,
  platforms,
  complex,
}: {
  segment: Segment;
  dormant: boolean;
  transactions: number;
  turnover: number;
  staff: number;
  directors: number;
  platforms: "one" | "multi";
  complex: boolean;
}): FinderResult {
  if (segment === "ecommerce") {
    if (turnover > 500_000) {
      return {
        segment: "ecommerce",
        name: "Bespoke",
        priceLabel: "From €499 / month",
        reason: "Your sales volume is above the published Multi-channel limit, so the work needs to be scoped.",
      };
    }

    if (platforms === "multi" || turnover > 150_000) {
      return {
        segment: "ecommerce",
        name: "E-commerce Multi-channel",
        priceLabel: "€279 / month",
        reason: platforms === "multi"
          ? "You sell across more than one platform."
          : "Your sales are above the Launch plan limit of €150k.",
      };
    }

    return {
      segment: "ecommerce",
      name: "E-commerce Launch",
      priceLabel: "€179 / month",
      reason: "This fits one-platform selling with annual sales up to €150k.",
    };
  }

  if (segment === "sole-trader") {
    if (transactions > 80 || turnover > 250_000 || staff > 2) {
      return {
        segment: "sole-trader",
        name: "Bespoke",
        priceLabel: "From €499 / month",
        reason: "At least one part of your activity is above the published Sole Trader Plus limits.",
      };
    }

    if (transactions > 30 || turnover > 80_000 || staff > 0) {
      return {
        segment: "sole-trader",
        name: "Sole Trader Plus",
        priceLabel: "€159 / month",
        reason: "Your transaction level, turnover or payroll needs move you beyond Essentials.",
      };
    }

    return {
      segment: "sole-trader",
      name: "Sole Trader Essentials",
      priceLabel: "€99 / month",
      reason: "This fits up to 30 monthly transactions and turnover up to €80k with no payroll.",
    };
  }

  const companyResult = (): FinderResult => {
    if (transactions > 120 || turnover > 1_000_000 || staff > 15 || directors > 4) {
      return {
        segment: "company",
        name: "Bespoke",
        priceLabel: "From €499 / month",
        reason: "At least one part of your company is above the published Scale limits.",
      };
    }

    if (dormant && transactions <= 10 && turnover <= 10_000 && staff === 0 && directors <= 1 && !complex) {
      return {
        segment: "company",
        name: "Dormant & Pre-trade",
        priceLabel: "€79 / month",
        reason: "This matches the dormant/pre-trade limits: minimal activity, no payroll and one director.",
      };
    }

    if (complex || transactions > 60 || turnover > 400_000 || staff > 6 || directors > 3) {
      return {
        segment: "company",
        name: "LTD Scale",
        priceLabel: "€449 / month",
        reason: complex
          ? "Cash, RCT or group structures are included from Scale."
          : "Your activity requires the published Scale limits.",
      };
    }

    if (transactions > 30 || turnover > 150_000 || staff > 2 || directors > 2) {
      return {
        segment: "company",
        name: "LTD Growth",
        priceLabel: "€279 / month",
        reason: "Your activity is above Starter but remains within the Growth limits.",
      };
    }

    return {
      segment: "company",
      name: "LTD Starter",
      priceLabel: "€179 / month",
      reason: "This fits up to 30 monthly transactions, €150k sales, 2 employees and 2 directors.",
    };
  };

  if (segment === "contractor") {
    if (transactions <= 15 && turnover <= 150_000 && directors === 1 && staff === 0 && !complex) {
      return {
        segment: "contractor",
        name: "Contractor",
        priceLabel: "€119 / month",
        reason: "This matches the contractor plan limits for a single-director company with a simple monthly activity pattern.",
      };
    }

    const fallback = companyResult();
    return {
      ...fallback,
      reason: `The €119 Contractor plan no longer fits these limits. The closest company package is ${fallback.name}.`,
    };
  }

  return companyResult();
}
