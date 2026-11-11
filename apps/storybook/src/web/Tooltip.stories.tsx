import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip, TooltipTrigger } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	args: {
		title: 'Tooltip title',
		description: 'Optional supporting description.',
		arrow: true,
		delay: 300,
		children: 'Hover me',
	},
	argTypes: {
		title: { control: 'text', description: 'Title line of the tooltip' },
		description: { control: 'text', description: 'Optional description rendered under the title' },
		arrow: { control: 'boolean', description: 'Shows the pointer arrow on the tooltip' },
		delay: { control: 'number', description: 'Delay in milliseconds before the tooltip is shown' },
		placement: {
			control: 'select',
			options: ['top', 'bottom', 'left', 'right'],
			description: 'Preferred side of the trigger',
		},
		children: { control: 'text', description: 'Label of the trigger button' },
	},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: ({ children, ...args }) => (
		<Tooltip {...args}>
			<TooltipTrigger>{children as string}</TooltipTrigger>
		</Tooltip>
	),
};
