import type { Meta, StoryObj } from '@storybook/react-vite';
import { BadgeGroup } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/BadgeGroups',
	component: BadgeGroup,
	tags: ['autodocs'],
	args: {
		addonText: 'New',
		children: 'Release notes',
		color: 'brand',
		theme: 'light',
		size: 'md',
		align: 'trailing',
	},
	argTypes: {
		addonText: { control: 'text', description: 'Text of the pill-shaped addon' },
		children: { control: 'text', description: 'Main text of the group' },
		color: {
			control: 'select',
			options: ['brand', 'warning', 'error', 'gray', 'success'],
			description: 'Color palette of the group',
		},
		theme: {
			control: 'select',
			options: ['light', 'modern'],
			description: 'Tinted fill (light) or white card with status dot (modern)',
		},
		size: {
			control: 'select',
			options: ['md', 'lg'],
			description: 'Padding and font size preset',
		},
		align: {
			control: 'select',
			options: ['leading', 'trailing'],
			description: 'Where the addon sits relative to the group text',
		},
		iconTrailing: { control: false, description: 'Icon rendered at the end of the group' },
	},
} satisfies Meta<typeof BadgeGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
