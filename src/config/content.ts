/**
 * Content source switch for MVP deploys without a database.
 *
 * - Local / with DB: Payload + SQLite (default)
 * - Vercel MVP: JSON seed files in `src/infrastructure/data`
 *
 * Set `USE_STATIC_CONTENT=true` to force JSON.
 * Set `USE_STATIC_CONTENT=false` to force Payload (requires a working DATABASE_URL).
 * On Vercel, file: SQLite is treated as unavailable → static JSON unless overridden.
 */
export function useStaticContent(): boolean {
  const flag = process.env.USE_STATIC_CONTENT;

  if (flag === "true") return true;
  if (flag === "false") return false;

  if (process.env.VERCEL === "1") {
    const db = process.env.DATABASE_URL ?? "";
    // Remote DBs (Turso/libsql https, postgres, etc.) → Payload
    if (db && !db.startsWith("file:")) return false;
    return true;
  }

  return false;
}
