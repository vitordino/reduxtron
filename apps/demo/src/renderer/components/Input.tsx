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
			className,
			'w-full pl-4 pr-6 text-xs rounded h-7',
			'border',
			'placeholder-slate-8 focus:placeholder-slate-9',
			'border-slate-5 hover:border-slate-5 focus-visible:border-slate-2',
			'checked:border-indigo-8',
			'bg-slate-4',
		)}
	/>
)
