import type { InlineProps } from './Inline.types';
import { Box } from '../Box/Box';

export function Inline({
	children,
	gap = 'md',
	wrap = true,
	align = 'center',
	justify,
	padding,
	className,
	style,
}: InlineProps) {
	return (
		<Box
			display="flex"
			flexDirection="row"
			flexWrap={wrap ? 'wrap' : 'nowrap'}
			alignItems={align}
			justifyContent={justify}
			gap={gap}
			padding={padding}
			className={className}
			style={style}
		>
			{children}
		</Box>
	);
}
