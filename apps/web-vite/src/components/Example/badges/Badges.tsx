import * as stylex from '@stylexjs/stylex';
import { create } from '@stylexjs/stylex';
import { spacing } from '../../../design-system/adapters/stylex/createStylexVars.stylex';
import { Section } from '../ui/Section/Section';
import { Badge } from '../ui/Badge/Badge';

const localStyles = create({
	row: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: spacing.sm,
		alignItems: 'center',
		marginBottom: spacing.sm,
	},
});

export function Badges() {
	return (
		<Section title="Badges &amp; Tags">
			<div {...stylex.props(localStyles.row)}>
				<Badge variant="brand">Premium</Badge>
				<Badge variant="alt">Draft</Badge>
				<Badge variant="outline">Archived</Badge>
			</div>
			<div {...stylex.props(localStyles.row)}>
				<Badge variant="error" dot>
					Failed
				</Badge>
				<Badge variant="success" dot>
					Active
				</Badge>
				<Badge variant="warning" dot>
					Pending
				</Badge>
				<Badge variant="info" dot>
					Updated
				</Badge>
			</div>
		</Section>
	);
}
