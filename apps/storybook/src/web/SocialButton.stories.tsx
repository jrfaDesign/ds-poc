import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SocialButton } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/SocialButton',
	component: SocialButton,
	tags: ['autodocs'],
	args: {
		social: 'google',
		children: 'Continue with Google',
		size: 'md',
		theme: 'brand',
		isDisabled: false,
		onClick: fn(),
	},
	argTypes: {
		social: {
			control: 'select',
			options: ['google', 'facebook', 'apple', 'twitter', 'figma', 'dribble'],
			description: 'Provider: selects the logo and the brand color',
		},
		children: { control: 'text', description: 'Button label' },
		size: {
			control: 'select',
			options: ['md', 'lg'],
			description: 'Size preset',
		},
		theme: {
			control: 'select',
			options: ['brand', 'color', 'gray'],
			description: 'Visual style of the button',
		},
		isDisabled: { control: 'boolean', description: 'Muted, non-interactive state' },
	},
} satisfies Meta<typeof SocialButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
