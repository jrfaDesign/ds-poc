import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Select } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/Select',
	component: Select,
	tags: ['autodocs'],
	args: {
		label: 'Country',
		placeholder: 'Select a country',
		size: 'md',
		isDisabled: false,
		children: null,
		onChange: fn(),
	},
	argTypes: {
		label: { control: 'text', description: 'Field label above the select' },
		placeholder: { control: 'text', description: 'Text shown while no item is selected' },
		hint: { control: 'text', description: 'Helper text displayed below the select' },
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'Trigger padding, text size and icon size',
		},
		isDisabled: { control: 'boolean', description: 'Muted, non-interactive state' },
		isRequired: { control: 'boolean', description: 'Marks the field as required' },
		icon: { control: false, description: 'Leading icon fallback for the trigger' },
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Country',
		placeholder: 'Select a country',
		size: 'md',
		isDisabled: false,
		onChange: fn(),
	},
	render: (args) => (
		<Select {...args}>
			<Select.Item id="au" label="Australia" />
			<Select.Item id="br" label="Brazil" />
			<Select.Item id="pt" label="Portugal" />
			<Select.Item id="us" label="United States" />
		</Select>
	),
};
