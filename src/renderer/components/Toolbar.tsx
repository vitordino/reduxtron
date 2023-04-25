import * as Primitives from '@radix-ui/react-toolbar'
import cn from 'clsx'

export const Toolbar = ({ className, ...props }: Primitives.ToolbarProps) => (
	<Primitives.Root
		{...props}
		className={cn(
			'drag-region text-slate-11 flex-shrink-0 fixed top-0 h-9 px-4 text-sm w-[stretch] bg-slate-1 dark:bg-slate-3 border-b border-slate-4 dark:border-slate-1 flex items-center z-100',
			className,
		)}
	/>
)

export const ToolbarButton = ({
	className,
	type = 'button',
	...props
}: Primitives.ToolbarButtonProps) => (
	<Primitives.Button
		type={type}
		className={cn(
			'no-drag-region cursor-pointer h-full focus:outline-none hover:text-slate-12 focus:text-slate-12 hover:bg-slate-3 focus:bg-slate-3 dark:hover:bg-slate-5 dark:focus:bg-slate-5 ring-indigo-8 px-4 disabled:text-slate-8 disabled:pointer-events-none',
			className,
		)}
		{...props}
	/>
)
