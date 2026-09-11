import { Box, PageSection, Typography } from '@repo/ui-web-tailwind';
import { fontFamilyVar } from '@repo/ui-web-tailwind';

export function Intro() {
	return (
		<PageSection padding="xl">
			<Box display="flex" flexDirection="column" gap="lg">
				<Typography role="h1">Foundation + Tailwind resolver</Typography>
				<Typography role="p" color="text-secondary" className="max-w-prose">
					Switch themes and toggle dark mode to watch design tokens resolve in real time. Colors,
					spacing, radii, shadows, and typography all flow from{' '}
					<Typography
						role="caption"
						color="text-brand-secondary"
						style={{ fontFamily: fontFamilyVar('mono') }}
					>
						@repo/foundations
					</Typography>{' '}
					through the{' '}
					<Typography
						role="caption"
						color="text-brand-secondary"
						style={{ fontFamily: fontFamilyVar('mono') }}
					>
						applyTheme
					</Typography>{' '}
					resolver into Tailwind utilities.
				</Typography>
			</Box>
		</PageSection>
	);
}
