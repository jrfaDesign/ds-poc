import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Toggle } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/Toggle',
	component: Toggle,
	tags: ['autodocs'],
	args: {
		label: 'Toggle me',
		isSelected: false,
		isDisabled: false,
		onChange: fn(),
	},
	argTypes: {
		label: { control: 'text', description: 'Text rendered beside the toggle' },
		hint: { control: 'text', description: 'Supporting text rendered under the label' },
		isSelected: { control: 'boolean', description: 'On / off state' },
		isDisabled: { control: 'boolean', description: 'Muted, non-interactive state' },
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Toggle dimensions and typography',
		},
		slim: {
			control: 'boolean',
			description: 'Compact variant with an unpadded track and overlapping knob',
		},
	},
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
