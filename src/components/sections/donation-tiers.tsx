import Link from "next/link";
import type { DonationTier } from "@/types/content";

type DonationTiersProps = {
  heading: string;
  intro: string;
  tiers: DonationTier[];
  /** Omit when a block above (e.g. support blurb) already shows the section dot. */
  showTopDot?: boolean;
};

function TierCheckIcon() {
  return (
    <svg
      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-black"
      fill="none"
      viewBox="0 0 12 12"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M2 6.5 4.5 9 10 3" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

export function DonationTiers({ heading, intro, tiers, showTopDot = true }: DonationTiersProps) {
  return (
    <section className="bg-[#f0ebe3] text-slate-900">
      {showTopDot ? (
        <div className="flex justify-center pt-12 md:pt-14">
          <span className="block h-2 w-2 shrink-0 rounded-full bg-black" aria-hidden />
        </div>
      ) : null}

      <div
        className={`mx-auto w-full max-w-[1400px] px-5 pb-16 md:px-10 md:pb-20 lg:px-12 ${
          showTopDot ? "pt-8 md:pt-10" : "pt-10 md:pt-12"
        }`}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10 lg:gap-16">
          <h1 className="max-w-xl font-[family-name:var(--font-serif)] text-[clamp(2rem,4.5vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.02em] text-black">
            {heading}
          </h1>
          <p className="max-w-md font-[family-name:var(--font-serif)] text-[0.9375rem] leading-[1.55] tracking-[0.01em] text-slate-600 md:text-right md:text-[1.0625rem]">
            {intro}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6 lg:mt-16 lg:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={`${tier.name}-${tier.amountRange}`}
              className="flex min-h-[26rem] flex-col bg-[#f7f5ef] px-8 pb-8 pt-9 md:min-h-[28rem] md:px-9 md:pb-9 md:pt-10"
            >
              <h2 className="font-[family-name:var(--font-serif)] text-xl font-normal leading-tight tracking-[0.01em] text-black md:text-[1.375rem]">
                {tier.name}
              </h2>
              <p className="mt-5 font-[family-name:var(--font-inter)] text-[clamp(1.75rem,3.8vw,2.35rem)] font-bold leading-none tracking-[-0.03em] text-black">
                {tier.amountRange}
              </p>

              <ul className="mt-10 flex flex-1 flex-col gap-3 md:mt-12 md:gap-3.5">
                {tier.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex gap-2.5 font-[family-name:var(--font-inter)] text-[0.8125rem] font-normal leading-[1.5] tracking-[0.02em] text-slate-800"
                  >
                    <TierCheckIcon />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.ctaHref}
                className="mt-10 inline-flex w-full items-center justify-center border border-black bg-black py-3.5 font-[family-name:var(--font-inter)] text-[0.6875rem] font-semibold uppercase tracking-[0.22em] !text-white transition-colors hover:bg-neutral-900 hover:!text-white md:mt-12"
              >
                Donate now
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
