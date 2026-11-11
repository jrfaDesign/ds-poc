import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/Badge',
	component: Badge,
	tags: ['autodocs'],
	args: {
		type: 'pill-color',
		color: 'success',
		size: 'md',
		children: 'Badge',
	},
	argTypes: {
		type: {
			control: 'select',
			options: ['pill-color', 'color', 'modern'],
			description: 'Shape and treatment: fully rounded, rounded rectangle, or white with border',
		},
		color: {
			control: 'select',
			options: [
				'gray',
				'brand',
				'error',
				'warning',
				'success',
				'slate',
				'sky',
				'blue',
				'indigo',
				'purple',
				'pink',
				'orange',
			],
			description: 'Color palette for background, text and ring',
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'Padding and font size preset',
		},
		children: { control: 'text', description: 'Badge label' },
		className: { control: 'text', description: 'Additional classes merged onto the badge' },
	},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
