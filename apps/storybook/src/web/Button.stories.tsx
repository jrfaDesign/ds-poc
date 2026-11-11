import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/Button',
	component: Button,
	tags: ['autodocs'],
	args: {
		children: 'Button',
		color: 'primary',
		size: 'sm',
		isDisabled: false,
		isLoading: false,
		onClick: fn(),
	},
	argTypes: {
		children: {
			control: 'text',
			description:
				'Button label. Omit it while passing an icon to render a square icon-only button',
		},
		color: {
			control: 'select',
			options: [
				'primary',
				'secondary',
				'tertiary',
				'link-color',
				'link-gray',
				'primary-destructive',
				'secondary-destructive',
				'tertiary-destructive',
				'link-destructive',
			],
			description: 'Color variant of the button',
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			description: 'Size preset',
		},
		isDisabled: { control: 'boolean', description: 'Muted, non-interactive state' },
		isLoading: { control: 'boolean', description: 'Shows a spinner and disables the button' },
		iconLeading: {
			control: false,
			description: 'Icon component or element shown before the label',
		},
		iconTrailing: {
			control: false,
			description: 'Icon component or element shown after the label',
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
