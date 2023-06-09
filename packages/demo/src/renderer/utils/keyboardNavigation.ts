import { KeyboardEvent, KeyboardEventHandler } from 'react'

type Orientation = 'horizontal' | 'vertical' | 'all'

const KEYS_BY_ORIENTATION_MAP = {
	horizontal: ['ArrowLeft', 'ArrowRight'],
	vertical: ['ArrowUp', 'ArrowDown'],
}

const ALL_KEYS = { ...KEYS_BY_ORIENTATION_MAP.horizontal, ...KEYS_BY_ORIENTATION_MAP.vertical }

export const handleKeyboardNavigation = (
	orientation: Orientation,
	handler: KeyboardEventHandler,
) => ({
	onKeyDown: (e: KeyboardEvent) => {
		const preventList = KEYS_BY_ORIENTATION_MAP?.[orientation || ''] || ALL_KEYS
		if (!preventList.includes(e.key)) return
		handler?.(e)
	},
})

export const preventKeyboardNavigation = (
	orientation: Orientation,
	handler?: KeyboardEventHandler,
) => ({
	onKeyDown: (e: KeyboardEvent) => {
		const preventList = KEYS_BY_ORIENTATION_MAP?.[orientation || ''] || ALL_KEYS
		handler?.(e)
		if (!preventList.includes(e.key)) return
		e.preventDefault()
	},
})
