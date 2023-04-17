import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import cn from 'clsx'

type ToolbarProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const Toolbar = ({ className, ...props }: ToolbarProps) => (
	<div
		{...props}
		className={cn(
			'drag-region sticky top-0 h-9 px-4 text-sm w-full dark:bg-slate-3 border-b border-slate-4 dark:border-slate-1 flex items-center',
			className,
		)}
	/>
)
