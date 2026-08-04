import type { CollectionConfig } from "payload";
import { APIError } from "payload";

const MAX_PRICING_PLANS = 4;

export const PricingPlans: CollectionConfig = {
  slug: "pricing-plans",
  labels: {
    singular: "Plan de precios",
    plural: "Precios",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "price", "visible", "featured", "order"],
    description: `Máximo ${MAX_PRICING_PLANS} planes. Desactiva «Visible» para ocultar un plan sin borrarlo.`,
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return {
        or: [{ visible: { equals: true } }, { visible: { exists: false } }],
      };
    },
  },
  hooks: {
    beforeValidate: [
      async ({ operation, req }) => {
        if (operation !== "create") return;
        const { totalDocs } = await req.payload.count({
          collection: "pricing-plans",
        });
        if (totalDocs >= MAX_PRICING_PLANS) {
          throw new APIError(
            `Solo se permiten un máximo de ${MAX_PRICING_PLANS} planes de precios. Oculta o elimina uno antes de crear otro.`,
            400,
          );
        }
      },
    ],
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "Identificador interno, p. ej. bono-8",
      },
    },
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
      label: "Nombre",
    },
    {
      name: "price",
      type: "number",
      required: true,
      min: 0,
      label: "Precio",
    },
    {
      name: "currency",
      type: "text",
      required: true,
      defaultValue: "€",
      label: "Moneda",
    },
    {
      name: "period",
      type: "select",
      required: true,
      defaultValue: "monthly",
      label: "Periodo",
      options: [
        { label: "Pago único", value: "single" },
        { label: "Mensual", value: "monthly" },
      ],
    },
    {
      name: "features",
      type: "array",
      localized: true,
      label: "Características",
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
          label: "Texto",
        },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "Destacado (más popular)",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "visible",
      type: "checkbox",
      defaultValue: true,
      label: "Visible en la web",
      admin: {
        position: "sidebar",
        description:
          "Si está desactivado, el plan no aparece en /precios ni en la landing.",
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
