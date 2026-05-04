import { defineField, defineType } from "sanity";

export const donationTierType = defineType({
  name: "donationTier",
  title: "Donation Tier",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "amountRange", type: "string" }),
    defineField({ name: "benefits", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "ctaHref", type: "string" }),
    defineField({
      name: "ctaLabel",
      type: "string",
      description: "Unused on the site — all tiers show “Donate now”. Kept for reference only.",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      description: "Unused — all tier buttons use the same style.",
      initialValue: false,
    }),
  ],
});
