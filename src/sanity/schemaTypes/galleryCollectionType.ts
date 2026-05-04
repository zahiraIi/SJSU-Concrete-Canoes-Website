import { defineField, defineType } from "sanity";

export const galleryCollectionType = defineType({
  name: "galleryCollection",
  title: "Gallery Collection",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "images", type: "array", of: [{ type: "image" }] }),
  ],
});
