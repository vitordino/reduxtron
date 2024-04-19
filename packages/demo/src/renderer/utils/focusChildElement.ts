import { getFocusable } from 'src/renderer/utils/getFocusable'

export const focusFirstElement = (parent?: HTMLElement | null) => getFocusable(parent)?.focus?.()

export const focusById = (id: string) =>
	focusFirstElement(document.getElementById(id) as HTMLElement | null)
