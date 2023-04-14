import { ChangeEvent } from 'react'
import useStore from 'renderer/hooks/useStore'
import useDispatch from 'renderer/hooks/useDispatch'
import useSWR from 'renderer/hooks/useSWR'
import RenderCounter from 'renderer/components/RenderCounter/RenderCounter'

const ALL_BREEDS_ENDPOINT = 'https://dog.ceo/api/breeds/list/all'
const swrOptions = { revalidateOn: [] }

const useFavoriteDogImage = (breed: string) => {
	const key = () => !!breed && `https://dog.ceo/api/breed/${breed}/images/random`
	const image = useSWR<{ message: string }>(key, swrOptions)
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
	const allBreeds = useSWR<{ message: Record<string, unknown> }>(ALL_BREEDS_ENDPOINT, swrOptions)
	return Object.keys(allBreeds?.data?.message ?? {})
}

const Dog = () => {
	const allBreeds = useAllBreeds()
	const favorite = useStore(x => x.dog?.favorite)
	const dispatch = useDispatch()

	const handleChangeFavorite = (e: ChangeEvent<HTMLSelectElement>) =>
		dispatch({ type: 'DOG:SELECT_FAVORITE_BREED', payload: e.target.value })

	return (
		<div>
			<RenderCounter />
			<select value={favorite} onChange={handleChangeFavorite}>
				<option value=''>---</option>
				{allBreeds?.map(x => (
					<option key={x} value={x}>
						{x}
					</option>
				))}
			</select>
			<div style={{ width: 128, height: 128 }}>{favorite && <FavoriteDog breed={favorite} />}</div>
		</div>
	)
}

export default Dog
