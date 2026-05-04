import { TeamGrid } from "@/components/sections/team-grid";
import { getAboutPage } from "@/sanity/lib/data";

export default async function AboutPage() {
  const page = await getAboutPage();

  return <TeamGrid heading={page.heading} mission={page.mission} team={page.team} />;
}
