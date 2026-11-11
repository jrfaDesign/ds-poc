/** Alert type: semantic category shared by both platforms. */
export type AlertType = 'error' | 'success' | 'warning' | 'info';

/** Alert intent: alias of `AlertType` kept for readability at call sites. */
export type AlertIntent = AlertType;

/** Props that are identical on every platform. */
export type AlertSharedProps = {
	/** Visual intent: controls background, border, and text color. */
	intent: AlertIntent;
	/** Optional title text displayed above the message. */
	title?: string;
};
