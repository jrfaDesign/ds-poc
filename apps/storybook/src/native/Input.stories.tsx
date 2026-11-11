import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Input } from '@repo/ui-react-native';

const meta = {
	title: 'React Native/Input',
	component: Input,
	tags: ['autodocs'],
	args: {
		label: 'Email address',
		placeholder: 'Type here…',
		status: 'default',
		size: 'md',
		disabled: false,
		onChange: fn(),
	},
	argTypes: {
		label: { control: 'text', description: 'Field label above the input' },
		placeholder: { control: 'text', description: 'Hint text shown when empty' },
		status: {
			control: 'select',
			options: ['default', 'error', 'success'],
			description: 'Validation state: drives border and text color',
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'Size preset',
		},
		disabled: { control: 'boolean', description: 'Muted, non-editable state' },
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
