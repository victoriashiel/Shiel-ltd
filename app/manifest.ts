import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shiel Accountants",
    short_name: "Shiel",
    description: "Accountants serving companies in Ireland, the UK and Gibraltar, with selective cross-border support for other jurisdictions.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f5f0",
    theme_color: "#0b1718",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
