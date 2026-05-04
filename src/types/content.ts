export type NavLink = {
  label: string;
  href: string;
};

export type SiteSettings = {
  title: string;
  tagline: string;
  navigation: NavLink[];
  footerLinks: NavLink[];
};

export type HeroSection = {
  eyebrow: string;
  /** Main display lines; use \\n for a second line (Running Club style). */
  heading: string;
  subheading: string;
  /** Short serif tagline (bottom-left), e.g. "Design Bolder,\\nGo Further." */
  taglineSerif?: string;
  /** Serif body blurb; bottom row center column, left-aligned. */
  bodySerif?: string;
  /** Optional; omitted when hero has no primary CTA button. */
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage: string;
  /** Legacy CMS field; hero no longer renders a floating image. */
  floatingImage?: string;
};

export type ProgramCard = {
  title: string;
  description: string;
  image: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type Sponsor = {
  name: string;
  /** Public URL for logo image; when omitted, the carousel shows a text wordmark. */
  logoUrl?: string;
};

export type DonationTier = {
  name: string;
  amountRange: string;
  benefits: string[];
  ctaHref: string;
  /** Ignored by UI; every tier shows “Donate now”. */
  ctaLabel?: string;
  /** Ignored by UI; kept for CMS backward compatibility. */
  featured?: boolean;
};

export type DonationInstructionContact = {
  beforeName: string;
  name: string;
  email: string;
  afterEmail: string;
};

export type DonationsSupportBlurb = {
  heading: string;
  paragraph1: string;
  paragraph2: string;
  instructionsTitle: string;
  instructionsPortalNote: string;
  contacts: DonationInstructionContact[];
  /** Photo beside the support heading (competition / team). */
  supportImageUrl: string;
  /** Accessible description for the support photo. */
  supportImageAlt?: string;
};

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  /** Optional legacy paragraph bio (CMS). Prefer `roleHighlights` for bullet responsibilities. */
  bio: string;
  /** Responsibility bullets shown on the About page. */
  roleHighlights?: string[];
  email?: string;
  linkedinUrl?: string;
};

export type GalleryCollection = {
  title: string;
  description: string;
  images: string[];
};

export type EventEmbed = {
  heading: string;
  description: string;
  embedUrl: string;
};

export type MapEmbed = {
  heading: string;
  address: string;
  embedUrl: string;
};

/** Contact page document fields used by `/contact` (merged with defaults in `getContactPage`). */
export type ContactPageContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  supportEmail: string;
  phone?: string;
  formPromoHeading: string;
  formPromoBody: string;
  trustHints: string[];
  eventEmbed: EventEmbed;
  mapEmbed: MapEmbed;
};
