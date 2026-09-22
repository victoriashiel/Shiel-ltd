import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/insights", destination: "/#services", permanent: true },
      { source: "/services/company-accounts", destination: "/tax-compliance", permanent: true },
      { source: "/services/tax-compliance", destination: "/tax-compliance", permanent: true },
      { source: "/services/vat", destination: "/tax-compliance", permanent: true },
      { source: "/services/payroll", destination: "/bookkeeping-payroll", permanent: true },
      { source: "/services/bookkeeping-management-accounts", destination: "/bookkeeping-payroll", permanent: true },
      { source: "/services/international-accounting", destination: "/international-accounting", permanent: true },
      { source: "/services/advisory-growth", destination: "/advisory-growth", permanent: true },
    ];
  },
};

export default nextConfig;
