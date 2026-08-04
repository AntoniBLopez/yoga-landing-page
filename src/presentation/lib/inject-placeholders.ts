/**
 * Recursively replaces `{key}` placeholders in string leaves of a messages tree.
 * Does not touch non-string values (numbers, booleans, arrays of non-strings).
 */
export function injectPlaceholders<T>(
  value: T,
  vars: Record<string, string>,
): T {
  if (typeof value === "string") {
    let result: string = value;
    for (const [key, replacement] of Object.entries(vars)) {
      if (!replacement) continue;
      result = result.split(`{${key}}`).join(replacement);
    }
    return result as unknown as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => injectPlaceholders(item, vars)) as T;
  }

  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value)) {
      out[key] = injectPlaceholders(nested, vars);
    }
    return out as T;
  }

  return value;
}

export function injectSitePlaceholders(
  value: string,
  vars: { teacherName: string; brandName: string },
): string {
  return injectPlaceholders(value, vars);
}
