declare module '*.svelte' {
	import type { ComponentType } from 'svelte'
	const component: ComponentType
	export default component
}

declare module '*.png' {
	const src: string
	export default src
}
declare module '*.jpg' {
	const src: string
	export default src
}
declare module '*.svg' {
	const src: string
	export default src
}
