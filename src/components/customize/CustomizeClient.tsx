"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

const STEPS = [
  "Who is traveling?",
  "Arrival Timeline",
  "Travel Composition",
  "Distinct Regions",
  "Pacing & Energy",
  "Accommodations",
  "Inspirations",
  "Final Details",
] as const;

const COMPOSITION = ["Solo Traveler", "Couple / Pair", "Family with Kids", "Group of Friends"];
const REGIONS = [
  "Sahara & Golden Dunes",
  "Atlas Mountain Valleys",
  "Imperial Medinas",
  "Coastal Retreats",
  "Undecided",
];
const PACING = ["Relaxed & Immersive", "Curated Balance", "Intense Exploration"];
const STAYS = [
  "Authentic Palatial Riads",
  "Sahara Luxury Tents",
  "Modern 5-Star Resorts",
  "A Mix of Everything",
];
const INSPIRATIONS = [
  "Architecture & History",
  "Gastronomy & Tasting",
  "Atlas Trekking",
  "Desert Photography",
  "Hammams & Wellness",
];

type FormState = {
  name: string;
  email: string;
  whatsapp: string;
  arrival: string;
  duration: string;
  composition: string;
  region: string;
  pacing: string;
  stay: string;
  inspirations: string[];
  budget: string;
  desires: string;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  whatsapp: "",
  arrival: "",
  duration: "",
  composition: "",
  region: "",
  pacing: "",
  stay: "",
  inspirations: [],
  budget: "",
  desires: "",
};

