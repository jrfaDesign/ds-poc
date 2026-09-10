// Generates `src/adapters/tailwind/tailwind-theme.css` from the canonical
// foundation token-name lists and contract structure metadata.
//
// The @theme block makes Tailwind v4 generate utilities that reference
// the runtime CSS variables written by `applyTheme`.
// The @utility blocks create clean aliases for semantic color tokens,
// contract tokens, and typography presets.
//
// Re-run after a token-name change in @repo/foundations:
//   yarn workspace @repo/ui-web-tailwind generate:theme-css

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// --- import canonical token lists from @repo/foundations ---
import {
	textColorKeys,
	borderColorKeys,
	fgColorKeys,
	bgColorKeys,
	utilityColorKeys,
	spacingKeys,
	radiiKeys,
	widthKeys,
	layoutKeys,
	fontSizeKeys,
	fontWeightKeys,
	lineHeightKeys,
	letterSpacingKeys,
	fontFamilyKeys,
	shadowKeys,
	typographyContractKeys,
	breakpoints,
	CONTRACT_STRUCTURE,
	CONTRACT_PREFIX,
	CONTRACT_VARIANTS,
	NESTED_CONTRACT_PROPERTIES,
	FLAT_CONTRACT_PROPERTIES,
} from '@repo/foundations/codegen';

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- helpers ---

/** camelCase -> kebab-case (e.g. bgHover -> bg-hover). */
const toKebab = (s) => s.replace(/([A-Z])/g, '-$1').toLowerCase();

/** replace underscores with hyphens so Tailwind utility names stay clean. */
const toHyphen = (s) => s.replaceAll('_', '-');

const semanticColorKeys = [
	...textColorKeys,
	...borderColorKeys,
	...fgColorKeys,
	...bgColorKeys,
	...utilityColorKeys,
];

// --- emit ---

const lines = [];

// --- @layer base ---
lines.push('@layer base {');
lines.push('  :root { color-scheme: light; }');
lines.push('  :root.dark { color-scheme: dark; }');
lines.push('  body { margin: 0; font-family: var(--typography-fontFamilies-body); }');
lines.push("  /* Input placeholder colors — inherit status color from the input's inline color */");
lines.push('  input::placeholder,');
lines.push('  textarea::placeholder {');
lines.push('    color: inherit;');
lines.push('    opacity: 0.5;');
lines.push('  }');

// --- Contract bridge variables ---
// Always emitted so inline styles resolve at runtime.
lines.push('');
lines.push('  /*');
lines.push('   * Contract bridge variables — always emitted so inline styles resolve at');
lines.push('   * runtime.  Tailwind v4 @theme inline only emits variables that are');
lines.push('   * referenced by a generated utility class; inline-style references like');
lines.push('   * surfaceVars(), feedbackVars(), scVar(), toggleVar() are not enough.');
lines.push('   * applyTheme() sets the unprefixed runtime vars (--surface-*, --feedback-*,');
lines.push('   * etc.) on :root — these declarations bridge them to the --color-* names');
lines.push('   * that the component helpers expect.');
lines.push('   */');
lines.push('  :root {');

// Emit bridges for all nested contracts
for (const contractName of Object.keys(CONTRACT_VARIANTS)) {
	const prefix = CONTRACT_PREFIX[contractName] ?? contractName;
	const variants = CONTRACT_VARIANTS[contractName];
	const props = NESTED_CONTRACT_PROPERTIES[contractName];
	lines.push(`    /* ${contractName} contracts */`);
	for (const variant of variants) {
		for (const prop of props) {
			const kebab = toKebab(prop);
			lines.push(
				`    --color-${prefix}-${variant}-${kebab}: var(--${prefix}-${variant}-${kebab});`
			);
		}
	}
}

