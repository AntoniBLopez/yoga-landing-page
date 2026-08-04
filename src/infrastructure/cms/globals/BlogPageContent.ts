import { blogContentFields } from "./pageContentFields";
import { pageGlobal } from "./pageGlobal";
import { blogPageSectionsField } from "./sectionOrderFields";

export const BlogPageContent = pageGlobal({
  slug: "blog-page-content",
  label: "Blog (página)",
  admin: {
    description: "Orden de secciones y textos de /blog.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Orden de secciones",
          description: "Muestra, oculta y reordena las secciones de /blog.",
          fields: [blogPageSectionsField],
        },
        {
          label: "Contenido",
          fields: blogContentFields,
        },
      ],
    },
  ],
});
