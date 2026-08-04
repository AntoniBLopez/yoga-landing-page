import type { GlobalConfig } from "payload";

import { PAGES_ADMIN_GROUP } from "../adminGroups";

type PageGlobalInput = Omit<GlobalConfig, "admin" | "access"> & {
  admin?: Omit<NonNullable<GlobalConfig["admin"]>, "group">;
};

/** Page config globals → admin group «Páginas». */
export function pageGlobal(config: PageGlobalInput): GlobalConfig {
  return {
    ...config,
    access: {
      read: () => true,
    },
    admin: {
      ...config.admin,
      group: PAGES_ADMIN_GROUP,
    },
  };
}
