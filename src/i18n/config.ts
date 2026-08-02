export const locales = ["es", "en"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "es";

export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isAppLocale(value: unknown): value is AppLocale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
