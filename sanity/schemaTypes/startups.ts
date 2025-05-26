import { defineField, defineType } from "sanity";

export const startup = defineType({
  name: "startup",
  title: "Startup",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "views",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "category",
      type: "string",
      validation: (rule) =>
        rule.min(1).max(20).required().error("Please enter a category"),
    }),
    defineField({
      name: "image",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pitch",
      type: "markdown",
      validation: (rule) => rule.required(),
    }),
  ],
});
