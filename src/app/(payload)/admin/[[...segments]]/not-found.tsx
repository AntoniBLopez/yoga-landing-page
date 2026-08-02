import type { Metadata } from "next";

import { useStaticContent } from "@/config/content";

type Args = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export async function generateMetadata(args: Args): Promise<Metadata> {
  if (useStaticContent()) return { title: "No encontrado" };
  const { generatePageMetadata } = await import("@payloadcms/next/views");
  const config = (await import("@payload-config")).default;
  return generatePageMetadata({ config, params: args.params, searchParams: args.searchParams });
}

export default async function NotFound(args: Args) {
  if (useStaticContent()) {
    return (
      <main style={{ padding: "3rem 1.25rem", fontFamily: "system-ui, sans-serif" }}>
        <p>Página no encontrada.</p>
        <a href="/">Volver</a>
      </main>
    );
  }

  const { NotFoundPage } = await import("@payloadcms/next/views");
  const config = (await import("@payload-config")).default;
  const { importMap } = await import("../importMap.js");
  return NotFoundPage({
    config,
    params: args.params,
    searchParams: args.searchParams,
    importMap,
  });
}