export default function CustomizeClient() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = async () => {
    if (sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: `New trip commission — ${form.name}`,
          name: form.name,
          email: form.email,
          whatsapp: form.whatsapp,
          arrival: form.arrival,
          duration: form.duration,
          composition: form.composition,
          regions: form.region,
          pacing: form.pacing,
          accommodation: form.stay,
          inspirations: form.inspirations.join(", "),
          budget: form.budget,
          desires: form.desires,
        }),
      });
      const out = await res.json().catch(() => null);
      if (!res.ok || !out?.success) throw new Error(out?.error);
      setDone(true);
      window.scrollTo({ top: 0 });
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong sending your commission. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  const canAdvance = (() => {
    switch (step) {
      case 0:
        return form.name.trim() !== "" && /\S+@\S+\.\S+/.test(form.email);
      case 2:
        return form.composition !== "";
      case 3:
        return form.region !== "";
      case 4:
        return form.pacing !== "";
      case 5:
        return form.stay !== "";
      default:
        return true;
    }
  })();

  const next = () => {
    if (step === STEPS.length - 1) {
      void submit();
      return;
    }
    setStep((s) => s + 1);
    window.scrollTo({ top: 0 });
  };

  if (done) {
    return (
      <main data-horizon="55,0,COMMISSIONED" className="flex min-h-screen items-center bg-night">
        <div className="mx-auto max-w-2xl px-6 py-40 text-center">
          <Reveal>
            <span aria-hidden className="font-display text-6xl text-gold">✓</span>
            <h1 className="font-display mt-8 text-4xl font-light text-bone md:text-5xl">
              Your journey is <span className="italic text-amber">commissioned</span>
            </h1>
            <p className="mt-8 text-[16px] leading-[1.85] text-bone-dim">
              Thank you. Our luxury travel curators are reviewing your exact requirements and will
              return an exquisitely detailed proposal within 24 hours.
            </p>
            <p className="mono-note mt-12">
              Specification MM-{new Date().getFullYear()} · filed for {form.name || "you"}
            </p>
          </Reveal>
        </div>
      </main>
    );
  }

  return (
    <main data-horizon="60,-2,COMMISSION" className="min-h-screen bg-night">
      <div className="mx-auto max-w-[1240px] px-6 pb-32 pt-40 lg:px-12">
        {/* header */}
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="plate-label">The Commission</span>
            <span className="rule-gold w-16" />
            <span className="mono-note">Eight questions</span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="font-display mt-7 max-w-3xl text-[clamp(2.6rem,5.4vw,5rem)] font-light leading-[1.03] text-bone">
            Craft Your <span className="italic text-amber">Signature</span> Journey.
          </h1>
        </Reveal>

        {/* progress */}
        <div className="mt-16 mb-12">
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-[11px] tracking-[0.3em] text-gold uppercase">
              {String(step + 1).padStart(2, "0")} — {STEPS[step]}
            </p>
            <p className="mono-note">
              {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
            </p>
          </div>
          <div className="mt-4 h-px w-full bg-bone/10">
            <div
              className="h-px bg-gold transition-all duration-700 ease-out"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%`, boxShadow: "0 0 8px rgba(168,118,29,0.4)" }}
            />
          </div>
        </div>

        {/* step body */}
        <div className="min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 0 && (
                <div className="grid max-w-2xl gap-9">
                  <Field label="Name *">
                    <input
                      className="field"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                    />
                  </Field>
                  <Field label="Email *">
                    <input
                      type="email"
                      className="field"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </Field>
                  <Field label="WhatsApp">
                    <input
                      className="field"
                      placeholder="+1 ..."
                      value={form.whatsapp}
                      onChange={(e) => set("whatsapp", e.target.value)}
                    />
                  </Field>
                </div>
              )}

              {step === 1 && (
                <div className="grid max-w-2xl gap-9">
                  <Field label="Arrival — month & year">
                    <input
                      className="field"
                      placeholder="e.g. October 2026"
                      value={form.arrival}
                      onChange={(e) => set("arrival", e.target.value)}
                    />
                  </Field>
                  <Field label="Duration">
                    <input
                      className="field"
                      placeholder="e.g. 8–10 days"
                      value={form.duration}
                      onChange={(e) => set("duration", e.target.value)}
                    />
                  </Field>
                </div>
              )}

              {step === 2 && (
                <OptionGrid
                  options={COMPOSITION}
                  selected={[form.composition]}
                  onSelect={(v) => set("composition", v)}
                />
              )}
              {step === 3 && (
                <OptionGrid
                  options={REGIONS}
                  selected={[form.region]}
                  onSelect={(v) => set("region", v)}
                />
              )}
              {step === 4 && (
                <OptionGrid
                  options={PACING}
                  selected={[form.pacing]}
                  onSelect={(v) => set("pacing", v)}
                />
              )}
              {step === 5 && (
                <OptionGrid
                  options={STAYS}
                  selected={[form.stay]}
                  onSelect={(v) => set("stay", v)}
                />
              )}
              {step === 6 && (
                <>
                  <p className="mono-note mb-8">Select all that call to you</p>
                  <OptionGrid
                    options={INSPIRATIONS}
                    selected={form.inspirations}
                    onSelect={(v) =>
                      set(
                        "inspirations",
                        form.inspirations.includes(v)
                          ? form.inspirations.filter((x) => x !== v)
                          : [...form.inspirations, v]
                      )
                    }
                  />
                </>
              )}

              {step === 7 && (
                <div className="grid max-w-2xl gap-9">
                  <Field label="Budget Estimation">
                    <input
                      className="field"
                      placeholder="e.g. $3,000 – $5,000 per person"
                      value={form.budget}
                      onChange={(e) => set("budget", e.target.value)}
                    />
                  </Field>
                  <Field label="Additional desires">
                    <textarea
                      rows={5}
                      className="field resize-none"
                      placeholder="Private chefs, hot-air balloons, anniversary surprises — nothing is too much to ask."
                      value={form.desires}
                      onChange={(e) => set("desires", e.target.value)}
                    />
                  </Field>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="mt-16 flex items-center justify-between border-t border-bone/10 pt-8">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="font-mono text-[11px] tracking-[0.3em] text-muted uppercase transition-colors enabled:hover:text-gold disabled:opacity-30"
          >
            ← Back
          </button>
          <button
            onClick={next}
            disabled={!canAdvance || sending}
            className="border border-gold/60 bg-gold/10 px-10 py-4 font-mono text-[11px] tracking-[0.3em] text-gold uppercase transition-colors duration-300 enabled:hover:bg-gold enabled:hover:text-abyss disabled:opacity-30"
          >
            {step === STEPS.length - 1 ? (sending ? "Sending…" : "Submit Commission →") : "Continue →"}
          </button>
        </div>

        {error && (
          <p className="mt-6 text-right text-[13px] leading-relaxed text-clay" role="alert">
            {error}
          </p>
        )}
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

function OptionGrid({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string[];
  onSelect: (value: string) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((opt, i) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`group relative border p-7 text-left transition-all duration-300 ${
              active
                ? "border-gold bg-gold/[0.08]"
                : "border-bone/15 bg-panel hover:border-gold/50"
            }`}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`font-display mt-3 block text-xl font-light transition-colors ${
                active ? "text-amber" : "text-bone group-hover:text-amber"
              }`}
            >
              {opt}
            </span>
            <span
              aria-hidden
              className={`absolute right-5 top-5 h-[9px] w-[9px] rotate-45 border transition-colors duration-300 ${
                active ? "border-amber bg-gold" : "border-faint"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
