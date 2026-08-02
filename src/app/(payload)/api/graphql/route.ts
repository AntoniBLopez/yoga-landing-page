import { useStaticContent } from "@/config/content";

function cmsDisabled() {
  return Response.json(
    { error: "CMS disabled in static MVP mode." },
    { status: 503 },
  );
}

export async function POST(request: Request) {
  if (useStaticContent()) return cmsDisabled();
  const config = (await import("@payload-config")).default;
  const { GRAPHQL_POST } = await import("@payloadcms/next/routes");
  return GRAPHQL_POST(config)(request);
}

export async function OPTIONS(request: Request, context: { params: Promise<Record<string, string | string[]>> }) {
  if (useStaticContent()) return cmsDisabled();
  const config = (await import("@payload-config")).default;
  const { REST_OPTIONS } = await import("@payloadcms/next/routes");
  return REST_OPTIONS(config)(request, context);
}
