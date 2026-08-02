import { useStaticContent } from "@/config/content";

export async function GET(request: Request) {
  if (useStaticContent()) {
    return Response.json({ error: "CMS disabled in static MVP mode." }, { status: 503 });
  }
  const config = (await import("@payload-config")).default;
  const { GRAPHQL_PLAYGROUND_GET } = await import("@payloadcms/next/routes");
  return GRAPHQL_PLAYGROUND_GET(config)(request);
}
