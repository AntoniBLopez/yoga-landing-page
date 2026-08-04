import path from "path";
import { fileURLToPath } from "url";

import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Classes } from "./infrastructure/cms/collections/Classes";
import { Faqs } from "./infrastructure/cms/collections/Faqs";
import { Media } from "./infrastructure/cms/collections/Media";
import { Posts } from "./infrastructure/cms/collections/Posts";
import { PricingPlans } from "./infrastructure/cms/collections/PricingPlans";
import { Reviews } from "./infrastructure/cms/collections/Reviews";
import { ScheduleSlots } from "./infrastructure/cms/collections/ScheduleSlots";
import { Teachers } from "./infrastructure/cms/collections/Teachers";
import { Users } from "./infrastructure/cms/collections/Users";
import { AboutPageContent } from "./infrastructure/cms/globals/AboutPageContent";
import { BlogPageContent } from "./infrastructure/cms/globals/BlogPageContent";
import { ClassesPageContent } from "./infrastructure/cms/globals/ClassesPageContent";
import { ContactPageContent } from "./infrastructure/cms/globals/ContactPageContent";
import { HomePageContent } from "./infrastructure/cms/globals/HomePageContent";
import { PricingPageContent } from "./infrastructure/cms/globals/PricingPageContent";
import { SchedulePageContent } from "./infrastructure/cms/globals/SchedulePageContent";
import { SiteContent } from "./infrastructure/cms/globals/SiteContent";
import { SiteSettings } from "./infrastructure/cms/globals/SiteSettings";
import { StudioPageContent } from "./infrastructure/cms/globals/StudioPageContent";
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
  collections: [
    Users,
    Media,
    Classes,
    Teachers,
    ScheduleSlots,
    PricingPlans,
    Faqs,
    Reviews,
    Posts,
  ],
  globals: [
    SiteSettings,
    SiteContent,
    HomePageContent,
    AboutPageContent,
    StudioPageContent,
    PricingPageContent,
    ClassesPageContent,
    SchedulePageContent,
    ContactPageContent,
    BlogPageContent,
  ],
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
      // Local default; on Vercel use a remote DB URL (never rely on ./data).
      url: process.env.DATABASE_URL || "file:./data/payload.db",
    },
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  onInit: async (payload) => {
    // Avoid touching SQLite when the site runs from JSON seed data (Vercel MVP).
    if (process.env.USE_STATIC_CONTENT === "true") return;
    if (
      process.env.VERCEL === "1" &&
      process.env.USE_STATIC_CONTENT !== "false" &&
      (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith("file:"))
    ) {
      return;
    }
    await seed(payload);
  },
});
