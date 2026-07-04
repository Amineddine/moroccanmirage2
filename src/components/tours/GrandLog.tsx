"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Reveal from "@/components/ui/Reveal";
import type { GrandDay } from "@/data/grand-traverse";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * The expedition log of the Grand Traverse — a richer cousin of RouteItinerary.
 * The same golden survey line is drawn as the reader travels, but each day is a
 * full log entry: theme, route, drive, plate photograph, highlights and ledger.
 */
export default function GrandLog({ days }: { days: GrandDay[] }) {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !scope.current) return;
      const line = scope.current.querySelector("[data-route-line]");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scope.current,
              start: "top 70%",
              end: "bottom 75%",
              scrub: 0.6,
            },
          }
        );
      }
      gsap.utils.toArray<HTMLElement>("[data-route-node]", scope.current).forEach((node) => {
        gsap.fromTo(
          node,
          { backgroundColor: "rgba(13,10,7,1)", borderColor: "rgba(107,93,73,0.6)" },
          {
            backgroundColor: "#c9a227",
            borderColor: "#e2ae45",
            duration: 0.3,
            scrollTrigger: { trigger: node, start: "top 72%" },
          }
        );
      });
    },
    { scope, dependencies: [reduced] }
  );

  return (
    <div ref={scope} className="relative">
      {/* survey line */}
      <div
        aria-hidden
        className="absolute top-2 bottom-2 left-[7px] w-px bg-bone/10 md:left-[9px]"
      />
      <div
        aria-hidden
        data-route-line
        className="absolute top-2 bottom-2 left-[7px] w-px origin-top md:left-[9px]"
        style={{
          background: "linear-gradient(180deg, #e2ae45, #c9a227)",
          boxShadow: "0 0 8px rgba(226,174,69,0.4)",
        }}
      />

      <ol className="space-y-20 md:space-y-24">
        {days.map((d) => (
          <li key={d.day} className="relative pl-10 md:pl-14">
            {/* node */}
            <span
              aria-hidden
              data-route-node
              className="absolute left-0 top-[6px] h-[15px] w-[15px] rotate-45 border bg-night md:h-[19px] md:w-[19px]"
              style={{ borderColor: "rgba(107,93,73,0.6)" }}
            />

            <Reveal y={20}>
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <p className="font-mono text-[10.5px] tracking-[0.32em] text-gold uppercase">
                  Day {String(d.day).padStart(2, "0")}
                </p>
                <p className="font-display text-base italic text-amber">{d.theme}</p>
              </div>

              <h3 className="font-display mt-3 text-2xl font-light text-bone md:text-[1.9rem]">
                {d.title}
              </h3>

              <div className="mono-note mt-4 flex flex-wrap gap-x-8 gap-y-1.5">
                <span>{d.route}</span>
                <span className="text-faint">Drive — {d.drive}</span>
              </div>
            </Reveal>

            {d.image && (
              <Reveal y={26} delay={0.06}>
                <figure className="img-grade corner-ticks mt-8 aspect-[16/9] max-w-3xl overflow-hidden">
                  <Image
                    src={d.image.src}
                    alt={d.image.alt}
                    width={1920}
                    height={1080}
                    sizes="(min-width: 1024px) 52vw, 92vw"
                    className="h-full w-full object-cover"
                  />
                </figure>
              </Reveal>
            )}

            <Reveal y={20} delay={0.08}>
              <p className="mt-8 max-w-3xl text-[14.5px] leading-[1.85] text-muted">{d.body}</p>

              {d.note && (
                <p className="mono-note mt-4 max-w-3xl !normal-case !tracking-[0.06em] text-faint">
                  Note — {d.note}
                </p>
              )}

              <ul className="mt-6 flex max-w-3xl flex-wrap gap-2">
                {d.highlights.map((h) => (
                  <li
                    key={h}
                    className="border border-bone/10 px-3 py-1.5 font-mono text-[9.5px] tracking-[0.18em] text-bone-dim uppercase"
                  >
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex max-w-3xl flex-wrap gap-x-12 gap-y-3 border-t border-dashed border-bone/15 pt-5">
                <div>
                  <p className="mono-note !text-[9px]">Meals</p>
                  <p className="mt-1 text-[13px] text-bone-dim">{d.meals}</p>
                </div>
                <div>
                  <p className="mono-note !text-[9px]">Overnight</p>
                  <p className="mt-1 text-[13px] text-bone-dim">
                    {d.overnight ? (
                      <>
                        <span className="text-bone">{d.overnight.property}</span>
                        <span className="text-faint"> — {d.overnight.city}</span>
                      </>
                    ) : (
                      "—"
                    )}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
