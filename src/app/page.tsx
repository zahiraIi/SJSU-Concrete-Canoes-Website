import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero-section";
import { ProgramCards } from "@/components/sections/program-cards";
import { getHomePage } from "@/sanity/lib/data";

const SponsorsCarousel = dynamic(
  () => import("@/components/sections/sponsors-carousel").then((m) => m.SponsorsCarousel),
  { ssr: true },
);

export default async function HomePage() {
  const homePage = await getHomePage();

  return (
    <>
      <HeroSection hero={homePage.hero} />
      <ProgramCards title="What we do" programs={homePage.programs} />
      <SponsorsCarousel sponsors={homePage.sponsors} />
    </>
  );
}
