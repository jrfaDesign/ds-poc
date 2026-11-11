import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppStoreButton, GooglePlayButton } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/AppStoreButtons',
	component: AppStoreButton,
	tags: ['autodocs'],
	args: {
		size: 'md',
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['md', 'lg'],
			description: 'Rendered width and height of the badges',
		},
	},
} satisfies Meta<typeof AppStoreButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { size: 'md' },
	render: (args) => (
		<div className="flex flex-wrap items-center gap-lg">
			<AppStoreButton {...args} />
			<GooglePlayButton size={args.size} />
		</div>
	),
};
