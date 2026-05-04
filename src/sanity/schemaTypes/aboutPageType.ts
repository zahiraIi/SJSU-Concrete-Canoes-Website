import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "mission", type: "text" }),
    defineField({ name: "team", type: "array", of: [{ type: "reference", to: [{ type: "teamMember" }] }] }),
  ],
});
