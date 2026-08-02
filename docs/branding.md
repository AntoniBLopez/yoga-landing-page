# Blau Yoga — Brand Guide

Brand identity for **Blau Yoga** (estudio de yoga y bienestar) and the **Cyane** yoga studio landing. Inspired by the calm of the sea, Mediterranean light, and nature.

Source of truth: `docs/branding.jpeg` (palette board) + CSS tokens in `src/app/globals.css`.

---

## Brand context

| | |
|---|---|
| **Brand** | Blau Yoga |
| **Tagline** | Estudio de Yoga y Bienestar |
| **Product** | Landing for Cyane’s yoga studio — classes, schedule, pricing, contact |
| **Tone** | Calm, connection, balance, well-being, naturalness, presence |

---

## Color palette

Extracted from the brand board. Hex values match project tokens (case-normalized in CSS).

| Name (board) | Hex | CSS variable | Tailwind token | Role |
|---|---|---|---|---|
| Azul profundo | `#0F4C5C` | `--color-deep` | `deep` | Primary brand, headings, primary CTAs, logo |
| — | `#0A3A47` | `--color-deep-dark` | `deep-dark` | Hover / pressed deep |
| Azul turquesa | `#2FA7A6` | `--color-teal` | `teal` | Accent, labels, secondary CTAs, links |
| — | `#248F8E` | `--color-teal-dark` | `teal-dark` | Hover / pressed teal |
| Agua clara | `#A8D5D1` | `--color-aqua` | `aqua` | Soft accent, selection, light borders |
| Azul cielo | `#DCEEF0` | `--color-sky` | `sky` | Airy section washes, subtle surfaces |
| Arena clara | `#F4F1EA` | `--color-sand` | `sand` | Default page background |
| Lino | `#E6DED1` | `--color-linen` | `linen` | Dividers, soft structure, secondary surfaces |
| Madera clara | `#D7C2A4` | `--color-wood` | `wood` | Warm accent (sparingly) |
| — | `#35565F` | `--color-ink` | `ink` | Body text |

### Combinaciones (from the board)

Prefer light bases with deep/teal accents:

- **Sand or linen** as page/section backgrounds
- **Deep** for display type and primary actions
- **Teal** for labels, text links, and secondary emphasis
- **Sky / aqua** for soft washes and quiet structure — not loud fills
- **Wood** only as a warm touch (never dominant UI chrome)

---

## Typography

Defined in `src/app/(frontend)/layout.tsx` and wired in `@theme`:

| Role | Family | CSS | Usage |
|---|---|---|---|
| Display | **Cormorant Garamond** | `--font-display` / `font-display` | Brand name energy, section titles, time displays, editorial headings |
| Sans | **Jost** | `--font-sans` / `font-sans` | Body, UI, nav, labels, CTAs |

### Hierarchy patterns (existing site)

- **Section label:** Jost, xs, uppercase, wide tracking (`~0.3em`), teal
- **Section title:** Cormorant, ~4xl–5xl, medium weight, deep
- **Body:** Jost, base/sm, ink (often `ink/70`–`ink/90` for secondary)
- **Brand wordmark:** Display serif, generous letter-spacing; subtitle in spaced sans caps

Avoid default stacks (Inter, Roboto, Arial, system) for brand surfaces.

---

## Design principles

Aligned with the brand board and the project’s frontend design rules:

1. **Minimalist & modern** — airy layouts, generous whitespace, quiet UI chrome.
2. **One composition / one job** — each section has one purpose, one headline, one short supporting line.
3. **Brand first** — on hero/promotional surfaces, the brand is a hero-level signal; Mediterranean calm over generic wellness templates.
4. **Real atmosphere** — sea, light, olive, studio, natural materials; not abstract purple gradients.
5. **Cards only when needed** — default to lists, timelines, and open layouts. No card grids in the hero; avoid cards if border/shadow/radius don’t aid interaction.
6. **Reduce clutter** — no pill clusters, stat strips, icon rows, boxed promos, or competing text blocks in the first viewport.
7. **Motion with presence** — use intentional fade/slide (`FadeIn`) for hierarchy, not noise (typically 2–3 purposeful motions per visual section).
8. **Avoid AI-default looks** — no purple-on-white / indigo gradients, no terracotta-on-cream cliché as the system, no broadsheet hairline-newspaper density, no glow stacks or emoji decoration.

Brand keywords from the board: **Calma · Conexión · Equilibrio · Bienestar · Naturalidad · Presencia**.

---

## Usage notes

### Backgrounds

- Default body: `sand` (`--color-sand`)
- Alternate sections with `white`, soft `sky`, or quiet `linen` — keep rhythm light
- Prefer full-bleed imagery where the composition calls for it (hero / studio), not inset media cards

### Text

- Headings → `deep`
- Body → `ink` (muted with opacity when secondary)
- Eyebrow / label → `teal`
- On deep panels → `sand` / `sky` / `aqua` for contrast (`SectionHeading` `tone="dark"`)

### Accents & structure

- Hairlines and soft structure → `linen` or very light `aqua`
- Selection highlight → `aqua` background, `deep` text (see `globals.css`)
- Icons → outline style, `deep` or `teal`, light stroke

### CTAs

- **Primary:** solid `deep` → hover `deep-dark`, light text (`sand` / white)
- **Secondary / text:** `teal` → hover `teal-dark`, often with a subtle arrow motion
- Prefer refined text links or simple buttons over heavy pill clusters

### Imagery mood (from board)

Coastal water and sand, olive light and shadow, sunlit practice, clean studio props — natural light, soft contrast, Mediterranean warmth.

---

## Implementation reference

```css
/* src/app/globals.css — @theme */
--color-deep: #0f4c5c;
--color-deep-dark: #0a3a47;
--color-teal: #2fa7a6;
--color-teal-dark: #248f8e;
--color-aqua: #a8d5d1;
--color-sky: #dceef0;
--color-sand: #f4f1ea;
--color-linen: #e6ded1;
--color-wood: #d7c2a4;
--color-ink: #35565f;
--font-sans: var(--font-jost), …;
--font-display: var(--font-cormorant), …;
```

Do not invent a conflicting palette. Extend only with tints/opacities of these tokens when needed.
