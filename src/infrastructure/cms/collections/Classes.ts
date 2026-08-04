import type { CollectionConfig } from "payload";

export const Classes: CollectionConfig = {
  slug: "classes",
  labels: {
    singular: "Clase",
    plural: "Clases",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "visible", "level", "durationMin", "order"],
    description: "Desactiva «Visible» para ocultar una clase en la web sin borrarla.",
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      // Treat missing `visible` as true (legacy docs before the field existed)
      return {
        or: [{ visible: { equals: true } }, { visible: { exists: false } }],
      };
    },
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
      name: "visible",
      type: "checkbox",
      defaultValue: true,
      label: "Visible en la web",
      admin: {
        position: "sidebar",
        description: "Si está desactivado, la clase no aparece en /clases ni en la landing.",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
