import { defineField, defineType } from "sanity";

export const teamMemberType = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "image", type: "image" }),
    defineField({ name: "bio", type: "text", title: "Bio (optional legacy)" }),
    defineField({
      name: "roleHighlights",
      type: "array",
      title: "Role highlights",
      description: "Short bullet points (responsibilities). Shown on About.",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "linkedinUrl",
      type: "url",
      title: "LinkedIn URL",
    }),
  ],
});
