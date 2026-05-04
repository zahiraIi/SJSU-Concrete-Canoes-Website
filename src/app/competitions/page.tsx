import { GalleryGrid } from "@/components/sections/gallery-grid";
import { getCompetitionsPage } from "@/sanity/lib/data";

export default async function CompetitionsPage() {
  const page = await getCompetitionsPage();

  return <GalleryGrid heading={page.heading} collections={page.collections} />;
}
