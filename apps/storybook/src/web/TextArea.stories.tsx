import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TextArea } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/TextArea',
	component: TextArea,
	tags: ['autodocs'],
	args: {
		label: 'Message',
		placeholder: 'Type here…',
		rows: 4,
		size: 'md',
		isDisabled: false,
		isInvalid: false,
		onChange: fn(),
	},
	argTypes: {
		label: { control: 'text', description: 'Field label above the textarea' },
		placeholder: { control: 'text', description: 'Hint text shown when empty' },
		hint: { control: 'text', description: 'Helper text displayed below the textarea' },
		rows: { control: 'number', description: 'Visible height of the textarea in rows' },
		cols: { control: 'number', description: 'Visible width of the textarea in columns' },
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Padding and text size preset',
		},
		isDisabled: { control: 'boolean', description: 'Muted, non-editable state' },
		isInvalid: { control: 'boolean', description: 'Error state: drives border and hint color' },
	},
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
