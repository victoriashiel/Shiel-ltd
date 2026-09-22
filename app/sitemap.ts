import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/services", "/about", "/insights", "/contact", "/privacy", "/cookies", "/terms"];

  return [
    ...staticRoutes.map((path, index) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: now,
      changeFrequency: path === "/insights" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : index < 5 ? 0.8 : 0.3,
    })),
    ...services.map((service) => ({
      url: `${siteConfig.url}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
