import { ChangeEvent } from 'react'

import { focusById } from 'renderer/utils/focusChildElement'
import { handleKeyboardNavigation } from 'renderer/utils/keyboardNavigation'
import useStore from 'renderer/hooks/useStore'
import useDispatch from 'renderer/hooks/useDispatch'
import useSWR from 'renderer/hooks/useSWR'
import { Toolbar } from 'renderer/components/Toolbar'

const ALL_BREEDS_ENDPOINT = 'https://dog.ceo/api/breeds/list/all'
const swrOptions = { revalidateOn: [] }

const useFavoriteDogImage = (breed: string) => {
	const key = () => !!breed && `https://dog.ceo/api/breed/${breed}/images/random`
	const image = useSWR<{ message: string }>('url', key, swrOptions)
	return image?.data?.message
}

const FavoriteDog = ({ breed }: { breed: string }) => {
	const image = useFavoriteDogImage(breed)
	if (!image) return null
	return (
		<img alt={breed} style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={image} />
	)
}

const useAllBreeds = () => {
	const allBreeds = useSWR<{ message: Record<string, unknown> }>(
		'url',
		ALL_BREEDS_ENDPOINT,
		swrOptions,
	)
	return Object.keys(allBreeds?.data?.message ?? {})
}

const keyboardHandler = handleKeyboardNavigation(
	'horizontal',
	e => e.key === 'ArrowLeft' && focusById('sidebar'),
)

const Dog = () => {
	const allBreeds = useAllBreeds()
	const favorite = useStore(x => x.dog?.favorite)
	const dispatch = useDispatch()

	const handleChangeFavorite = (e: ChangeEvent<HTMLSelectElement>) =>
		dispatch({ type: 'DOG:SELECT_FAVORITE_BREED', payload: e.target.value })

	return (
		<>
			<Toolbar>dog</Toolbar>
			<div id='view'>
				<select {...keyboardHandler} value={favorite} onChange={handleChangeFavorite} autoFocus>
					<option value=''>---</option>
					{allBreeds?.map(x => (
						<option key={x} value={x}>
							{x}
						</option>
					))}
				</select>
				<div style={{ width: 128, height: 128 }}>
					{favorite && <FavoriteDog breed={favorite} />}
				</div>
			</div>
		</>
	)
}

export default Dog
