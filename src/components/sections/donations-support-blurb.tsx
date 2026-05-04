import Image from "next/image";
import type { DonationsSupportBlurb } from "@/types/content";

type DonationsSupportBlurbProps = {
  support: DonationsSupportBlurb;
};

export function DonationsSupportBlurb({ support }: DonationsSupportBlurbProps) {
  const imageAlt =
    support.supportImageAlt?.trim() ||
    `${support.heading} — team photo from a regional ASCE competition`;

  return (
    <section className="bg-[#f0ebe3] text-slate-900">
      <div className="flex justify-center pt-12 md:pt-14">
        <span className="block h-2 w-2 shrink-0 rounded-full bg-black" aria-hidden />
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-5 pb-6 pt-8 md:px-10 md:pb-10 md:pt-10 lg:px-12">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_min(42%,420px)] lg:gap-12 xl:gap-16">
          <div>
            <h2 className="max-w-3xl font-[family-name:var(--font-serif)] text-[clamp(1.625rem,3.2vw,2.375rem)] font-normal leading-[1.1] tracking-[-0.02em] text-black">
              {support.heading}
            </h2>

            <p className="text-caption mt-6 max-w-3xl text-slate-700">{support.paragraph1}</p>
            <p className="text-caption mt-4 max-w-3xl text-slate-700">{support.paragraph2}</p>
          </div>

          <figure className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#e8e2d8] ring-1 ring-black/[0.06]">
              {support.supportImageUrl ? (
                <Image
                  src={support.supportImageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 420px, (min-width: 768px) 60vw, 100vw"
                  priority={false}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <span className="text-caption text-slate-500">Photo coming soon</span>
                </div>
              )}
            </div>
          </figure>
        </div>

        <div className="mt-10 max-w-3xl border-l-4 border-[var(--sjsu-blue)] bg-[#f7f5ef] px-8 py-8 md:mt-12 md:px-9 md:py-9">
          <h3 className="font-[family-name:var(--font-serif)] text-lg font-normal leading-snug tracking-[0.01em] text-black md:text-[1.25rem]">
            {support.instructionsTitle}
          </h3>
          <p className="text-caption mt-4 text-slate-700">{support.instructionsPortalNote}</p>
          {support.contacts.map((contact) => (
            <p key={`${contact.email}-${contact.name}`} className="text-caption mt-4 text-slate-700">
              {contact.beforeName}
              <span className="font-medium text-slate-900">{contact.name}</span>{" "}
              <a
                href={`mailto:${contact.email}`}
                className="font-medium text-[var(--sjsu-blue)] underline decoration-[var(--sjsu-blue)]/40 underline-offset-[5px] transition-opacity hover:opacity-80"
              >
                {contact.email}
              </a>
              {contact.afterEmail}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
