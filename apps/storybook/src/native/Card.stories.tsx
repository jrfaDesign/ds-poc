import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '@repo/ui-react-native';

const meta = {
	title: 'React Native/Card',
	component: Card,
	tags: ['autodocs'],
	args: {
		children: 'Card content goes here.',
		variant: 'surface',
	},
	argTypes: {
		children: { control: 'text', description: 'Card content' },
		variant: {
			control: 'select',
			options: ['surface', 'raised', 'alt', 'brand'],
			description: 'Surface treatment: background, border and shadow',
		},
	},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
