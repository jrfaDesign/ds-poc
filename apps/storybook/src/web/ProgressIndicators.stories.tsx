import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/ProgressIndicators',
	component: ProgressBar,
	tags: ['autodocs'],
	args: {
		value: 60,
		labelPosition: 'right',
	},
	argTypes: {
		value: { control: 'number', description: 'Current value of the progress bar' },
		min: { control: 'number', description: 'Lower bound of the range' },
		max: { control: 'number', description: 'Upper bound of the range' },
		labelPosition: {
			control: 'select',
			options: ['right', 'bottom', 'top-floating', 'bottom-floating'],
			description: 'Where the percentage text sits relative to the bar',
		},
		valueFormatter: { control: false, description: 'Formats the displayed value' },
	},
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
