import type { Image } from "sanity";
import type { ContactPageContent, DonationTier, DonationsSupportBlurb, EventEmbed, MapEmbed, Sponsor } from "@/types/content";
import { client } from "@/sanity/lib/client";
import {
  aboutPageQuery,
  competitionsPageQuery,
  contactPageQuery,
  donationsPageQuery,
  homePageQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";
import {
  fallbackCollections,
  fallbackDonationsSupport,
  fallbackHero,
  fallbackPrograms,
  fallbackSiteSettings,
  fallbackSponsors,
  fallbackTeam,
  fallbackTiers,
} from "@/sanity/lib/fallbacks";
import { urlFor, urlForGalleryThumb } from "@/sanity/lib/image";

const canQuerySanity = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET;

async function safeFetch<T>(query: string): Promise<T | null> {
  if (!canQuerySanity) return null;

  try {
    return await client.fetch<T>(query);
  } catch {
    return null;
  }
}

export async function getSiteSettings() {
  return (await safeFetch<typeof fallbackSiteSettings>(siteSettingsQuery)) || fallbackSiteSettings;
}

export async function getHomePage() {
  const page = await safeFetch<{
      hero: typeof fallbackHero;
      programs: typeof fallbackPrograms;
      sponsors: { name: string; logo: Image | null }[];
    }>(homePageQuery);

  if (!page) {
    return {
      hero: fallbackHero,
      programs: fallbackPrograms,
      sponsors: fallbackSponsors,
    };
  }

  const sponsors: Sponsor[] =
    page.sponsors && page.sponsors.length > 0
      ? page.sponsors.map((s) => ({
          name: s.name,
          logoUrl: s.logo ? urlFor(s.logo) : undefined,
        }))
      : fallbackSponsors;

  return {
    hero: {
      ...page.hero,
      backgroundImage: page.hero?.backgroundImage ? urlFor(page.hero.backgroundImage) : fallbackHero.backgroundImage,
      ...(page.hero?.floatingImage ? { floatingImage: urlFor(page.hero.floatingImage) } : {}),
    },
    programs: page.programs?.length
      ? page.programs.map((program) => ({
          ...program,
          image: program.image ? urlFor(program.image) : fallbackPrograms[0].image,
        }))
      : fallbackPrograms,
    sponsors,
  };
}

export async function getAboutPage() {
  const page = await safeFetch<{
      heading: string;
      mission: string;
      team: typeof fallbackTeam;
    }>(aboutPageQuery);

  if (!page) {
    return {
      heading: "About The Team",
      mission:
        "We are an ASCE student chapter team at SJSU focused on engineering excellence, hands-on fabrication, and competitive growth.",
      team: fallbackTeam,
    };
  }

  return {
    ...page,
    team: page.team?.map((member) => ({
      ...member,
      image: member.image ? urlFor(member.image) : fallbackTeam[0].image,
    })),
  };
}

export async function getCompetitionsPage() {
  const page = await safeFetch<{
      heading: string;
      collections: typeof fallbackCollections;
    }>(competitionsPageQuery);

  if (!page) {
    return {
      heading: "Competitions",
      collections: fallbackCollections,
    };
  }

  return {
    ...page,
    collections: page.collections?.map((collection) => ({
      ...collection,
      images: collection.images?.map((image) => urlForGalleryThumb(image)) || [],
    })),
  };
}

type DonationsPageFetch = {
  heading: string;
  intro: string;
  tiers: DonationTier[];
  supportHeading?: string;
  supportParagraph1?: string;
  supportParagraph2?: string;
  supportImage?: Image | null;
  supportImageAlt?: string;
  instructionsTitle?: string;
  instructionsPortalNote?: string;
  instructionContacts?: DonationsSupportBlurb["contacts"];
};

function mergeDonationsSupport(page: DonationsPageFetch | null): DonationsSupportBlurb {
  if (!page?.supportHeading?.trim()) {
    return fallbackDonationsSupport;
  }

  const contacts =
    page.instructionContacts && page.instructionContacts.length > 0
      ? page.instructionContacts
      : fallbackDonationsSupport.contacts;

  return {
    heading: page.supportHeading,
    paragraph1: page.supportParagraph1?.trim() || fallbackDonationsSupport.paragraph1,
    paragraph2: page.supportParagraph2?.trim() || fallbackDonationsSupport.paragraph2,
    supportImageUrl: page.supportImage ? urlFor(page.supportImage) : fallbackDonationsSupport.supportImageUrl,
    supportImageAlt: page.supportImage
      ? page.supportImageAlt?.trim() || undefined
      : fallbackDonationsSupport.supportImageAlt,
    instructionsTitle:
      page.instructionsTitle?.trim() || fallbackDonationsSupport.instructionsTitle,
    instructionsPortalNote:
      page.instructionsPortalNote?.trim() || fallbackDonationsSupport.instructionsPortalNote,
    contacts,
  };
}

export async function getDonationsPage() {
  const page = await safeFetch<DonationsPageFetch>(donationsPageQuery);

  if (!page) {
    return {
      heading: "Donations",
      intro: "Simple ways to give. Every tier directly funds materials, travel, and race-ready builds.",
      tiers: fallbackTiers,
      support: fallbackDonationsSupport,
    };
  }

  return {
    heading: page.heading || "Donations",
    intro: page.intro || "",
    tiers: page.tiers?.length ? page.tiers : fallbackTiers,
    support: mergeDonationsSupport(page),
  };
}

const defaultContactPage: ContactPageContent = {
  eyebrow: "Contact",
  heading: "Get in touch with us",
  intro: "Interested in joining the team, sponsoring a build, or attending an event? Reach out — we will get back to you.",
  supportEmail: "sjsu.concretecanoe@gmail.com",
  formPromoHeading: "Send our team a message",
  formPromoBody:
    "Tell us a bit about yourself and how we can help. We read every message and usually reply within a few days during the semester.",
  trustHints: ["Student-led ASCE chapter", "Based on campus at SJSU", "New members welcome"],
  eventEmbed: {
    heading: "Upcoming Team Events",
    description: "View our latest practices, meetings, and build sessions.",
    embedUrl:
      "https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FLos_Angeles",
  },
  mapEmbed: {
    heading: "Find Us At SJSU",
    address: "1 Washington Sq, San Jose, CA 95192",
    embedUrl: "https://www.google.com/maps?q=San+Jose+State+University&output=embed",
  },
};

export async function getContactPage(): Promise<ContactPageContent> {
  const fetched = await safeFetch<Partial<ContactPageContent>>(contactPageQuery);
  if (!fetched) {
    return defaultContactPage;
  }

  const trustFromCms = fetched.trustHints?.filter((line): line is string => Boolean(line && line.trim()));
  const mergedTrust =
    trustFromCms && trustFromCms.length > 0 ? trustFromCms.slice(0, 3) : defaultContactPage.trustHints;

  const phone = fetched.phone?.trim() || undefined;

  return {
    eyebrow: fetched.eyebrow?.trim() || defaultContactPage.eyebrow,
    heading: fetched.heading?.trim() || defaultContactPage.heading,
    intro: fetched.intro?.trim() || defaultContactPage.intro,
    supportEmail: fetched.supportEmail?.trim() || defaultContactPage.supportEmail,
    phone,
    formPromoHeading: fetched.formPromoHeading?.trim() || defaultContactPage.formPromoHeading,
    formPromoBody: fetched.formPromoBody?.trim() || defaultContactPage.formPromoBody,
    trustHints: mergedTrust,
    eventEmbed: fetched.eventEmbed ?? defaultContactPage.eventEmbed,
    mapEmbed: fetched.mapEmbed ?? defaultContactPage.mapEmbed,
  };
}
