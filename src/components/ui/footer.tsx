import Link from "next/link";
import type { NavLink } from "@/types/content";

type FooterProps = {
  title: string;
  tagline: string;
  navigation: NavLink[];
  footerLinks: NavLink[];
};

export function Footer({ title, tagline, navigation, footerLinks }: FooterProps) {
  const brandLines = title.trim().split(/\s+/).map((word) => word.toUpperCase());
  const year = new Date().getFullYear();
  const brandCopyright = brandLines.join(" ");

  const edgePad =
    "pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:pl-[max(2rem,env(safe-area-inset-left))] md:pr-[max(2rem,env(safe-area-inset-right))] lg:pl-[max(2.75rem,env(safe-area-inset-left))] lg:pr-[max(2.75rem,env(safe-area-inset-right))]";

  return (
    <footer className="relative mt-12 bg-[var(--sjsu-blue)] text-white md:mt-14 lg:mt-16">
      <div className={`flex w-full flex-col ${edgePad} pb-4 pt-8 md:pb-5 md:pt-9 lg:pt-10`}>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-8 lg:gap-10">
          <div className="hero-headline min-w-0 space-y-0 text-[clamp(2rem,7.25vw,5.5rem)] font-normal uppercase leading-[0.82] tracking-[-0.09em] text-white">
            {brandLines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
          <p className="max-w-[min(22rem,calc(100vw-2.5rem))] shrink-0 font-[family-name:var(--font-inter)] text-[0.8125rem] font-normal leading-[1.5] tracking-[0.03em] text-white/90 md:max-w-[26rem] md:pt-1 md:text-right md:text-[0.9375rem] md:leading-[1.45] md:tracking-[0.025em]">
            {tagline}
          </p>
        </div>

        <div className="mt-8 flex flex-col md:mt-10 lg:mt-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-6">
            <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-3 md:gap-x-8 lg:gap-x-10">
              {navigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-[family-name:var(--font-inter)] text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white hover:text-white/75 md:text-[0.6875rem] md:tracking-[0.22em]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-wrap gap-x-7 gap-y-2 md:justify-end md:gap-x-8">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-[family-name:var(--font-inter)] text-[0.625rem] font-medium lowercase text-white underline decoration-white/65 decoration-1 underline-offset-[5px] hover:decoration-white md:text-[0.6875rem]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <p className="mt-5 font-[family-name:var(--font-inter)] text-[0.5625rem] font-medium uppercase leading-[1.65] tracking-[0.14em] text-white/48 md:mt-6 md:text-[0.625rem] md:tracking-[0.18em]">
            © {year} {brandCopyright}, SAN JOSE STATE UNIVERSITY.
          </p>
        </div>
      </div>
    </footer>
  );
}
