"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      business: String(data.get("business") || ""),
      country: String(data.get("country") || ""),
      enquiryType: String(data.get("enquiryType") || ""),
      message: String(data.get("message") || ""),
      companyWebsite: String(data.get("companyWebsite") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || "We could not send your enquiry.");
      }

      form.reset();
      setStatus("sent");
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We could not send your enquiry. Please try again.",
      );
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-grid two-col">
        <label>
          <span>Name</span>
          <input name="name" required autoComplete="name" maxLength={120} />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" required autoComplete="email" maxLength={254} />
        </label>
      </div>

      <div className="form-grid two-col">
        <label>
          <span>Phone <em>optional</em></span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={80} />
        </label>
        <label>
          <span>Business / organisation <em>optional</em></span>
          <input name="business" autoComplete="organization" maxLength={160} />
        </label>
      </div>

      <div className="form-grid two-col">
        <label>
          <span>Country / region</span>
          <input name="country" autoComplete="country-name" required maxLength={120} />
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
          minLength={10}
          maxLength={5000}
          aria-describedby="message-hint"
        />
        <small className="form-hint" id="message-hint">
          Give us enough context to understand the issue, but do not include passwords, bank details,
          tax identification numbers or other sensitive financial information.
        </small>
      </label>

      <div className="form-honeypot" aria-hidden="true">
        <label>
          <span>Website</span>
          <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className="form-privacy">
        We use the details you provide only to respond to your enquiry. See our{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>

      <div className="form-actions">
        <button className="button button-dark" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send enquiry"}{" "}
          {status !== "sending" && <span aria-hidden="true">↗</span>}
        </button>
        <div className="form-status" aria-live="polite">
          {status === "sent" && <p className="form-success">Thanks. Your enquiry has been sent.</p>}
          {status === "error" && <p className="form-error">{error}</p>}
          {status === "idle" && <p>Your enquiry is sent securely from this form.</p>}
        </div>
      </div>
    </form>
  );
}
