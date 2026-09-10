import type { CSSProperties } from 'react';
import type { ColorTokenName } from '@repo/foundations';

export type TagVariant = 'solid' | 'outline';

export type TagProps = {
	/** Badge label text. */
	label: string;
	/** Color token used for background (solid) or border/text (outline). */
	toneToken: ColorTokenName;
	/** Visual variant — solid fills background, outline uses border. */
	variant?: TagVariant;
	/** Show a small dot indicator before the label. */
	dot?: boolean;
	/** Additional CSS class names. */
	className?: string;
	/** Inline style overrides. */
	style?: CSSProperties;
};
