import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/Alert',
	component: Alert,
	tags: ['autodocs'],
	args: {
		intent: 'info',
		children: 'Something happened. This is the alert message.',
	},
	argTypes: {
		intent: {
			control: 'select',
			options: ['error', 'success', 'warning', 'info'],
			description: 'Semantic intent: drives background, border and text color',
		},
		title: { control: 'text', description: 'Optional title above the message' },
		children: { control: 'text', description: 'Alert message' },
	},
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
