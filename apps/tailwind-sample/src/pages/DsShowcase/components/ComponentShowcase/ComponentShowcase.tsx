import {
	Box,
	Button,
	Card,
	Checkbox,
	RadioButton,
	RadioGroup,
	Select,
	Toggle,
	Input,
	PageSection,
	Typography,
} from '@repo/ui-web-tailwind';
import type { CardVariant } from '@repo/ui-web-tailwind';

const BUTTON_COLORS = ['primary', 'secondary', 'tertiary', 'link-gray', 'link-color'] as const;
const CARD_VARIANTS: CardVariant[] = ['surface', 'raised', 'alt', 'brand'];

export function ComponentShowcase() {
	return (
		<PageSection padding="lg">
			<Box display="flex" flexDirection="column" gap="xl">
				<Box display="flex" flexDirection="column" gap="sm">
					<Typography role="h2">Component Showcase</Typography>
					<Typography role="p" color="text-secondary" className="max-w-prose">
						Switch themes to see how components adapt. Border radii, colors, and contrast all change
						based on the active theme: on both web and native.
					</Typography>
				</Box>

				{/* Buttons */}
				<Box display="flex" flexDirection="column" gap="md">
					<Typography role="h3">Buttons</Typography>
					<Box display="flex" flexWrap="wrap" alignItems="center" gap="sm">
						{BUTTON_COLORS.map((color) => (
							<Button key={color} color={color}>
								{color.charAt(0).toUpperCase() + color.slice(1)}
							</Button>
						))}
						<Button color="primary" isDisabled>
							Disabled
						</Button>
					</Box>
				</Box>

				{/* Cards */}
				<Box display="flex" flexDirection="column" gap="md">
					<Typography role="h3">Cards</Typography>
					<Box display="flex" flexWrap="wrap" gap="md">
						{CARD_VARIANTS.map((variant) => (
							<Card key={variant} variant={variant}>
								<Typography role="label">{variant}</Typography>
								<Typography role="caption" color="text-secondary">
									Card variant
								</Typography>
							</Card>
						))}
					</Box>
				</Box>

				{/* Input Fields */}
				<Box display="flex" flexDirection="column" gap="md">
					<Typography role="h3">Input Fields</Typography>
					<Typography role="p" color="text-secondary" className="max-w-prose">
						Inputs expose label, hint and validation state. The <code>isInvalid</code> prop applies
						the full error treatment: border, label, and hint all change.
					</Typography>
					<Box display="flex" flexWrap="wrap" gap="md">
						<Box className="min-w-[200px]">
							<Input label="Default" placeholder="Type here..." id="i-default" />
						</Box>
						<Box className="min-w-[200px]">
							<Input label="With hint" hint="Helper text" placeholder="Type here..." id="i-hint" />
						</Box>
						<Box className="min-w-[200px]">
							<Input label="Error" isInvalid placeholder="invalid..." id="i-error" />
						</Box>
						<Box className="min-w-[200px]">
							<Input label="Disabled" placeholder="disabled..." isDisabled id="i-disabled" />
						</Box>
					</Box>
				</Box>

				{/* Select */}
				<Box display="flex" flexDirection="column" gap="md">
					<Typography role="h3">Select</Typography>
					<Box display="flex" flexWrap="wrap" gap="md">
						<Box className="min-w-[180px]">
							<Select label="Options" id="s-default">
								<Select.Item id="a" label="Option A" />
								<Select.Item id="b" label="Option B" />
								<Select.Item id="c" label="Option C" />
							</Select>
						</Box>
					</Box>
				</Box>

				{/* Selection Controls */}
				<Box display="flex" flexDirection="column" gap="md">
					<Typography role="h3">Selection Controls</Typography>
					<Box display="flex" flexWrap="wrap" gap="xl">
						<Box display="flex" flexDirection="column" gap="sm">
							<Typography role="label">Checkboxes</Typography>
							<Checkbox defaultSelected label="Checked" id="sc-1" />
							<Checkbox label="Unchecked" id="sc-2" />
							<Checkbox isDisabled label="Disabled" id="sc-3" />
							<Checkbox defaultSelected isDisabled label="Checked & disabled" id="sc-4" />
						</Box>
						<Box display="flex" flexDirection="column" gap="sm">
							<Typography role="label">Radio Buttons</Typography>
							<RadioGroup aria-label="Demo radio" defaultValue="r-1">
								<RadioButton value="r-1" label="Selected" id="r-1" />
								<RadioButton value="r-2" label="Unselected" id="r-2" />
								<RadioButton value="r-3" label="Disabled" id="r-3" isDisabled />
							</RadioGroup>
						</Box>
						<Box display="flex" flexDirection="column" gap="sm">
							<Typography role="label">Toggles</Typography>
							<Toggle defaultSelected label="On" id="t-1" />
							<Toggle label="Off" id="t-2" />
							<Toggle isDisabled label="Disabled" id="t-3" />
						</Box>
					</Box>
				</Box>
			</Box>
		</PageSection>
	);
}
