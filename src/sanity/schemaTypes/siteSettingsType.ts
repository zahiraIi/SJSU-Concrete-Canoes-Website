import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "tagline", type: "string" }),
    defineField({
      name: "navigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [defineField({ name: "label", type: "string" }), defineField({ name: "href", type: "string" })],
        },
      ],
    }),
    defineField({
      name: "footerLinks",
      type: "array",
      of: [
        {
          type: "object",
          fields: [defineField({ name: "label", type: "string" }), defineField({ name: "href", type: "string" })],
        },
      ],
    }),
  ],
});
