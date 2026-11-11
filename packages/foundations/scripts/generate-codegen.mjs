/**
 * generate-codegen.mjs: Auto-generate codegen.js from src/tokens/index.ts
 *
 * Uses the TypeScript Compiler API to parse src/tokens/index.ts and extract
 * all exported const arrays and metadata. This ensures codegen.js stays
 * perfectly in sync with the canonical source of truth.
 *
 * Usage:
 *   node scripts/generate-codegen.mjs [--dry-run]
 *
 * --dry-run: print the generated output to stdout instead of writing file
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes('--dry-run');

// ---------------------------------------------------------------------------
// 1. Read and parse src/tokens/index.ts
// ---------------------------------------------------------------------------

const tokensTsPath = join(__dirname, '..', 'src', 'tokens', 'index.ts');
const sourceText = readFileSync(tokensTsPath, 'utf8');

const sourceFile = ts.createSourceFile(
	'tokens/index.ts',
	sourceText,
	ts.ScriptTarget.Latest,
	true, // setParentNodes
	ts.ScriptKind.TS
);

// ---------------------------------------------------------------------------
// 2. Extract const arrays and objects from the AST
// ---------------------------------------------------------------------------

/**
 * Extract a readonly string array literal from an AST node.
 * Handles: ['a', 'b', 'c'] as const
 */
function extractStringArray(node) {
	if (!ts.isArrayLiteralExpression(node)) return null;
	const values = [];
	for (const element of node.elements) {
		if (ts.isStringLiteral(element)) {
			values.push(element.text);
		} else if (ts.isPrefixUnaryExpression(element) && ts.isStringLiteral(element.operand)) {
			// Handle negative numbers in arrays (though not used here)
			values.push(element.operand.text);
		}
	}
	return values;
}

/**
 * Extract a nested object with array values from an AST node.
 * Handles: { key: ['a', 'b'], ... }
 * Returns null if no properties have array values (so extractSimpleObject can try).
 */
function extractObjectWithArrays(node) {
	if (!ts.isObjectLiteralExpression(node)) return null;
	const result = {};
	let hasArray = false;
	for (const prop of node.properties) {
		if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
			const key = prop.name.text;
			const value = extractStringArray(prop.initializer);
			if (value) {
				result[key] = value;
				hasArray = true;
			}
		}
	}
	return hasArray ? result : null;
}

/**
 * Extract a simple object (string/number/boolean values) from an AST node.
 */
function extractSimpleObject(node) {
	if (!ts.isObjectLiteralExpression(node)) return null;
	const result = {};
	for (const prop of node.properties) {
		if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
			const key = prop.name.text;
			const init = prop.initializer;
			if (ts.isStringLiteral(init)) {
				result[key] = init.text;
			} else if (ts.isNumericLiteral(init)) {
				result[key] = Number(init.text);
			} else if (
				ts.isPrefixUnaryExpression(init) &&
				init.operator === ts.SyntaxKind.MinusToken &&
				ts.isNumericLiteral(init.operand)
			) {
				result[key] = -Number(init.operand.text);
			} else if (ts.isPropertyAccessExpression(init) && ts.isStringLiteral(init.name)) {
				// Handle: 'radii' as const (template literal-like)
				result[key] = init.name.text;
			}
		}
	}
	return result;
}

// Walk the AST and collect variable declarations
const variables = {};

function visit(node) {
	// Handle ALL const variable statements (exported and non-exported)
	if (ts.isVariableStatement(node)) {
		for (const decl of node.declarationList.declarations) {
			if (ts.isIdentifier(decl.name)) {
				const name = decl.name.text;
				let value = null;

				const init = decl.initializer;
				if (!init) {
					ts.forEachChild(node, visit);
					return;
				}

				if (ts.isAsExpression(init)) {
					// Handle: ... as const
					value =
						extractStringArray(init.expression) ||
						extractObjectWithArrays(init.expression) ||
						extractSimpleObject(init.expression);
				} else if (ts.isCallExpression(init)) {
					// Handle: z.object(...): skip these (Zod schemas)
					// But also handle: z.enum(...)
					// We skip all call expressions
					value = null;
				} else {
					value =
						extractStringArray(init) || extractObjectWithArrays(init) || extractSimpleObject(init);
				}

				if (value) {
					variables[name] = value;
				}
			}
		}
	}
	ts.forEachChild(node, visit);
}

visit(sourceFile);

