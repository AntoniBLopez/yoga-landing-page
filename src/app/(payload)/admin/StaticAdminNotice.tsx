export function StaticAdminNotice() {
  return (
    <main style={{ maxWidth: 520, margin: "4rem auto", padding: "0 1.25rem", lineHeight: 1.5 }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 600 }}>CMS desactivado</h1>
      <p>
        Este deploy es un MVP sin base de datos. El contenido (clases, horarios, blog, etc.) se
        sirve desde los JSON de <code>src/infrastructure/data</code>.
      </p>
      <p>
        Cuando configures una base remota en producción, desactiva <code>USE_STATIC_CONTENT</code>{" "}
        y el panel <code>/admin</code> volverá a estar disponible.
      </p>
      <p>
        <a href="/" style={{ color: "#2FA7A6" }}>
          ← Volver a la web
        </a>
      </p>
    </main>
  );
}
