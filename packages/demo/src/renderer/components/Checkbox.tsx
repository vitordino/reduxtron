import type { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import cn from 'clsx'

type CheckboxProps = Omit<
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	'type'
>

export const Checkbox = ({ className, ...props }: CheckboxProps) => (
	<input
		{...props}
		type='checkbox'
		className={cn(
			'rounded-sm appearance-none form-checkbox form-stick bg-slate-1 checked:bg-indigo-9 hover:checked:bg-indigo-10 active:checked:bg-indigo-11 checked:border-transparent border border-slate-6 md:border-transparent hover:border-slate-7 w-3.5 h-3.5 cursor-pointer',
			className,
		)}
	/>
)
