import { contactContentFields } from "./pageContentFields";
import { pageGlobal } from "./pageGlobal";
import { contactPageSectionsField } from "./sectionOrderFields";

export const ContactPageContent = pageGlobal({
  slug: "contact-page-content",
  label: "Contacto (página)",
  admin: {
    description: "Orden de secciones y textos de /contacto (y el bloque de contacto en la home).",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Orden de secciones",
          description: "Muestra, oculta y reordena las secciones de /contacto.",
          fields: [contactPageSectionsField],
        },
        {
          label: "Contenido",
          fields: contactContentFields,
        },
      ],
    },
  ],
});
