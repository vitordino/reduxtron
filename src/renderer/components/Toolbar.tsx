import type { DetailedHTMLProps, HTMLAttributes, ButtonHTMLAttributes } from 'react'
import cn from 'clsx'

type ToolbarProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const Toolbar = ({ className, ...props }: ToolbarProps) => (
	<div
		{...props}
		className={cn(
			'drag-region flex-shrink-0 fixed top-0 h-9 px-4 text-sm w-[stretch] bg-slate-1 dark:bg-slate-3 border-b border-slate-4 dark:border-slate-1 flex items-center z-100',
			className,
		)}
	/>
)

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const ToolbarButton = ({ className, type = 'button', ...props }: ButtonProps) => (
	<button
		type={type}
		className={cn(
			'no-drag-region cursor-pointer h-full focus:outline-none hover:text-slate-12 focus:slate-12 hover:bg-slate-5 focus:bg-slate-5 ring-indigo-8 px-4 hover:disabled:bg-none',
			className,
		)}
		{...props}
	/>
)
