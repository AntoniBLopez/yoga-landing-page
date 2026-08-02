import type { CollectionConfig } from "payload";

export const Teachers: CollectionConfig = {
  slug: "teachers",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "bio",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "imageUrl",
      type: "text",
      admin: {
        description: "URL externa de imagen (se usa si no hay foto subida)",
      },
    },
  ],
};
