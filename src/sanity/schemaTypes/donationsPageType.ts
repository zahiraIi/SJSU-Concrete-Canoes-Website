import { defineField, defineType } from "sanity";

export const donationsPageType = defineType({
  name: "donationsPage",
  title: "Donations Page",
  type: "document",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "intro", type: "text" }),
    defineField({ name: "tiers", type: "array", of: [{ type: "reference", to: [{ type: "donationTier" }] }] }),
    defineField({
      name: "supportHeading",
      type: "string",
      title: "Support blurb — heading",
      description: 'e.g. "Why Your Support Matters"',
    }),
    defineField({
      name: "supportParagraph1",
      type: "text",
      title: "Support blurb — first paragraph",
      rows: 5,
    }),
    defineField({
      name: "supportParagraph2",
      type: "text",
      title: "Support blurb — second paragraph",
      rows: 5,
    }),
    defineField({
      name: "supportImage",
      type: "image",
      title: "Support blurb — photo",
      description: "Shown next to the support heading. Uses a default competition photo when empty.",
      options: { hotspot: true },
    }),
    defineField({
      name: "supportImageAlt",
      type: "string",
      title: "Support photo — alt text",
      description: "Short description for screen readers (optional).",
    }),
    defineField({
      name: "instructionsTitle",
      type: "string",
      title: "Instructions card — title",
      initialValue: "Instructions for Monetary Donations:",
    }),
    defineField({
      name: "instructionsPortalNote",
      type: "text",
      title: "Instructions card — portal note",
      rows: 3,
    }),
    defineField({
      name: "instructionContacts",
      type: "array",
      title: "Instructions card — contact lines",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "beforeName",
              type: "string",
              title: "Text before name",
              description: 'e.g. "Please reach out to "',
            }),
            defineField({ name: "name", type: "string" }),
            defineField({ name: "email", type: "string" }),
            defineField({
              name: "afterEmail",
              type: "string",
              title: "Text after email",
            }),
          ],
        },
      ],
    }),
  ],
});
