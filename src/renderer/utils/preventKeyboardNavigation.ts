import { KeyboardEvent, KeyboardEventHandler } from 'react'

const KEYS_BY_ORIENTATION_MAP = {
	horizontal: ['ArrowLeft', 'ArrowRight'],
	vertical: ['ArrowUp', 'ArrowDown'],
}

const ALL_KEYS = { ...KEYS_BY_ORIENTATION_MAP.horizontal, ...KEYS_BY_ORIENTATION_MAP.vertical }

export const preventKeyboardNavigation = (
	orientation: 'horizontal' | 'vertical' | 'all',
	handler?: KeyboardEventHandler,
) => ({
	onKeyDown: (e: KeyboardEvent) => {
		const preventList = KEYS_BY_ORIENTATION_MAP?.[orientation || ''] || ALL_KEYS
		if (!preventList.includes(e.key)) return
		e.preventDefault()
		handler?.(e)
	},
})
