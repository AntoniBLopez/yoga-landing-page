"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import type { SiteHeaderNavVisibility, SitePageVisibility } from "@/domain/site";
import { useSite } from "@/presentation/components/providers/SiteProvider";
import { Button } from "@/presentation/components/ui/Button";
import { LanguageSwitcher } from "@/presentation/components/ui/LanguageSwitcher";
import { Logo } from "@/presentation/components/ui/Logo";
import { isHeaderNavVisible } from "@/presentation/lib/nav-visibility";
import { cn } from "@/presentation/lib/utils";

type HeaderLink = {
  key: keyof SiteHeaderNavVisibility;
  href: string;
  page: keyof SitePageVisibility | null;
};

const NAV_ITEMS: HeaderLink[] = [
  { key: "home", href: "/", page: null },
  { key: "classes", href: "/clases", page: "classes" },
  { key: "schedule", href: "/horarios", page: "schedule" },
  { key: "studio", href: "/estudio", page: "studio" },
  { key: "about", href: "/sobre-mi", page: "about" },
  { key: "blog", href: "/blog", page: "blog" },
  { key: "pricing", href: "/precios", page: "pricing" },
  { key: "contact", href: "/contacto", page: "contact" },
];

export function Navbar() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const site = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const items = NAV_ITEMS.filter((item) =>
    isHeaderNavVisible(site, item.key, item.page),
  );
  const showCta = isHeaderNavVisible(site, "cta");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (headerRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const scheduleHref = site.pages.schedule ? "/horarios" : "/contacto";

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Cerrar menú"
          className="fixed inset-0 z-40 cursor-default bg-deep/10 lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || open
            ? "bg-sand/95 shadow-sm shadow-deep/5 backdrop-blur"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="/" aria-label={site.brandName}>
            <Logo tagline={tFooter("tagline")} tone="light" />
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {items.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-xs font-medium uppercase tracking-[0.15em] text-deep transition-colors hover:text-teal"
              >
                {t(item.key)}
              </a>
            ))}
            <LanguageSwitcher tone="light" />
            {showCta ? (
              <Button asChild size="sm" variant="primary">
                <a href={scheduleHref}>{t("cta")}</a>
              </Button>
            ) : null}
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
            {items.map((item) => (
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
              {showCta ? (
                <Button asChild size="sm" variant="primary">
                  <a href={scheduleHref} onClick={() => setOpen(false)}>
                    {t("cta")}
                  </a>
                </Button>
              ) : null}
            </div>
          </nav>
        ) : null}
      </header>
    </>
  );
}
