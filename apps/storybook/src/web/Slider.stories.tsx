import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Slider } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/Slider',
	component: Slider,
	tags: ['autodocs'],
	args: {
		defaultValue: 40,
		minValue: 0,
		maxValue: 100,
		labelPosition: 'bottom',
		isDisabled: false,
		onChange: fn(),
	},
	argTypes: {
		labelPosition: {
			control: 'select',
			options: ['default', 'bottom', 'top-floating'],
			description: 'Where the value label sits relative to the thumb',
		},
		minValue: { control: 'number', description: 'Lower bound of the range' },
		maxValue: { control: 'number', description: 'Upper bound of the range' },
		isDisabled: { control: 'boolean', description: 'Muted, non-interactive state' },
		labelFormatter: { control: false, description: 'Formats the value shown in the label' },
	},
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
