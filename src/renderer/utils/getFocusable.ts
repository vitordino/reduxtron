const FOCUSABLE_SELECTOR = [
	'[contenteditable]',
	'[tabindex="0"]:not([disabled])',
	'a[href]',
	'audio[controls]',
	'button:not([disabled])',
	'iframe',
	"input:not([disabled]):not([type='hidden'])",
	'select:not([disabled])',
	'summary',
	'textarea:not([disabled])',
	'video[controls]',
].join(', ')

export const getFocusable = (parent?: HTMLElement | null) =>
	parent?.querySelector?.(FOCUSABLE_SELECTOR) as HTMLElement | null | undefined

export const getLastFocusable = (parent?: HTMLElement | null, nth = -1) => {
	const items = parent?.querySelectorAll?.(FOCUSABLE_SELECTOR)
	return items?.[items?.length + nth] as HTMLElement | null | undefined
}
