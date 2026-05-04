"use client";

import { FormEvent, useState } from "react";

type ContactFormProps = {
  className?: string;
};

export function ContactForm({ className = "" }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });

    setStatus(response.ok ? "success" : "error");
    if (response.ok) {
      event.currentTarget.reset();
    }
  }

  const fieldClass =
    "w-full rounded-xl border-0 bg-slate-100 px-4 py-3 text-sm text-slate-900 outline-none ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:ring-2 focus:ring-slate-400";

  return (
    <form onSubmit={onSubmit} className={className}>
      <div className="grid gap-5">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Name
          </label>
          <input id="contact-name" name="name" type="text" required placeholder="Your name" className={fieldClass} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={fieldClass}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder="How can we help?"
            className={`${fieldClass} min-h-[120px] resize-y`}
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
      >
        Submit
      </button>
      {status === "success" ? <p className="mt-4 text-sm text-emerald-700">Thanks — your message was sent.</p> : null}
      {status === "error" ? <p className="mt-4 text-sm text-red-600">Something went wrong. Please try again or email us directly.</p> : null}
    </form>
  );
}
