import { ButtonHTMLAttributes, forwardRef } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import cn from 'clsx'

type ButtonProps = VariantProps<typeof buttonClasses> & ButtonHTMLAttributes<HTMLButtonElement>

const buttonClasses = cva('relative inline-flex items-center justify-center flex-shrink-0', {
	variants: {
		intent: {
			primary: cn(
				'text-indigo-11 bg-indigo-4 hover:bg-indigo-5 active:bg-indigo-6',
				'disabled:text-slate-11 disabled:bg-slate-4 disabled:hover:bg-slate-4 disabled:active:bg-active-4 disabled:cursor-not-allowed',
			),
			ghost: 'text-slate-10 border-none hover:bg-slate-4 hover:text-slate-11',
		},
		size: {
			xs: 'rounded-sm h-7 px-3',
			'square-xs': 'rounded-sm h-[18px] w-[18px]',
			md: 'rounded h-7 px-3',
			'square-md': 'rounded h-7 w-7',
		},
	},
	defaultVariants: {
		intent: 'primary',
		size: 'md',
	},
})

export const Highlight = ({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) => <span className={cn('highlight', className)}>{children}</span>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, intent, size, className, ...props }, ref) => {
		const classes = buttonClasses({ intent, size, className })
		return (
			<button ref={ref} {...props} className={classes}>
				{children}
			</button>
		)
	},
)

Button.displayName = 'Button'
