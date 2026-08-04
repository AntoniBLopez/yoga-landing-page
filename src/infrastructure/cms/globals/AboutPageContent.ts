import { aboutPageInnerFields } from "./aboutPageFields";
import { aboutIntroContentFields } from "./pageContentFields";
import { pageGlobal } from "./pageGlobal";
import { aboutPageSectionsField } from "./sectionOrderFields";

/**
 * Page config for /sobre-mi: section order + copy.
 * Separate global so site-content locales stay under SQLite's json_array arg limit.
 */
export const AboutPageContent = pageGlobal({
  slug: "about-page-content",
  label: "Sobre mí (página)",
  admin: {
    description:
      "Orden de secciones y textos de /sobre-mi. Si no editas nada, la web usa los valores por defecto.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Orden de secciones",
          description: "Muestra, oculta y reordena las secciones de la página Sobre mí.",
          fields: [aboutPageSectionsField],
        },
        {
          label: "Contenido",
          description: "Textos de la intro y de cada bloque de /sobre-mi.",
          fields: [...aboutIntroContentFields, ...aboutPageInnerFields],
        },
      ],
    },
  ],
});
