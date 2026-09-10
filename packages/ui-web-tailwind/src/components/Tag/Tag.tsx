import type { TagProps } from './Tag.types';
import { colorTokenVar } from '../shared/cssVars';

export function Tag({
	label,
	toneToken,
	variant = 'solid',
	dot = false,
	className,
	style,
}: TagProps) {
	const tone = colorTokenVar(toneToken);

	const variantStyle =
		variant === 'solid'
			? { backgroundColor: tone, color: 'var(--ct-text-white)' }
			: { borderColor: tone, color: tone };

	return (
		<span
			className={[
				'inline-flex items-center shrink-0 font-medium rounded-full',
				'text-xs leading-none whitespace-nowrap',
				variant === 'solid' ? 'ps-2 pe-2 py-1' : 'border ps-2 pe-2 py-1',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			style={{ ...variantStyle, ...style }}
		>
			{dot && <span className="w-1.5 h-1.5 rounded-full bg-current me-1.5 shrink-0" />}
			{label}
		</span>
	);
}
