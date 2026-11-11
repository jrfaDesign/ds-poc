import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Checkbox } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	args: {
		label: 'Accept terms',
		isSelected: false,
		isDisabled: false,
		onChange: fn(),
	},
	argTypes: {
		label: { control: 'text', description: 'Content rendered beside the checkbox' },
		hint: { control: 'text', description: 'Supporting text rendered under the label' },
		isSelected: { control: 'boolean', description: 'Checked state' },
		isIndeterminate: {
			control: 'boolean',
			description: 'Renders the mixed / partially-checked state',
		},
		isDisabled: { control: 'boolean', description: 'Muted, non-interactive state' },
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Control dimensions and typography',
		},
	},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
