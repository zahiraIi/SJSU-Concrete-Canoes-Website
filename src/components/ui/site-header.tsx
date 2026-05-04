"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavLink } from "@/types/content";

const menuBg = "#F5F2EB";

const layerFade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const panelMotion = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.24, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.18 },
  },
};

const linkList = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.06 },
  },
};

const linkItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: "easeOut" as const } },
};

type SiteHeaderProps = {
  links: NavLink[];
  ctaHref?: string;
  ctaLabel?: string;
};

export function SiteHeader({
  links,
  ctaHref = "/contact",
  ctaLabel = "Contact Us",
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-[100] flex justify-end px-4 py-5 md:px-8 md:py-7">
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-expanded={open}
          className="hero-menu-trigger pointer-events-auto flex items-center gap-2 shadow-sm"
        >
          MENU
          <span aria-hidden className="inline-block text-[10px] leading-none">
            ▼
          </span>
          <span className="sr-only">Toggle navigation menu</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="nav-menu-layer"
            className="pointer-events-none fixed inset-0 z-[110]"
            variants={layerFade}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.button
              type="button"
              className="pointer-events-auto absolute inset-0 bg-black/35"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              variants={panelMotion}
              initial="hidden"
              animate="show"
              exit="exit"
              className="pointer-events-auto absolute right-4 top-[4.5rem] z-[1] flex max-h-[min(85vh,560px)] w-[min(100vw-2rem,320px)] flex-col overflow-hidden border border-black/10 shadow-2xl sm:right-6 sm:top-[5rem] md:right-8 md:top-[5.5rem]"
              style={{ backgroundColor: menuBg }}
            >
              <header className="flex shrink-0 items-center justify-between border-b border-[#E0E0E0] px-4 py-3 sm:px-5 sm:py-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="font-[family-name:var(--font-inter)] text-[0.6875rem] font-bold uppercase leading-none tracking-[0.18em] text-[var(--sjsu-blue)]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-[0.65rem] leading-none text-black"
                  aria-hidden
                >
                  ▲
                </button>
              </header>

              <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-5 sm:py-7">
                <motion.ul className="flex flex-col gap-0.5" variants={linkList} initial="hidden" animate="show">
                  {links.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <motion.li key={link.href} variants={linkItem}>
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={`block rounded-sm py-3 font-[family-name:var(--font-serif)] text-2xl font-normal leading-snug tracking-[-0.02em] text-[#1A232E] underline decoration-1 underline-offset-[6px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A232E] sm:text-[1.65rem] ${
                            active ? "decoration-[#1A232E]" : "decoration-transparent hover:decoration-[#1A232E]"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </nav>

              <div className="shrink-0 border-t border-[#E0E0E0] px-4 py-4 sm:px-5">
                <Link
                  href={ctaHref}
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center border border-black bg-black py-4 font-[family-name:var(--font-inter)] text-[0.625rem] font-semibold uppercase leading-tight tracking-[0.22em] !text-white transition-colors hover:bg-neutral-900 hover:!text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  {ctaLabel}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
