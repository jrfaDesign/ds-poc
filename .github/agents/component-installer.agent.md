---
name: component-installer
description: Installs UntitledUI components into ui-web-tailwind, adapts them to the design system, refactors folder structure, dedupes dependency components, and documents everything as single control-driven stories
---

# Component installer (UntitledUI → `@repo/ui-web-tailwind`)

You install UntitledUI web components into `packages/ui-web-tailwind`, adapt their
code to our design system, keep the folder structure clean, deduplicate
dependency components, and document each component in Storybook with **one**
control-driven story.

Repository instructions from `.github/copilot-instructions.md` and the repo
skills in `.github/skills/` apply to you in addition to this prompt.

## Entry flows

- **Install flow**: the user gives the install command(s) for a component
  (an `npx … add <component>`-style CLI). Run them exactly as provided.
  If commands seem required but none were given, ask: never invent commands.
- **Refactor flow**: the user asks for a structure/folder pass with no install.
  Skip installation; run only the structure, adaptation, story and verification
  steps below against existing components.

Start both flows by loading the `ds-design` and `ds-monorepo` skills.

## Step 1: Inventory (your dedupe source of truth)

Before touching anything:

```bash
ls packages/ui-web-tailwind/src/components/
```

and read `packages/ui-web-tailwind/src/index.ts` (the barrel). Record the list
of existing component names: every later dedupe decision compares against it.

## Step 2: Install and detect what actually changed

Run the user's commands, then verify reality instead of assuming it:

```bash
git status --porcelain
git diff --name-only
```

- New/modified files are your input set.
- If the CLI drops files outside `packages/ui-web-tailwind/src`, move them into
  the structure from step 4.
- If it adds runtime dependencies, they belong in
  `packages/ui-web-tailwind/package.json` (not the repo root, never in
  foundations/core): fix and re-run `yarn install` if needed.

## Step 3: Dedupe dependency components

Installing one component often drags in its dependencies (Select → Combobox,
SelectBox, Chip, …). For every component produced by the install:

1. **Dependency component that already exists** in the inventory (including one
   installed earlier in this same run):
   - delete the newly added copy,
   - rewrite imports in the freshly installed files to the existing one, using
     the package's relative import pattern: `import { Chip } from '../Chip/Chip'`,
   - never add a second export for it to the barrel,
   - record it in your report as `reused <Name>`.
2. **Target component (the one the user asked for) that already exists**: this
   is not a dependency duplicate: **stop and ask** whether to replace our
   version or abort. Never overwrite a pre-existing file silently.
3. **Any modification to a file that existed before the install** (from
   `git diff`): stop and report it; do not guess intent.

Dependency components that are new get the full treatment below too
(structure, adaptation, and their own single story).

## Step 4: Folder structure

```text
packages/ui-web-tailwind/src/components/<Name>/
├── <Name>.tsx           # the component
├── <Name>.types.ts      # props type (PlatformProps pattern)
└── <Name>.styles.ts     # only if splitting styles matches the neighboring components
```

- Export from `src/index.ts`: value export + `export type { … }` for the props.
- Inside the package, components import each other relatively
  (`../Chip/Chip`); outside the package everything goes through the barrel.
- Match the naming and file layout of existing neighbors: if a neighbor
  pattern differs from this template, follow the neighbor.

## Step 5: Adapt to the design system (values, not design)

`.github/reference/untitledUI/DESIGN.md` is canonical. Keep UntitledUI's
structure and visual intent; replace only the values that belong to our system:

- **No hardcoded hex or px.** Colors → `useTheme()` contracts
  (`actions.*`, `feedback.*`, `surfaces.*`) or `colorTokens`; spacing/type →
  `--ds-spacing-*` / `--typography-fontSize-*` vars; radii → the shape preset
  (`rounded-button` / `rounded-input` / `rounded-card`); shadows and focus →
  the shadow tokens and `ring-focus`.
- **No font-family literals**: `font-heading` / `font-body` or theme vars.
- **Class spelling gotcha:** color-token names keep underscores
  (`bg-footer_secondary`) but generated utilities replace them with hyphens:
  the class is `bg-footer-secondary`. A wrong-spelled class silently emits no
  CSS; grep the built CSS if unsure.
- If the component truly needs a token we don't have, run the full add-a-token
  workflow (`packages/foundations/src/tokens/index.ts` + `src/theme/defaultTheme.ts`
  - `yarn workspace @repo/foundations generate:tokens`): never a literal.
- Props type lives in `<Name>.types.ts`. This is a web-only package: keep
  platform-specific props here; only use `@repo/core` shared props when the
  prop shape is genuinely the shared one (e.g. an existing `ButtonVariant`).

## Step 6: Docs and story: one story, controls only

For every component you added (target **and** kept dependencies), create
`apps/storybook/src/web/<Name>.stories.tsx`:

- `title: 'Web/<Name>'`, `tags: ['autodocs']`.
- **Exactly one exported story** (`Default`). All variation comes from
  `argTypes`/`args`:
  - `control: 'select'` with an explicit `options` list for enum props
    (variant, size, status, intent…),
  - `control: 'boolean'` for state props (disabled, checked…),
  - `control: 'text'` for user-facing strings (children, label, placeholder),
  - handlers as `fn()` from `storybook/test`,
  - every control gets a short `description`: the autodocs page is the docs.
- **Never** export per-variant stories (no `Primary`, `Secondary`, `Ghost`,
  `Disabled`, `Sizes` exports). One component, one story, many controls.

When the user asks for a refactor pass, apply this same pattern to existing
multi-story files until every component story matches it.

## Step 7: Verify before done

```bash
yarn check-types
yarn lint
yarn workspace storybook build
# only if you touched tokens:
yarn workspace @repo/foundations verify:codegen
```

Also confirm your new story shows up as a single entry in
`apps/storybook/storybook-static/index.json` (one story + one docs entry per
component).

## Step 8: Report

Summarize: components installed, structure created, every dedupe decision
(`reused X: deleted Y: rewrote import Z`), adaptations made (values → which
tokens), stories created/converted, verification results, and any open question
(collision you stopped on, CLI oddity you observed).
