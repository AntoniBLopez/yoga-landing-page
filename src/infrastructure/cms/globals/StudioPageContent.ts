import { studioContentFields } from "./pageContentFields";
import { pageGlobal } from "./pageGlobal";
import { studioPageSectionsField } from "./sectionOrderFields";

export const StudioPageContent = pageGlobal({
  slug: "studio-page-content",
  label: "Estudio (página)",
  admin: {
    description:
      "Orden de secciones y textos del estudio (también usa la home en el bloque Estudio).",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Orden de secciones",
          description: "Muestra, oculta y reordena las secciones de /estudio.",
          fields: [studioPageSectionsField],
        },
        {
          label: "Contenido",
          fields: studioContentFields,
        },
      ],
    },
  ],
});
