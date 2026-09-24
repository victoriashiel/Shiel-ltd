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

export type SetupOffer = {
  name: string;
  priceLabel: string;
  strap: string;
  includes: string[];
};

export type PackageSegment = {
  id: Segment;
  label: string;
  intro: string;
  setupOffer?: SetupOffer;
  plans: Plan[];
};

export const segments: PackageSegment[] = [
  {
    id: "company",
    label: "Limited company",
    intro:
      "Company accounts, Corporation Tax, CRO filing, VAT, bookkeeping and director tax support in one monthly fee.",
    setupOffer: {
      name: "Company Launch",
      priceLabel: "€299 + CRO fee · one-off",
      strap: "For people setting up a limited company and wanting the accounting side built properly from day one.",
      includes: ["Company formation", "Revenue, RBO and payroll setup", "Bookkeeping system setup"],
    },
    plans: [
      {
        name: "Dormant & Holding",
        strap: "For dormant companies and holding structures with little or no trading activity.",
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
    setupOffer: {
      name: "Sole Trader Start-Up",
      priceLabel: "€149 · one-off",
      strap: "For people starting self-employment and wanting the tax and bookkeeping setup handled before regular trading begins.",
      includes: ["Revenue registration", "Bookkeeping setup", "VAT, PAYE or RCT setup where needed"],
    },
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
      {
        name: "Sole Trader Scale",
        strap: "For established self-employed businesses with higher activity.",
        price: 249,
        features: ["Everything in Plus", "Payroll for up to 5 employees", "Monthly management summary", "Multiple income streams"],
        details: ["VAT support", "Payment platform feeds", "Annual tax-planning review", "Named accountant"],
        limits: "Up to 150 transactions / month · turnover up to €500k",
      },
    ],
  },
  {
    id: "contractor",
    label: "Contractor",
    intro:
      "A specialist company package for contractors who want payroll, tax, expenses and compliance handled without a full SME plan.",
    setupOffer: {
      name: "Contractor Launch",
      priceLabel: "€249 + CRO fee · one-off",
      strap: "For new contractors setting up a personal limited company before the first invoice is raised.",
      includes: ["Company formation", "Director payroll and Revenue setup", "Expenses and bookkeeping setup"],
    },
    plans: [
      {
        name: "Contractor",
        strap: "For single-director companies with one client and a monthly invoice.",
        price: 119,
        features: ["CT1, B1 and VAT compliance", "Director payroll", "Director Form 11", "Expense and subsistence guidance"],
        details: ["Mileage and reimbursement guidance", "Company pension contribution support", "Cross-border VAT guidance where relevant", "Named accountant", "Cloud bookkeeping"],
        limits: "Up to 15 transactions / month · sales up to €150k",
      },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    intro:
      "Built for online sellers that need platform reconciliation and EU VAT handled alongside the year-end accounts.",
    setupOffer: {
      name: "E-commerce Finance Setup",
      priceLabel: "€199 · one-off",
      strap: "For stores that need clean finance foundations before ongoing bookkeeping starts.",
      includes: ["Platform and payment feeds", "Chart of accounts and opening setup", "VAT and OSS readiness review"],
    },
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
      {
        name: "E-commerce Scale",
        strap: "For higher-volume stores that need finance reporting as well as bookkeeping.",
        price: 449,
        features: ["Everything in Multi-channel", "Multi-currency reconciliation", "Monthly management accounts", "Channel and margin reporting"],
        details: ["Stock and COGS accounting", "OSS and IOSS", "Priority turnaround", "Named accountant"],
        limits: "Sales up to €1m · higher-volume platform activity",
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
    items: [["Business name registration", "€75 + CRO fee"], ["Strike-off (voluntary)", "€325"], ["Non-resident director support", "Quote"], ["Registered office / company secretary", "Quote"]],
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
}): FinderResult {
  if (startingOut) {
    if (segment === "sole-trader") {
      return {
        segment,
        name: "Sole Trader Start-Up",
        priceLabel: "€149 · one-off",
        reason: "This gets the Revenue and bookkeeping setup in place before regular trading begins.",
      };
    }

    if (segment === "contractor") {
      return {
        segment,
        name: "Contractor Launch",
        priceLabel: "€249 + CRO fee · one-off",
        reason: "This covers the company, director payroll and bookkeeping setup needed before the first invoice.",
      };
    }

    if (segment === "ecommerce") {
      return {
        segment,
        name: "E-commerce Finance Setup",
        priceLabel: "€199 · one-off",
        reason: "This sets up platform feeds, the bookkeeping structure and VAT/OSS readiness before ongoing bookkeeping.",
      };
    }

    return {
      segment,
      name: "Company Launch",
      priceLabel: "€299 + CRO fee · one-off",
      reason: "This covers company formation plus the core Revenue, RBO, payroll and bookkeeping setup.",
    };
  }

  if (segment === "ecommerce") {
    if (turnover > 1_000_000) {
      return {
        segment: "ecommerce",
        name: "Bespoke",
        priceLabel: "From €499 / month",
        reason: "Your sales volume is above the published E-commerce Scale limit, so the work needs to be scoped.",
      };
    }

    if (turnover > 500_000) {
      return {
        segment: "ecommerce",
        name: "E-commerce Scale",
        priceLabel: "€449 / month",
        reason: "Your sales volume is above Multi-channel and fits the higher-volume Scale tier.",
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
    if (transactions > 150 || turnover > 500_000 || staff > 5) {
      return {
        segment: "sole-trader",
        name: "Bespoke",
        priceLabel: "From €499 / month",
        reason: "At least one part of your activity is above the published Sole Trader Scale limits.",
      };
    }

    if (transactions > 80 || turnover > 250_000 || staff > 2) {
      return {
        segment: "sole-trader",
        name: "Sole Trader Scale",
        priceLabel: "€249 / month",
        reason: "Your activity is above Plus and fits the higher-volume Scale tier.",
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
        name: "Dormant & Holding",
        priceLabel: "€79 / month",
        reason: "This matches the dormant/holding limits: minimal activity, no payroll and one director.",
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
