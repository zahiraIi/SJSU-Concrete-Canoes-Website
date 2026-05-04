"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { HeroSection as HeroSectionType } from "@/types/content";

type HeroSectionProps = {
  hero: HeroSectionType;
};

export function HeroSection({ hero }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 22]);
  const headlineY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 10]);

  const headingLines = hero.heading.split("\n").map((l) => l.trim()).filter(Boolean);
  const tagline = hero.taglineSerif ?? hero.eyebrow;
  const body = hero.bodySerif ?? hero.subheading;
  const showCta = Boolean(hero.ctaLabel?.trim() && hero.ctaHref?.trim());

  const railPad =
    "px-5 pt-24 md:px-10 md:pt-[min(18vh,10.5rem)] lg:px-12";

  const line1Class =
    "hero-headline block w-full text-[clamp(3rem,12.5vw,7.25rem)] tracking-[-0.04em] text-[var(--sjsu-gold)] drop-shadow-[0_2px_32px_rgba(0,0,0,0.55)]";
  const line2Class =
    "hero-headline mt-[0.02em] block w-full text-[clamp(2.35rem,10.5vw,6.25rem)] tracking-[-0.042em] text-[var(--sjsu-gold)] drop-shadow-[0_2px_32px_rgba(0,0,0,0.55)]";

  return (
    <section ref={sectionRef} className="relative flex min-h-[100dvh] flex-col bg-slate-900 text-white">
      <motion.div className="absolute inset-0 z-0 transform-gpu" style={{ y: bgY }}>
        <Image
          src={hero.backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/40"
          aria-hidden
        />
      </motion.div>

      <div className={`pointer-events-none absolute inset-x-0 top-0 z-[15] ${railPad}`}>
        <motion.div
          style={{ y: headlineY }}
          className="relative z-[1] mx-auto w-full max-w-[1400px] transform-gpu text-left"
        >
          {headingLines.length > 1 ? (
            <h1 className="m-0 max-w-[95vw] text-left">
              <span className={line1Class}>{headingLines[0]}</span>
              <span className={line2Class}>{headingLines.slice(1).join(" ")}</span>
            </h1>
          ) : (
            <h1 className="hero-headline m-0 max-w-[95vw] whitespace-pre-line text-[clamp(2.75rem,11vw,7rem)] tracking-[-0.04em] text-[var(--sjsu-gold)] drop-shadow-[0_2px_32px_rgba(0,0,0,0.55)]">
              {hero.heading}
            </h1>
          )}
        </motion.div>
      </div>

      <div
        className={`relative z-40 mx-auto mt-auto w-full max-w-[1400px] gap-x-6 gap-y-10 px-5 pb-10 pt-20 md:grid md:items-end md:px-10 md:pb-12 md:pt-24 lg:px-12 ${
          showCta
            ? "md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.2fr)_auto]"
            : "md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]"
        }`}
      >
        <p className="max-w-[18rem] text-balance text-left whitespace-pre-line font-[family-name:var(--font-serif)] text-[1.5rem] font-normal normal-case leading-[1.2] tracking-[0.01em] text-white md:max-w-[20rem] md:text-[1.875rem] md:leading-[1.22]">
          {tagline}
        </p>
        <p className="mx-auto max-w-[26rem] text-balance text-center font-[family-name:var(--font-inter)] text-[0.8125rem] font-normal leading-[1.55] tracking-[0.02em] text-white md:justify-self-center md:text-[0.875rem] md:leading-[1.5]">
          {body}
        </p>
        {showCta ? (
          <div className="flex items-end md:justify-end">
            <Link href={hero.ctaHref ?? "#"} className="hero-cta pointer-events-auto">
              {hero.ctaLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
