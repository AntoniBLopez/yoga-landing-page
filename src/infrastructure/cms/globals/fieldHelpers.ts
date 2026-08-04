import type { Field } from "payload";

export function LText(
  name: string,
  label: string,
  options?: { required?: boolean; textarea?: boolean; description?: string },
): Field {
  if (options?.textarea) {
    return {
      name,
      type: "textarea",
      label,
      localized: true,
      required: options.required,
      admin: options.description ? { description: options.description } : undefined,
    };
  }

  return {
    name,
    type: "text",
    label,
    localized: true,
    required: options?.required,
    admin: options?.description ? { description: options.description } : undefined,
  };
}

export function ColorField(name: string, label: string, defaultValue: string): Field {
  return {
    name,
    type: "text",
    label,
    required: true,
    defaultValue,
    admin: {
      description: "Color HEX, p. ej. #0F4C5C. El cuadrado muestra la vista previa y permite elegir el color.",
      components: {
        Field: "/infrastructure/cms/admin/ColorHexField#ColorHexField",
      },
    },
  };
}

export function Toggle(
  name: string,
  label: string,
  defaultValue = true,
  description?: string,
): Field {
  return {
    name,
    type: "checkbox",
    label,
    defaultValue,
    admin: description ? { description } : undefined,
  };
}

export function Group(name: string, label: string, fields: Field[]): Field {
  return {
    name,
    type: "group",
    label,
    fields,
  };
}
