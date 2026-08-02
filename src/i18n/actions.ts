"use server";

import { cookies } from "next/headers";

import { isAppLocale, LOCALE_COOKIE } from "./config";

export async function setUserLocale(locale: string): Promise<void> {
  if (!isAppLocale(locale)) return;
  (await cookies()).set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
