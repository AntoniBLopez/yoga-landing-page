"use client";

import { TextInput, useField } from "@payloadcms/ui";
import type { TextFieldClientComponent } from "payload";
import type { ChangeEvent } from "react";

function toColorInputValue(value: string | null | undefined): string {
  if (!value) return "#000000";
  const trimmed = value.trim();
  if (/^#[0-9A-Fa-f]{6}$/.test(trimmed)) return trimmed;
  if (/^#[0-9A-Fa-f]{3}$/.test(trimmed)) {
    const [, r, g, b] = trimmed;
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return "#000000";
}

export const ColorHexField: TextFieldClientComponent = ({
  field,
  path: pathFromProps,
  readOnly,
}) => {
  const {
    admin: { description, placeholder } = {},
    label,
    localized,
    required,
  } = field;

  const { disabled, path, setValue, showError, value } = useField<string>({
    potentiallyStalePath: pathFromProps,
  });

  const isReadOnly = Boolean(readOnly || disabled);
  const colorValue = toColorInputValue(value);

  return (
    <TextInput
      AfterInput={
        <input
          type="color"
          value={colorValue}
          disabled={isReadOnly}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value.toUpperCase());
          }}
          aria-label="Vista previa y selector de color"
          title="Vista previa / elegir color"
          style={{
            display: "block",
            width: "2.5rem",
            height: "2.5rem",
            marginTop: "0.5rem",
            padding: 0,
            border: "1px solid var(--theme-elevation-250)",
            borderRadius: "4px",
            background: "transparent",
            cursor: isReadOnly ? "default" : "pointer",
          }}
        />
      }
      description={typeof description === "string" ? description : undefined}
      label={label}
      localized={localized}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      }}
      path={path}
      placeholder={placeholder}
      readOnly={isReadOnly}
      required={required}
      showError={showError}
      value={value ?? ""}
    />
  );
};
