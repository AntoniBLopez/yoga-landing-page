import type {
  SiteFooterNavVisibility,
  SiteFooterSocialVisibility,
  SiteHeaderNavVisibility,
  SitePageVisibility,
  SiteSettings,
} from "@/domain/site";

type PageKey = keyof SitePageVisibility;
type HeaderNavKey = keyof SiteHeaderNavVisibility;
type FooterNavKey = keyof SiteFooterNavVisibility;
type FooterSocialKey = keyof SiteFooterSocialVisibility;

/** Page must be enabled to be linked; nav toggle then decides if it appears. */
export function isHeaderNavVisible(
  site: SiteSettings,
  navKey: HeaderNavKey,
  pageKey: PageKey | null = null,
): boolean {
  if (pageKey && !site.pages[pageKey]) return false;
  return site.headerNav[navKey] !== false;
}

export function isFooterNavVisible(
  site: SiteSettings,
  navKey: FooterNavKey,
  pageKey: PageKey,
): boolean {
  if (!site.pages[pageKey]) return false;
  return site.footerNav[navKey] !== false;
}

export function isFooterSocialVisible(
  site: SiteSettings,
  socialKey: FooterSocialKey,
): boolean {
  return site.footerSocial[socialKey] !== false;
}
