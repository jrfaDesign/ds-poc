import { Box, Button, PageSection, Typography } from '@repo/ui-web-tailwind';

export function ActionsDemo() {
	return (
		<PageSection padding="lg">
			<Box display="flex" flexDirection="column" gap="md">
				<Typography role="h2">Actions</Typography>
				<Box display="flex" flexWrap="wrap" alignItems="center" gap="sm">
					<Button color="primary">Primary</Button>
					<Button color="secondary">Secondary</Button>
					<Button color="tertiary">Tertiary</Button>
					<Button color="link-gray">Link</Button>
					<Button color="link-color">Brand link</Button>
					<Button color="primary" isDisabled>
						Disabled
					</Button>
				</Box>
			</Box>
		</PageSection>
	);
}
