import type {
  DonationTier,
  DonationsSupportBlurb,
  GalleryCollection,
  HeroSection,
  ProgramCard,
  SiteSettings,
  Sponsor,
  TeamMember,
  Testimonial,
} from "@/types/content";

const midpacImages = [
  "/images/Midpac_26/DSC07141_compressed.webp",
  "/images/Midpac_26/DSC07147_compressed.webp",
  "/images/Midpac_26/DSC07176_compressed.webp",
  "/images/Midpac_26/DSC07355_compressed.webp",
  "/images/Midpac_26/DSC07513_compressed.webp",
  "/images/Midpac_26/DSC07573_compressed.webp",
  "/images/Midpac_26/DSC07595_compressed.webp",
  "/images/Midpac_26/DSC07643_compressed.webp",
  "/images/Midpac_26/DSC07678_compressed.webp",
  "/images/Midpac_26/DSC07788_compressed.webp",
  "/images/Midpac_26/DSC07814_compressed.webp",
  "/images/Midpac_26/DSCF0437_compressed.webp",
  "/images/Midpac_26/DSCF0544_compressed.webp",
  "/images/Midpac_26/IMG_3446_compressed.webp",
];

const velocityImages = [
  "/images/Velocity_26/1R5A7576.webp",
  "/images/Velocity_26/1R5A8587.webp",
  "/images/Velocity_26/1R5A8990_compressed.webp",
  "/images/Velocity_26/1R5A9139.webp",
  "/images/Velocity_26/DSC_0918_compressed.webp",
  "/images/Velocity_26/DSC_1009_compressed.webp",
  "/images/Velocity_26/DSC_1012_compressed.webp",
  "/images/Velocity_26/PXL_20260411_213342008_compressed.webp",
];

const ccPourImages = [
  "/images/C.C_Pour_2026/1R5A5761.webp",
  "/images/C.C_Pour_2026/1R5A5888.webp",
  "/images/C.C_Pour_2026/1R5A5973.webp",
  "/images/C.C_Pour_2026/1R5A5990.webp",
  "/images/C.C_Pour_2026/1R5A5995.webp",
  "/images/C.C_Pour_2026/1R5A6001.webp",
];

export const fallbackSiteSettings: SiteSettings = {
  title: "SJSU Concrete Canoes",
  tagline: "Build Tomorrow's Engineering Legacy Today",
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Competitions", href: "/competitions" },
    { label: "Donate", href: "/donate" },
    { label: "Contact", href: "/contact" },
  ],
  footerLinks: [
    { label: "Email", href: "mailto:sjsu.concretecanoe@gmail.com" },
    { label: "Instagram", href: "https://www.instagram.com/sjsuconcretecanoe/" },
  ],
};

export const fallbackHero: HeroSection = {
  eyebrow: "ASCE Student Chapter",
  heading: "SJSU\nCONCRETE CANOE",
  taglineSerif: "Design Bolder,\nGo Further.",
  subheading:
    "Student-led engineering to help you build a stronger mix, stay on schedule, and love race day—whether it is your first pour or your next conference.",
  ctaLabel: "See competitions",
  ctaHref: "/competitions",
  backgroundImage: "/images/Midpac_26/DSC07814_compressed.webp",
};

export const fallbackPrograms: ProgramCard[] = [
  {
    title: "Design & Analysis",
    description: "Mix design, hull analysis, and structural modeling for competition performance.",
    image: "/images/Velocity_26/1R5A8990_compressed.webp",
  },
  {
    title: "Build & Pour",
    description: "Hands-on fabrication workflow from mold prep to final pour and finishing.",
    image: "/images/C.C_Pour_2026/1R5A6001.webp",
  },
  {
    title: "Race & Leadership",
    description: "Paddling practice, logistics, and team leadership for conference day.",
    image: "/images/Velocity_26/DSC_1012_compressed.webp",
  },
];

export const fallbackTestimonials: Testimonial[] = [
  { quote: "I found real confidence through this team.", name: "Student Member", role: "Paddler" },
  { quote: "The build season taught me practical engineering.", name: "Civil Student", role: "Designer" },
  { quote: "We support each other from concept to race day.", name: "Team Lead", role: "Captain" },
];

