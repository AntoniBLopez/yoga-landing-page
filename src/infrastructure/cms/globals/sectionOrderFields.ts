import type { Field } from "payload";

type SectionOption = { label: string; value: string };

function sectionArray(
  name: string,
  label: string,
  options: SectionOption[],
  description: string,
): Field {
  return {
    name,
    type: "array",
    label,
    labels: { singular: "Sección", plural: "Secciones" },
    admin: {
      description,
      initCollapsed: false,
    },
    fields: [
      {
        // Must not be named `id` — Payload treats that as the array row PK (integer),
        // which breaks string section keys like "hero" on SQLite inserts.
        name: "section",
        type: "select",
        label: "Sección",
        required: true,
        options,
      },
      {
        name: "visible",
        type: "checkbox",
        label: "Visible",
        defaultValue: true,
      },
    ],
  };
}

export const landingSectionOptions: SectionOption[] = [
  { label: "Hero", value: "hero" },
  { label: "Ventajas / features", value: "features" },
  { label: "Estudio", value: "studio" },
  { label: "Cita", value: "quote" },
  { label: "Clases", value: "classes" },
  { label: "Horarios", value: "schedule" },
  { label: "Sobre mí", value: "about" },
  { label: "Precios", value: "pricing" },
  { label: "Reseñas", value: "reviews" },
  { label: "Contacto", value: "contact" },
];

export const aboutSectionOptions: SectionOption[] = [
  { label: "Intro (foto + bio)", value: "intro" },
  { label: "Historia", value: "story" },
  { label: "Filosofía", value: "philosophy" },
  { label: "Formación", value: "training" },
  { label: "Estadísticas", value: "stats" },
  { label: "Reseñas", value: "reviews" },
  { label: "Valores", value: "values" },
  { label: "Fuera del mat", value: "offMat" },
  { label: "CTA final", value: "cta" },
];

export const studioSectionOptions: SectionOption[] = [
  { label: "Hero / cabecera", value: "hero" },
  { label: "Texto intro", value: "intro" },
  { label: "Galería", value: "gallery" },
  { label: "Alquiler de sala", value: "rental" },
];

export const pricingSectionOptions: SectionOption[] = [
  { label: "Hero / cabecera", value: "hero" },
  { label: "Planes de precio", value: "plans" },
  { label: "FAQ", value: "faq" },
];

export const landingStudioCtaOptions: SectionOption[] = [
  { label: "Conoce el estudio", value: "explore" },
  { label: "Alquilar sala", value: "rental" },
];

export const landingSectionsField = sectionArray(
  "landingSections",
  "Secciones de la home",
  landingSectionOptions,
  "Arrastra para cambiar el orden. Desactiva «Visible» para ocultar una sección.",
);

export const landingStudioCtasField = sectionArray(
  "landingStudioCtas",
  "Botones de la sección Estudio (home)",
  landingStudioCtaOptions,
  "Arrastra para poner uno encima del otro. Desactiva «Visible» para ocultar un botón.",
);

export const aboutSectionsField = sectionArray(
  "aboutSections",
  "Secciones de /sobre-mi",
  aboutSectionOptions,
  "Arrastra para cambiar el orden. Desactiva «Visible» para ocultar una sección.",
);

export const studioSectionsField = sectionArray(
  "studioSections",
  "Secciones de /estudio",
  studioSectionOptions,
  "Arrastra para cambiar el orden. Desactiva «Visible» para ocultar una sección.",
);

export const pricingSectionsField = sectionArray(
  "pricingSections",
  "Secciones de /precios",
  pricingSectionOptions,
  "Arrastra para cambiar el orden. Desactiva «Visible» para ocultar una sección.",
);
