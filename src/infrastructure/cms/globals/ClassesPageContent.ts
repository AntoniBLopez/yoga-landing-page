import { classesContentFields } from "./pageContentFields";
import { pageGlobal } from "./pageGlobal";
import { classesPageSectionsField } from "./sectionOrderFields";

export const ClassesPageContent = pageGlobal({
  slug: "classes-page-content",
  label: "Clases (página)",
  admin: {
    description: "Orden de secciones y textos de /clases (y el bloque de clases en la home).",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Orden de secciones",
          description: "Muestra, oculta y reordena las secciones de /clases.",
          fields: [classesPageSectionsField],
        },
        {
          label: "Contenido",
          fields: classesContentFields,
        },
      ],
    },
  ],
});
