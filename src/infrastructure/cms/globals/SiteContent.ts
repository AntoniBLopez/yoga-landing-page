import type { GlobalConfig } from "payload";

import { aboutPageFields } from "./aboutPageFields";
import { Group, LText } from "./fieldHelpers";

/**
 * Editable marketing copy. Fields map into next-intl message keys.
 * Form UI chrome (errors, language switcher) stays in messages/*.json.
 */
export const SiteContent: GlobalConfig = {
  slug: "site-content",
  label: "Textos del sitio",
  admin: {
    description:
      "Títulos, subtítulos y textos de la web. Cambia el idioma arriba a la derecha del admin para editar ES/EN.",
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
          label: "Hero",
          fields: [
            Group("hero", "Hero (inicio)", [
              LText("eyebrow", "Eyebrow"),
              LText("title", "Título principal", { required: true }),
              LText("subtitle", "Subtítulo", { textarea: true }),
              LText("cta", "Texto del botón"),
              LText("imageAlt", "Texto alternativo de la imagen"),
            ]),
          ],
        },
        {
          label: "Features",
          fields: [
            {
              name: "features",
              type: "array",
              label: "Ventajas (inicio)",
              labels: { singular: "Ventaja", plural: "Ventajas" },
              maxRows: 8,
              fields: [
                LText("title", "Título", { required: true }),
                LText("text", "Texto", { required: true }),
              ],
            },
          ],
        },
        {
          label: "Estudio y cita",
          description: "Textos de la sección en la home y de la página /estudio (galería y alquiler).",
          fields: [
            Group("studio", "Estudio (home + /estudio)", [
              LText("label", "Label"),
              LText("title", "Título"),
              LText("text", "Texto principal", { textarea: true }),
              LText("cta", "CTA «Conoce el estudio»"),
              LText("ctaRental", "CTA «Alquilar sala»"),
              LText("imageAlt", "Alt imagen principal"),
              LText("galleryLabel", "Galería · label"),
              LText("galleryTitle", "Galería · título"),
              LText("gallerySubtitle", "Galería · subtítulo", { textarea: true }),
              Group("rental", "Alquiler de sala", [
                LText("label", "Label"),
                LText("title", "Título"),
                LText("text", "Texto", { textarea: true }),
                LText("cta", "Botón WhatsApp"),
                LText("whatsappMessage", "Mensaje prellenado de WhatsApp", {
                  textarea: true,
                }),
                Group("highlights", "Puntos destacados", [
                  LText("light", "Punto 1"),
                  LText("equip", "Punto 2"),
                  LText("groups", "Punto 3"),
                ]),
              ]),
            ]),
            Group("quote", "Cita", [
              LText("text", "Cita", { textarea: true }),
              LText("author", "Autor"),
            ]),
          ],
        },
        {
          label: "Secciones",
          fields: [
            Group("classes", "Clases", [
              LText("label", "Label"),
              LText("title", "Título"),
              LText("subtitle", "Subtítulo", { textarea: true }),
              LText("cta", "CTA"),
            ]),
            Group("schedule", "Horarios", [
              LText("label", "Label"),
              LText("title", "Título"),
              LText("subtitle", "Subtítulo", { textarea: true }),
              LText("book", "Botón reservar"),
            ]),
            Group("pricing", "Precios", [
              LText("label", "Label"),
              LText("title", "Título"),
              LText("subtitle", "Subtítulo", { textarea: true }),
              LText("cta", "CTA plan"),
              LText("popular", "Badge popular"),
              Group("faq", "FAQ (cabecera)", [
                LText("label", "Label"),
                LText("title", "Título"),
                LText("subtitle", "Subtítulo", { textarea: true }),
              ]),
            ]),
            Group("reviews", "Reseñas", [
              LText("label", "Label"),
              LText("title", "Título"),
            ]),
            Group("contact", "Contacto", [
              LText("label", "Label"),
              LText("title", "Título"),
              LText("subtitle", "Subtítulo", { textarea: true }),
              LText("imageAlt", "Alt imagen"),
            ]),
            Group("about", "Sobre mí (intro)", [
              LText("label", "Label"),
              LText("title", "Título (usa {name} para el nombre)", {
                description: "Ej. Hola, soy {name}",
              }),
              LText("cta", "CTA «Conóceme mejor»"),
              LText("imageAlt", "Alt imagen"),
            ]),
          ],
        },
        {
          label: "Footer y blog",
          fields: [
            Group("footer", "Footer", [
              LText("tagline", "Tagline"),
              LText("explore", "Explorar"),
              LText("follow", "Sígueme"),
              LText("rights", "Copyright (usa {year})", {
                description: "Ej. © {year} Blau Yoga. Todos los derechos reservados.",
              }),
              LText("values", "Valores / línea inferior"),
            ]),
            Group("blog", "Blog", [
              LText("label", "Label"),
              LText("title", "Título"),
              LText("subtitle", "Subtítulo", { textarea: true }),
              LText("metaTitle", "SEO título"),
              LText("metaDescription", "SEO descripción", { textarea: true }),
              LText("readMore", "Leer más"),
              LText("back", "Volver"),
              LText("empty", "Vacío", { textarea: true }),
            ]),
          ],
        },
        {
          label: "Sobre mí (página)",
          description:
            "Textos largos de /sobre-mi: historia, filosofía, formación, valores, fuera del mat y CTA.",
          fields: [
            ...aboutPageFields,
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
