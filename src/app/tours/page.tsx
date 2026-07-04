import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/atlas/PageHero";
import Reveal from "@/components/ui/Reveal";
import { CITY_IDS, CITY_META, TOURS_BY_CITY } from "@/data/tours";
import { GRAND_TRAVERSE } from "@/data/grand-traverse";

export const metadata: Metadata = {
  title: "Morocco Tours",
  description:
    "Select your starting point and embark on an unforgettable journey across the dunes, mountains, and ancient medinas.",
};

const NUMERALS = ["I", "II", "III", "IV"];

export default function ToursPage() {
  return (
    <main>
      <PageHero
        image="/generated/hero-tours-hub.jpg"
        alt="A desert caravan route at dusk in southern Morocco"
        label="The Atlas of Departures"
        title={
          <>
            Discover <span className="italic text-amber">Your</span> Morocco
          </>
        }
        sub="Select your starting point and embark on an unforgettable journey across the dunes, mountains, and ancient medinas."
        coordinates="FOUR MERIDIANS — TWENTY-TWO ROUTES"
        horizon="72,0,ATLAS · DEPARTURES"
      />

      {/* typographic table of departures */}
      <section
        data-horizon="48,-2,ATLAS · INDEX"
        className="bg-night py-24 md:py-36"
      >
        <div className="mx-auto max-w-[1680px] px-6 lg:px-12">
          <Reveal>
            <p className="plate-label mb-14">Table of Departures — select a meridian</p>
          </Reveal>

          {CITY_IDS.map((id, i) => {
            const city = CITY_META[id];
            const count = TOURS_BY_CITY(id).length;
            return (
              <Reveal key={id} delay={i * 0.06}>
                <Link
                  href={`/tours/${id}`}
                  className="group block border-t border-bone/10 py-10 last:border-b md:py-14"
                >
                  <div className="grid items-center gap-5 md:grid-cols-[64px_1fr_auto]">
                    <span className="font-display hidden text-2xl font-light text-gold/70 md:block">
                      {NUMERALS[i]}
                    </span>

                    <div>
                      <h2 className="text-outline font-display text-[clamp(2.8rem,8vw,7.2rem)] font-light leading-[0.95] uppercase tracking-[0.02em] transition-colors duration-700 group-hover:text-bone">
                        {city.name}
                      </h2>
                      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                        <span className="font-display text-lg italic text-amber">{city.epithet}</span>
                        <span className="mono-note">{city.coordinates}</span>
                      </div>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="font-mono text-[12px] tracking-[0.3em] text-gold uppercase">
                        {String(count).padStart(2, "0")} itineraries
                      </p>
                      <p className="mono-note mt-3 transition-colors duration-300 group-hover:text-gold">
                        Open chart{" "}
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                          →
                        </span>
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 max-w-2xl text-[14.5px] leading-relaxed text-muted md:ml-[64px]">
                    {city.intro}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── hors-série — the signature traverse ── */}
      <section
        data-horizon="60,2,PLATE HORS-SÉRIE"
        className="border-t border-bone/[0.07] bg-abyss py-24 md:py-32"
      >
        <div className="mx-auto max-w-[1680px] px-6 lg:px-12">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="plate-label">Plate Hors-Série</span>
              <span className="rule-gold w-16" />
              <span className="mono-note">Beyond the four meridians</span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Link
              href={`/tours/${GRAND_TRAVERSE.slug}`}
              className="group relative mt-12 block overflow-hidden"
            >
              <div className="img-grade corner-ticks relative aspect-[4/5] overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
                <Image
                  src={GRAND_TRAVERSE.hero}
                  alt="The route of the Grand Traverse — Atlas ridgelines dissolving toward the Sahara at dusk"
                  fill
                  sizes="(min-width: 1024px) 92vw, 100vw"
                  className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-night/85 via-night/20 to-night/30" />

                <div className="absolute inset-x-0 bottom-0 z-20 p-7 md:p-12">
                  <p className="font-mono text-[10.5px] tracking-[0.3em] text-gold uppercase">
                    {GRAND_TRAVERSE.days}D / {GRAND_TRAVERSE.nights}N · {GRAND_TRAVERSE.start} ⟶{" "}
                    {GRAND_TRAVERSE.end} · ~{GRAND_TRAVERSE.distanceKm.toLocaleString("en-US")} km ·{" "}
                    {GRAND_TRAVERSE.stays} stays
                  </p>
                  <h2 className="font-display mt-4 text-[clamp(2.4rem,5.6vw,5.4rem)] font-light leading-[1] text-bone">
                    The Grand <span className="italic text-amber">Traverse</span>
                  </h2>
                  <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-bone-dim">
                    {GRAND_TRAVERSE.subtitle}
                  </p>
                  <p className="mono-note mt-6 transition-colors duration-300 group-hover:text-gold">
                    Open the expedition log{" "}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
