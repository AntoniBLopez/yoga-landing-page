"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Button } from "@/presentation/components/ui/Button";
import { LanguageSwitcher } from "@/presentation/components/ui/LanguageSwitcher";
import { Logo } from "@/presentation/components/ui/Logo";
import { cn } from "@/presentation/lib/utils";

const NAV_ITEMS = [
  { key: "home", href: "/#inicio" },
  { key: "classes", href: "/#clases" },
  { key: "schedule", href: "/#horarios" },
  { key: "about", href: "/#sobre-mi" },
  { key: "blog", href: "/blog" },
  { key: "pricing", href: "/#precios" },
  { key: "contact", href: "/#contacto" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-sand/95 shadow-sm shadow-deep/5 backdrop-blur"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="/#inicio" aria-label="Blau Yoga">
          <Logo tagline={tFooter("tagline")} tone="light" />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-xs font-medium uppercase tracking-[0.15em] text-deep transition-colors hover:text-teal"
            >
              {t(item.key)}
            </a>
          ))}
          <LanguageSwitcher tone="light" />
          <Button asChild size="sm" variant="primary">
            <a href="/#horarios">{t("cta")}</a>
          </Button>
        </nav>

        <button
          type="button"
          className="cursor-pointer p-2 text-deep lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <nav className="flex flex-col gap-1 border-t border-linen bg-sand px-5 pt-2 pb-6 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm font-medium uppercase tracking-[0.15em] text-deep transition-colors hover:text-teal"
            >
              {t(item.key)}
            </a>
          ))}
          <div className="mt-3 flex items-center justify-between">
            <LanguageSwitcher />
            <Button asChild size="sm" variant="primary">
              <a href="/#horarios" onClick={() => setOpen(false)}>
                {t("cta")}
              </a>
            </Button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
