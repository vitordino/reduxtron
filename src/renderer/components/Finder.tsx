import * as NavigationMenu from '@radix-ui/react-navigation-menu'

import compare from 'renderer/utils/compare'
import useStore from 'renderer/hooks/useStore'
import useDispatch from 'renderer/hooks/useDispatch'
import { useFileSystemSWR } from 'renderer/hooks/useSWR'
import { Toolbar, ToolbarButton } from 'renderer/components/Toolbar'

import { RxChevronRight, RxChevronUp, RxCross2, RxFile, RxLaptop } from 'react-icons/rx'

const Finder = () => {
	const { path, state: pathState } = useStore(x => x.folder, compare) || {}
	const { data } = useFileSystemSWR(path)
	const dispatch = useDispatch()

	const permutations = path?.split('/').reduce<Record<string, string>>((acc, curr, index, arr) => {
		if (!curr) return { ...acc, '/': '/' }
		return { ...acc, [curr]: arr.slice(0, index + 1).join('/') }
	}, {})

	const hasPermutations = Object.keys(permutations || {}).length > 1

	const handleSelectChange = e => dispatch({ type: 'FOLDER:SET', payload: e.target.value })

	const moveUp = () => {
		if (!path) return
		return dispatch({
			type: 'FOLDER:SET',
			payload: path.replace(/\/([^/]+)\/?$/, ''),
		})
	}

	const onFileClick = (folder: boolean, name: string) => () => {
		if (!folder || !name) return
		return dispatch({ type: 'FOLDER:SET', payload: `${path}/${name}` })
	}

	return (
		<>
			<Toolbar className='items-center px-0 text-slate-11'>
				<ToolbarButton
					onClick={() => dispatch({ type: 'FOLDER:PICK' })}
					disabled={pathState === 'loading'}
				>
					<RxLaptop />
				</ToolbarButton>
				{hasPermutations && (
					<select
						value={path}
						onChange={handleSelectChange}
						className='no-drag-region cursor-pointer h-full focus:outline-none hover:text-slate-12 focus:slate-12 hover:bg-slate-5 focus:bg-slate-5 ring-indigo-8 px-2 mx-0'
					>
						{Object.entries(permutations || {}).map(([key, value]) => (
							<option key={value} value={value}>
								{key}
							</option>
						))}
					</select>
				)}
				{!hasPermutations && <div className='px-3 flex-shrink-0'>finder</div>}
				<div className='flex-1' />
				<ToolbarButton onClick={moveUp} disabled={pathState === 'loading' || !path}>
					<RxChevronUp />
				</ToolbarButton>
				<ToolbarButton onClick={() => dispatch({ type: 'FOLDER:CLEAR' })} disabled={!path}>
					<RxCross2 />
				</ToolbarButton>
			</Toolbar>

			<pre>{JSON.stringify({ path, permutations }, null, 2)}</pre>
			<NavigationMenu.Root>
				<NavigationMenu.List>
					{data?.map(({ name, folder }, index) => (
						<NavigationMenu.Item key={name} autoFocus={!index}>
							<NavigationMenu.NavigationMenuLink asChild>
								<button onClick={onFileClick(folder, name)} className='flex'>
									{folder ? <RxChevronRight /> : <RxFile />} {name}
								</button>
							</NavigationMenu.NavigationMenuLink>
						</NavigationMenu.Item>
					))}
				</NavigationMenu.List>
			</NavigationMenu.Root>
		</>
	)
}

export default Finder
