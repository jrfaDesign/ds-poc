import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { CloseButton } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/CloseButton',
	component: CloseButton,
	tags: ['autodocs'],
	args: {
		theme: 'light',
		size: 'sm',
		label: 'Close',
		onPress: fn(),
	},
	argTypes: {
		theme: {
			control: 'select',
			options: ['light', 'dark'],
			description: 'Icon styling for a light or dark background',
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg'],
			description: 'Dimensions of the button and its icon',
		},
		label: { control: 'text', description: 'Accessible name of the button' },
		isDisabled: { control: 'boolean', description: 'Muted, non-interactive state' },
	},
} satisfies Meta<typeof CloseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
