import type { CollectionConfig } from "payload";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  labels: {
    singular: "Pregunta frecuente",
    plural: "FAQs",
  },
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "visible", "order", "updatedAt"],
    description:
      "Preguntas frecuentes de la página de precios. Desactiva «Visible» para ocultarlas en la web.",
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return { visible: { equals: true } };
    },
  },
  fields: [
    {
      name: "question",
      type: "text",
      required: true,
      localized: true,
      label: "Pregunta",
    },
    {
      name: "answer",
      type: "textarea",
      required: true,
      localized: true,
      label: "Respuesta",
    },
    {
      name: "visible",
      type: "checkbox",
      defaultValue: true,
      label: "Visible en la web",
      admin: {
        position: "sidebar",
        description: "Si está desactivado, la pregunta no aparece en /precios.",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      label: "Orden",
      admin: {
        position: "sidebar",
        description: "Menor número = aparece antes.",
      },
    },
  ],
};
