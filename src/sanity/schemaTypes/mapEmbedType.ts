import { defineField, defineType } from "sanity";

export const mapEmbedType = defineType({
  name: "mapEmbed",
  title: "Map Embed",
  type: "document",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "address", type: "string" }),
    defineField({ name: "embedUrl", type: "url" }),
  ],
});
