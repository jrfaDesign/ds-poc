'use client';

import { TextArea as AriaTextArea, TextField as AriaTextField } from 'react-aria-components';
import { HintText } from '../Input/hint-text';
import { Label } from '../Input/label';
import { cx } from '../shared/cx';
import type { TextAreaBaseProps, TextFieldProps } from './Textarea.types';
export type { TextAreaBaseProps, TextFieldProps } from './Textarea.types';

export const TextAreaBase = ({ className, size = 'md', ...props }: TextAreaBaseProps) => {
	return (
		<AriaTextArea
			{...props}
			className={(state) =>
				cx(
					'w-full scroll-py-3 rounded-input bg-primary text-primary shadow-xs transition duration-100 ease-linear ring-inset placeholder:text-placeholder autofill:rounded-input autofill:text-primary focus:outline-hidden',

					size === 'sm' && 'p-lg text-xs',
					size === 'md' && 'px-xl py-lg text-sm',

					// UntitledUI: focus = 2px brand inset ring (not an outline)
					state.isFocused && !state.isDisabled
						? state.isInvalid
							? 'ring-2 ring-border-error'
							: 'ring-2 ring-border-brand'
						: state.isInvalid
							? 'ring-1 ring-border-error-subtle'
							: 'ring-1 ring-border-primary',
					state.isDisabled && 'cursor-not-allowed opacity-50',

					typeof className === 'function' ? className(state) : className
				)
			}
		/>
	);
};

TextAreaBase.displayName = 'TextAreaBase';

export const TextArea = ({
	label,
	hint,
	tooltip,
	textAreaRef,
	hideRequiredIndicator,
	textAreaClassName,
	placeholder,
	className,
	rows,
	cols,
	size = 'md',
	...props
}: TextFieldProps) => {
	return (
		<AriaTextField
			{...props}
			className={(state) =>
				cx(
					'group flex h-max w-full flex-col items-start justify-start gap-sm',
					typeof className === 'function' ? className(state) : className
				)
			}
		>
			{({ isInvalid, isRequired }) => (
				<>
					{label && (
						<Label
							isRequired={hideRequiredIndicator ? !hideRequiredIndicator : isRequired}
							tooltip={tooltip}
						>
							{label}
						</Label>
					)}

					<TextAreaBase
						placeholder={placeholder}
						className={textAreaClassName}
						ref={textAreaRef}
						rows={rows}
						cols={cols}
						size={size}
					/>

					{hint && (
						<HintText isInvalid={isInvalid} size={size}>
							{hint}
						</HintText>
					)}
				</>
			)}
		</AriaTextField>
	);
};

TextArea.displayName = 'TextArea';
