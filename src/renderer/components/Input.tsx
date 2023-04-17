import type { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import cn from 'clsx'

type InputProps = Omit<
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	'type'
>
export const Input = ({ className, ...props }: InputProps) => (
	<input
		{...props}
		type='text'
		className={cn(
			'w-full pl-4 pr-6 text-xs rounded h-7',
			'border border-transparent',
			'placeholder-slate-8 focus:placeholder-slate-9',
			'ring-0 focus:ring-0 focus-visible:ring-0 focus:outline-none focus-visible:outline-none outline-none',
			'border-slate-5 hover:border-slate-5 focus:border-slate-6 focus-visible:border-slate-6 active:border-slate-7',
			'bg-slate-4',
			className,
		)}
	/>
)
