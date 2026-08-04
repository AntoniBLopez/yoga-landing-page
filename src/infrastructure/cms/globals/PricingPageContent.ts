import { pricingContentFields } from "./pageContentFields";
import { pageGlobal } from "./pageGlobal";
import { pricingPageSectionsField } from "./sectionOrderFields";

export const PricingPageContent = pageGlobal({
  slug: "pricing-page-content",
  label: "Precios (página)",
  admin: {
    description: "Orden de secciones y textos de /precios (y el bloque de precios en la home).",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Orden de secciones",
          description: "Muestra, oculta y reordena las secciones de /precios.",
          fields: [pricingPageSectionsField],
        },
        {
          label: "Contenido",
          fields: pricingContentFields,
        },
      ],
    },
  ],
});
