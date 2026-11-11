import type { Meta, StoryObj } from '@storybook/react-vite';
import { QRCode } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/QrCode',
	component: QRCode,
	tags: ['autodocs'],
	args: {
		value: 'https://example.com/product/42',
		size: 'md',
	},
	argTypes: {
		value: { control: 'text', description: 'The value to encode in the QR code' },
		size: {
			control: 'select',
			options: ['md', 'lg'],
			description: 'Rendered size of the QR code',
		},
		options: { control: false, description: 'Additional options to customize the QR code' },
	},
} satisfies Meta<typeof QRCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
