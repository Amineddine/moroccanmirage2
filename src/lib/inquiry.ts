/**
 * Inquiry delivery — posts form submissions to FormSubmit from the browser
 * and forwards them to the owner's inbox.
 *
 * This runs client-side on purpose: FormSubmit blocks requests from
 * data-center IPs (Vercel functions included), but happily accepts them from
 * real visitors' browsers. The destination address is kept base64-encoded so
 * naive email scrapers crawling the bundle don't harvest it.
 *
 * The inbox needed a one-time "Activate Form" click (done 2026-07-07).
 */

// amineeddine006@gmail.com
const TARGET = "YW1pbmVlZGRpbmUwMDZAZ21haWwuY29t";

export async function sendInquiry(
  fields: Record<string, string>
): Promise<{ success: boolean; error?: string }> {
  // honeypot — bots fill it, humans never see it; pretend success and drop
  if (fields.botcheck && fields.botcheck.trim() !== "") {
    return { success: true };
  }

  const name = (fields.name ?? "").trim();
  const email = (fields.email ?? "").trim();
  if (!name || !/\S+@\S+\.\S+/.test(email)) {
    return { success: false, error: "A name and a valid email are required." };
  }

  const { subject, botcheck: _botcheck, ...rest } = fields;
  void _botcheck;

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${atob(TARGET)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: subject || `New inquiry — ${name}`,
        _template: "table",
        _captcha: "false",
        _replyto: email,
        ...rest,
      }),
    });
    const out = (await res.json().catch(() => null)) as {
      success?: string | boolean;
      message?: string;
    } | null;
    if (!res.ok || !(out?.success === true || out?.success === "true")) {
      return {
        success: false,
        error: `The inquiry could not be delivered${out?.message ? ` (${out.message})` : ""}. Please try again.`,
      };
    }
    return { success: true };
  } catch {
    return { success: false, error: "Network error — please check your connection and try again." };
  }
}
