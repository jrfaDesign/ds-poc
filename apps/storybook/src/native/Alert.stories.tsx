import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Alert } from '@repo/ui-react-native';

const meta = {
	title: 'React Native/Alert',
	component: Alert,
	tags: ['autodocs'],
	args: {
		intent: 'info',
		children: 'Something happened. This is the alert message.',
		onPress: fn(),
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
