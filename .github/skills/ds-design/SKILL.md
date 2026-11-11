---
name: ds-design
description: MANDATORY design language for this repo (Super Charge DS) - palette, Roboto type scale, spacing, radii, shadows, states. Load for ANY UI, component, screen, style, token, or visual work, and when editing foundations or themes.
---

# ds-design: Design Language (MANDATORY)

## The foundation

**`.github/reference/untitledUI/DESIGN.md` is the canonical, mandatory design language for this repo** ("Super Charge DS", extracted from Figma). Everything visual is built on top of it.

- Before any UI/visual/token work, **read that file**: especially the machine-readable `design-tokens` JSON block (section 11), which is the unambiguous token map.
- Nothing visual may be invented outside it. New screens, components, styles, and token changes all start from DESIGN.md.
- Repo mechanics (packages, pipelines, workflows) live in the **`ds-monorepo` skill**: load that separately.

## Identity

A design system using **Roboto** with 336 unique colors. Signature techniques:

- Consistent auto-layout spacing system (4px grid)
- Rounded shape language (**12px+ radii** dominant)
- Layered shadow system for depth

## Quick-reference scales

| Scale                  | Values                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Spacing** (4px grid) | 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 92, 128, 160, 212 (2 and 6 are off-grid artifacts: avoid new uses of 2; 24/40/160 are blessed extensions, see DESIGN.md §5)                                                                                                                                                                                                               |
| **Radius**             | `sm-3` 4px · `sm-2` 6px · `sm` 8px · `md` 12px (primary) · `lg` 20px                                                                                                                                                                                                                                                                                                                   |
| **Shape presets**      | White-label brands pick one: `sharp` 0 everywhere · `soft` 6 (default) · `rounded` pill buttons + 12 inputs/cards · `full` pill buttons/inputs + 12 cards. Applied via `theme.style` → button/input/card buckets                                                                                                                                                                       |
| **Type**               | Roboto; sizes 72/60/48/36/30/24/20/18/16/14/12 × weights 400/500/600/700; line-height is a property of the size step (72→90, 60→72, 48→60, 36→44, 30→38, 24→32, 20→30, 18→28, 16→24, 14→20, 12→18); letter-spacing `-0.02em` on ≥36px, normal below. **Roles (`h1…overline`) are web-only** and live in the web `Typography` component; mobile uses its own `display…caption` variants |
| **Key colors**         | `background` `#ffffff` · `text-primary` `#000000` · `accent` `#0f172a` · `text-tertiary` `#64748b` · `surface` `#e2e8f0` · `danger` `#ef4444` · `warning` `#eab308` · `success` `#22c55e`                                                                                                                                                                                              |

Full palette: see DESIGN.md §3 and the `design-tokens` JSON: **never memorize or guess hexes, look them up**.

In code these live in `@repo/foundations` (`src/tokens` = schema, `src/theme` = default theme + config resolver); typography line-height/letter-spacing are stored per font-size step (`lineHeightPx`, `letterSpacing`).

## States

| State    | Treatment                                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------- |
| Hover    | Lighten/darken accent by 10%                                                                                        |
| Focus    | Layered ring: `4px accent + 2px white inner` (+ shadow layers): see DESIGN.md §6 focus-ring shadows, never flat 3px |
| Disabled | 40% opacity, no pointer events                                                                                      |
| Error    | `danger` color for border and text                                                                                  |

Shadows are **multi-layer** (see DESIGN.md §6: shadow-xs…3xl, focus rings, avatar insets). Never flatten to a single layer.

## Do

- `#ffffff` (`background`) as page background; `#000000` (`text-primary`) for primary text; `#0f172a` (`accent`) as primary accent
- Keep radii consistent: **4, 6, 8, 12, 20px** only
- Use the spacing scale for ALL padding/margins
- Maintain the type-scale hierarchy for visual rhythm

## Don't

- Don't use colors outside the extracted palette (brand colors enter only through the theme config, which derives full ramps from the picked 600 hex)
- Don't mix font families in the default theme (Roboto only): brand fonts come from the theme config (`fonts.body` / `fonts.heading`)
- Don't use arbitrary spacing values outside the scale
- Don't flatten the shadow system to single-layer shadows

## Mapping DESIGN.md → code (mandatory)

- **Never hardcode hex/px values in components.** Promote tokens into the code token system: add to the schema in `@repo/foundations/src/tokens`, values in `@repo/foundations/src/theme/defaultTheme.ts`, run `yarn workspace @repo/foundations generate:tokens` (full workflow in the `ds-monorepo` skill).
- **When DESIGN.md and existing code disagree, DESIGN.md is the design truth**: align the code to it.
- Components read contracts (`actions`/`feedback`/`surfaces`), semantic color tokens, and the shape preset via the platform theme/provider, never raw literals.

## Adding tokens (discipline)

| Situation                              | Action                                                |
| -------------------------------------- | ----------------------------------------------------- |
| Need a tint/shade of an existing color | Reuse + adjust opacity: don't add a new hex           |
| Need a font size between two steps     | Pick the closer existing step: don't fill the gap     |
| Need a one-off spacing value           | Round to the nearest scale value                      |
| Genuinely new semantic role            | Add it to DESIGN.md first (role + note), then to code |
| New component pattern used 3+ times    | Promote it into the component library                 |

- Keep DESIGN.md in the **same PR** as the code that adds/consumes the token: design and code never drift.
- Bump a version header in DESIGN.md when palette/type/spacing scales change (breaking); non-breaking additions are minor.

## New screens

1. Start from the **Identity**: the screen must read as the same product.
2. Reuse **Structure** patterns (containers, gaps, padding rhythm) before inventing new ones.
3. Inherit from the page-types table in DESIGN.md §10 (auth, dashboard, settings, marketing, empty states, emails).
