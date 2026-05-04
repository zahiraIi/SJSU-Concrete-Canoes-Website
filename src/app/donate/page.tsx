import { DonationTiers } from "@/components/sections/donation-tiers";
import { DonationsSupportBlurb } from "@/components/sections/donations-support-blurb";
import { getDonationsPage } from "@/sanity/lib/data";

export default async function DonatePage() {
  const page = await getDonationsPage();

  return (
    <>
      <DonationsSupportBlurb support={page.support} />
      <DonationTiers heading={page.heading} intro={page.intro} tiers={page.tiers} showTopDot={false} />
    </>
  );
}
