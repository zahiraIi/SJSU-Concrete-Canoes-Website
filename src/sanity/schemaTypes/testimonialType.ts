import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", type: "text" }),
    defineField({ name: "name", type: "string" }),
    defineField({ name: "role", type: "string" }),
  ],
});
