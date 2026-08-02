import type { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  admin: {
    useAsTitle: "author",
    defaultColumns: ["author", "rating"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "author",
      type: "text",
      required: true,
    },
    {
      name: "context",
      type: "text",
      localized: true,
      admin: {
        description: "P. ej. «Alumna de Vinyasa»",
      },
    },
    {
      name: "text",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "rating",
      type: "number",
      required: true,
      defaultValue: 5,
      min: 1,
      max: 5,
    },
  ],
};
