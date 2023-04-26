import { ReactNode } from 'react'
import { RxComponentNone } from 'react-icons/rx'

type EmptyStateProps = {
	title?: ReactNode
	description?: ReactNode
	children?: ReactNode
	icon?: (props: Record<string, unknown>) => JSX.Element
}

const EmptyState = ({ icon, title, description, children }: EmptyStateProps) => {
	const Icon = icon || RxComponentNone
	return (
		<div className='flex-1 flex flex-col'>
			<div className='flex-1 flex-col flex items-center justify-center'>
				<div className='flex items-center justify-center'>
					<div className='w-48 h-48 rounded-full bg-slate-3 flex items-center justify-center'>
						<Icon className='w-16 h-16 text-slate-7' />
					</div>
				</div>
				{title && <h2 className='mt-3 text-base text-slate-12'>{title}</h2>}
				{description && <p className='mt-1 text-slate-9'>{description}</p>}
				{children}
			</div>
		</div>
	)
}

export default EmptyState
