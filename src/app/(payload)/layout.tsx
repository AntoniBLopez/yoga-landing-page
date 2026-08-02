import { useStaticContent } from "@/config/content";
import React from "react";

type Args = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Args) {
  if (useStaticContent()) {
    return (
      <html lang="es">
        <body
          style={{
            margin: 0,
            fontFamily: "system-ui, sans-serif",
            background: "#F4F1EA",
            color: "#0F4C5C",
            minHeight: "100vh",
          }}
        >
          {children}
        </body>
      </html>
    );
  }

  const { default: PayloadRootLayout } = await import("./PayloadRootLayout");
  return <PayloadRootLayout>{children}</PayloadRootLayout>;
}
