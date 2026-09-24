import type { RegionSlug } from "@/lib/regions";

export type RegionPageContent = {
  slug: RegionSlug;
  eyebrow: string;
  title: string;
  intro: string;
  reviewed: string;
  services: {
    title: string;
    description: string;
    items: string[];
  }[];
  compliance: {
    label: string;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

export const regionContent: Partial<Record<RegionSlug, RegionPageContent>> = {
  ireland: {
    slug: "ireland",
    eyebrow: "Ireland",
    title: "Accounting for businesses, contractors and founders in Ireland.",
    intro:
      "Irish bookkeeping, payroll, tax and company compliance handled as one connected service, with support for clients whose work or ownership also crosses borders.",
    reviewed: "Reviewed September 2026",
    services: [
      {
        title: "Limited companies",
        description: "Year-end accounts, Corporation Tax and CRO compliance supported by bookkeeping that stays usable throughout the year.",
        items: ["Annual financial statements", "CT1 and preliminary tax", "B1 annual return", "VAT, PAYE and RCT where relevant"],
      },
      {
        title: "Sole traders",
        description: "A practical route from registration through bookkeeping and the annual self-assessment cycle.",
        items: ["Income Tax registration", "Bookkeeping and records", "Form 11", "VAT or PAYE where relevant"],
      },
      {
        title: "Contractors",
        description: "Accounting for personal limited companies and contractors who want payroll, expenses and filings handled together.",
        items: ["Director payroll", "Company accounts and CT1", "Director Form 11", "Expenses and reimbursements"],
      },
      {
        title: "International owners",
        description: "Irish accounting coordinated with overseas ownership, residence or advisers where more than one jurisdiction is involved.",
        items: ["Irish entity compliance", "Cross-border information packs", "Multi-currency records", "Adviser coordination"],
      },
    ],
    compliance: [
      {
        label: "Revenue",
        title: "Corporation Tax",
        description: "Irish companies file Corporation Tax returns through ROS using Form CT1 and pay the tax due under the applicable filing timetable.",
      },
      {
        label: "CRO",
        title: "Annual return",
        description: "Irish companies have an Annual Return Date and file Form B1 with the Companies Registration Office within the statutory filing window.",
      },
      {
        label: "Self-assessment",
        title: "Form 11",
        description: "Sole traders and other individuals within self-assessment file their annual Income Tax return through Revenue, generally using ROS.",
      },
      {
        label: "Ongoing taxes",
        title: "VAT, PAYE & RCT",
        description: "Registrations and recurring returns depend on how the business operates, employs people and what work it carries out.",
      },
    ],
    faqs: [
      {
        question: "When is an Irish company's CT1 due?",
        answer:
          "For most companies, the Corporation Tax return and balance of tax are due nine months after the end of the accounting period, with electronic filing and payment generally due by the 23rd day of that month.",
      },
      {
        question: "When is a B1 annual return due?",
        answer:
          "A company has an Annual Return Date (ARD). The annual return must be filed with the CRO within 56 days of the date to which the return is made up.",
      },
      {
        question: "Do sole traders need to register with Revenue?",
        answer:
          "Yes. A person becoming a sole trader must register for tax. Depending on the business, additional registrations can include VAT, Employer PAYE or RCT.",
      },
      {
        question: "Can Shiel help if I live outside Ireland but own an Irish company?",
        answer:
          "Yes. We can handle the Irish accounting and compliance work and coordinate the information needed by overseas advisers where another jurisdiction also has to be considered.",
      },
    ],
  },
};
