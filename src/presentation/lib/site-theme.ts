import type { CSSProperties } from "react";

import type { SiteColors } from "@/domain/site";

export function siteColorStyle(colors: SiteColors): CSSProperties {
  return {
    ["--color-deep" as string]: colors.deep,
    ["--color-deep-dark" as string]: colors.deepDark,
    ["--color-teal" as string]: colors.teal,
    ["--color-teal-dark" as string]: colors.tealDark,
    ["--color-aqua" as string]: colors.aqua,
    ["--color-sky" as string]: colors.sky,
    ["--color-sand" as string]: colors.sand,
    ["--color-linen" as string]: colors.linen,
    ["--color-wood" as string]: colors.wood,
    ["--color-ink" as string]: colors.ink,
  };
}
