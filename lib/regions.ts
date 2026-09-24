export const regionSlugs = ["ireland", "uk", "uae", "gibraltar", "spain"] as const;

export type RegionSlug = (typeof regionSlugs)[number];

export type RegionConfig = {
  slug: RegionSlug;
  name: string;
  countryCode: "IE" | "GB" | "AE" | "GI" | "ES";
  locale: "en-IE" | "en-GB" | "en-AE" | "en-GI" | "en-ES";
  defaultCurrency: "EUR" | "GBP" | "AED" | "GIP";
  path: `/${RegionSlug}`;
};

export const regions: Record<RegionSlug, RegionConfig> = {
  ireland: {
    slug: "ireland",
    name: "Ireland",
    countryCode: "IE",
    locale: "en-IE",
    defaultCurrency: "EUR",
    path: "/ireland",
  },
  uk: {
    slug: "uk",
    name: "United Kingdom",
    countryCode: "GB",
    locale: "en-GB",
    defaultCurrency: "GBP",
    path: "/uk",
  },
  uae: {
    slug: "uae",
    name: "UAE",
    countryCode: "AE",
    locale: "en-AE",
    defaultCurrency: "AED",
    path: "/uae",
  },
  gibraltar: {
    slug: "gibraltar",
    name: "Gibraltar",
    countryCode: "GI",
    locale: "en-GI",
    defaultCurrency: "GIP",
    path: "/gibraltar",
  },
  spain: {
    slug: "spain",
    name: "Spain",
    countryCode: "ES",
    locale: "en-ES",
    defaultCurrency: "EUR",
    path: "/spain",
  },
};

export const regionList = regionSlugs.map((slug) => regions[slug]);

export const regionByCountryCode = Object.fromEntries(
  regionList.map((region) => [region.countryCode, region]),
) as Record<RegionConfig["countryCode"], RegionConfig>;

export function isRegionSlug(value: string): value is RegionSlug {
  return regionSlugs.includes(value as RegionSlug);
}

export function getRegionAlternates() {
  return {
    "en-IE": regions.ireland.path,
    "en-GB": regions.uk.path,
    "en-AE": regions.uae.path,
    "en-GI": regions.gibraltar.path,
    "en-ES": regions.spain.path,
    "x-default": "/",
  } as const;
}
