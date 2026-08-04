import type { Field } from "payload";

type SectionOption = { label: string; value: string };

function sectionArray(
  name: string,
  label: string,
  options: SectionOption[],
  description: string,
  itemLabels: { singular: string; plural: string; selectLabel: string } = {
    singular: "Sección",
    plural: "Secciones",
    selectLabel: "Sección",
  },
): Field {
  return {
    name,
    type: "array",
    label,
    labels: { singular: itemLabels.singular, plural: itemLabels.plural },
    defaultValue: options.map((option) => ({
      section: option.value,
      visible: true,
    })),
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
        label: itemLabels.selectLabel,
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

export const classesSectionOptions: SectionOption[] = [
  { label: "Hero / cabecera", value: "hero" },
  { label: "Listado de clases", value: "list" },
];

export const scheduleSectionOptions: SectionOption[] = [
  { label: "Hero / cabecera", value: "hero" },
  { label: "Horario semanal", value: "list" },
];

export const contactSectionOptions: SectionOption[] = [
  { label: "Hero / cabecera", value: "hero" },
  { label: "Formulario y datos", value: "form" },
];

export const blogSectionOptions: SectionOption[] = [
  { label: "Cabecera", value: "hero" },
  { label: "Listado de posts", value: "list" },
];

export const footerNavOptions: SectionOption[] = [
  { label: "Clases", value: "classes" },
  { label: "Horarios", value: "schedule" },
  { label: "Estudio", value: "studio" },
  { label: "Sobre mí", value: "about" },
  { label: "Blog", value: "blog" },
  { label: "Precios", value: "pricing" },
  { label: "Contacto", value: "contact" },
];

export const footerSocialOptions: SectionOption[] = [
  { label: "Facebook", value: "facebook" },
  { label: "Instagram", value: "instagram" },
  { label: "Email", value: "email" },
  { label: "WhatsApp", value: "whatsapp" },
  { label: "Spotify", value: "spotify" },
];

/** Page globals use a shared field name `sections`. */
export const homeSectionsField = sectionArray(
  "sections",
  "Orden y visibilidad de secciones",
  landingSectionOptions,
  "Arrastra para reordenar las secciones de la home. Desactiva «Visible» para ocultarlas.",
);

export const homeStudioCtasField = sectionArray(
  "studioCtas",
  "Botones de la sección Estudio (home)",
  landingStudioCtaOptions,
  "Arrastra para poner uno encima del otro. Desactiva «Visible» para ocultar un botón.",
);

export const aboutPageSectionsField = sectionArray(
  "sections",
  "Orden y visibilidad de secciones",
  aboutSectionOptions,
  "Arrastra para reordenar las secciones de /sobre-mi. Desactiva «Visible» para ocultarlas.",
);

export const studioPageSectionsField = sectionArray(
  "sections",
  "Orden y visibilidad de secciones",
  studioSectionOptions,
  "Arrastra para reordenar las secciones de /estudio. Desactiva «Visible» para ocultarlas.",
);

export const pricingPageSectionsField = sectionArray(
  "sections",
  "Orden y visibilidad de secciones",
  pricingSectionOptions,
  "Arrastra para reordenar las secciones de /precios. Desactiva «Visible» para ocultarlas.",
);

export const classesPageSectionsField = sectionArray(
  "sections",
  "Orden y visibilidad de secciones",
  classesSectionOptions,
  "Arrastra para reordenar las secciones de /clases. Desactiva «Visible» para ocultarlas.",
);

export const schedulePageSectionsField = sectionArray(
  "sections",
  "Orden y visibilidad de secciones",
  scheduleSectionOptions,
  "Arrastra para reordenar las secciones de /horarios. Desactiva «Visible» para ocultarlas.",
);

export const contactPageSectionsField = sectionArray(
  "sections",
  "Orden y visibilidad de secciones",
  contactSectionOptions,
  "Arrastra para reordenar las secciones de /contacto. Desactiva «Visible» para ocultarlas.",
);

export const blogPageSectionsField = sectionArray(
  "sections",
  "Orden y visibilidad de secciones",
  blogSectionOptions,
  "Arrastra para reordenar las secciones de /blog. Desactiva «Visible» para ocultarlas.",
);

export const footerNavField = sectionArray(
  "footerNav",
  "Enlaces del footer",
  footerNavOptions,
  "Arrastra para reordenar. Desactiva «Visible» para ocultar. Las páginas desactivadas en «Páginas visibles» nunca aparecen.",
  { singular: "Enlace", plural: "Enlaces", selectLabel: "Enlace" },
);

export const footerSocialField = sectionArray(
  "footerSocial",
  "Redes sociales del footer",
  footerSocialOptions,
  "Arrastra para reordenar. Desactiva «Visible» para ocultar una red.",
  { singular: "Red", plural: "Redes", selectLabel: "Red" },
);
