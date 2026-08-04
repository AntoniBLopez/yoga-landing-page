import type { Field } from "payload";

import { Group, LText } from "./fieldHelpers";

export const heroContentFields: Field[] = [
  Group("hero", "Hero (inicio)", [
    LText("eyebrow", "Eyebrow"),
    LText("title", "Título principal", { required: true }),
    LText("subtitle", "Subtítulo", { textarea: true }),
    LText("cta", "Texto del botón"),
    LText("imageAlt", "Texto alternativo de la imagen"),
  ]),
];

export const featuresContentFields: Field[] = [
  {
    name: "features",
    type: "array",
    label: "Ventajas (inicio)",
    labels: { singular: "Ventaja", plural: "Ventajas" },
    maxRows: 8,
    admin: {
      description:
        "Arrastra para reordenar. Si el listado está vacío se usan los textos e iconos por defecto.",
      initCollapsed: false,
    },
    fields: [
      {
        name: "icon",
        type: "select",
        label: "Icono",
        required: true,
        defaultValue: "leaf",
        options: [
          { label: "Hoja", value: "leaf" },
          { label: "Sol", value: "sun" },
          { label: "Corazón", value: "heart" },
          { label: "Ubicación", value: "mapPin" },
          { label: "Personas", value: "users" },
          { label: "Olas", value: "waves" },
          { label: "Destellos", value: "sparkles" },
          { label: "Flor", value: "flower" },
        ],
      },
      LText("title", "Título", { required: true }),
      LText("text", "Texto", { required: true }),
    ],
  },
];

export const quoteContentFields: Field[] = [
  Group("quote", "Cita", [
    LText("text", "Cita", { textarea: true }),
    LText("author", "Autor"),
  ]),
];

export const studioContentFields: Field[] = [
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
];

export const classesContentFields: Field[] = [
  Group("classes", "Clases", [
    LText("label", "Label"),
    LText("title", "Título"),
    LText("subtitle", "Subtítulo", { textarea: true }),
    LText("cta", "CTA"),
  ]),
];

export const scheduleContentFields: Field[] = [
  Group("schedule", "Horarios", [
    LText("label", "Label"),
    LText("title", "Título"),
    LText("subtitle", "Subtítulo", { textarea: true }),
    LText("book", "Botón reservar"),
  ]),
];

export const pricingContentFields: Field[] = [
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
];

export const contactContentFields: Field[] = [
  Group("contact", "Contacto", [
    LText("label", "Label"),
    LText("title", "Título"),
    LText("subtitle", "Subtítulo", { textarea: true }),
    LText("imageAlt", "Alt imagen"),
  ]),
];

export const aboutIntroContentFields: Field[] = [
  Group("about", "Sobre mí (intro home + página)", [
    LText("label", "Label"),
    LText("title", "Título (usa {name} para el nombre)", {
      description: "Ej. Hola, soy {name}",
    }),
    LText("cta", "CTA «Conóceme mejor»"),
    LText("imageAlt", "Alt imagen"),
  ]),
];

export const blogContentFields: Field[] = [
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
];
