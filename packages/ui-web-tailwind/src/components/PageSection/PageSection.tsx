import type { ReactNode } from 'react';
import type { SpacingToken, WidthToken, LayoutToken } from '@repo/foundations';
import type { Responsive } from '../shared/responsive';
import { Container } from '../Container/Container';

export type PageSectionProps = {
	children?: ReactNode;
	padding?: Responsive<SpacingToken>;
	maxWidth?: Responsive<WidthToken>;
	inset?: Responsive<LayoutToken>;
	fluid?: boolean;
	background?: string;
	invert?: boolean;
	/** Force light or dark mode colors. Bypasses invert when provided. */
	mode?: 'light' | 'dark';
	className?: string;
	id?: string;
};

function toBgClass(token: string): string {
	return token.startsWith('bg-') ? token : `bg-${token}`;
}

export function PageSection({
	children,
	padding = 'xl',
	maxWidth,
	inset,
	fluid,
	background,
	invert = false,
	mode,
	className,
	id,
}: PageSectionProps) {
	const bpKeys = ['mobile', 'tablet', 'desktop', 'wide', 'ultra'] as const;

	const paddingClasses: string[] = [];

	if (typeof padding === 'string') {
		for (const bp of bpKeys) {
			paddingClasses.push(`ds-padblock-${bp}-${padding}`);
		}
	} else if (typeof padding === 'object' && padding !== null) {
		for (const bp of bpKeys) {
			const token = padding[bp];
			if (token) paddingClasses.push(`ds-padblock-${bp}-${token}`);
		}
	}

	const bgClass = !mode && background ? toBgClass(background) : undefined;

	const sectionClasses = [
		mode === 'dark' && 'ds-force-dark',
		mode === 'light' && 'ds-force-light',
		!mode && invert && 'ds-invert',
		bgClass,
		...paddingClasses,
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<section id={id} className={sectionClasses}>
			<Container fluid={fluid} maxWidth={maxWidth} inset={inset}>
				{children}
			</Container>
		</section>
	);
}
