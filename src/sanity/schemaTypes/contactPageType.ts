import { defineArrayMember, defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Pill label",
      description: "Small centered badge above the main heading (e.g. “CONTACT”).",
    }),
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "intro", type: "text" }),
    defineField({ name: "supportEmail", type: "string" }),
    defineField({
      name: "phone",
      type: "string",
      title: "Phone (optional)",
      description: "Shown on the “Call us” card. Leave empty to emphasize email instead.",
    }),
    defineField({
      name: "formPromoHeading",
      type: "string",
      title: "Form panel — heading",
      description: "Left column above the contact form.",
    }),
    defineField({ name: "formPromoBody", type: "text", title: "Form panel — body" }),
    defineField({
      name: "trustHints",
      type: "array",
      title: "Form panel — trust line",
      description: "Up to three short phrases (e.g. “Open to new members”).",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({ name: "eventEmbed", type: "reference", to: [{ type: "eventEmbed" }] }),
    defineField({ name: "mapEmbed", type: "reference", to: [{ type: "mapEmbed" }] }),
  ],
});
