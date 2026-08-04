import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

import { getSiteContentMessages } from "@/application/use-cases/get-site-content";
import { getSiteSettings } from "@/application/use-cases/get-site-settings";
import type { Locale } from "@/domain/entities";
import { deepMerge } from "@/presentation/lib/deep-merge";
import { injectPlaceholders } from "@/presentation/lib/inject-placeholders";

import { defaultLocale, isAppLocale, LOCALE_COOKIE, type AppLocale } from "./config";

/**
 * Picks the best supported locale from an Accept-Language header,
 * which reflects the user's OS / browser language.
 */
function negotiateLocale(acceptLanguage: string): AppLocale | undefined {
  const candidates = acceptLanguage
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? Number.parseFloat(qParam.split("=")[1]) : 1;
      return { tag: tag.trim().toLowerCase(), q: Number.isNaN(q) ? 0 : q, index };
    })
    .sort((a, b) => b.q - a.q || a.index - b.index);

  for (const { tag } of candidates) {
    const base = tag.split("-")[0];
    if (isAppLocale(base)) return base;
  }
  return undefined;
}

export default getRequestConfig(async () => {
  let locale: AppLocale | undefined;

  // 1. Explicit user preference (language switcher)
  const cookieLocale = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isAppLocale(cookieLocale)) {
    locale = cookieLocale;
  }

  // 2. OS / browser language via Accept-Language
  if (!locale) {
    const acceptLanguage = (await headers()).get("accept-language");
    if (acceptLanguage) locale = negotiateLocale(acceptLanguage);
  }

  // 3. Fallback
  const resolved = locale ?? defaultLocale;

  const baseMessages = (await import(`../../messages/${resolved}.json`)).default;
  const contentLocale = resolved as Locale;

  let messages: Record<string, unknown> = baseMessages as Record<string, unknown>;
  let teacherName = "Cyane";
  let brandName = "Blau Yoga";

  try {
    const [overrides, settings] = await Promise.all([
      getSiteContentMessages(contentLocale),
      getSiteSettings(contentLocale),
    ]);
    teacherName = settings.teacherName || teacherName;
    brandName = settings.brandName || brandName;
    messages = deepMerge(messages, overrides);
  } catch {
    // CMS unavailable — keep file defaults
  }

  messages = injectPlaceholders(messages, { teacherName, brandName });

  return {
    locale: resolved,
    messages,
  };
});
