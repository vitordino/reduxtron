declare module '*.vue' {
	import type { Component } from 'vue'
	const component: Component
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
