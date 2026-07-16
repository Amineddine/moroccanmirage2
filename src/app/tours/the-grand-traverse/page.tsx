import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Coordinates from "@/components/atlas/Coordinates";
import AccordionList from "@/components/ui/AccordionList";
import GrandLog from "@/components/tours/GrandLog";
import {
  GRAND_TRAVERSE,
  GRAND_DAYS,
  GRAND_STAYS,
  GRAND_INCLUDED,
  GRAND_EXCLUDED,
  GRAND_PRACTICAL,
  GRAND_FAQ,
} from "@/data/grand-traverse";
import { SITE_URL } from "@/data/site";

const GT = GRAND_TRAVERSE;

export const metadata: Metadata = {
  title: { absolute: "The Grand Traverse — 12-Day Morocco Tour | Moroccan Mirage" },
  description:
    "A private 12-day journey across Morocco: Chefchaouen's blue medina, imperial Fez, the Sahara at Erg Chebbi, the Kasbah Road, Marrakech and Essaouira. Tailor-made by Moroccan Mirage.",
  alternates: { canonical: "/tours/the-grand-traverse" },
  keywords: [
    "morocco grand tour",
    "12 day morocco itinerary",
    "sahara desert tour",
    "chefchaouen",
    "fez",
    "merzouga camp",
    "marrakech",
    "essaouira",
    "private morocco tour",
  ],
  openGraph: {
    title: "The Grand Traverse — 12-Day Morocco Tour | Moroccan Mirage",
    description:
      "A private 12-day journey across Morocco: Chefchaouen's blue medina, imperial Fez, the Sahara at Erg Chebbi, the Kasbah Road, Marrakech and Essaouira. Tailor-made by Moroccan Mirage.",
    images: [GT.hero],
    type: "website",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "The Grand Traverse",
  description:
    "A private 12-day, 11-night grand tour of Morocco from Casablanca through Rabat, Chefchaouen, Fez, the Sahara (Erg Chebbi), the Kasbah Road, Marrakech and Essaouira.",
  url: `${SITE_URL}/tours/the-grand-traverse`,
  image: `${SITE_URL}${GRAND_TRAVERSE.hero}`,
  touristType: ["Cultural", "Adventure", "Sightseeing"],
  provider: {
    "@type": "TravelAgency",
    name: "Moroccan Mirage",
    url: SITE_URL,
  },
  itinerary: {
    "@type": "ItemList",
    numberOfItems: 12,
    itemListElement: [
      { "@type": "City", name: "Rabat" },
      { "@type": "City", name: "Chefchaouen" },
      { "@type": "City", name: "Fez" },
      { "@type": "City", name: "Erfoud" },
      { "@type": "City", name: "Merzouga" },
      { "@type": "City", name: "Skoura" },
      { "@type": "City", name: "Marrakech" },
      { "@type": "City", name: "Essaouira" },
      { "@type": "City", name: "Casablanca" },
    ],
  },
  offers: {
    "@type": "Offer",
    price: "4800",
    priceCurrency: "USD",
    description: "From, per person sharing (indicative)",
  },
};

export default function GrandTraversePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* ── hors-série opener ── */}
      <section
        data-horizon="76,0,PLATE HORS-SÉRIE"
        className="relative flex min-h-[94svh] items-end overflow-hidden bg-abyss"
      >
        <Image
          src={GT.hero}
          alt="The route of the Grand Traverse — Atlas ridgelines dissolving toward the Sahara at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/75 via-night/25 to-night" />
        <div
          aria-hidden
          className="corner-ticks pointer-events-none absolute inset-5 hidden border border-bone/10 md:block"
        />

        <div className="absolute right-8 top-[100px] md:right-14">
          <Coordinates value="ONE ROUTE — THE WHOLE KINGDOM" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1680px] px-6 pb-14 pt-44 lg:px-12">
          <Reveal>
            <p className="plate-label mb-6">Plate Hors-Série — The Signature Expedition</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display max-w-5xl text-[clamp(2.8rem,7vw,6.8rem)] font-light leading-[0.98] tracking-[-0.01em] text-bone">
              The Grand <span className="italic text-amber">Traverse</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-2xl text-[15.5px] leading-relaxed text-bone-dim">
              {GT.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
              <Stat label="Duration" value={`${GT.days}D / ${GT.nights}N`} />
              <Stat label="Route" value={`${GT.start} ⟶ ${GT.end}`} />
              <Stat label="Distance" value={`~${GT.distanceMi.toLocaleString("en-US")} mi`} />
              <Stat label="Stays" value={`${GT.stays} properties`} />
              <Stat label="Style" value={GT.style} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── the route, read aloud — pin marquee ── */}
      <div className="overflow-hidden border-y border-bone/[0.07] bg-abyss py-4">
        <div className="animate-marquee flex w-max items-center">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex items-center">
              {GT.mapPins.map((pin, i) => (
                <span
                  key={`${copy}-${i}`}
                  className="flex items-center font-mono text-[10.5px] tracking-[0.3em] text-muted uppercase"
                >
                  <span className="px-5">{pin}</span>
                  <span className="text-gold/60">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── the idea of the route ── */}
      <section data-horizon="42,-2,THE IDEA" className="bg-night py-20 md:py-28">
        <div className="mx-auto grid max-w-[1680px] gap-14 px-6 lg:grid-cols-[1.4fr_1fr] lg:gap-24 lg:px-12">
          <div>
            <Reveal>
              <p className="plate-label mb-8">One journey — every Morocco</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="font-display text-2xl font-light leading-[1.5] text-bone-dim md:text-[1.8rem]">
                Down the spine of the kingdom in twelve days: the Atlantic capitals, the indigo
                Rif, the medieval labyrinth of Fez, a night among the dunes of Erg Chebbi, the
                Road of a Thousand Kasbahs, red Marrakech and the sea wind of Essaouira.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <ul className="mt-12 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {GT.marquee.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-[13.5px] leading-relaxed text-muted">
                    <span aria-hidden className="mt-[7px] h-[5px] w-[5px] shrink-0 rotate-45 bg-gold" />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <dl className="space-y-6 border-l border-bone/10 pl-8 lg:pl-10">
              <Fact term="Regions" desc={GT.regions.join(" · ")} />
              <Fact term="Difficulty" desc={GT.difficulty} />
              <Fact term="Ideal for" desc={GT.idealFor} />
              <Fact term="Best seasons" desc={GT.seasonsCopy} />
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ── expedition log + manifest rail ── */}
      <section data-horizon="46,2,EXPEDITION LOG" className="border-t border-bone/[0.07] bg-night py-20 md:py-28">
        <div className="mx-auto grid max-w-[1680px] gap-16 px-6 lg:grid-cols-[1.5fr_1fr] lg:gap-20 lg:px-12">
          <div>
            <Reveal>
              <div className="mb-14 flex items-center gap-4">
                <span className="plate-label">The Expedition Log</span>
                <span className="rule-gold w-16" />
                <span className="mono-note">Twelve entries</span>
              </div>
            </Reveal>
            <GrandLog days={GRAND_DAYS} />
          </div>

          <div className="space-y-10 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <aside className="corner-ticks border border-bone/15 bg-panel p-7 md:p-9">
                <p className="plate-label">Expedition Manifest</p>
                <div className="mt-8 space-y-6">
                  <ManifestRow label="Route" value={`${GT.start} ⟶ ${GT.end} — closed loop`} />
                  <ManifestRow label="Duration" value={`${GT.days} Days / ${GT.nights} Nights`} />
                  <ManifestRow label="Style" value={GT.style} />
                  <ManifestRow label="Guides" value="Local experts in four cities" />
                  <div className="border-t border-dashed border-bone/20 pt-6">
                    <div className="flex items-baseline justify-between">
                      <span className="mono-note">From</span>
                      <span className="font-display text-xl italic text-amber">
                        ${GT.priceFrom.toLocaleString("en-US")}
                      </span>
                    </div>
                    <p className="mono-note mt-2 !text-[9px]">
                      {GT.priceNote} — final quote on inquiry
                    </p>
                  </div>

                  {/* Notes for Quotation — Odynovo-style validity & pricing caveats */}
                  <div className="border-t border-dashed border-bone/20 pt-6">
                    <p className="plate-label">Notes for Quotation</p>
                    <ul className="mt-5 space-y-3">
                      <li className="flex items-start gap-3 text-[12.5px] leading-[1.7] text-bone-dim">
                        <span aria-hidden className="mt-[7px] h-[5px] w-[5px] shrink-0 rotate-45 bg-gold" />
                        <span>
                          This offer is valid before{" "}
                          <span className="text-bone">{GT.quotation.validBefore}</span>. Prices may
                          change after this date. We recommend you book early to secure the best
                          price.
                        </span>
                      </li>
                      {GT.quotation.notes.map((note) => (
                        <li
                          key={note}
                          className="flex items-start gap-3 text-[12.5px] leading-[1.7] text-muted"
                        >
                          <span aria-hidden className="mt-[7px] h-[5px] w-[5px] shrink-0 rotate-45 border border-faint" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="mt-9 block border border-gold/60 bg-gold/10 py-4 text-center font-mono text-[11px] tracking-[0.3em] text-gold uppercase transition-colors duration-300 hover:bg-gold hover:text-abyss"
                >
                  Inquire Now →
                </Link>
                <p className="mono-note mt-5 text-center !text-[9px]">
                  No payment required — our concierge responds within 24 hours
                </p>
              </aside>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="border border-bone/10 p-7 md:p-9">
                <p className="plate-label">Provisions</p>
                <ul className="mt-6 space-y-3">
                  {GRAND_INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] text-bone-dim">
                      <span aria-hidden className="mt-[7px] h-[6px] w-[6px] shrink-0 rotate-45 bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="plate-label mt-9 !text-clay">Not Included</p>
                <ul className="mt-5 space-y-3">
                  {GRAND_EXCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] text-muted">
                      <span aria-hidden className="mt-[7px] h-[6px] w-[6px] shrink-0 rotate-45 border border-faint" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── ledger of stays ── */}
      <section data-horizon="50,-2,LEDGER OF STAYS" className="border-t border-bone/[0.07] bg-abyss py-20 md:py-28">
        <div className="mx-auto max-w-[1680px] px-6 lg:px-12">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-3xl font-light text-bone md:text-4xl">
                Where you&apos;ll <span className="italic text-amber">stay</span>
              </h2>
              <p className="mono-note">{GT.stays} properties — {GT.nights} nights</p>
            </div>
          </Reveal>

          <div className="mt-12">
            {GRAND_STAYS.map((s, i) => (
              <Reveal key={`${s.city}-${s.property}`} delay={i * 0.03}>
                <div className="border-t border-bone/10 py-6 last:border-b md:py-7">
                  <div className="flex items-baseline">
                    <span className="font-mono w-10 shrink-0 text-[10.5px] tracking-[0.3em] text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] text-bone">{s.city}</span>
                    <span className="leader" aria-hidden />
                    <span className="mono-note shrink-0">
                      {s.nights} {s.nights === 1 ? "night" : "nights"}
                    </span>
                  </div>
                  <div className="mt-2 pl-10">
                    <p className="font-display text-lg font-light italic text-amber">{s.property}</p>
                    <p className="mt-1 text-[13.5px] text-muted">{s.blurb}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── good to know + faq ── */}
      <section data-horizon="55,2,FIELD NOTES" className="border-t border-bone/[0.07] bg-night py-20 md:py-28">
        <div className="mx-auto grid max-w-[1680px] gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-12">
          <div>
            <Reveal>
              <p className="plate-label mb-10">Good to Know</p>
            </Reveal>
            <Reveal delay={0.06}>
              <AccordionList
                items={GRAND_PRACTICAL.map((p) => ({ title: p.label, body: p.value }))}
              />
            </Reveal>
          </div>
          <div>
            <Reveal>
              <p className="plate-label mb-10">Questions, Answered</p>
            </Reveal>
            <Reveal delay={0.06}>
              <AccordionList items={GRAND_FAQ.map((f) => ({ title: f.q, body: f.a }))} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── closing ── */}
      <section data-horizon="60,0,BSLAMA" className="border-t border-bone/[0.07] bg-abyss py-24 md:py-32">
        <div className="mx-auto max-w-[1680px] px-6 text-center lg:px-12">
          <Reveal>
            <p className="plate-label mb-8">The whole kingdom — one journey</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display mx-auto max-w-4xl text-[clamp(2.2rem,5vw,4.6rem)] font-light leading-[1.06] text-bone">
              Twelve days. <span className="italic text-amber">Every</span> Morocco.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/contact"
                className="border border-gold/60 bg-gold/10 px-10 py-4 font-mono text-[11px] tracking-[0.3em] text-gold uppercase transition-colors duration-300 hover:bg-gold hover:text-abyss"
              >
                Begin the Traverse →
              </Link>
              <Link
                href="/customize"
                className="border border-bone/20 px-10 py-4 font-mono text-[11px] tracking-[0.3em] text-bone-dim uppercase transition-colors duration-300 hover:border-bone/50 hover:text-bone"
              >
                Customize this route
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mono-note">{label}</p>
      <p className="mt-1 font-mono text-[13px] tracking-[0.18em] text-gold uppercase">{value}</p>
    </div>
  );
}

function Fact({ term, desc }: { term: string; desc: string }) {
  return (
    <div>
      <dt className="mono-note">{term}</dt>
      <dd className="mt-2 text-[14px] leading-relaxed text-bone-dim">{desc}</dd>
    </div>
  );
}

function ManifestRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mono-note mb-1">{label}</p>
      <p className="font-mono text-[13px] tracking-wider text-bone">{value}</p>
    </div>
  );
}
