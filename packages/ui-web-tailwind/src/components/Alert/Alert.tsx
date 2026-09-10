import type { AlertIntent } from './Alert.types';
import type { AlertProps } from './Alert.types';
import { resolveMargin } from '../shared/spacing';

const intentClass: Record<AlertIntent, string> = {
	error:
		'border-w-feedback-error rounded-feedback-error bg-feedback-error-bg border-feedback-error-border text-feedback-error-on',
	success:
		'border-w-feedback-success rounded-feedback-success bg-feedback-success-bg border-feedback-success-border text-feedback-success-on',
	warning:
		'border-w-feedback-warning rounded-feedback-warning bg-feedback-warning-bg border-feedback-warning-border text-feedback-warning-on',
	info: 'border-w-feedback-info rounded-feedback-info bg-feedback-info-bg border-feedback-info-border text-feedback-info-on',
};

export function Alert({
	intent,
	title,
	children,
	invert = false,
	className,
	style,
	...margin
}: AlertProps) {
	return (
		<div
			className={[
				'border p-md flex flex-col gap-xs',
				intentClass[intent],
				invert && 'ds-invert',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			style={resolveMargin(margin)}
			role="alert"
		>
			{title && <p className="font-semibold text-sm">{title}</p>}
			<p className="text-sm">{children}</p>
		</div>
	);
}
