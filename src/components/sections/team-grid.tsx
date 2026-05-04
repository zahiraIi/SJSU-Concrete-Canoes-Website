import Image from "next/image";
import type { TeamMember } from "@/types/content";

type TeamGridProps = {
  heading: string;
  mission: string;
  team: TeamMember[];
};

function LinkedInIcon() {
  return (
    <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TeamSocialRow({ member, variant = "light" }: { member: TeamMember; variant?: "light" | "dark" }) {
  if (!member.linkedinUrl) return null;

  const linkClass =
    variant === "dark"
      ? "transition-colors hover:text-white text-zinc-400"
      : "transition-colors hover:text-slate-700 text-slate-400";

  return (
    <div className={`mt-3 flex items-center gap-3 ${variant === "dark" ? "text-zinc-400" : "text-slate-400"}`}>
      <a
        href={member.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label={`${member.name} on LinkedIn`}
      >
        <LinkedInIcon />
      </a>
    </div>
  );
}

/** Matches hero bottom-center subheading (`HeroSection` body slot). */
const heroBodySans =
  "font-[family-name:var(--font-inter)] text-[0.8125rem] font-normal leading-[1.55] tracking-[0.02em] md:text-[0.875rem] md:leading-[1.5]";

export function TeamGrid({ heading, mission, team }: TeamGridProps) {
  return (
    <div className="bg-white text-slate-900">
      <section className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-8 md:py-20 lg:px-10">
        <header className="text-center">
          <h1 className="hero-headline m-0 text-[clamp(2.25rem,6vw,4rem)] text-black">
            {heading}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance font-[family-name:var(--font-serif)] text-[1.5rem] font-normal leading-[1.35] tracking-[0.01em] text-slate-700 md:mt-8 md:text-[1.875rem] md:leading-[1.4]">
            {mission}
          </p>
        </header>
      </section>

      <section className="border-t border-slate-200/80 pb-20 pt-12 md:pb-24 md:pt-16">
        <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8 lg:px-10">
          <header className="mb-12 text-center md:mb-14">
            <h2 className="hero-headline m-0 text-[clamp(1.5rem,3.5vw,2.35rem)] text-black">Meet the Team</h2>
            <p className={`mx-auto mt-4 max-w-xl text-balance text-slate-600 ${heroBodySans}`}>
              Students behind mix design, pour days, and race-ready builds—each committed to hands-on engineering
              at SJSU.
            </p>
          </header>

          <figure className="mx-auto mb-12 max-w-5xl md:mb-14">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-950 shadow-sm">
              <Image
                src="/images/team/velocity-org-chart.png"
                alt="Key team roles and organizational chart for Project Velocity, showing departments such as construction, structural, project management, procurement, aesthetics, safety, hull design, mix design, and paddling, with team member names and connections."
                width={1024}
                height={662}
                sizes="(max-width: 1024px) 92vw, 960px"
                className="h-auto w-full object-contain"
              />
            </div>
            <figcaption className={`mt-3 text-center text-slate-500 ${heroBodySans}`}>
              Key team roles and organizational chart — Velocity
            </figcaption>
          </figure>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {team.map((member) => (
              <article
                key={`${member.name}-${member.role}`}
                className="flex w-full gap-5 rounded-xl bg-zinc-900 p-5 text-white shadow-sm ring-1 ring-white/5"
              >
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-zinc-800 sm:h-32 sm:w-32">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 7rem, 8rem"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-[family-name:var(--font-archivo-black)] text-base font-normal normal-case tracking-[-0.04em] text-white md:text-lg">
                    {member.name}
                  </h3>
                  <p className={`mt-1 text-zinc-300 ${heroBodySans}`}>{member.role}</p>
                  {member.roleHighlights && member.roleHighlights.length > 0 ? (
                    <ul
                      className={`mt-3 list-disc space-y-1 pl-4 text-zinc-200 marker:text-zinc-400 ${heroBodySans}`}
                    >
                      {member.roleHighlights.map((line) => (
                        <li key={line} className="text-balance">
                          {line}
                        </li>
                      ))}
                    </ul>
                  ) : member.bio?.trim() ? (
                    <p className={`mt-3 text-zinc-200 ${heroBodySans}`}>{member.bio}</p>
                  ) : null}
                  {member.email ? (
                    <a
                      href={`mailto:${member.email}`}
                      className={`mt-3 inline-block break-all text-zinc-300 underline decoration-zinc-500 underline-offset-2 transition-colors hover:text-white ${heroBodySans}`}
                    >
                      {member.email}
                    </a>
                  ) : null}
                  <TeamSocialRow member={member} variant="dark" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
