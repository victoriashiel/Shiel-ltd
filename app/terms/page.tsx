import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Website terms", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return <section className="legal-page section-pad"><p className="eyebrow">Legal</p><h1>Website terms</h1><p className="legal-updated">Last updated: 22 September 2026</p><div className="legal-copy"><h2>General information</h2><p>The content on this website is general information about {siteConfig.legalName} and its services. It is not accounting, tax, legal, investment or other professional advice for any particular person or situation.</p><h2>No adviser-client relationship</h2><p>Using the website or sending an enquiry does not by itself create a professional engagement. Any work will be subject to an agreed scope and, where applicable, engagement terms.</p><h2>Accuracy</h2><p>We aim to keep website information clear and current, but laws, rates and administrative practice can change. You should obtain advice based on your facts before acting on technical information.</p><h2>Third parties</h2><p>Where the website links to third-party services or information, those resources are controlled by their respective providers.</p><h2>Contact</h2><p>Questions about these website terms can be sent to <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p></div></section>;
}
