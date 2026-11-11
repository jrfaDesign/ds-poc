import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/Avatar',
	component: Avatar,
	tags: ['autodocs'],
	args: {
		size: 'md',
		initials: 'JD',
		status: 'online',
		verified: false,
		border: false,
		rounded: true,
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
			description: 'Dimensions of the avatar, which also scale the initials and icons',
		},
		initials: { control: 'text', description: 'Initials shown when no image is available' },
		src: { control: 'text', description: 'URL of the avatar image' },
		alt: { control: 'text', description: 'Alternative text for the avatar image' },
		status: {
			control: 'select',
			options: ['online', 'offline'],
			description: 'Status indicator dot',
		},
		verified: { control: 'boolean', description: 'Shows the verified tick badge' },
		border: { control: 'boolean', description: 'Draws an outer border around the avatar' },
		contrastBorder: { control: 'boolean', description: 'Inner contrast border around the image' },
		rounded: { control: 'boolean', description: 'Whether the avatar should be rounded' },
		count: { control: 'number', description: 'Count badge shown on the avatar' },
	},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