// Emit bridges for all flat contracts
for (const contractName of Object.keys(FLAT_CONTRACT_PROPERTIES)) {
	const prefix = CONTRACT_PREFIX[contractName] ?? contractName;
	const props = FLAT_CONTRACT_PROPERTIES[contractName];
	lines.push(`    /* ${contractName} contracts */`);
	for (const prop of props) {
		const kebab = toKebab(prop);
		lines.push(`    --color-${prefix}-${kebab}: var(--${prefix}-${kebab});`);
	}
}

lines.push('  }');
lines.push('}');
lines.push('');

// --- @theme inline ---
lines.push('@theme inline {');

// semantic color tokens -> --color-*
lines.push('  /* semantic color tokens */');
semanticColorKeys.forEach((k) => {
	lines.push(`  --color-${toHyphen(k)}: var(--ct-${k});`);
});

// contracts -> --color-* (via bridge vars set in :root above)
lines.push('  /* action contracts */');
for (const variant of CONTRACT_VARIANTS.actions) {
	for (const prop of NESTED_CONTRACT_PROPERTIES.actions) {
		const kebab = toKebab(prop);
		lines.push(`  --color-action-${variant}-${kebab}: var(--action-${variant}-${kebab});`);
	}
}

lines.push('  /* feedback contracts */');
for (const intent of CONTRACT_VARIANTS.feedback) {
	for (const prop of NESTED_CONTRACT_PROPERTIES.feedback) {
		const kebab = toKebab(prop);
		lines.push(`  --color-feedback-${intent}-${kebab}: var(--feedback-${intent}-${kebab});`);
	}
}

lines.push('  /* surface contracts */');
for (const surface of CONTRACT_VARIANTS.surfaces) {
	for (const prop of NESTED_CONTRACT_PROPERTIES.surfaces) {
		const kebab = toKebab(prop);
		lines.push(`  --color-surface-${surface}-${kebab}: var(--surface-${surface}-${kebab});`);
	}
}

lines.push('  /* inputField contracts */');
for (const prop of FLAT_CONTRACT_PROPERTIES.inputField) {
	const kebab = toKebab(prop);
	lines.push(`  --color-inputfield-${kebab}: var(--inputfield-${kebab});`);
}

lines.push('  /* selectionControl contracts */');
for (const prop of FLAT_CONTRACT_PROPERTIES.selectionControl) {
	const kebab = toKebab(prop);
	lines.push(`  --color-selectioncontrol-${kebab}: var(--selectioncontrol-${kebab});`);
}

lines.push('  /* toggle contracts */');
for (const prop of FLAT_CONTRACT_PROPERTIES.toggle) {
	const kebab = toKebab(prop);
	lines.push(`  --color-toggle-${kebab}: var(--toggle-${kebab});`);
}

// spacing
lines.push('  /* spacing */');
spacingKeys.forEach((k) => {
	lines.push(`  --spacing-${k}: var(--ds-spacing-${k});`);
});

// radii
lines.push('  /* radii */');
radiiKeys.forEach((k) => {
	lines.push(`  --radius-${k}: var(--radii-${k});`);
});

// widths
lines.push('  /* widths (container max-widths) */');
widthKeys.forEach((k) => {
	lines.push(`  --max-width-${k}: var(--ds-width-${k});`);
});

// layout
lines.push('  /* layout (grid gutter/margin scale) */');
layoutKeys.forEach((k) => {
	lines.push(`  --layout-${k}: var(--ds-layout-${k});`);
});

// typography
lines.push('  /* typography - font size */');
fontSizeKeys.forEach((k) => {
	lines.push(`  --text-${k}: var(--typography-fontSize-${k});`);
});

lines.push('  /* typography - font weight */');
fontWeightKeys.forEach((k) => {
	lines.push(`  --font-weight-${k}: var(--typography-fontWeight-${k});`);
});

lines.push('  /* typography - line height */');
lineHeightKeys.forEach((k) => {
	lines.push(`  --leading-${k}: var(--typography-lineHeight-${k});`);
});

