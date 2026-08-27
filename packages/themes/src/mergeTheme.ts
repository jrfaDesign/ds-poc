import { TokensSchema, type Tokens } from '@repo/foundations';

export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

function isObject(v: unknown): v is Record<string, unknown> {
	return v !== null && typeof v === 'object' && !Array.isArray(v);
}

function deepMerge(
	base: Record<string, unknown>,
	overrides: Record<string, unknown>
): Record<string, unknown> {
	const result = { ...base };
	for (const key of Object.keys(overrides)) {
		const val = overrides[key];
		if (val === undefined) continue;
		if (isObject(val) && isObject(result[key])) {
			result[key] = deepMerge(result[key], val);
		} else {
			result[key] = val;
		}
	}
	return result;
}

export function mergeTheme(base: Tokens, overrides: DeepPartial<Tokens>): Tokens {
	const merged = deepMerge(
		base as unknown as Record<string, unknown>,
		overrides as unknown as Record<string, unknown>
	);
	return TokensSchema.parse(merged);
}
