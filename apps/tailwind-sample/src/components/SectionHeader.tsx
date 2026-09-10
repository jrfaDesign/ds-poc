import type { ReactNode } from 'react';
import { Typography } from '@repo/ui-web-tailwind';

type SectionHeaderProps = {
	title: string;
	subtitle?: string;
	children?: ReactNode;
	className?: string;
};

export function SectionHeader({ title, subtitle, children, className }: SectionHeaderProps) {
	return (
		<div className={['flex items-end justify-between mb-3', className].filter(Boolean).join(' ')}>
			<div>
				<Typography role="h4" size="lg" color="text-primary">
					{title}
				</Typography>
				{subtitle && (
					<Typography role="caption" color="text-secondary" className="mt-xxs">
						{subtitle}
					</Typography>
				)}
			</div>
			{children}
		</div>
	);
}