lines.push('  /* typography - letter spacing */');
letterSpacingKeys.forEach((k) => {
	lines.push(`  --tracking-${k}: var(--typography-letterSpacing-${k});`);
});

lines.push('  /* typography - font family */');
lines.push('  --font-body: var(--typography-fontFamilies-body);');
lines.push('  --font-heading: var(--typography-fontFamilies-heading);');
lines.push('  --font-mono: var(--typography-fontFamilies-mono);');

// shadows
lines.push('  /* shadows */');
shadowKeys.forEach((k) => {
	lines.push(`  --shadow-${k}: var(--ds-shadow-${k});`);
});

lines.push('}');
lines.push('');

// breakpoints (literal px; media queries cannot use var())
lines.push('@theme {');
lines.push('  /* breakpoints */');
Object.entries(breakpoints).forEach(([k, v]) => {
	lines.push(`  --breakpoint-${k}: ${v}px;`);
});
lines.push('}');
lines.push('');

// ---------------------------------------------------------------------------
// @utility blocks
// ---------------------------------------------------------------------------

// --- Semantic color tokens: bg-* ---
lines.push('/* clean aliases: bg-* (utility name == token name) */');
bgColorKeys.forEach((k) => {
	lines.push(`@utility ${toHyphen(k)} { background-color: var(--ct-${k}); }`);
});

// --- Semantic color tokens: text-* ---
lines.push('/* clean aliases: text-* */');
textColorKeys.forEach((k) => {
	lines.push(`@utility ${toHyphen(k)} { color: var(--ct-${k}); }`);
});

// --- Semantic color tokens: border-* ---
lines.push('/* clean aliases: border-* */');
borderColorKeys.forEach((k) => {
	lines.push(`@utility ${toHyphen(k)} { border-color: var(--ct-${k}); }`);
});

// --- Contract @utility classes ---
// Color properties (bg, on, border) are handled automatically by @theme inline
// above — Tailwind generates bg-*, text-*, border-* utilities from --color-* vars.
// Here we only emit @utility rules for NON-COLOR contract properties that
// have no Tailwind namespace (border-width, border-radius, structural radii).

lines.push('');
lines.push('/* --- non-color contract utilities --- */');

// Feedback contracts: border-width and border-radius per intent
for (const intent of CONTRACT_VARIANTS.feedback) {
	lines.push(
		`@utility border-w-feedback-${intent} { border-width: var(--feedback-${intent}-border-width); }`
	);
	lines.push(
		`@utility rounded-feedback-${intent} { border-radius: var(--feedback-${intent}-border-radius); }`
	);
}

// Component structural tokens (radii)
lines.push('');
lines.push('/* --- component structural utilities --- */');
lines.push('@utility rounded-button { border-radius: var(--components-button-border-radii); }');
lines.push('@utility rounded-card { border-radius: var(--components-card-border-radii); }');
lines.push('@utility rounded-input { border-radius: var(--components-input-border-radii); }');

// Focus ring utility (box-shadow with ring color)
lines.push('@utility ring-focus { box-shadow: var(--focusring-focus-ring); }');
lines.push('@utility ring-focus-error { box-shadow: var(--focusring-focus-ring-error); }');

// --- Typography role presets: type-{role} ---
const headingRoles = ['h1', 'h2', 'h3', 'h4'];
lines.push('');
lines.push('/* typography role presets: type-{role} */');
typographyContractKeys.forEach((role) => {
	const c = `--typography-contract-${role}`;
	const ffFallback = headingRoles.includes(role)
		? 'var(--typography-fontFamilies-heading)'
		: 'var(--typography-fontFamilies-body)';
	lines.push(`@utility type-${role} {`);
	lines.push(`  font-family: var(${c}-fontFamily, ${ffFallback});`);
	lines.push(`  font-size: var(${c}-fontSize);`);
	lines.push(`  font-weight: var(${c}-fontWeight);`);
	lines.push(`  line-height: var(${c}-lineHeight);`);
	lines.push(`  letter-spacing: var(${c}-letterSpacing, normal);`);
	lines.push(`  color: var(${c}-color, var(--ct-text-primary));`);
	lines.push(`  margin: 0;`);
	if (role === 'overline') {
		lines.push(`  text-transform: uppercase;`);
	}
	lines.push('}');
});
lines.push('');

