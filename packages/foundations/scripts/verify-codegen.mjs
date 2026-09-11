/**
 * verify-codegen.mjs — CI verification script
 *
 * Runs the codegen generator in dry-run mode, diffs the output against
 * the existing codegen.js, and fails if they differ. This catches any
 * manual edits to codegen.js or drift from index.ts.
 *
 * Usage:
 *   node scripts/verify-codegen.mjs
 *
 * Exit codes:
 *   0 — codegen.js is in sync with index.ts
 *   1 — codegen.js is out of sync (run generate:codegen to fix)
 */

import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// 1. Generate fresh output (dry-run)
// ---------------------------------------------------------------------------

let generated;
try {
	generated = execSync('node scripts/generate-codegen.mjs --dry-run', {
		cwd: join(__dirname, '..'),
		encoding: 'utf8',
		stdio: ['pipe', 'pipe', 'pipe'],
	});
} catch (err) {
	console.error('Failed to run generate-codegen.mjs:');
	console.error(err.stderr || err.message);
	process.exit(1);
}

// ---------------------------------------------------------------------------
// 2. Read existing codegen.js
// ---------------------------------------------------------------------------

const codegenPath = join(__dirname, '..', 'src', 'codegen.js');
let existing;
try {
	existing = readFileSync(codegenPath, 'utf8');
} catch (err) {
	console.error(`Failed to read ${codegenPath}:`);
	console.error(err.message);
	process.exit(1);
}

// ---------------------------------------------------------------------------
// 3. Compare
// ---------------------------------------------------------------------------

if (generated === existing) {
	console.log('✓ codegen.js is in sync with index.ts');
	process.exit(0);
}

// ---------------------------------------------------------------------------
// 4. Show diff
// ---------------------------------------------------------------------------

console.error('✗ codegen.js is OUT OF SYNC with index.ts');
console.error('');
console.error('codegen.js has been manually modified or index.ts has changed.');
console.error('Run the following command to fix:');
console.error('');
console.error('  yarn workspace @repo/foundations generate:codegen');
console.error('');

// Show a simple diff
const genLines = generated.split('\n');
const existLines = existing.split('\n');
const maxLines = Math.max(genLines.length, existLines.length);
let diffCount = 0;

for (let i = 0; i < maxLines; i++) {
	const gen = genLines[i] || '';
	const exist = existLines[i] || '';
	if (gen !== exist) {
		diffCount++;
		if (diffCount <= 10) {
			console.error(`Line ${i + 1}:`);
			console.error(`  expected: ${gen || '(empty)'}`);
			console.error(`  actual:   ${exist || '(empty)'}`);
		}
	}
}

if (diffCount > 10) {
	console.error(`  ... and ${diffCount - 10} more differences`);
}

process.exit(1);
