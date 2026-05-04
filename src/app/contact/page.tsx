import { ContactSection } from "@/components/sections/contact-section";
import { getContactPage } from "@/sanity/lib/data";

export default async function ContactPage() {
  const page = await getContactPage();

  return <ContactSection {...page} />;
}
