import { NextResponse } from "next/server";
import { SITE_URL } from "@/data/site";

/**
 * Inquiry relay — receives submissions from the contact sheet and the
 * customize commission and forwards them by email via FormSubmit
 * (https://formsubmit.co — no account or API key required).
 *
 * Inquiries are delivered to INQUIRY_EMAIL below. The address only lives
 * server-side, so it is never exposed to scrapers on the page. The very
 * first submission triggers a one-time activation email from FormSubmit to
 * that inbox — click "Activate" once and every inquiry after that is
 * forwarded automatically.
 */
const INQUIRY_EMAIL = process.env.INQUIRY_EMAIL ?? "amineeddine006@gmail.com";

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid payload." }, { status: 400 });
  }

  // honeypot — bots fill it, humans never see it; pretend success and drop
  if (typeof data.botcheck === "string" && data.botcheck.trim() !== "") {
    return NextResponse.json({ success: true });
  }
  delete data.botcheck;

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  if (!name || !/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json(
      { success: false, error: "A name and a valid email are required." },
      { status: 400 }
    );
  }

  const { subject, ...fields } = data;

  const res = await fetch(`https://formsubmit.co/ajax/${INQUIRY_EMAIL}`, {
    method: "POST",
    // FormSubmit rejects requests without a web origin, including server-side ones
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: SITE_URL,
      Referer: `${SITE_URL}/contact`,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
    },
    body: JSON.stringify({
      _subject: String(subject ?? `New inquiry — ${name}`),
      _template: "table",
      _captcha: "false",
      _replyto: email,
      ...fields,
    }),
  });

  const out = (await res.json().catch(() => null)) as {
    success?: string | boolean;
    message?: string;
  } | null;
  if (!res.ok || !(out?.success === true || out?.success === "true")) {
    console.error("FormSubmit relay failed:", res.status, out);
    return NextResponse.json(
      {
        success: false,
        error: `The inquiry could not be delivered${out?.message ? ` (${out.message})` : ""}. Please try again.`,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
