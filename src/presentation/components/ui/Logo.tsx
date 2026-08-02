import { cn } from "@/presentation/lib/utils";

interface LogoProps {
  tagline?: string;
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Blau Yoga brand mark: head (dot) + arms (arc) + horizontal ∞.
 */
export function Logo({ tagline, tone = "light", className }: LogoProps) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 40 42"
        className={cn("h-10 w-8 shrink-0", tone === "light" ? "text-deep" : "text-sand")}
        aria-hidden="true"
        fill="none"
      >
        {/* head */}
        <circle cx="20" cy="5.5" r="3.2" fill="currentColor" />

        {/* arms — open bowl under the head */}
        <path
          d="M8.5 13c3 8 20 8 23 0"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/*
          Continuous monoline ∞ (single pen stroke through both lobes).
          Placed tight under the arms — no transform that clips out of viewBox.
        */}
        <path
          d="M9 30
             C9 24.5 14.5 24.5 20 30
             C25.5 35.5 31 35.5 31 30
             C31 24.5 25.5 24.5 20 30
             C14.5 35.5 9 35.5 9 30"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="flex flex-col">
        <span
          className={cn(
            "font-display text-xl leading-none font-semibold tracking-[0.32em]",
            tone === "light" ? "text-deep" : "text-sand",
          )}
        >
          BLAU YOGA
        </span>
        {tagline ? (
          <span
            className={cn(
              "mt-1.5 text-[9px] uppercase tracking-[0.28em]",
              tone === "light" ? "text-teal" : "text-aqua",
            )}
          >
            {tagline}
          </span>
        ) : null}
      </span>
    </span>
  );
}
