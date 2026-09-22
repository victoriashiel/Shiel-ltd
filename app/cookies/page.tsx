import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cookie policy", alternates: { canonical: "/cookies" } };

export default function CookiesPage() {
  return <section className="legal-page section-pad"><p className="eyebrow">Legal</p><h1>Cookie policy</h1><p className="legal-updated">Last updated: 22 September 2026</p><div className="legal-copy"><h2>Current website setup</h2><p>The website is designed to operate without non-essential advertising or analytics cookies by default. Essential technical storage may still be used by the hosting platform where required for security, performance or delivery.</p><h2>If analytics are added</h2><p>If non-essential analytics, advertising or similar technologies are introduced, this policy and the consent experience should be updated before those technologies are enabled for visitors where consent is legally required.</p><h2>Browser controls</h2><p>You can use your browser settings to inspect, block or delete cookies and other site data. Blocking essential storage can affect how some websites function.</p></div></section>;
}
