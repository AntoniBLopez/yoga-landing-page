"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { SiteSettings } from "@/domain/site";

const SiteContext = createContext<SiteSettings | null>(null);

export function SiteProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: ReactNode;
}) {
  return <SiteContext.Provider value={settings}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteSettings {
  const value = useContext(SiteContext);
  if (!value) {
    throw new Error("useSite must be used within SiteProvider");
  }
  return value;
}

/** Safe for components that may render outside provider during tests. */
export function useSiteOptional(): SiteSettings | null {
  return useContext(SiteContext);
}
