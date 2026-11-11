import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Input } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/Input',
	component: Input,
	tags: ['autodocs'],
	args: {
		label: 'Email address',
		placeholder: 'Type here…',
		size: 'md',
		isDisabled: false,
		isInvalid: false,
		onChange: fn(),
	},
	argTypes: {
		label: { control: 'text', description: 'Field label above the input' },
		placeholder: { control: 'text', description: 'Hint text shown when empty' },
		hint: { control: 'text', description: 'Helper text displayed below the input' },
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'Size preset',
		},
		type: {
			control: 'select',
			options: ['text', 'email', 'password', 'search', 'tel', 'url'],
			description: 'Native input type',
		},
		isDisabled: { control: 'boolean', description: 'Muted, non-editable state' },
		isInvalid: {
			control: 'boolean',
			description: 'Error state: drives border, label and hint color',
		},
		isRequired: { control: 'boolean', description: 'Marks the field as required' },
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
