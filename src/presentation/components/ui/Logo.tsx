"use client";

import Image from "next/image";

import { useSiteOptional } from "@/presentation/components/providers/SiteProvider";
import { cn } from "@/presentation/lib/utils";

interface LogoProps {
  tagline?: string;
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Blau Yoga brand mark: custom image, or head (dot) + arms (arc) + horizontal ∞.
 */
export function Logo({ tagline, tone = "light", className }: LogoProps) {
  const site = useSiteOptional();
  const logoText = site?.logoText || "BLAU YOGA";
  const showMark = site?.showLogoMark ?? true;
  const showText = site?.showLogoText ?? true;
  const showTagline = site?.showTagline ?? Boolean(tagline);
  const resolvedTagline = showTagline ? (tagline ?? site?.tagline) : undefined;
  const customLogo = site?.logoUrl;

  return (
    <span className={cn("flex items-center gap-3", className)}>
      {showMark ? (
        customLogo ? (
          <span className="relative h-10 w-10 shrink-0 overflow-hidden">
            <Image
              src={customLogo}
              alt=""
              fill
              sizes="40px"
              className="object-contain"
              aria-hidden
            />
          </span>
        ) : (
          <svg
            viewBox="0 0 40 42"
            className={cn("h-10 w-8 shrink-0", tone === "light" ? "text-deep" : "text-sand")}
            aria-hidden="true"
            fill="none"
          >
            <circle cx="20" cy="5.5" r="3.2" fill="currentColor" />
            <path
              d="M8.5 13c3 8 20 8 23 0"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
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
        )
      ) : null}
      {showText || resolvedTagline ? (
        <span className="flex flex-col">
          {showText ? (
            <span
              className={cn(
                "font-display text-xl leading-none font-semibold tracking-[0.32em]",
                tone === "light" ? "text-deep" : "text-sand",
              )}
            >
              {logoText}
            </span>
          ) : null}
          {resolvedTagline ? (
            <span
              className={cn(
                "mt-1.5 text-[9px] uppercase tracking-[0.28em]",
                tone === "light" ? "text-teal" : "text-aqua",
              )}
            >
              {resolvedTagline}
            </span>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}
