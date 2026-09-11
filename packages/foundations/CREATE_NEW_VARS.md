# @repo/foundations

The single source of truth for all design system tokens. Every token definition, type, and validation schema lives here. Both Tailwind (web) and React Native consume these tokens.

## Architecture

```
packages/foundations/src/index.ts          ← EDIT THIS (single source of truth)
    │
    ├──► packages/foundations/src/codegen.js   (auto-generated, never edit)
    │       │
    │       └──► packages/ui-web-tailwind/scripts/generate-theme-css.mjs
    │               │
    │               └──► tailwind-theme.css (auto-generated)
    │
    └──► packages/ui-react-native/src/adapters/rn/applyTheme.ts
            (imports types directly, resolves at runtime)
```

## How to Add a New Token (Step by Step)

This guide walks through adding `activeTabIndicator` to the `components` contract as a concrete example. Follow each step in order.

### Step 1: Pick the right schema type

| Type                  | Shape                                     | Use when                                                 |
| --------------------- | ----------------------------------------- | -------------------------------------------------------- |
| `ColorTokenRefSchema` | `string`                                  | Single color reference (`'bg-primary'`, `'primary_500'`) |
| `ShadowColorSchema`   | `{ light: ColorToken, dark: ColorToken }` | Different color per light/dark mode                      |
| `RadiiRefSchema`      | `{ type: 'radii', value }`                | Border radius reference                                  |
| `z.number()`          | `number`                                  | Raw numeric value                                        |

For `activeTabIndicator`, use `ColorTokenRefSchema` (a single color that's already mode-aware via the semantic token).

### Step 2: Edit `packages/foundations/src/index.ts`

Add to the Zod schema (find `ComponentsPresetSchema` around line 863):

```typescript
const ComponentsPresetSchema = z
	.object({
		buttonBorderRadii: RadiiRefSchema,
		// ... existing properties ...
		appShellBg: ShadowColorSchema,
		activeTabIndicator: ColorTokenRefSchema, // ← ADD HERE
	})
	.strict();
```

That's the only edit needed. The `FLAT_CONTRACT_PROPERTIES.components` array is auto-derived from the schema by the generate script.

### Step 3: Edit theme files

Add the token value to `packages/themes/src/default.ts` (and any other themes).

Find the `contracts.components` object in each theme:

```typescript
contracts: {
	components: {
		// ... existing properties ...
		activeTabIndicator: 'primary_500', // ← ADD (use a raw color token)
	},
},
```

### Step 4: Run the generator

```bash
yarn generate:tokens
```

This single command:

1. Regenerates `codegen.js` from `index.ts`
2. Regenerates `tailwind-theme.css` — **auto-creates the `bg-activeTabIndicator` utility**

That's it. No adapter code changes needed — both Tailwind and React Native resolve the new property automatically via generic contract loops.

### Step 5: Use in components

**Web (Tailwind):**

```tsx
<div className="bg-activeTabIndicator">...</div>
```

**React Native:**

```tsx
const { theme } = useTheme();
<View style={{ backgroundColor: theme.contracts.components.activeTabIndicator }} />;
```

Both are fully type-safe — no string index casts needed.

---

## Quick Reference: What Each Step Affects

| Step | Files changed                    | Auto-generated?                                        |
| ---- | -------------------------------- | ------------------------------------------------------ |
| 2    | `index.ts` (schema)              | `FLAT_CONTRACT_PROPERTIES.components` from schema      |
| 3    | Theme files (`default.ts`, etc.) | —                                                      |
| 4    | Run `yarn generate:tokens`       | `codegen.js` + `tailwind-theme.css` (bridge + utility) |
| 5    | Consumer components              | —                                                      |

## Scripts

| Script             | Command                                             | Purpose                                        |
| ------------------ | --------------------------------------------------- | ---------------------------------------------- |
| `generate:codegen` | `yarn workspace @repo/foundations generate:codegen` | Regenerate `codegen.js` from `index.ts`        |
| `generate:tokens`  | `yarn workspace @repo/foundations generate:tokens`  | Regenerate `codegen.js` + `tailwind-theme.css` |
| `verify:codegen`   | `yarn workspace @repo/foundations verify:codegen`   | CI check: fails if `codegen.js` is out of sync |

## CI Verification

The `verify:codegen` script ensures `codegen.js` stays in sync with `index.ts`. It runs `generate-codegen.mjs` in dry-run mode, diffs the output against the existing `codegen.js`, and fails if they differ.

**If CI fails**: Run `yarn generate:codegen` to fix.

## File Structure

```
packages/foundations/
├── src/
│   ├── index.ts              ← Token definitions, Zod schemas, types
│   └── codegen.js            ← Auto-generated (DO NOT EDIT)
├── scripts/
│   ├── generate-codegen.mjs  ← Extracts arrays from index.ts → codegen.js
│   └── verify-codegen.mjs    ← CI verification script
├── package.json              ← Scripts: generate:codegen, generate:tokens, verify:codegen
└── README.md                 ← This file
```
