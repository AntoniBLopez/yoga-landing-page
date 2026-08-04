import type {
  FooterNavKey,
  FooterSocialKey,
  SiteHeaderNavVisibility,
  SitePageVisibility,
  SiteSettings,
} from "@/domain/site";

type PageKey = keyof SitePageVisibility;
type HeaderNavKey = keyof SiteHeaderNavVisibility;

function isOrderedVisible(
  items: SiteSettings["footerNav"] | undefined,
  key: string,
): boolean {
  const item = items?.find((entry) => entry.id === key);
  if (!item) return true;
  return item.visible !== false;
}

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
  return isOrderedVisible(site.footerNav, navKey);
}

export function isFooterSocialVisible(
  site: SiteSettings,
  socialKey: FooterSocialKey,
): boolean {
  return isOrderedVisible(site.footerSocial, socialKey);
}
