import {
	Box,
	Button,
	Card,
	Checkbox,
	Radio,
	Select,
	Toggle,
	Input,
	PageSection,
	Typography,
} from '@repo/ui-web-tailwind';
import type { ButtonVariant, CardVariant } from '@repo/ui-web-tailwind';

const BUTTON_VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'ghost', 'link'];
const CARD_VARIANTS: CardVariant[] = ['surface', 'raised', 'alt', 'brand'];

export function ComponentShowcase() {
	return (
		<PageSection padding="lg">
			<Box display="flex" flexDirection="column" gap="xl">
				<Box display="flex" flexDirection="column" gap="sm">
					<Typography role="h2">Component Showcase</Typography>
					<Typography role="p" color="text-secondary" className="max-w-prose">
						Switch themes to see how components adapt. Border radii, colors, and contrast all change
						based on the active theme — on both web and native.
					</Typography>
				</Box>

				{/* Buttons */}
				<Box display="flex" flexDirection="column" gap="md">
					<Typography role="h3">Buttons</Typography>
					<Box display="flex" flexWrap="wrap" alignItems="center" gap="sm">
						{BUTTON_VARIANTS.map((variant) => (
							<Button key={variant} variant={variant}>
								{variant.charAt(0).toUpperCase() + variant.slice(1)}
							</Button>
						))}
						<Button variant="primary" disabled>
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
						Inputs use the surface contract — alt surface by default. The <code>surface</code> prop
						selects an alternate surface. The <code>status</code> prop applies full feedback states
						— bg, border, text, label, and placeholder all change.
					</Typography>
					<Box display="flex" flexWrap="wrap" gap="md">
						<Box className="min-w-[200px]">
							<Input label="Alt (default)" placeholder="alt surface..." id="i-default" />
						</Box>
						<Box className="min-w-[200px]">
							<Input
								label="Sunken surface"
								surface="sunken"
								placeholder="sunken..."
								id="i-sunken"
							/>
						</Box>
						<Box className="min-w-[200px]">
							<Input label="Error" status="error" placeholder="invalid..." id="i-error" />
						</Box>
						<Box className="min-w-[200px]">
							<Input label="Success" status="success" placeholder="valid..." id="i-success" />
						</Box>
						<Box className="min-w-[200px]">
							<Input label="Disabled" placeholder="disabled..." disabled id="i-disabled" />
						</Box>
					</Box>
				</Box>

				{/* Select */}
				<Box display="flex" flexDirection="column" gap="md">
					<Typography role="h3">Select</Typography>
					<Box display="flex" flexWrap="wrap" gap="md">
						<Box className="min-w-[180px]">
							<Select label="Alt (default)" id="s-default">
								<Select.Item value="a">Option A</Select.Item>
								<Select.Item value="b">Option B</Select.Item>
								<Select.Item value="c">Option C</Select.Item>
							</Select>
						</Box>
						<Box className="min-w-[180px]">
							<Select label="Sunken surface" surface="sunken" id="s-sunken">
								<Select.Item value="a">Option A</Select.Item>
								<Select.Item value="b">Option B</Select.Item>
								<Select.Item value="c">Option C</Select.Item>
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
							<Checkbox defaultChecked label="Checked" id="sc-1" />
							<Checkbox label="Unchecked" id="sc-2" />
							<Checkbox disabled label="Disabled" id="sc-3" />
							<Checkbox defaultChecked disabled label="Checked & disabled" id="sc-4" />
						</Box>
						<Box display="flex" flexDirection="column" gap="sm">
							<Typography role="label">Radio Buttons</Typography>
							<Radio defaultChecked label="Selected" name="demo-radio" id="r-1" />
							<Radio label="Unselected" name="demo-radio" id="r-2" />
							<Radio disabled label="Disabled" name="demo-radio" id="r-3" />
						</Box>
						<Box display="flex" flexDirection="column" gap="sm">
							<Typography role="label">Toggles</Typography>
							<Toggle defaultChecked label="On" id="t-1" />
							<Toggle label="Off" id="t-2" />
							<Toggle disabled label="Disabled" id="t-3" />
						</Box>
					</Box>
				</Box>
			</Box>
		</PageSection>
	);
}
