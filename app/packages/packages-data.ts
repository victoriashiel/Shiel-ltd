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
      "Company accounts, Corporation Tax, CRO filing, VAT, bookkeeping and director tax support in one monthly fee.",
    plans: [
      {
        name: "Dormant & Pre-trade",
        strap: "For newly formed, pre-trading or dormant companies.",
        price: 79,
        features: ["Dormant or abridged accounts", "CT1 and B1 filing", "RBO and CRO compliance", "1 director Form 11"],
        details: ["Named accountant", "Compliance calendar and reminders", "Basic record review", "Bank feed where relevant"],
        limits: "Up to 10 accounting entries / month · sales up to €10k · no payroll",
      },
      {
        name: "LTD Starter",
        strap: "For new and small trading companies.",
        price: 179,
        features: ["Monthly bookkeeping", "Payroll for up to 2 employees", "CT1, B1, VAT3 and RTD", "1 director Form 11"],
        details: ["Annual accountant review", "Named accountant", "Cloud bookkeeping software", "Bank feeds", "RBO maintenance", "ERR reporting where applicable"],
        limits: "Up to 30 transactions / month · sales up to €150k · 2 directors",
      },
      {
        name: "LTD Growth",
        strap: "For growing companies with staff and steady sales.",
        price: 279,
        popular: true,
        features: ["Everything in Starter", "Payroll for up to 6 employees", "Quarterly management accounts", "VIES returns"],
        details: ["Quarterly review call", "Form 11 for 2 directors", "Named accountant", "Cloud bookkeeping software", "Bank feeds", "RBO maintenance", "ERR reporting where applicable"],
        limits: "Up to 60 transactions / month · sales up to €400k · 3 directors",
      },
      {
        name: "LTD Scale",
        strap: "For established SMEs and more complex structures.",
        price: 449,
        features: ["Everything in Growth", "Payroll for up to 15 staff", "Monthly management accounts", "Cash, RCT and group structures"],
        details: ["Weekly payroll runs where needed", "Monthly review call", "Form 11 for 3 directors", "Priority turnaround", "Named accountant", "ERR reporting where applicable"],
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
        name: "Sole Trader Start-Up",
        strap: "For people registering as self-employed and getting the finance side set up properly.",
        price: 149,
        billing: "one-off",
        features: ["Income Tax registration", "ROS setup", "Bookkeeping setup", "VAT, PAYE or RCT setup where needed"],
        details: ["Initial expense guidance", "Record-keeping setup", "Key filing dates explained", "Business name registration guidance where relevant"],
        limitsLabel: "Setup scope",
        limits: "One-off registration and finance setup · ongoing bookkeeping not included",
      },
      {
        name: "Sole Trader Essentials",
        strap: "For freelancers and newer self-employed clients.",
        price: 99,
        features: ["Monthly bookkeeping", "Annual accounts / profit & loss", "Form 11 + preliminary tax", "Named accountant"],
        details: ["Receipt capture and bank feed", "VAT returns if registered", "Deadline reminders", "Routine Revenue queries"],
        limits: "Up to 20 accounting transactions / month · turnover up to €80k",
      },
      {
        name: "Sole Trader Plus",
        strap: "For busy sole traders with staff or card payments.",
        price: 159,
        popular: true,
        features: ["Everything in Essentials", "Payroll for up to 2 employees", "Quarterly management summary", "Card, Stripe and SumUp feeds"],
        details: ["VAT filing where registered", "Cloud bookkeeping", "Named accountant", "Deadline reminders"],
        limits: "Up to 60 accounting transactions / month · turnover up to €200k",
      },
      {
        name: "Sole Trader Scale",
        strap: "For established self-employed businesses with higher activity.",
        price: 299,
        features: ["Everything in Plus", "Payroll for up to 5 employees", "Monthly management accounts", "Multiple income streams"],
        details: ["VAT filing", "Payment platform feeds", "Annual tax-planning review", "Priority turnaround", "Named accountant"],
        limits: "Up to 150 accounting transactions / month · turnover up to €500k",
      },
    ],
  },
  {
    id: "contractor",
    label: "Contractor",
    intro:
      "A specialist company package for contractors who want payroll, tax, expenses and compliance handled without a full SME plan.",
    advisoryOffer: {
      name: "Contractor Structure Review",
      priceLabel: "€95 · credited if you set up with Shiel",
      strap: "Compare PAYE umbrella, director umbrella and a personal limited company before choosing how to contract.",
    },
    plans: [
      {
        name: "Contractor Launch",
        strap: "For new contractors setting up a personal limited company before the first invoice.",
        price: 395,
        billing: "one-off",
        priceNote: "+ CRO fee",
        features: ["Personal limited company formation", "Director payroll setup", "Revenue registrations", "Expenses, ERR and bookkeeping setup"],
        details: ["Initial contractor expense guidance", "Compliance calendar", "Opening bookkeeping structure", "First-year filing roadmap"],
        limitsLabel: "Setup scope",
        limits: "One-off company and finance setup · ongoing monthly accounting not included",
      },
      {
        name: "Contractor",
        strap: "For single-director companies with one client and a monthly invoice.",
        price: 119,
        features: ["CT1, B1 and VAT compliance", "Director payroll", "Director Form 11", "Expense and subsistence guidance"],
        details: ["Mileage and reimbursement guidance", "ERR reporting where applicable", "Company pension contribution support", "Cross-border VAT guidance where relevant", "Free accountant handover", "Named accountant", "Cloud bookkeeping"],
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
        details: ["Named accountant", "Cloud bookkeeping", "Bank feeds", "Deadline reminders", "Annual accounts + CT1/Form 11 as applicable", "Third-party app subscriptions excluded"],
        limits: "Up to 50 accounting transactions / month · sales up to €150k",
      },
      {
        name: "E-commerce Multi-channel",
        strap: "For sellers operating across several platforms or marketplaces.",
        price: 279,
        features: ["Multi-platform reconciliation", "OSS and IOSS", "Stock and COGS accounting", "Monthly margin report"],
        details: ["Named accountant", "Cloud bookkeeping", "Bank feeds", "Deadline reminders", "Annual accounts + CT1/Form 11 as applicable", "Additional country VAT registrations quoted separately", "Third-party app subscriptions excluded"],
        limits: "Up to 100 accounting transactions / month · sales up to €500k",
      },
      {
        name: "E-commerce Scale",
        strap: "For higher-volume stores that need finance reporting as well as bookkeeping.",
        price: 449,
        features: ["Everything in Multi-channel", "Multi-currency reconciliation", "Monthly management accounts", "Channel and margin reporting"],
        details: ["Stock and COGS accounting", "OSS and IOSS", "Priority turnaround", "Annual accounts + CT1/Form 11 as applicable", "Additional country VAT registrations quoted separately", "Third-party app subscriptions excluded", "Named accountant"],
        limits: "Up to 200 accounting transactions / month · sales up to €1m",
      },
    ],
  },
];

