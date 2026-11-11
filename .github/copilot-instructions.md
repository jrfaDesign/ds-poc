# ds-poc2: Design System Monorepo

White-label design system: tokens and themes are defined once in TypeScript (`@repo/foundations`, `@repo/core`) and consumed by platform adapters (`@repo/ui-web-tailwind`, `@repo/ui-react-native`). Turborepo + Yarn 4, apps under `apps/*`, packages under `packages/*`.

## Always in effect

- **MANDATORY design foundation:** `.github/reference/untitledUI/DESIGN.md` is the canonical design language (palette, Roboto type scale, spacing, radii, shadows, states). Any UI, component, screen, style, or token work MUST start from it: never invent colors, spacing, radii, or type values outside its scales, and never hardcode hex/px in components (promote tokens through `@repo/foundations` instead). When DESIGN.md and code disagree, DESIGN.md wins.
- **No em dashes:** never use the em dash character in code, comments, JSDoc, story descriptions, or documentation. Use `:` for definitions and labels, `-` for a light separator, or restructure into two sentences. Tables hold only short scannable cells.
- **Verification before done:** `yarn check-types` and `yarn lint`; after schema/theme edits also `yarn workspace @repo/foundations generate:tokens` and `verify:codegen`.

## Skills

Detailed guidance lives in the repository skills under `.github/skills/` (each is a `SKILL.md` folder). Load the relevant one when the task matches:

- `ds-design`: condensed design-language rules. Use for any visual, UI, component, screen, style, or token work, and when editing foundations or themes.
- `ds-monorepo`: repo architecture, package map, workflows, dos and don'ts. Use for any coding task in this repository.
- `storybook-mdx`: Storybook documentation style guide. Use before creating or editing any `apps/storybook/src/**/*.mdx` file.