/** Text-only wordmarks when no sponsor logos are configured (replace in Sanity). */
/** Build a URL path under `/images/sponsors/` with safe encoding for spaces etc. */
function sponsorLogoUrl(...segments: string[]): string {
  return "/images/sponsors/" + segments.map(encodeURIComponent).join("/");
}

/** Default home carousel when Sanity has no sponsor documents — uses logos in `public/images/sponsors/`. */
export const fallbackSponsors: Sponsor[] = [
  { name: "McCarthy", logoUrl: sponsorLogoUrl("Top Partner", "McCarthy.svg") },
  { name: "CORE Builders", logoUrl: sponsorLogoUrl("Platinum", "Platinum SVG", "CORE Builders Logo_2025.svg") },
  { name: "CSG", logoUrl: sponsorLogoUrl("Platinum", "Platinum SVG", "CSG.svg") },
  { name: "Kitchell Corporation", logoUrl: sponsorLogoUrl("Platinum", "Platinum SVG", "Kitchell Corporation.svg") },
  { name: "Manson", logoUrl: sponsorLogoUrl("Platinum", "Platinum SVG", "manson.svg") },
  { name: "VEC", logoUrl: sponsorLogoUrl("Platinum", "Platinum SVG", "VEC.svg") },
  { name: "Vulcan Materials Company", logoUrl: sponsorLogoUrl("Platinum", "Platinum SVG", "vulcan_materials_company_logo.svg") },
  { name: "Willis Construction", logoUrl: sponsorLogoUrl("Platinum", "Platinum SVG", "willis construction.svg") },
  { name: "Pakpour Consulting Group", logoUrl: sponsorLogoUrl("Gold", "Pakpour Consulting Group.svg") },
  { name: "OXERRA", logoUrl: sponsorLogoUrl("Gold", "OXERRA-2c-RGB.svg") },
  { name: "Muller Construction Supply", logoUrl: sponsorLogoUrl("Gold", "Gold SVG", "mullerConstructionSupply_WhiteFooterlogo.svg") },
  { name: "Davis Colors", logoUrl: sponsorLogoUrl("Gold", "Gold SVG", "davis-colors-logo.svg") },
  { name: "AE Core", logoUrl: sponsorLogoUrl("Gold", "Gold SVG", "aecoreinc_logo.svg") },
  { name: "PGH Wong", logoUrl: sponsorLogoUrl("Gold", "Gold SVG", "PGH Wong.svg") },
  { name: "BASF", logoUrl: sponsorLogoUrl("Bronze", "Bronze SVG", "BASF.svg") },
  { name: "Euclid Chemical", logoUrl: sponsorLogoUrl("Bronze", "Bronze SVG", "euclid-chemical-logo-vector.svg") },
  { name: "Ghostshield", logoUrl: sponsorLogoUrl("Bronze", "Bronze SVG", "ghostshield-g-orange.svg") },
  { name: "Master Builders Solutions", logoUrl: sponsorLogoUrl("Bronze", "Bronze SVG", "Master-Builders-Solutions_Logo_Color.svg") },
  { name: "Raising Cane's", logoUrl: sponsorLogoUrl("Bronze", "Bronze SVG", "Raising_Canes_Chicken_Fingers_logo.svg") },
  { name: "Salt River Materials Group", logoUrl: sponsorLogoUrl("Bronze", "Bronze SVG", "Salt River Materials Group.svg") },
  { name: "Master Builders", logoUrl: sponsorLogoUrl("Bronze", "Masterbuilders .svg") },
];