// ---------------------------------------------------------------------------
// 3. Define what we need to export (in order)
// ---------------------------------------------------------------------------

const arrayExports = [
	{ name: 'textColorKeys', source: 'textColorTokenKeys' },
	{ name: 'borderColorKeys', source: 'borderColorTokenKeys' },
	{ name: 'fgColorKeys', source: 'fgColorTokenKeys' },
	{ name: 'bgColorKeys', source: 'bgColorTokenKeys' },
	{ name: 'utilityColorKeys', source: 'utilityColorTokenKeys' },
	{ name: 'spacingKeys', source: 'spacingKeys' },
	{ name: 'radiiKeys', source: 'radiiKeys' },
	{ name: 'widthKeys', source: 'widthKeys' },
	{ name: 'layoutKeys', source: 'layoutKeys' },
	{ name: 'fontSizeKeys', source: 'fontSizeKeys' },
	{ name: 'fontWeightKeys', source: 'fontWeightKeys' },
	{ name: 'lineHeightKeys', source: 'lineHeightKeys' },
	{ name: 'letterSpacingKeys', source: 'letterSpacingKeys' },
	{ name: 'fontFamilyKeys', source: 'fontFamilyKeys' },
	{ name: 'shadowKeys', source: 'shadowKeys' },
];

const objectExports = [
	{ name: 'CONTRACT_PREFIX', source: 'CONTRACT_PREFIX' },
	{ name: 'CONTRACT_VARIANTS', source: 'CONTRACT_VARIANTS' },
	{ name: 'NESTED_CONTRACT_PROPERTIES', source: 'NESTED_CONTRACT_PROPERTIES' },
	{ name: 'breakpoints', source: 'breakpoints' },
];

// ---------------------------------------------------------------------------
// 4. Validate extraction
// ---------------------------------------------------------------------------

const errors = [];

for (const { source } of arrayExports) {
	if (!variables[source]) {
		errors.push(`Could not extract array: ${source}`);
	}
}

for (const { source } of objectExports) {
	if (!variables[source]) {
		errors.push(`Could not extract object: ${source}`);
	}
}

if (errors.length > 0) {
	console.error('Failed to extract from src/tokens/index.ts:');
	for (const err of errors) {
		console.error(`  - ${err}`);
	}
	process.exit(1);
}

// ---------------------------------------------------------------------------
// 5. Generate codegen.js
// ---------------------------------------------------------------------------

function formatArray(values) {
	if (values.length === 0) return '[]';
	const lines = [];
	for (const v of values) {
		lines.push(`\t'${v}',`);
	}
	return `[\n${lines.join('\n')}]`;
}

function formatObject(obj, indent = '') {
	const entries = Object.entries(obj);
	if (entries.length === 0) return '{}';
	const lines = [];
	for (const [key, value] of entries) {
		if (Array.isArray(value)) {
			const formatted = value.map((v) => `'${v}'`).join(', ');
			lines.push(`${indent}\t${key}: [${formatted}],`);
		} else if (typeof value === 'string') {
			lines.push(`${indent}\t${key}: '${value}',`);
		} else if (typeof value === 'number') {
			lines.push(`${indent}\t${key}: ${value},`);
		}
	}
	return `{\n${lines.join('\n')}\n${indent}}`;
}

const lines = [];

lines.push('/**');
lines.push(' * codegen.js: Pure JS token name lists for build scripts.');
lines.push(' *');
lines.push(' * AUTO-GENERATED by scripts/generate-codegen.mjs: DO NOT EDIT');
lines.push(' * Edit packages/foundations/src/tokens/index.ts instead, then run:');
lines.push(' *   yarn workspace @repo/foundations generate:codegen');
lines.push(' */');
lines.push('');

// Array exports
for (const { name, source } of arrayExports) {
	const values = variables[source];
	lines.push(`export const ${name} = ${formatArray(values)};`);
	lines.push('');
}

// Object exports
for (const { name, source } of objectExports) {
	const obj = variables[source];
	lines.push(`export const ${name} = ${formatObject(obj)};`);
	lines.push('');
}

const output = lines.join('\n');

// ---------------------------------------------------------------------------
// 6. Write or print
// ---------------------------------------------------------------------------

if (DRY_RUN) {
	process.stdout.write(output);
} else {
	const outPath = join(__dirname, '..', 'src', 'codegen.js');
	writeFileSync(outPath, output, 'utf8');
	console.log(`Wrote ${outPath} (${output.length} bytes)`);
}
