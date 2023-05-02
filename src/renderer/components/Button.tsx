import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import cn from 'clsx'

type ButtonBaseProps = VariantProps<typeof buttonClasses> & {
	children: React.ReactNode
}

interface ButtonAsAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string
}

interface ButtonAsLinkProps extends LinkProps {
	to: string
}

interface ButtonAsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	href?: never
	to?: never
}

type ButtonProps = ButtonBaseProps & (ButtonAsAnchorProps | ButtonAsButtonProps | ButtonAsLinkProps)

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

export const Button = ({ children, intent, size, className, ...props }: ButtonProps) => {
	const classes = buttonClasses({ intent, size, className })

	if ('to' in props && props.to !== undefined) {
		return (
			<Link {...props} className={classes}>
				{children}
			</Link>
		)
	}

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