export const fallbackTiers: DonationTier[] = [
  {
    name: "Supporter",
    amountRange: "$200 – $499",
    benefits: ["Team merch & thank-you", "Name on donor page", "Build session invite"],
    ctaHref: "mailto:sjsu.concretecanoe@gmail.com?subject=Donation%20%E2%80%94%20Supporter",
    ctaLabel: "Donate now",
  },
  {
    name: "Team partner",
    amountRange: "$500 – $999",
    benefits: ["Everything in Supporter", "Logo on website & hull board", "Competition weekend shout-out"],
    ctaHref: "mailto:sjsu.concretecanoe@gmail.com?subject=Donation%20%E2%80%94%20Team%20partner",
    ctaLabel: "Donate now",
  },
  {
    name: "Title sponsor",
    amountRange: "$1,000+",
    benefits: ["Everything in Team partner", "Priority event branding", "Custom activation with the team"],
    ctaHref: "mailto:sjsu.concretecanoe@gmail.com?subject=Donation%20%E2%80%94%20Title%20sponsor",
    ctaLabel: "Donate now",
  },
];

export const fallbackDonationsSupport: DonationsSupportBlurb = {
  heading: "Why Your Support Matters",
  paragraph1:
    "These donations will cover the hosting and organization expenses of team for the competition. Our main source of funding is company donations toward our ASCE Student Chapter. Our budget is low since we're starting from scratch. In donating you are supporting the next generation of Civil and Environmental Engineering student members here at San Jose State University.",
  paragraph2:
    "About our ASCE chapter, we have member events such as Lunch-and-Learns, as well as the ASCE Mid Pacific Conference that our Student Chapter provides free of charge to our active student members. ASCE Student Chapter wishes to provide an interactive venue for all individuals or organizations who value and agree with the ASCE's purpose and mission.",
  supportImageUrl: "/images/Midpac_26/DSC07573_compressed.webp",
  supportImageAlt: "SJSU Concrete Canoes teammates with the canoe display at the Mid-Pacific Student Conference",
  instructionsTitle: "Instructions for Monetary Donations:",
  instructionsPortalNote:
    'When donating through the SJSU donation portal, please be sure to select "SJSU Concrete Canoe Club" from the designation options to ensure your contribution directly supports our team.',
  contacts: [
    {
      beforeName: "Please reach out to ",
      name: "Sela Gaglia",
      email: "sela.gaglia@sjsu.edu",
      afterEmail:
        " with the SJSU Tower Foundation for more detailed instructions on how to make your voluntary donation.",
    },
    {
      beforeName: "For the SJSU Tax ID/W-9 form, please reach out to ",
      name: "Maddeline Thomas",
      email: "maddeline.thomas@sjsu.edu",
      afterEmail: ".",
    },
  ],
};

const coPmHighlights = [
  "Led team of student members in the design, development, and construction of the project.",
  "Oversaw construction and paddling logistics.",
];

const safetyHighlights = [
  "Enforced safety protocols and proper equipment use to maintain a safe working environment",
];

const constructionHighlights = [
  "Constructed curing tank and canoe mold, overseeing all construction and sanding procedures.",
];

const mixHighlights = [
  "Developed and tested material mix designs to achieve optimal strength, durability, and work-ability.",
];

const aestheticsHighlights = [
  "Designed theme, canoe appearance, inlays, proposal design, display stands, and construction drawings.",
];

const procurementHighlights = [
  "Led team to procure sponsored & donated material, funds, & food",
];

const structuralLeadHighlights = [
  "Analyzed and contributed to the structural design to ensure load capacity, stiffness, and overall integrity.",
];

