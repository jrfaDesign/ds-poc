import { TokensSchema, type Tokens } from '@repo/foundations';

/**
 * Safely parse a theme object against the TokensSchema.
 * Returns the validated theme on success, or the fallback on failure.
 * Logs validation errors to the console for debugging.
 */
export function safeParseTheme(data: unknown, fallback: Tokens): Tokens {
	try {
		return TokensSchema.parse(data);
	} catch (err) {
		console.error('[Theme] Validation failed:', err);
		return fallback;
	}
}
