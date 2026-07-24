import type { StackProps } from './Stack.types';
import { Box } from '../Box/Box';

export function Stack({
	children,
	gap = 'md',
	align = 'stretch',
	padding,
	paddingX,
	paddingY,
	background,
	borderRadius,
	className,
	style,
}: StackProps) {
	return (
		<Box
			display="flex"
			flexDirection="column"
			gap={gap}
			alignItems={align}
			padding={padding}
			paddingX={paddingX}
			paddingY={paddingY}
			background={background}
			borderRadius={borderRadius}
			className={className}
			style={style}
		>
			{children}
		</Box>
	);
}
