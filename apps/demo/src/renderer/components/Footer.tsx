import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import cn from 'clsx'

type FooterProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

export const Footer = ({ className, children, id = 'footer', ...props }: FooterProps) => (
	<>
		<div className='h-9' />
		<footer
			id={id}
			className={cn(
				'flex fixed w-[stretch] bottom-0 h-9 bg-slate-2 border-slate-4 border-t z-10',
				className,
			)}
			{...props}
		>
			{children}
		</footer>
	</>
)
