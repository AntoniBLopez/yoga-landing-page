import type { ReactNode } from "react";

import { Footer } from "@/presentation/components/sections/Footer";
import { Navbar } from "@/presentation/components/sections/Navbar";
import { cn } from "@/presentation/lib/utils";

export function PageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      <Navbar />
      <main className={cn("min-h-screen", className)}>{children}</main>
      <Footer />
    </>
  );
}
