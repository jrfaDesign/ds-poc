import type { Meta, StoryObj } from '@storybook/react-vite';
import { defaultTheme, type FontSizeToken } from '@repo/foundations';
import { Typography } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Design system/Typography',
	tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const WEB_ROLES = ['h1', 'h2', 'h3', 'h4', 'p', 'caption', 'label', 'overline'] as const;

type SizeEntry = {
	fontSizePx: number;
	fontSizeRem: number;
	lineHeightPx: number;
	letterSpacing?: number;
};

/** The type scale as defined in the theme: size, line height, tracking. */
export const Scale: Story = {
	render: () => (
		<table className="w-full text-sm border-collapse">
			<thead>
				<tr className="text-left border-b border-solid border-black/10">
					<th className="py-xs pr-md font-semibold">Token</th>
					<th className="py-xs pr-md font-semibold">Size</th>
					<th className="py-xs pr-md font-semibold">Rem</th>
					<th className="py-xs pr-md font-semibold">Line height</th>
					<th className="py-xs font-semibold">Letter spacing</th>
				</tr>
			</thead>
			<tbody>
				{(Object.entries(defaultTheme.typography.fontSize) as [FontSizeToken, SizeEntry][]).map(
					([token, size]) => (
						<tr key={token} className="border-b border-solid border-black/5">
							<td className="py-xs pr-md font-mono">{token}</td>
							<td className="py-xs pr-md">{size.fontSizePx}px</td>
							<td className="py-xs pr-md">{size.fontSizeRem}rem</td>
							<td className="py-xs pr-md">{size.lineHeightPx}px</td>
							<td className="py-xs">{size.letterSpacing ? `${size.letterSpacing}em` : 'normal'}</td>
						</tr>
					)
				)}
			</tbody>
		</table>
	),
};

/** Web heading/body roles rendered through the platform Typography component. */
export const WebRoles: Story = {
	render: () => (
		<div className="flex flex-col gap-sm">
			{WEB_ROLES.map((role) => (
				<div key={role}>
					<div className="text-xs opacity-60 mb-xxs">{role}</div>
					<Typography role={role}>The quick brown fox jumps over the lazy dog</Typography>
				</div>
			))}
		</div>
	),
};