export const commonCompany = [
  "Dedicated accountant",
  "Annual financial statements",
  "Corporation Tax return (CT1)",
  "CRO Annual Return (B1)",
  "RBO maintenance",
  "Director Form 11",
  "VAT3 and RTD where registered",
  "Cloud bookkeeping / bank feeds where relevant",
];

export const addOnGroups = [
  {
    title: "Volume & bookkeeping",
    items: [["10 extra accounting transactions", "€15 / month"], ["Additional sales platform or feed", "From €25 / month"], ["Additional bank / payment feed", "From €15 / month"]],
  },
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
    items: [["Company formation + initial registrations", "€495 + CRO fee"], ["Business name registration", "€75 + CRO fee"], ["Strike-off (voluntary)", "€325"], ["Non-resident director support", "Quote"], ["Registered office / company secretary", "Quote"]],
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
        priceLabel: "€395 + CRO fee · one-off",
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
      name: "Dormant & Pre-trade",
      priceLabel: "€79 / month",
      reason: "This is the entry company plan for newly formed, pre-trading or dormant companies.",
    };
  }

  if (segment === "ecommerce") {
    if (transactions > 200 || turnover > 1_000_000) {
      return {
        segment: "ecommerce",
        name: "Bespoke",
        priceLabel: "From €499 / month",
        reason: "Your sales volume is above the published E-commerce Scale limit, so the work needs to be scoped.",
      };
    }

    if (transactions > 100 || turnover > 500_000) {
      return {
        segment: "ecommerce",
        name: "E-commerce Scale",
        priceLabel: "€449 / month",
        reason: "Your accounting volume or sales level is above Multi-channel and fits the higher-volume Scale tier.",
      };
    }

    if (platforms === "multi" || transactions > 50 || turnover > 150_000) {
      return {
        segment: "ecommerce",
        name: "E-commerce Multi-channel",
        priceLabel: "€279 / month",
        reason: platforms === "multi"
          ? "You sell across more than one platform."
          : transactions > 50
            ? "Your accounting transaction volume is above the Launch plan limit."
            : "Your sales are above the Launch plan limit of €150k.",
      };
    }

    return {
      segment: "ecommerce",
      name: "E-commerce Launch",
      priceLabel: "€179 / month",
      reason: "This fits one-platform selling with up to 50 accounting transactions a month and annual sales up to €150k.",
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

    if (transactions > 60 || turnover > 200_000 || staff > 2) {
      return {
        segment: "sole-trader",
        name: "Sole Trader Scale",
        priceLabel: "€299 / month",
        reason: "Your activity is above Plus and fits the higher-volume Scale tier.",
      };
    }

    if (transactions > 20 || turnover > 80_000 || staff > 0) {
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
      reason: "This fits up to 20 monthly accounting transactions and turnover up to €80k with no payroll.",
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
