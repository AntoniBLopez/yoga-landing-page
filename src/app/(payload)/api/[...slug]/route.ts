import { useStaticContent } from "@/config/content";

function cmsDisabled() {
  return Response.json(
    { error: "CMS disabled in static MVP mode. Set a remote DATABASE_URL and USE_STATIC_CONTENT=false." },
    { status: 503 },
  );
}

type RouteContext = { params: Promise<{ slug?: string[] }> };

async function handlers() {
  const config = (await import("@payload-config")).default;
  const routes = await import("@payloadcms/next/routes");
  return { config, routes };
}

export async function GET(request: Request, context: RouteContext) {
  if (useStaticContent()) return cmsDisabled();
  const { config, routes } = await handlers();
  return routes.REST_GET(config)(request, context);
}

export async function POST(request: Request, context: RouteContext) {
  if (useStaticContent()) return cmsDisabled();
  const { config, routes } = await handlers();
  return routes.REST_POST(config)(request, context);
}

export async function DELETE(request: Request, context: RouteContext) {
  if (useStaticContent()) return cmsDisabled();
  const { config, routes } = await handlers();
  return routes.REST_DELETE(config)(request, context);
}

export async function PATCH(request: Request, context: RouteContext) {
  if (useStaticContent()) return cmsDisabled();
  const { config, routes } = await handlers();
  return routes.REST_PATCH(config)(request, context);
}

export async function PUT(request: Request, context: RouteContext) {
  if (useStaticContent()) return cmsDisabled();
  const { config, routes } = await handlers();
  return routes.REST_PUT(config)(request, context);
}

export async function OPTIONS(request: Request, context: RouteContext) {
  if (useStaticContent()) return cmsDisabled();
  const { config, routes } = await handlers();
  return routes.REST_OPTIONS(config)(request, context);
}
