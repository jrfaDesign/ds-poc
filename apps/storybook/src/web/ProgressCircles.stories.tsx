import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBarCircle, ProgressBarHalfCircle } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/ProgressCircles',
	component: ProgressBarCircle,
	tags: ['autodocs'],
	args: {
		value: 60,
		size: 'md',
		label: 'Uploading',
	},
	argTypes: {
		value: { control: 'number', description: 'Current value of the progress' },
		min: { control: 'number', description: 'Lower bound of the range' },
		max: { control: 'number', description: 'Upper bound of the range' },
		size: {
			control: 'select',
			options: ['xxs', 'xs', 'sm', 'md', 'lg'],
			description: 'Radius, stroke width and type scale of the circle',
		},
		label: { control: 'text', description: 'Caption shown with the value' },
		valueFormatter: { control: false, description: 'Formats the value shown in the middle' },
	},
} satisfies Meta<typeof ProgressBarCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { value: 60, size: 'md', label: 'Uploading' },
	render: (args) => (
		<div className="flex flex-wrap items-end gap-2xl">
			<ProgressBarCircle {...args} />
			<ProgressBarHalfCircle value={args.value} size={args.size} label={args.label} />
		</div>
	),
};
