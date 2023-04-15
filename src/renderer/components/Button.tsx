import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import clsx from 'clsx'

type ButtonBaseProps = VariantProps<typeof buttonClasses> & {
	children: React.ReactNode
}

interface ButtonAsAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string
}

interface ButtonAsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	href?: never
}

type ButtonProps = ButtonBaseProps & (ButtonAsAnchorProps | ButtonAsButtonProps)

const buttonClasses = cva('relative inline-flex items-center justify-center', {
	variants: {
		intent: {
			primary: 'text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none',
			ghost: 'border-none rounded hover:bg-gray-200 focus:outline-none',
		},
		size: {
			md: 'h-7 px-3',
			'square-md': 'h-7 w-7',
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
}) => <span className={clsx('highlight', className)}>{children}</span>

export const Button = ({ children, intent, size, className, ...props }: ButtonProps) => {
	const classes = buttonClasses({ intent, size, className })

	if ('href' in props && props.href !== undefined) {
		return (
			<a {...props} className={classes}>
				{children}
			</a>
		)
	}

	return (
		<button {...props} className={classes}>
			{children}
		</button>
	)
}
