import config from "@payload-config";
import { getPayload, type Payload } from "payload";

/**
 * Returns the (cached) Payload local API client.
 */
export function getPayloadClient(): Promise<Payload> {
  return getPayload({ config });
}
