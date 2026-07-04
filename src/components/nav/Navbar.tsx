"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CITIES } from "@/data/site";
import { EXCURSIONS } from "@/data/excursions";

type DropdownId = "tours" | "excursions" | null;

const TOUR_LINKS = [
  {
    label: "The Grand Traverse",
    note: "12D Signature",
    href: "/tours/the-grand-traverse",
  },
  ...CITIES.map((c) => ({
    label: `Tours from ${c.name}`,
    note: c.epithet,
    href: c.href,
  })),
];

const EXCURSION_LINKS = EXCURSIONS.map((e) => ({
  label: e.location,
  note: e.duration,
  href: `/excursions/${e.id}`,
}));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<DropdownId>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpen(null);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
        scrolled || mobileOpen
          ? "border-b border-bone/[0.07] bg-night/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
      onMouseLeave={() => setOpen(null)}
    >
      <nav className="mx-auto flex h-[76px] max-w-[1680px] items-center justify-between px-6 lg:px-12">
        {/* brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/moroccanmiragelogo.png"
            alt="Moroccan Mirage"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-brand text-[16px] tracking-[0.08em] text-bone">
              Moroccan Mirage
            </span>
            <span className="mono-note mt-1 !text-[8.5px] !tracking-[0.4em]">
              Editorial Luxury
            </span>
          </span>
        </Link>

        {/* desktop links */}
        <ul className="hidden items-center gap-9 lg:flex">
          <li>
            <NavLink href="/" label="Home" />
          </li>
          <li>
            <NavLink href="/#philosophy" label="About" />
          </li>
          <li
            className="relative"
            onMouseEnter={() => setOpen("tours")}
          >
            <DropTrigger label="Morocco Tours" active={open === "tours"} onClick={() => setOpen(open === "tours" ? null : "tours")} />
            <Dropdown show={open === "tours"} items={TOUR_LINKS} footerHref="/tours" footerLabel="All departures" />
          </li>
          <li
            className="relative"
            onMouseEnter={() => setOpen("excursions")}
          >
            <DropTrigger label="Excursions" active={open === "excursions"} onClick={() => setOpen(open === "excursions" ? null : "excursions")} />
            <Dropdown show={open === "excursions"} items={EXCURSION_LINKS} footerHref="/excursions" footerLabel="All excursions" wide />
          </li>
          <li>
            <NavLink href="/contact" label="Contact" />
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden border border-gold/60 px-5 py-2.5 font-mono text-[10px] tracking-[0.3em] text-gold uppercase transition-colors duration-300 hover:bg-gold hover:text-abyss lg:inline-block"
          >
            Book Now
          </Link>

          {/* mobile toggle */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={`block h-px w-6 bg-bone transition-transform duration-300 ${mobileOpen ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-bone transition-transform duration-300 ${mobileOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 top-[76px] z-[70] overflow-y-auto bg-night/[0.985] px-6 pt-10 pb-24 lg:hidden"
          >
            <MobileMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="font-mono text-[11px] tracking-[0.26em] text-bone-dim uppercase transition-colors duration-300 hover:text-gold"
    >
      {label}
    </Link>
  );
}

function DropTrigger({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 font-mono text-[11px] tracking-[0.26em] uppercase transition-colors duration-300 ${
        active ? "text-gold" : "text-bone-dim hover:text-gold"
      }`}
    >
      {label}
      <span
        aria-hidden
        className={`text-[8px] transition-transform duration-300 ${active ? "rotate-180" : ""}`}
      >
        ▼
      </span>
    </button>
  );
}

function Dropdown({
  show,
  items,
  footerHref,
  footerLabel,
  wide = false,
}: {
  show: boolean;
  items: { label: string; note: string; href: string }[];
  footerHref: string;
  footerLabel: string;
  wide?: boolean;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className={`corner-ticks absolute left-1/2 top-[calc(100%+18px)] -translate-x-1/2 border border-bone/10 bg-panel/95 p-2 backdrop-blur-md ${
            wide ? "w-[340px]" : "w-[300px]"
          }`}
        >
          <ul className={wide ? "max-h-[60vh] overflow-y-auto" : ""}>
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-baseline justify-between gap-4 px-4 py-3 transition-colors duration-200 hover:bg-gold/[0.07]"
                >
                  <span className="text-[14px] text-bone transition-colors group-hover:text-gold">
                    {item.label}
                  </span>
                  <span className="mono-note shrink-0 !text-[9px]">{item.note}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={footerHref}
            className="mt-1 block border-t border-bone/10 px-4 py-3 font-mono text-[10px] tracking-[0.3em] text-gold uppercase transition-colors hover:text-amber"
          >
            {footerLabel} →
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MobileMenu() {
  const [section, setSection] = useState<DropdownId>(null);

  return (
    <div className="flex flex-col gap-2">
      {[
        { label: "Home", href: "/" },
        { label: "About", href: "/#philosophy" },
      ].map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="font-display border-b border-bone/10 py-4 text-3xl font-light text-bone"
        >
          {l.label}
        </Link>
      ))}

      <MobileAccordion
        label="Morocco Tours"
        open={section === "tours"}
        onToggle={() => setSection(section === "tours" ? null : "tours")}
        items={[...TOUR_LINKS, { label: "All Tours", note: "", href: "/tours" }]}
      />
      <MobileAccordion
        label="Excursions"
        open={section === "excursions"}
        onToggle={() => setSection(section === "excursions" ? null : "excursions")}
        items={[...EXCURSION_LINKS, { label: "All Excursions", note: "", href: "/excursions" }]}
      />

      <Link
        href="/contact"
        className="font-display border-b border-bone/10 py-4 text-3xl font-light text-bone"
      >
        Contact
      </Link>

      <Link
        href="/contact"
        className="mt-8 inline-block self-start border border-gold/60 bg-gold/10 px-8 py-4 font-mono text-[11px] tracking-[0.3em] text-gold uppercase"
      >
        Book Now →
      </Link>
    </div>
  );
}

function MobileAccordion({
  label,
  open,
  onToggle,
  items,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  items: { label: string; note: string; href: string }[];
}) {
  return (
    <div className="border-b border-bone/10">
      <button
        onClick={onToggle}
        className="font-display flex w-full items-center justify-between py-4 text-3xl font-light text-bone"
      >
        {label}
        <span className={`text-base text-gold transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden pb-2"
          >
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-2.5 pl-4 text-[15px] text-muted">
                  {item.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