// ---------------------------------------------------------------------------
// Grid system - static responsive resolution (no JS)
// ---------------------------------------------------------------------------
const bpNames = Object.keys(breakpoints);
const bpValues = Object.values(breakpoints);

lines.push('/* grid system - static responsive resolution (no JS) */');

// <Grid>
lines.push('.ds-grid {');
lines.push('  display: grid;');
lines.push('  width: 100%;');
lines.push('  margin-inline: auto;');
lines.push('  box-sizing: border-box;');
lines.push('  --ds-cols: var(--ds-cols-mobile, var(--grid-mobile-columns));');
lines.push('  --ds-colgap: var(--ds-colgap-mobile, var(--grid-mobile-gutter));');
lines.push(
	'  --ds-rowgap: var(--ds-rowgap-mobile, var(--ds-colgap-mobile, var(--grid-mobile-gutter)));'
);
lines.push('  grid-template-columns: repeat(var(--ds-cols), 1fr);');
lines.push('  column-gap: var(--ds-colgap);');
lines.push('  row-gap: var(--ds-rowgap);');
lines.push('}');
bpNames.forEach((bp, i) => {
	const min = bpValues[i];
	if (min === 0) return;
	lines.push(`@media (min-width: ${min}px) {`);
	lines.push(`  .ds-grid {`);
	lines.push(`    --ds-cols: var(--ds-cols-${bp}, var(--grid-${bp}-columns));`);
	lines.push(`    --ds-colgap: var(--ds-colgap-${bp}, var(--grid-${bp}-gutter));`);
	lines.push(
		`    --ds-rowgap: var(--ds-rowgap-${bp}, var(--ds-colgap-${bp}, var(--grid-${bp}-gutter)));`
	);
	lines.push(`  }`);
	lines.push('}');
});

// <Grid.Column>
lines.push('.ds-col {');
lines.push('  grid-column: span var(--ds-colspan, 1);');
lines.push('  min-width: 0;');
lines.push('}');
bpNames.forEach((bp, i) => {
	const min = bpValues[i];
	if (min === 0) return;
	lines.push(`@media (min-width: ${min}px) {`);
	lines.push(`  .ds-col { --ds-colspan: var(--ds-colspan-${bp}); }`);
	lines.push('}');
});

// <Container>
lines.push('.ds-container {');
lines.push('  margin-inline: auto;');
lines.push('  width: 100%;');
lines.push('  box-sizing: border-box;');
lines.push('  --ds-inset: var(--ds-inset-mobile, var(--grid-mobile-margin));');
lines.push('  padding-inline: var(--ds-inset);');
lines.push('  max-width: var(--ds-container-max, var(--grid-mobile-maxWidth));');
lines.push('}');
bpNames.forEach((bp, i) => {
	const min = bpValues[i];
	if (min === 0) return;
	lines.push(`@media (min-width: ${min}px) {`);
	lines.push(`  .ds-container {`);
	lines.push(`    --ds-container-max: var(--ds-container-max-${bp}, var(--grid-${bp}-maxWidth));`);
	lines.push(`    --ds-inset: var(--ds-inset-${bp}, var(--grid-${bp}-margin));`);
	lines.push(`  }`);
	lines.push('}');
});

lines.push('.ds-container-fluid { max-width: none; }');
lines.push('');

const css = lines.join('\n');
const outPath = join(__dirname, '..', 'src', 'adapters', 'tailwind', 'tailwind-theme.css');
writeFileSync(outPath, css, 'utf8');
console.log(`Wrote ${outPath} (${css.length} bytes, ${lines.length} lines)`);
