"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ready">("idle");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const phone = String(form.get("phone") || "");
    const clientType = String(form.get("clientType") || "");
    const country = String(form.get("country") || "");
    const service = String(form.get("service") || "");
    const message = String(form.get("message") || "");
    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nClient type: ${clientType}\nCountry: ${country}\nService: ${service}\n\n${message}`);
    setStatus("ready");
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-grid two-col">
        <label><span>Name</span><input name="name" required autoComplete="name" /></label>
        <label><span>Email</span><input name="email" type="email" required autoComplete="email" /></label>
      </div>
      <div className="form-grid two-col">
        <label><span>Phone <em>optional</em></span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" /></label>
        <label><span>Client type</span>
          <select name="clientType" defaultValue="" required>
            <option value="" disabled>Select one</option>
            <option>Company / business</option>
            <option>Founder / director</option>
            <option>Contractor / freelancer</option>
            <option>Individual</option>
            <option>Other</option>
          </select>
        </label>
      </div>
      <div className="form-grid two-col">
        <label><span>Country</span><input name="country" autoComplete="country-name" required /></label>
        <label><span>What can we help with?</span>
          <select name="service" defaultValue="" required>
            <option value="" disabled>Select a service</option>
            <option>Tax & compliance</option><option>Bookkeeping & payroll</option>
            <option>Advisory & growth</option><option>International accounting</option><option>Something else</option>
          </select>
        </label>
      </div>
      <label><span>Tell us a little about what you need</span><textarea name="message" rows={6} required /></label>
      <label className="consent"><input name="consent" type="checkbox" required /> <span>I agree that Shiel may use these details to respond to my enquiry.</span></label>
      <div className="form-actions">
        <button className="button button-dark" type="submit">Send enquiry <span aria-hidden="true">↗</span></button>
        <p aria-live="polite">{status === "ready" ? "Your email app should open with the enquiry prepared." : "We only use these details to respond to your enquiry."}</p>
      </div>
    </form>
  );
}
