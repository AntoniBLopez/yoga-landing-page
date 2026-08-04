import {
  featuresContentFields,
  heroContentFields,
  quoteContentFields,
} from "./pageContentFields";
import { pageGlobal } from "./pageGlobal";
import { homeSectionsField, homeStudioCtasField } from "./sectionOrderFields";

export const HomePageContent = pageGlobal({
  slug: "home-page-content",
  label: "Inicio (página)",
  admin: {
    description: "Orden de secciones y textos propios de la home.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Orden de secciones",
          description: "Muestra, oculta y reordena los bloques de la home.",
          fields: [homeSectionsField, homeStudioCtasField],
        },
        {
          label: "Contenido",
          description: "Hero, ventajas y cita. Otros bloques se editan en su página.",
          fields: [...heroContentFields, ...featuresContentFields, ...quoteContentFields],
        },
      ],
    },
  ],
});
