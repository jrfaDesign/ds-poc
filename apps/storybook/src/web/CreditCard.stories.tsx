import type { Meta, StoryObj } from '@storybook/react-vite';
import { CreditCard } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/CreditCard',
	component: CreditCard,
	tags: ['autodocs'],
	args: {
		company: 'Untitled Bank',
		cardNumber: '4242 4242 4242 4242',
		cardHolder: 'JOHN APPLESEED',
		cardExpiration: '04/28',
		type: 'brand-dark',
		width: 316,
	},
	argTypes: {
		company: { control: 'text', description: 'Issuer name printed in the top left corner' },
		cardNumber: { control: 'text', description: 'Card number printed along the bottom' },
		cardHolder: { control: 'text', description: 'Cardholder name, rendered in uppercase' },
		cardExpiration: { control: 'text', description: 'Expiry date next to the cardholder name' },
		type: {
			control: 'select',
			options: [
				'transparent',
				'transparent-gradient',
				'brand-dark',
				'brand-light',
				'gray-dark',
				'gray-light',
				'transparent-strip',
				'gray-strip',
				'gradient-strip',
				'salmon-strip',
				'gray-strip-vertical',
				'gradient-strip-vertical',
				'salmon-strip-vertical',
			],
			description: 'Visual style of the card background and decorative strip',
		},
		width: { control: 'number', description: 'Rendered width in pixels, scaled proportionally' },
	},
} satisfies Meta<typeof CreditCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
