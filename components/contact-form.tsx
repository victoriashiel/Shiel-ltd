"use client";

import Link from "next/link";
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
    const business = String(form.get("business") || "");
    const country = String(form.get("country") || "");
    const enquiryType = String(form.get("enquiryType") || "");
    const message = String(form.get("message") || "");

    const subject = encodeURIComponent(`${enquiryType} enquiry from ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Business / organisation: ${business || "Not provided"}`,
        `Country / region: ${country}`,
        `Enquiry type: ${enquiryType}`,
        "",
        message,
      ].join("\n"),
    );

    setStatus("ready");
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-grid two-col">
        <label>
          <span>Name</span>
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>

      <div className="form-grid two-col">
        <label>
          <span>Phone <em>optional</em></span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" />
        </label>
        <label>
          <span>Business / organisation <em>optional</em></span>
          <input name="business" autoComplete="organization" />
        </label>
      </div>

      <div className="form-grid two-col">
        <label>
          <span>Country / region</span>
          <input name="country" autoComplete="country-name" required />
        </label>
        <label>
          <span>Enquiry type</span>
          <select name="enquiryType" defaultValue="" required>
            <option value="" disabled>Select the closest match</option>
            <option>Tax & compliance</option>
            <option>Bookkeeping & payroll</option>
            <option>Advisory & growth</option>
            <option>International accounting</option>
            <option>Existing client query</option>
            <option>Other</option>
          </select>
        </label>
      </div>

      <label>
        <span>How can we help?</span>
        <textarea
          name="message"
          rows={7}
          required
          aria-describedby="message-hint"
        />
        <small className="form-hint" id="message-hint">
          Give us enough context to understand the issue, but do not include passwords, bank details, tax identification numbers or other sensitive financial information.
        </small>
      </label>

      <p className="form-privacy">
        We use the details you provide to respond to your enquiry. See our{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>

      <div className="form-actions">
        <button className="button button-dark" type="submit">
          Send enquiry <span aria-hidden="true">↗</span>
        </button>
        <p aria-live="polite">
          {status === "ready"
            ? "Your email app should open with the enquiry prepared."
            : "Submitting opens your email app with the message prepared."}
        </p>
      </div>
    </form>
  );
}
