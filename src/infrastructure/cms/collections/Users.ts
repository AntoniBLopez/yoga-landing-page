import type { CollectionConfig } from "payload";

import { COLLECTIONS_ADMIN_GROUP } from "../adminGroups";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    group: COLLECTIONS_ADMIN_GROUP,
    useAsTitle: "email",
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
  ],
};
