import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '@repo/ui-react-native';
import type { ButtonSize, ButtonVariant } from '@repo/core';

const meta = {
	title: 'React Native/Button',
	component: Button,
	tags: ['autodocs'],
	args: {
		children: 'Button',
		variant: 'primary',
		size: 'md',
		disabled: false,
		onPress: fn(),
	},
	argTypes: {
		children: { control: 'text', description: 'Button label' },
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'tertiary', 'ghost', 'link'] satisfies ButtonVariant[],
			description: 'Visual style of the button',
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'] satisfies ButtonSize[],
			description: 'Size preset',
		},
		disabled: { control: 'boolean', description: 'Muted, non-interactive state' },
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
