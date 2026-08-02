import type { Media } from "@/payload-types";

/**
 * Normalizes Payload Media URLs for next/image.
 * Prefers same-origin relative paths when the host matches this app.
 */
function toImageSrc(url: string): string {
  if (url.startsWith("/")) return url;
  try {
    const parsed = new URL(url);
    if (
      parsed.hostname === "localhost" ||
      parsed.hostname === "127.0.0.1" ||
      (typeof process !== "undefined" &&
        process.env.NEXT_PUBLIC_SERVER_URL &&
        parsed.origin === new URL(process.env.NEXT_PUBLIC_SERVER_URL).origin)
    ) {
      return `${parsed.pathname}${parsed.search}`;
    }
  } catch {
    // keep original if not a valid absolute URL
  }
  return url;
}

/**
 * Resolves the display image of a document: prefers an uploaded
 * Media file and falls back to an external URL.
 */
export function resolveImageUrl(
  upload: number | Media | null | undefined,
  externalUrl: string | null | undefined,
): string {
  if (upload && typeof upload === "object" && upload.url) {
    return toImageSrc(upload.sizes?.card?.url ?? upload.url);
  }
  return externalUrl ? toImageSrc(externalUrl) : "";
}
