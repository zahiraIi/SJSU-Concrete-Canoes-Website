import groq from "groq";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  title,
  tagline,
  navigation,
  footerLinks
}`;

export const homePageQuery = groq`*[_type == "homePage"][0]{
  hero,
  programs,
  "sponsors": sponsors[]->{
    name,
    logo
  }
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  heading,
  mission,
  "team": team[]->{
    name,
    role,
    image,
    bio,
    roleHighlights,
    email,
    linkedinUrl
  }
}`;

export const competitionsPageQuery = groq`*[_type == "competitionsPage"][0]{
  heading,
  "collections": collections[]->{
    title,
    description,
    images
  }
}`;

export const donationsPageQuery = groq`*[_type == "donationsPage"][0]{
  heading,
  intro,
  supportHeading,
  supportParagraph1,
  supportParagraph2,
  supportImage,
  supportImageAlt,
  instructionsTitle,
  instructionsPortalNote,
  instructionContacts[]{ 
    beforeName,
    name,
    email,
    afterEmail
  },
  "tiers": tiers[]->{
    name,
    amountRange,
    benefits,
    ctaHref,
    ctaLabel,
    featured
  }
}`;

export const contactPageQuery = groq`*[_type == "contactPage"][0]{
  eyebrow,
  heading,
  intro,
  supportEmail,
  phone,
  formPromoHeading,
  formPromoBody,
  trustHints,
  "eventEmbed": eventEmbed->{
    heading,
    description,
    embedUrl
  },
  "mapEmbed": mapEmbed->{
    heading,
    address,
    embedUrl
  }
}`;
