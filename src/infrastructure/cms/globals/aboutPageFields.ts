import type { Field } from "payload";

import { Group, LText } from "./fieldHelpers";

function titledText(name: string, label: string, withLabel = false): Field {
  return Group(name, label, [
    ...(withLabel ? [LText("label", "Label")] : []),
    LText("title", "Título"),
    LText("text", "Texto", { textarea: true }),
  ]);
}

/** Inner fields of the about page (used by the dedicated AboutPageContent global). */
export const aboutPageInnerFields: Field[] = [
  Group("story", "Historia", [
    LText("label", "Label"),
    LText("title", "Título"),
    LText("subtitle", "Subtítulo", { textarea: true }),
    Group("steps", "Pasos", [
      titledText("discover", "Descubrimiento", true),
      titledText("train", "Formación", true),
      titledText("change", "Transformación", true),
      titledText("teach", "Enseñar", true),
    ]),
  ]),
  Group("philosophy", "Filosofía / enfoque", [
    LText("label", "Label"),
    LText("title", "Título"),
    LText("subtitle", "Subtítulo", { textarea: true }),
    Group("points", "Puntos", [
      titledText("accessible", "Accesible"),
      titledText("breath", "Respiración"),
      titledText("levels", "Niveles"),
      titledText("safe", "Espacio seguro"),
    ]),
  ]),
  Group("training", "Formación", [
    LText("label", "Label"),
    LText("title", "Título"),
    LText("subtitle", "Subtítulo", { textarea: true }),
    Group("items", "Ítems", [
      titledText("main", "Principal", true),
      titledText("extra", "Continua", true),
      titledText("retreats", "Retiros", true),
    ]),
  ]),
  Group("values", "Valores", [
    LText("label", "Label"),
    LText("title", "Título"),
    LText("subtitle", "Subtítulo", { textarea: true }),
    Group("items", "Valores", [
      titledText("authenticity", "Autenticidad"),
      titledText("listening", "Escucha"),
      titledText("community", "Comunidad"),
      titledText("awareness", "Consciencia"),
      titledText("accessibility", "Accesibilidad"),
    ]),
  ]),
  Group("offMat", "Fuera del mat", [
    LText("label", "Label"),
    LText("title", "Título"),
    LText("subtitle", "Subtítulo", { textarea: true }),
    Group("items", "Ítems", [
      titledText("barcelona", "Ciudad", true),
      titledText("rituals", "Rituales", true),
      titledText("inspire", "Inspiración", true),
    ]),
  ]),
  Group("cta", "CTA final", [
    LText("label", "Label"),
    LText("title", "Título"),
    LText("subtitle", "Subtítulo", { textarea: true }),
    LText("primary", "Botón principal"),
    LText("whatsapp", "Botón WhatsApp"),
    LText("instagram", "Enlace Instagram"),
    LText("whatsappMessage", "Mensaje WhatsApp", {
      textarea: true,
      description: "Puedes usar {teacherName}.",
    }),
  ]),
];
