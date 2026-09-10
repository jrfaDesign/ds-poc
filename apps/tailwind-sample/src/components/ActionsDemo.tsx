import { Box, Button, PageSection, Typography } from '@repo/ui-web-tailwind';

export function ActionsDemo() {
	return (
		<PageSection padding="lg">
			<Box display="flex" flexDirection="column" gap="md">
				<Typography role="h2">Actions</Typography>
				<Box display="flex" flexWrap="wrap" alignItems="center" gap="sm">
					<Button variant="primary">Primary</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="link">Link</Button>
					<Button variant="tertiary">Tertiary</Button>
					<Button variant="primary" disabled>
						Disabled
					</Button>
				</Box>
			</Box>
		</PageSection>
	);
}
