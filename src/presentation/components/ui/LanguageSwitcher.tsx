"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { setUserLocale } from "@/i18n/actions";
import { locales, type AppLocale } from "@/i18n/config";
import { cn } from "@/presentation/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  tone?: "light" | "dark";
}

export function LanguageSwitcher({ className, tone = "light" }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: AppLocale) {
    if (next === locale) return;
    startTransition(async () => {
      await setUserLocale(next);
      router.refresh();
    });
  }

  return (
    <span
      className={cn(
        "flex items-center gap-1 text-xs font-medium uppercase tracking-[0.15em]",
        isPending && "opacity-50",
        className,
      )}
    >
      {locales.map((l, index) => (
        <span key={l} className="flex items-center gap-1">
          {index > 0 && (
            <span className={tone === "dark" ? "text-aqua/70" : "text-aqua"}>/</span>
          )}
          <button
            type="button"
            onClick={() => switchTo(l)}
            className={cn(
              "cursor-pointer p-1 transition-colors",
              l === locale
                ? tone === "dark"
                  ? "text-sand underline underline-offset-4"
                  : "text-deep underline underline-offset-4"
                : tone === "dark"
                  ? "text-sky/70 hover:text-aqua"
                  : "text-ink/60 hover:text-teal",
            )}
            aria-current={l === locale ? "true" : undefined}
          >
            {l}
          </button>
        </span>
      ))}
    </span>
  );
}
