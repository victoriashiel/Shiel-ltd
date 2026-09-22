import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shiel Accountants",
    short_name: "Shiel",
    description: "European-based accountants supporting clients internationally across tax, bookkeeping, payroll, advisory and cross-border accounting.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f5f0",
    theme_color: "#0b1718",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
