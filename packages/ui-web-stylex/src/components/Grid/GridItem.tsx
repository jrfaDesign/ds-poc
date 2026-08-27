import * as stylex from '@stylexjs/stylex';
import { styles } from './Grid.styles';
import { useGridContext } from './GridContext';
import type { GridItemProps } from './Grid.types';

export function GridItem({ children, span, style }: GridItemProps) {
	const { activeBp, columns } = useGridContext();

	const colSpan = typeof span === 'number' ? span : (span?.[activeBp] ?? columns);

	return (
		<div
			{...stylex.props(styles.item)}
			style={{
				gridColumn: `span ${colSpan}`,
				...style,
			}}
		>
			{children}
		</div>
	);
}