/** Full Velocity meet-the-team roster (fallback when CMS has no team or partial data). */
export const fallbackTeam: TeamMember[] = [
  {
    name: "Erica Hooper",
    role: "Co- Project Manager",
    image: "/images/team/ericahooper.webp",
    bio: "",
    roleHighlights: coPmHighlights,
    email: "erica.hooper@sjsu.edu",
  },
  {
    name: "Jesse Nguyen",
    role: "Co- Project Manager",
    image: "/images/team/jessenguyen.webp",
    bio: "",
    roleHighlights: coPmHighlights,
    email: "n.jesse2002@gmail.com",
  },
  {
    name: "Christian Rodriguez",
    role: "Safety Officer",
    image: "/images/team/christian_rodriguez.png",
    bio: "",
    roleHighlights: safetyHighlights,
    email: "christian.rodriguez02@sjsu.edu",
  },
  {
    name: "Anuk Kehelgamuwa",
    role: "Safety Officer",
    image: "/images/team/anukkehelgamuwa.webp",
    bio: "",
    roleHighlights: safetyHighlights,
    email: "anukkehel123@gmail.com",
  },
  {
    name: "Jesus Pineda",
    role: "Construction Lead",
    image: "/images/team/jesus_pineda.png",
    bio: "",
    roleHighlights: constructionHighlights,
    email: "jesus.pineda@sjsu.edu",
  },
  {
    name: "Zabdy Gonzalez",
    role: "Construction Lead",
    image: "/images/team/zabdygonzalez.webp",
    bio: "",
    roleHighlights: constructionHighlights,
    email: "zabdy.gonzalez@sjsu.edu",
  },
  {
    name: "Michael Acnam",
    role: "Mix Lead",
    image: "/images/team/michael_acnam.png",
    bio: "",
    roleHighlights: mixHighlights,
    email: "michael.acnam@sjsu.edu",
  },
  {
    name: "Yaser Osman",
    role: "Mix Lead",
    image: "/images/team/yaserosman.webp",
    bio: "",
    roleHighlights: mixHighlights,
    email: "yaser.osman@sjsu.edu",
  },
  {
    name: "Michael Kushner",
    role: "Aesthetics Lead",
    image: "/images/team/michael_kushner.png",
    bio: "",
    roleHighlights: aestheticsHighlights,
    email: "micah.kushner@sjsu.edu",
  },
  {
    name: "Julia Tran",
    role: "Aesthetics Lead",
    image: "/images/team/juliatran.webp",
    bio: "",
    roleHighlights: aestheticsHighlights,
    email: "julia.tran@sjsu.edu",
  },
  {
    name: "Ben Pham",
    role: "Procurement Lead",
    image: "/images/team/benpham.webp",
    bio: "",
    roleHighlights: procurementHighlights,
    email: "ben.d.pham@sjsu.edu",
  },
  {
    name: "Sai Ananyu Yasala",
    role: "Procurement Lead",
    image: "/images/team/sai_ananyu_yasala.webp",
    bio: "",
    roleHighlights: procurementHighlights,
    email: "saiananyu.yasala@sjsu.edu",
  },
  {
    name: "Michelle Nguyen",
    role: "Paddling Captain",
    image: "/images/team/michelle_nguyen.png",
    bio: "",
    roleHighlights: [
      "Performed routine exercises and physicals to assess and enhance athletic performance",
    ],
    email: "michelle.l.nguyen@sjsu.edu",
  },
  {
    name: "Levi Nienstadt",
    role: "Hull Designer",
    image: "/images/team/levi_nienstadt.png",
    bio: "",
    roleHighlights: ["Designed and modeled the hull form and mold"],
    email: "levi.nienstadt@sjsu.edu",
  },
  {
    name: "Kevin Tran",
    role: "Structural Lead",
    image: "/images/team/kevintran.webp",
    bio: "",
    roleHighlights: structuralLeadHighlights,
    email: "kevin.t.tran03@sjsu.edu",
  },
  {
    name: "Joanna Ou",
    role: "Structural Lead",
    image: "/images/team/joanna_ou.webp",
    bio: "",
    roleHighlights: structuralLeadHighlights,
    email: "joanna.ou@sjsu.edu",
  },
  {
    name: "Jack Metcalf",
    role: "Structural Assistant",
    image: "/images/team/jack_metcalf.png",
    bio: "",
    roleHighlights: structuralLeadHighlights,
    email: "jack.metcalf@sjsu.edu",
  },
];

export const fallbackCollections: GalleryCollection[] = [
  {
    title: "MidPac",
    description: "Conference weekend: displays, races, and team moments.",
    images: midpacImages,
  },
  {
    title: "Velocity",
    description: "Paddling, hull on the water, and race-day energy.",
    images: velocityImages,
  },
  {
    title: "C.C. Pour",
    description: "Concrete pour days—mix, placement, and build milestones.",
    images: ccPourImages,
  },
];
