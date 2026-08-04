import type { CollectionConfig } from "payload";

export const ScheduleSlots: CollectionConfig = {
  slug: "schedule-slots",
  labels: {
    singular: "Horario",
    plural: "Horarios",
  },
  admin: {
    useAsTitle: "time",
    defaultColumns: ["day", "time", "class", "visible"],
    description:
      "Franjas del calendario. Desactiva «Visible» para ocultar una hora sin borrarla.",
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return {
        or: [{ visible: { equals: true } }, { visible: { exists: false } }],
      };
    },
  },
  fields: [
    {
      name: "day",
      type: "select",
      required: true,
      options: [
        { label: "Lunes", value: "monday" },
        { label: "Martes", value: "tuesday" },
        { label: "Miércoles", value: "wednesday" },
        { label: "Jueves", value: "thursday" },
        { label: "Viernes", value: "friday" },
        { label: "Sábado", value: "saturday" },
        { label: "Domingo", value: "sunday" },
      ],
    },
    {
      name: "time",
      type: "text",
      required: true,
      admin: {
        description: "Formato 24h, p. ej. 09:30",
      },
      validate: (value: string | null | undefined) =>
        /^\d{2}:\d{2}$/.test(value ?? "") || "Usa el formato HH:MM (24h)",
    },
    {
      name: "class",
      type: "relationship",
      relationTo: "classes",
      required: true,
      label: "Clase",
    },
    {
      name: "teacher",
      type: "relationship",
      relationTo: "teachers",
      label: "Profesora",
    },
    {
      name: "visible",
      type: "checkbox",
      defaultValue: true,
      label: "Visible en la web",
      admin: {
        position: "sidebar",
        description:
          "Si está desactivado, este horario no aparece en /horarios ni en la landing.",
      },
    },
  ],
};
