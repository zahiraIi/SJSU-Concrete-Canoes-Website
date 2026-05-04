import type { ContactPageContent } from "@/types/content";
import { ContactForm } from "@/components/sections/contact-form";

function IconChat({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
      />
    </svg>
  );
}

function IconPhone({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}

function IconMapPin({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7-7 11.25-7 11.25S5.5 17.5 5.5 10.5a7 7 0 1114 0z" />
    </svg>
  );
}

function IconRocket({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12 3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
      />
    </svg>
  );
}

export function ContactSection(props: ContactPageContent) {
  const { eyebrow, heading, intro, supportEmail, phone, formPromoHeading, formPromoBody, trustHints, eventEmbed, mapEmbed } = props;
  const hasPhone = Boolean(phone?.trim());
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : null;

  return (
    <div className="bg-white">
      <section className="container py-16 md:py-24">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-caption-caps inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-slate-500">
            {eyebrow}
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">{heading}</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">{intro}</p>
        </header>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-slate-400">
              <IconChat />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-900">Message us</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              Email is the fastest way to reach the team for questions, visits, or partnership ideas.
            </p>
            <div className="mt-5 border-t border-slate-200 pt-5">
              <a href={`mailto:${supportEmail}`} className="text-sm font-medium text-slate-900 underline-offset-4 hover:underline">
                {supportEmail}
              </a>
            </div>
          </article>

          <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-slate-400">
              <IconPhone />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-900">{hasPhone ? "Call us" : "Connect"}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              {hasPhone
                ? "Sometimes it helps to talk it through — give us a call and we will do our best to help."
                : "Prefer a conversation? Email us and we can coordinate a call or invite you to practice."}
            </p>
            <div className="mt-5 border-t border-slate-200 pt-5">
              {hasPhone && telHref ? (
                <a href={telHref} className="text-sm font-medium text-slate-900 underline-offset-4 hover:underline">
                  {phone}
                </a>
              ) : (
                <a href={`mailto:${supportEmail}`} className="text-sm font-medium text-slate-900 underline-offset-4 hover:underline">
                  {supportEmail}
                </a>
              )}
            </div>
          </article>

          <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-slate-400">
              <IconMapPin />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-900">Address</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              We are based at San José State. Stop by during the semester or reach out to plan a visit.
            </p>
            <div className="mt-5 border-t border-slate-200 pt-5">
              <p className="text-sm font-medium text-slate-900">{mapEmbed.address}</p>
            </div>
          </article>
        </div>

        <div className="mx-auto mt-12 max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="flex flex-col">
              <div className="text-slate-400">
                <IconRocket className="h-8 w-8" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">{formPromoHeading}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">{formPromoBody}</p>
              {trustHints.length > 0 ? (
                <p className="mt-8 text-xs leading-relaxed text-slate-500 md:text-sm">{trustHints.join(" · ")}</p>
              ) : null}
            </div>
            <ContactForm className="lg:pt-1" />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-[var(--paper)] py-16 md:py-20">
        <div className="container">
          <h2 className="text-center text-2xl font-semibold text-slate-900 md:text-3xl">Calendar & location</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-600">Plan around our schedule and find us on campus.</p>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{eventEmbed.heading}</h3>
              <p className="mt-2 text-sm text-slate-600">{eventEmbed.description}</p>
              <iframe
                title="Team events calendar"
                src={eventEmbed.embedUrl}
                className="mt-5 h-[380px] w-full rounded-xl border border-slate-200"
                loading="lazy"
              />
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{mapEmbed.heading}</h3>
              <p className="mt-2 text-sm text-slate-600">{mapEmbed.address}</p>
              <iframe
                title="Campus map"
                src={mapEmbed.embedUrl}
                className="mt-5 h-[380px] w-full rounded-xl border border-slate-200"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
