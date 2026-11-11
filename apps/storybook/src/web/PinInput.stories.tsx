import type { Meta, StoryObj } from '@storybook/react-vite';
import { PinInput } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/PinInput',
	component: PinInput,
	tags: ['autodocs'],
	args: {
		size: 'md',
		disabled: false,
		invalid: false,
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg'],
			description: 'Dimensions, corner radius and type scale of every slot',
		},
		disabled: { control: 'boolean', description: 'Whether the pin cannot be edited' },
		invalid: {
			control: 'boolean',
			description: 'Error state: styles the slots and marks them aria-invalid',
		},
	},
} satisfies Meta<typeof PinInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { size: 'md', disabled: false, invalid: false },
	render: (args) => (
		<PinInput {...args} aria-label="Verification code">
			<PinInput.Group maxLength={6}>
				{Array.from({ length: 6 }, (_, i) => (
					<PinInput.Slot key={i} index={i} />
				))}
			</PinInput.Group>
		</PinInput>
	),
};
