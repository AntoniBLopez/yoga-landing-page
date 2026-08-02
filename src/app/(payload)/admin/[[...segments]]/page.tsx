import type { Metadata } from "next";

import { useStaticContent } from "@/config/content";

import { StaticAdminNotice } from "../StaticAdminNotice";

type Args = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export async function generateMetadata(args: Args): Promise<Metadata> {
  if (useStaticContent()) {
    return { title: "Admin · Blau Yoga (MVP)" };
  }
  const [{ generatePageMetadata }, { default: config }] = await Promise.all([
    import("@payloadcms/next/views"),
    import("@payload-config"),
  ]);
  return generatePageMetadata({ config, params: args.params, searchParams: args.searchParams });
}

export default async function Page(args: Args) {
  if (useStaticContent()) {
    return <StaticAdminNotice />;
  }

  const [{ RootPage }, { default: config }, { importMap }] = await Promise.all([
    import("@payloadcms/next/views"),
    import("@payload-config"),
    import("../importMap.js"),
  ]);

  return RootPage({
    config,
    params: args.params,
    searchParams: args.searchParams,
    importMap,
  });
}
