import { scheduleContentFields } from "./pageContentFields";
import { pageGlobal } from "./pageGlobal";
import { schedulePageSectionsField } from "./sectionOrderFields";

export const SchedulePageContent = pageGlobal({
  slug: "schedule-page-content",
  label: "Horarios (página)",
  admin: {
    description: "Orden de secciones y textos de /horarios (y el bloque de horarios en la home).",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Orden de secciones",
          description: "Muestra, oculta y reordena las secciones de /horarios.",
          fields: [schedulePageSectionsField],
        },
        {
          label: "Contenido",
          fields: scheduleContentFields,
        },
      ],
    },
  ],
});
