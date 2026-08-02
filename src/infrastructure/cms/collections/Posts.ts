import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: "Artículo",
    plural: "Blog",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "visible", "publishedAt", "updatedAt"],
    description: "Artículos del blog. Desactiva «Visible» para ocultarlos en la web.",
  },
  access: {
    read: ({ req }) => {
      // Admins see all; public only visible posts
      if (req.user) return true;
      return { visible: { equals: true } };
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "URL del artículo, p. ej. beneficios-del-yin-yoga",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      localized: true,
      admin: {
        description: "Resumen corto para la tarjeta del listado",
      },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: "Imagen de portada",
    },
    {
      name: "coverImageUrl",
      type: "text",
      admin: {
        description: "URL externa (solo si no hay imagen subida)",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      localized: true,
      label: "Contenido",
    },
    {
      name: "visible",
      type: "checkbox",
      defaultValue: true,
      label: "Visible en la web",
      admin: {
        position: "sidebar",
        description: "Si está desactivado, el artículo no aparece en el blog público.",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
  ],
};
