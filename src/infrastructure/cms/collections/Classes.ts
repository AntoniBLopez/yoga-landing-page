import type { CollectionConfig } from "payload";

export const Classes: CollectionConfig = {
  slug: "classes",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "level", "durationMin", "order"],
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
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "durationMin",
      type: "number",
      required: true,
      defaultValue: 60,
      min: 15,
    },
    {
      name: "level",
      type: "select",
      required: true,
      defaultValue: "all",
      options: [
        { label: "Todos los niveles", value: "all" },
        { label: "Principiante", value: "beginner" },
        { label: "Intermedio", value: "intermediate" },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "imageUrl",
      type: "text",
      admin: {
        description: "URL externa de imagen (se usa si no hay imagen subida)",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
    },
  ],
};
