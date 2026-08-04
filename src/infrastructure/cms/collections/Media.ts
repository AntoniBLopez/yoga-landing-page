import path from "path";
import { fileURLToPath } from "url";
import type { CollectionConfig } from "payload";

import { COLLECTIONS_ADMIN_GROUP } from "../adminGroups";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: COLLECTIONS_ADMIN_GROUP,
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: path.resolve(dirname, "../../../../media"),
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 900, height: 675, position: "centre" },
      { name: "hero", width: 1600, height: 1200, position: "centre" },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      localized: true,
    },
  ],
};
