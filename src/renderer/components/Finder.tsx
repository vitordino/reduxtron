import useSWR from 'renderer/hooks/useSWR'
import { Toolbar } from 'renderer/components/Toolbar'

const Finder = () => {
	const x = useSWR('fs', '/Applications')
	return (
		<>
			<Toolbar>finder</Toolbar>
			<div className='flex-1'>
				<pre>{JSON.stringify(x, null, 2)}</pre>
			</div>
		</>
	)
}

export default Finder
