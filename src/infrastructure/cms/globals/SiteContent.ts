import type { GlobalConfig } from "payload";

import { Group, LText } from "./fieldHelpers";

/**
 * Shared site chrome copy (not page-specific).
 * Page texts live in each «… (página)» global under Colecciones.
 */
export const SiteContent: GlobalConfig = {
  slug: "site-content",
  label: "Textos del sitio",
  admin: {
    description:
      "Meta, menú, footer, reseñas y SEO. Los textos de cada página están en Colecciones → «… (página)».",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Meta y menú",
          fields: [
            Group("meta", "SEO general", [
              LText("title", "Título del sitio", { required: true }),
              LText("description", "Descripción SEO", { textarea: true, required: true }),
            ]),
            Group("nav", "Menú de navegación", [
              LText("home", "Inicio"),
              LText("classes", "Clases"),
              LText("schedule", "Horarios"),
              LText("studio", "Estudio"),
              LText("about", "Sobre mí"),
              LText("blog", "Blog"),
              LText("pricing", "Precios"),
              LText("contact", "Contacto"),
              LText("cta", "Botón CTA del menú"),
            ]),
          ],
        },
        {
          label: "Reseñas y footer",
          fields: [
            Group("reviews", "Reseñas (home)", [
              LText("label", "Label"),
              LText("title", "Título"),
            ]),
            Group("footer", "Footer", [
              LText("tagline", "Tagline"),
              LText("explore", "Explorar"),
              LText("follow", "Sígueme"),
              LText("rights", "Copyright (usa {year})", {
                description: "Ej. © {year} Blau Yoga. Todos los derechos reservados.",
              }),
              LText("values", "Valores / línea inferior"),
            ]),
          ],
        },
        {
          label: "SEO páginas",
          description: "Metas SEO de rutas internas.",
          fields: [
            {
              name: "pageMeta",
              type: "json",
              label: "Meta SEO de páginas internas",
              localized: true,
              admin: {
                description:
                  'Ej. { "classes": { "metaTitle": "...", "metaDescription": "..." }, ... }',
              },
            },
          ],
        },
      ],
    },
  ],
};
