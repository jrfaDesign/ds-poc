import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButton, RadioGroup } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/RadioButton',
	component: RadioButton,
	tags: ['autodocs'],
	args: {
		value: 'first',
		label: 'Daily digest',
		isDisabled: false,
	},
	argTypes: {
		label: { control: 'text', description: 'Content rendered beside the radio circle' },
		hint: { control: 'text', description: 'Supporting text rendered under the label' },
		isDisabled: { control: 'boolean', description: 'Muted, non-interactive state' },
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Control dimensions and typography',
		},
	},
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { value: 'first' },
	render: (args) => (
		<RadioGroup aria-label="Notification frequency" defaultValue="first">
			<RadioButton {...args} value="first" />
			<RadioButton value="second" size={args.size} isDisabled={args.isDisabled}>
				Weekly summary
			</RadioButton>
			<RadioButton value="third" size={args.size} isDisabled={args.isDisabled}>
				Only major updates
			</RadioButton>
		</RadioGroup>
	),
};
