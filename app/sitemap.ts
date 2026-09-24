import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { regionContent } from "@/lib/region-content";
import { regions, type RegionSlug } from "@/lib/regions";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url },
    ...services.map((service) => ({
      url: `${siteConfig.url}/${service.slug}`,
    })),
    ...Object.keys(regionContent).map((slug) => {
      const region = regions[slug as RegionSlug];
      return {
        url: `${siteConfig.url}${region.path}`,
        alternates: {
          languages: {
            [region.locale]: `${siteConfig.url}${region.path}`,
            "x-default": siteConfig.url,
          },
        },
      };
    }),
    { url: `${siteConfig.url}/packages` },
    { url: `${siteConfig.url}/contact` },
    { url: `${siteConfig.url}/privacy` },
    { url: `${siteConfig.url}/cookies` },
    { url: `${siteConfig.url}/terms` },
  ];
}
