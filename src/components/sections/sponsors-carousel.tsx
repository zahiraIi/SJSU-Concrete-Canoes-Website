"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { Sponsor } from "@/types/content";

type SponsorsCarouselProps = {
  sponsors: Sponsor[];
};

function SponsorMark({ sponsor }: { sponsor: Sponsor }) {
  const src = sponsor.logoUrl;
  const isSvg = typeof src === "string" && src.toLowerCase().endsWith(".svg");

  /** Uniform slot: every logo scales to fit the same box. */
  const slotClass =
    "relative h-14 w-[10.5rem] shrink-0 md:h-16 md:w-[12.5rem]";

  return (
    <div className={slotClass}>
      {src ? (
        <div className="absolute inset-2">
          <Image
            src={src}
            alt={`${sponsor.name} logo`}
            fill
            className="object-contain object-center opacity-50 grayscale"
            sizes="(min-width: 768px) 200px, 168px"
            unoptimized={isSvg}
          />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center px-2">
          <span className="line-clamp-2 text-center text-xs font-semibold tracking-tight text-slate-400 md:text-sm">
            {sponsor.name}
          </span>
        </div>
      )}
    </div>
  );
}

export function SponsorsCarousel({ sponsors }: SponsorsCarouselProps) {
  const shouldReduceMotion = useReducedMotion();
  const items = [...sponsors, ...sponsors];
  const namesSentence = sponsors.map((s) => s.name).join(", ");

  return (
    <section className="overflow-hidden border-t border-slate-100 bg-white py-14" aria-labelledby="sponsors-heading">
      <div className="container mb-10">
        <h2 id="sponsors-heading" className="display text-3xl text-slate-900 md:text-5xl">
          Trusted partners
        </h2>
        <p className="mt-2 max-w-xl text-sm text-slate-500">
          Organizations that support our design, build, and race season.
        </p>
      </div>
      <p className="sr-only">Sponsors and partners: {namesSentence}.</p>
      {shouldReduceMotion ? (
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-16">
          {sponsors.map((sponsor) => (
            <SponsorMark key={sponsor.name} sponsor={sponsor} />
          ))}
        </div>
      ) : (
        <motion.div
          className="flex transform-gpu items-center gap-12 md:gap-20"
          aria-hidden
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 35, ease: "linear" }}
        >
          {items.map((sponsor, index) => (
            <SponsorMark key={`${sponsor.name}-${index}`} sponsor={sponsor} />
          ))}
        </motion.div>
      )}
    </section>
  );
}
