import * as NavigationMenu from '@radix-ui/react-navigation-menu'

import compare from 'renderer/utils/compare'
import useStore from 'renderer/hooks/useStore'
import useDispatch from 'renderer/hooks/useDispatch'
import { useFileSystemSWR } from 'renderer/hooks/useSWR'
import { Toolbar } from 'renderer/components/Toolbar'
import { Button } from 'renderer/components/Button'
import { RxChevronRight, RxChevronUp, RxFile } from 'react-icons/rx'

const Finder = () => {
	const { path, state: pathState } = useStore(x => x.folder, compare) || {}
	const { data } = useFileSystemSWR(path)
	const dispatch = useDispatch()

	const permutations = path?.split('/').reduce<Record<string, string>>((acc, curr, index, arr) => {
		if (!curr) return { ...acc, '/': '/' }
		return { ...acc, [curr]: arr.slice(0, index + 1).join('/') }
	}, {})

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
			<Toolbar>finder</Toolbar>
			<Button
				onClick={() => dispatch({ type: 'FOLDER:PICK' })}
				type='button'
				disabled={pathState === 'loading'}
			>
				pick folder
			</Button>
			<Button
				onClick={() => dispatch({ type: 'FOLDER:CLEAR' })}
				type='button'
				intent='ghost'
				disabled={pathState === 'loading' || !path}
			>
				clear folder
			</Button>
			<Button
				onClick={moveUp}
				type='button'
				intent='ghost'
				disabled={pathState === 'loading' || !path}
			>
				<RxChevronUp />
			</Button>
			{permutations && (
				<select value={path} onChange={handleSelectChange}>
					{Object.entries(permutations).map(([key, value]) => (
						<option key={value} value={value}>
							{key}
						</option>
					))}
				</select>
			)}
			<pre>{JSON.stringify({ path, permutations }, null, 2)}</pre>
			<NavigationMenu.Root>
				<NavigationMenu.List>
					{data?.map(({ name, folder }) => (
						<NavigationMenu.Item key={name}>
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
