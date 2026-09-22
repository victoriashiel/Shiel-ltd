import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shiel Accountancy",
    short_name: "Shiel",
    description: "European-based accountancy for businesses and individuals operating across borders.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f5f0",
    theme_color: "#0b1718",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
