import type { Meta, StoryObj } from '@storybook/react-vite';
import { SHAPE_PRESETS, defaultTheme, stylePresetKeys } from '@repo/foundations';

const meta = {
	title: 'Design system/Spacing & radii',
	tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The 4px-grid spacing scale with a bar visualising each step. */
export const SpacingScale: Story = {
	render: () => (
		<div className="flex flex-col gap-xs">
			{Object.entries(defaultTheme.spacing).map(([token, px]) => (
				<div key={token} className="flex items-center gap-sm">
					<span className="w-16 text-sm font-mono">{token}</span>
					<span className="w-12 text-sm opacity-60">{px}px</span>
					<div
						className="h-3 rounded-xs bg-brand-solid"
						style={{ width: `${Math.max(px, 2)}px` }}
					/>
				</div>
			))}
		</div>
	),
};

/** The radii scale: every value components can use. */
export const RadiiScale: Story = {
	render: () => (
		<div className="flex flex-wrap gap-md">
			{Object.entries(defaultTheme.radii).map(([token, px]) => (
				<div key={token} className="flex flex-col items-center gap-xxs">
					<div
						className="w-16 h-16 border-2 border-solid border-brand-solid"
						style={{ borderRadius: `${px}px` }}
					/>
					<span className="text-xs font-mono">{token}</span>
					<span className="text-xs opacity-60">{px}px</span>
				</div>
			))}
		</div>
	),
};

const SHAPE_BUCKETS = ['button', 'input', 'card'] as const;

/** How each shape preset resolves button / input / card radii. */
export const ShapePresets: Story = {
	render: () => (
		<table className="text-sm border-collapse">
			<thead>
				<tr className="text-left border-b border-solid border-black/10">
					<th className="py-xs pr-md font-semibold">Preset</th>
					{SHAPE_BUCKETS.map((bucket) => (
						<th key={bucket} className="py-xs pr-md font-semibold">
							{bucket}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{stylePresetKeys.map((preset) => (
					<tr key={preset} className="border-b border-solid border-black/5">
						<td className="py-xs pr-md font-mono">{preset}</td>
						{SHAPE_BUCKETS.map((bucket) => {
							const px = defaultTheme.radii[SHAPE_PRESETS[preset][bucket]];
							return (
								<td key={bucket} className="py-xs pr-md">
									<div
										className="w-16 h-8 bg-brand-primary border border-solid border-brand-solid"
										style={{ borderRadius: `${px}px` }}
									/>
									<span className="text-xs opacity-60">{px}px</span>
								</td>
							);
						})}
					</tr>
				))}
			</tbody>
		</table>
	),
};
