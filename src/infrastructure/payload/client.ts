import { useStaticContent } from "@/config/content";
import type { Payload } from "payload";

/**
 * Returns the (cached) Payload local API client.
 * Throws in static-content mode so Vercel MVP never opens SQLite.
 */
export async function getPayloadClient(): Promise<Payload> {
  if (useStaticContent()) {
    throw new Error(
      "Payload CMS is disabled while USE_STATIC_CONTENT is active (MVP without database).",
    );
  }

  const [{ default: config }, { getPayload }] = await Promise.all([
    import("@payload-config"),
    import("payload"),
  ]);

  return getPayload({ config });
}
