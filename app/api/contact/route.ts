import { NextResponse } from "next/server";

const allowedEnquiryTypes = new Set([
  "Tax & compliance",
  "Bookkeeping & payroll",
  "Advisory & growth",
  "International accounting",
  "Packages & pricing",
  "Existing client query",
  "Other",
]);

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot: real visitors never see or complete this field.
    if (clean(body.companyWebsite, 200)) {
      return NextResponse.json({ ok: true });
    }

    const name = clean(body.name, 120);
    const email = clean(body.email, 254);
    const phone = clean(body.phone, 80);
    const business = clean(body.business, 160);
    const country = clean(body.country, 120);
    const enquiryType = clean(body.enquiryType, 80);
    const message = clean(body.message, 5000);

    if (
      !name ||
      !validEmail(email) ||
      !country ||
      !allowedEnquiryTypes.has(enquiryType) ||
      message.length < 10
    ) {
      return NextResponse.json(
        { ok: false, error: "Please check the form and try again." },
        { status: 400 },
      );
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_EMAIL_API_TOKEN;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!accountId || !apiToken || !to || !from) {
      console.error("Contact form email delivery is not configured.");
      return NextResponse.json(
        { ok: false, error: "The contact form is temporarily unavailable." },
        { status: 503 },
      );
    }

    const text = [
      "New website enquiry",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Business / organisation: ${business || "Not provided"}`,
      `Country / region: ${country}`,
      `Enquiry type: ${enquiryType}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/email/sending/send`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          from,
          replyTo: email,
          subject: `Shiel website enquiry: ${enquiryType}`,
          text,
        }),
        cache: "no-store",
      },
    );

    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
      console.error("Cloudflare Email Service error", {
        status: response.status,
        errors: result?.errors,
      });
      return NextResponse.json(
        { ok: false, error: "We could not send your enquiry. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json(
      { ok: false, error: "We could not send your enquiry. Please try again." },
      { status: 500 },
    );
  }
}
