import * as stylex from '@stylexjs/stylex';
import { styles } from './Example.styles';
import { Alerts } from './alerts/Alerts';
import { Navigation } from './navigation/Navigation';
import { ProfileCard } from './cards/ProfileCard';
import { FormElements } from './forms/FormElements';
import { ButtonVariants } from './buttons/ButtonVariants';
import { Badges } from './badges/Badges';
import { StatusDots } from './status/StatusDots';
import { CardGrid } from './cardgrid/CardGrid';
import { ModalDialog } from './modal/ModalDialog';
import { Pagination } from './pagination/Pagination';
import { Typography } from './ui/Typography/Typography';
import { TypographyDemo } from './typography/Typography';
import { Grid } from './ui/Grid/Grid';
import { Stack } from './ui/Stack/Stack';
import { Inline } from './ui/Inline/Inline';
import { Box } from './ui/Box/Box';
import defaultTheme from '../../design-system/themes/default';

const bpKeys = ['mobile', 'tablet', 'desktop', 'wide', 'ultra'] as const;
const gridBps = bpKeys.map((bp) => ({
	name: bp,
	px: defaultTheme.breakpoints[bp],
	grid: defaultTheme.grid[bp],
}));

const columns12 = Array.from({ length: 12 }, (_, i) => i + 1);

export function Example() {
	return (
		<div {...stylex.props(styles.page)}>
			<header {...stylex.props(styles.header)}>
				<Typography role="heading2">Design Token Examples</Typography>
				<Typography role="bodySm" color="textSecondary">
					Real-world UI patterns built with the design system tokens.
				</Typography>
			</header>

			<Grid>
				<Grid.Item span={12}>
					<Navigation />
				</Grid.Item>

				<Grid.Item span={{ mobile: 4, tablet: 4, desktop: 6 }}>
					<ProfileCard />
				</Grid.Item>

				<Grid.Item span={{ mobile: 4, tablet: 4, desktop: 6 }}>
					<FormElements />
				</Grid.Item>

				<Grid.Item span={12}>
					<ButtonVariants />
				</Grid.Item>

				<Grid.Item span={12}>
					<Alerts />
				</Grid.Item>

				<Grid.Item span={12}>
					<CardGrid />
				</Grid.Item>

				<Grid.Item span={{ mobile: 4, tablet: 4, desktop: 6 }}>
					<Stack gap="md">
						<Badges />
						<StatusDots />
					</Stack>
				</Grid.Item>

				<Grid.Item span={{ mobile: 4, tablet: 4, desktop: 6 }}>
					<ModalDialog />
				</Grid.Item>

				<Grid.Item span={12}>
					<Pagination />
				</Grid.Item>

				<Grid.Item span={12}>
					<TypographyDemo />
				</Grid.Item>
			</Grid>
		</div>
	);
}
