import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup, ButtonGroupItem } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/ButtonGroup',
	component: ButtonGroup,
	tags: ['autodocs'],
	args: {
		size: 'md',
		defaultSelectedKeys: ['list'],
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'Padding, text size and icon size of every item',
		},
		defaultSelectedKeys: { control: false, description: 'Initially selected keys of the group' },
		selectedKeys: { control: false, description: 'Controlled selection of the group' },
		isDisabled: { control: 'boolean', description: 'Muted, non-interactive state' },
	},
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { size: 'md', defaultSelectedKeys: ['list'] },
	render: (args) => (
		<ButtonGroup {...args} aria-label="View mode">
			<ButtonGroupItem key="list" id="list">
				List
			</ButtonGroupItem>
			<ButtonGroupItem key="grid" id="grid">
				Grid
			</ButtonGroupItem>
			<ButtonGroupItem key="map" id="map">
				Map
			</ButtonGroupItem>
		</ButtonGroup>
	),
};
