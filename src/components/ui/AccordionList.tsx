"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Item = { title: string; body: string };

/** Hairline editorial accordion — used for Good to Know and FAQ blocks. */
export default function AccordionList({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-bone/10">
      {items.map((item, i) => (
        <div key={item.title} className="border-b border-bone/10">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-6 py-5 text-left"
          >
            <span
              className={`text-[15px] transition-colors duration-300 ${
                open === i ? "text-bone" : "text-bone-dim"
              }`}
            >
              {item.title}
            </span>
            <span
              aria-hidden
              className={`shrink-0 text-base text-gold transition-transform duration-300 ${
                open === i ? "rotate-45" : ""
              }`}
            >
              +
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="pb-6 pr-10 text-[14px] leading-[1.8] text-muted">{item.body}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
