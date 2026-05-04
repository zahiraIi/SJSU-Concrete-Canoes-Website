import { defineField, defineType } from "sanity";

export const competitionsPageType = defineType({
  name: "competitionsPage",
  title: "Competitions Page",
  type: "document",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "collections", type: "array", of: [{ type: "reference", to: [{ type: "galleryCollection" }] }] }),
  ],
});
