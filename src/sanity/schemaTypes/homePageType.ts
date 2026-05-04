import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({
          name: "heading",
          type: "text",
          rows: 3,
          description: "Two lines: line 1, Enter, line 2 (e.g. SJSU / CONCRETE CANOE).",
        }),
        defineField({ name: "taglineSerif", type: "text", title: "Serif tagline (bottom left)" }),
        defineField({ name: "bodySerif", type: "text", title: "Serif body (bottom center)" }),
        defineField({ name: "subheading", type: "text", description: "Fallback body if Serif body is empty." }),
        defineField({ name: "ctaLabel", type: "string", description: "Optional; hero no longer shows a CTA button." }),
        defineField({ name: "ctaHref", type: "string" }),
        defineField({ name: "backgroundImage", type: "image" }),
        defineField({ name: "floatingImage", type: "image" }),
      ],
    }),
    defineField({
      name: "programs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text" }),
            defineField({ name: "image", type: "image" }),
          ],
        },
      ],
    }),
    defineField({ name: "testimonials", type: "array", of: [{ type: "reference", to: [{ type: "testimonial" }] }] }),
    defineField({ name: "sponsors", type: "array", of: [{ type: "reference", to: [{ type: "sponsor" }] }] }),
  ],
});
