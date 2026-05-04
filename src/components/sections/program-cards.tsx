import Image from "next/image";
import { Reveal } from "@/components/animation/reveal";
import type { ProgramCard } from "@/types/content";

type ProgramCardsProps = {
  title: string;
  intro?: string;
  programs: ProgramCard[];
};

export function ProgramCards({ title, intro, programs }: ProgramCardsProps) {
  return (
    <section className="container py-20">
      <Reveal>
        <h2 className="display text-4xl text-slate-900 md:text-6xl">{title}</h2>
      </Reveal>
      {intro ? (
        <Reveal delay={0.1}>
          <p className="text-caption mt-4 max-w-2xl text-slate-700">{intro}</p>
        </Reveal>
      ) : null}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {programs.map((program, index) => (
          <Reveal key={program.title} delay={index * 0.1}>
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <Image
                src={program.image}
                alt={program.title}
                width={720}
                height={460}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="h-52 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="display text-2xl text-[var(--sjsu-blue)]">{program.title}</h3>
                <p className="text-caption mt-3 text-slate-700">{program.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
