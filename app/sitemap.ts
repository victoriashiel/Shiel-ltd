import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { regionContent } from "@/lib/region-content";
import { internationalScenarioList } from "@/lib/international-scenarios";
import { getRegionAlternates, regions, type RegionSlug } from "@/lib/regions";
import { regionalServiceSlugs } from "@/lib/regional-services";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url },
    ...services.map((service) => ({
      url: `${siteConfig.url}/${service.slug}`,
    })),
    ...internationalScenarioList.map((scenario) => ({
      url: `${siteConfig.url}/international-accounting/${scenario.slug}`,
    })),
    ...Object.keys(regionContent).flatMap((slug) => {
      const region = regions[slug as RegionSlug];
      return internationalScenarioList.map((scenario) => ({
        url: `${siteConfig.url}${region.path}/international-accounting/${scenario.slug}`,
        alternates: {
          languages: Object.fromEntries(
            Object.entries(getRegionAlternates()).map(([locale, path]) => [
              locale,
              locale === "x-default"
                ? `${siteConfig.url}/international-accounting/${scenario.slug}`
                : `${siteConfig.url}${path}/international-accounting/${scenario.slug}`,
            ]),
          ),
        },
      }));
    }),
    ...Object.keys(regionContent).map((slug) => {
      const region = regions[slug as RegionSlug];
      return {
        url: `${siteConfig.url}${region.path}`,
        alternates: {
          languages: Object.fromEntries(
            Object.entries(getRegionAlternates()).map(([locale, path]) => [
              locale,
              path === "/" ? siteConfig.url : `${siteConfig.url}${path}`,
            ]),
          ),
        },
      };
    }),
    ...Object.keys(regionContent).flatMap((slug) => {
      const region = regions[slug as RegionSlug];
      return regionalServiceSlugs.map((service) => ({
        url: `${siteConfig.url}${region.path}/${service}`,
        alternates: {
          languages: Object.fromEntries(
            Object.entries(getRegionAlternates()).map(([locale, path]) => [
              locale,
              locale === "x-default"
                ? `${siteConfig.url}/${service}`
                : `${siteConfig.url}${path}/${service}`,
            ]),
          ),
        },
      }));
    }),
    ...Object.keys(regionContent).map((slug) => {
      const region = regions[slug as RegionSlug];
      return {
        url: `${siteConfig.url}${region.path}/contact`,
        alternates: {
          languages: Object.fromEntries(
            Object.entries(getRegionAlternates()).map(([locale, path]) => [
              locale,
              locale === "x-default"
                ? `${siteConfig.url}/contact`
                : `${siteConfig.url}${path}/contact`,
            ]),
          ),
        },
      };
    }),
    { url: `${siteConfig.url}/packages` },
    ...Object.keys(regionContent).map((slug) => {
      const region = regions[slug as RegionSlug];
      return {
        url: `${siteConfig.url}${region.path}/packages`,
        alternates: {
          languages: Object.fromEntries(
            Object.entries(getRegionAlternates()).map(([locale, path]) => [
              locale,
              locale === "x-default"
                ? `${siteConfig.url}/packages`
                : `${siteConfig.url}${path}/packages`,
            ]),
          ),
        },
      };
    }),
    { url: `${siteConfig.url}/contact` },
    { url: `${siteConfig.url}/privacy` },
    { url: `${siteConfig.url}/cookies` },
    { url: `${siteConfig.url}/terms` },
  ];
}
