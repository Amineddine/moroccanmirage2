"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND } from "@/data/site";
import { sendInquiry } from "@/lib/inquiry";
import Reveal from "@/components/ui/Reveal";
import Coordinates from "@/components/atlas/Coordinates";

const SERVICES = [
  "Moroccan Tours",
  "Excursions & Activities",
  "Private Airport Transfer",
  "Customize My Trip",
  "Other",
];

export default function ContactClient() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const fields = Object.fromEntries(
      Array.from(fd.entries()).map(([k, v]) => [k, String(v)])
    );
    const service = fields.service ?? "General";

    const out = await sendInquiry({
      subject: `New inquiry — ${service} — ${fields.name ?? ""}`,
      ...fields,
    });
    setSending(false);
    if (out.success) {
      setSent(true);
      window.scrollTo({ top: 0 });
    } else {
      setError(out.error ?? `Something went wrong. Please retry, or email us directly at ${BRAND.email}.`);
    }
  };

  return (
    <main data-horizon="58,-2,CORRESPONDENCE" className="min-h-screen bg-night">
      <div className="mx-auto grid max-w-[1680px] gap-16 px-6 pb-28 pt-40 lg:grid-cols-[1fr_1.3fr] lg:gap-24 lg:px-12 lg:pb-36">
        {/* left — the address */}
        <div>
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="plate-label">Get In Touch</span>
              <span className="rule-gold w-16" />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-display mt-8 text-[clamp(2.8rem,5.6vw,5.4rem)] font-light leading-[1.02] text-bone">
              Let&apos;s Craft <br />
              Your <span className="italic text-amber">Journey</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-14 space-y-8 border-l border-bone/10 pl-8">
              <div>
                <p className="mono-note">Telephone / WhatsApp</p>
                <a
                  href={BRAND.phoneHref}
                  className="font-display mt-2 block text-2xl font-light text-bone transition-colors hover:text-amber"
                >
                  {BRAND.phone}
                </a>
              </div>
              <div>
                <p className="mono-note">Correspondence</p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="font-display mt-2 block text-2xl font-light break-all text-bone transition-colors hover:text-amber"
                >
                  {BRAND.email}
                </a>
              </div>
              <div>
                <p className="mono-note">Headquarters</p>
                <p className="font-display mt-2 text-2xl font-light text-bone">{BRAND.city}</p>
                <div className="mt-2">
                  <Coordinates value="31.6295° N — 7.9811° W" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mono-note mt-14 max-w-xs leading-loose">
              We will respond within 24 hours to begin crafting your journey.
            </p>
          </Reveal>
        </div>

        {/* right — the inquiry sheet */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="corner-ticks flex min-h-[540px] flex-col items-center justify-center border border-gold/30 bg-panel px-10 text-center"
              >
                <span aria-hidden className="font-display text-6xl text-gold">✓</span>
                <h2 className="font-display mt-8 text-4xl font-light text-bone">
                  Message <span className="italic text-amber">Received</span>
                </h2>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-bone-dim">
                  Thank you{name ? `, ${name}` : ""}. Our travel concierge will be in touch with
                  you shortly.
                </p>
                <p className="mono-note mt-10">Ref. MM-{new Date().getFullYear()} — Marrakech Desk</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="corner-ticks border border-bone/15 bg-panel p-8 md:p-12"
              >
                <p className="plate-label">Inquiry Sheet — № 001</p>

                {/* honeypot — hidden from humans, tempting to bots */}
                <input
                  type="text"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                <div className="mt-10 grid gap-9 sm:grid-cols-2">
                  <Field label="Full Name *">
                    <input
                      required
                      name="name"
                      className="field"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Field>
                  <Field label="Email *">
                    <input
                      required
                      type="email"
                      name="email"
                      className="field"
                      placeholder="you@example.com"
                    />
                  </Field>
                  <Field label="Phone / WhatsApp">
                    <input name="phone" className="field" placeholder="+1 ..." />
                  </Field>
                  <Field label="Number of Guests">
                    <input type="number" name="guests" min={1} defaultValue={2} className="field" />
                  </Field>
                  <Field label="Service">
                    <select name="service" className="field" defaultValue={SERVICES[0]}>
                      {SERVICES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Preferred Travel Dates">
                    <input name="travel_dates" className="field" placeholder="e.g. October 2026" />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Message">
                      <textarea
                        rows={5}
                        name="message"
                        className="field resize-none"
                        placeholder="Tell us about your dream Moroccan experience..."
                      />
                    </Field>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-12 w-full border border-gold/60 bg-gold/10 py-5 font-mono text-[11px] tracking-[0.32em] text-gold uppercase transition-colors duration-300 enabled:hover:bg-gold enabled:hover:text-abyss disabled:opacity-50"
                >
                  {sending ? "Sending…" : "Send Inquiry →"}
                </button>

                {error && (
                  <p className="mt-5 text-center text-[13px] leading-relaxed text-clay" role="alert">
                    {error}
                  </p>
                )}

                <p className="mono-note mt-6 text-center !text-[9px]">
                  We will respond within 24 hours to begin crafting your journey.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mono-note mb-2 block">{label}</span>
      {children}
    </label>
  );
}
