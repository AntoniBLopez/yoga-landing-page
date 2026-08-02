import { cn } from "@/presentation/lib/utils";

import { FadeIn } from "./FadeIn";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className,
}: SectionHeadingProps) {
  return (
    <FadeIn
      className={cn(
        "mb-12 max-w-2xl md:mb-16",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      <p
        className={cn(
          "mb-3 text-xs font-medium uppercase tracking-[0.3em]",
          tone === "light" ? "text-teal" : "text-aqua",
        )}
      >
        {label}
      </p>
      <h2
        className={cn(
          "font-display text-4xl leading-tight font-medium md:text-5xl",
          tone === "light" ? "text-deep" : "text-sand",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={cn("mt-4 text-base", tone === "light" ? "text-ink" : "text-sky")}>
          {subtitle}
        </p>
      ) : null}
    </FadeIn>
  );
}
