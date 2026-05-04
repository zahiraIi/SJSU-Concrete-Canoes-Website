import { defineField, defineType } from "sanity";

export const eventEmbedType = defineType({
  name: "eventEmbed",
  title: "Event Embed",
  type: "document",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "embedUrl", type: "url" }),
  ],
});
