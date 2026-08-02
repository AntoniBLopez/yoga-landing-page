import path from "path";
import { fileURLToPath } from "url";

import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Classes } from "./infrastructure/cms/collections/Classes";
import { Media } from "./infrastructure/cms/collections/Media";
import { Posts } from "./infrastructure/cms/collections/Posts";
import { PricingPlans } from "./infrastructure/cms/collections/PricingPlans";
import { Reviews } from "./infrastructure/cms/collections/Reviews";
import { ScheduleSlots } from "./infrastructure/cms/collections/ScheduleSlots";
import { Teachers } from "./infrastructure/cms/collections/Teachers";
import { Users } from "./infrastructure/cms/collections/Users";
import { seed } from "./infrastructure/cms/seed";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: "· Blau Yoga",
    },
  },
  collections: [Users, Media, Classes, Teachers, ScheduleSlots, PricingPlans, Reviews, Posts],
  editor: lexicalEditor(),
  localization: {
    locales: [
      { label: "Español", code: "es" },
      { label: "English", code: "en" },
    ],
    defaultLocale: "es",
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET || "insecure-dev-secret",
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || "file:./data/payload.db",
    },
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  onInit: seed,
});
