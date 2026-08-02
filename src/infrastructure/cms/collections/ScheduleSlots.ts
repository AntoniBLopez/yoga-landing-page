import type { CollectionConfig } from "payload";

export const ScheduleSlots: CollectionConfig = {
  slug: "schedule-slots",
  admin: {
    useAsTitle: "time",
    defaultColumns: ["day", "time", "class"],
  },
  access: {
    read: () => true,
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
    },
    {
      name: "teacher",
      type: "relationship",
      relationTo: "teachers",
    },
  ],
};
