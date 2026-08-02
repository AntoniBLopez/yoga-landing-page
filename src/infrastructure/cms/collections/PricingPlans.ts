import type { CollectionConfig } from "payload";

export const PricingPlans: CollectionConfig = {
  slug: "pricing-plans",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "price", "period", "featured"],
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
      localized: true,
    },
    {
      name: "price",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "currency",
      type: "text",
      required: true,
      defaultValue: "€",
    },
    {
      name: "period",
      type: "select",
      required: true,
      defaultValue: "monthly",
      options: [
        { label: "Pago único", value: "single" },
        { label: "Mensual", value: "monthly" },
      ],
    },
    {
      name: "features",
      type: "array",
      localized: true,
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
    },
  ],
};
