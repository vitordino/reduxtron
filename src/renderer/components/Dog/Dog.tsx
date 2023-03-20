import { ChangeEvent, useEffect } from 'react'
import useStore from 'renderer/store'
import useDispatch from 'renderer/hooks/useDispatch'
import RenderCounter from 'renderer/components/RenderCounter/RenderCounter'

const ALL_BREEDS_ENDPOINT = 'https://dog.ceo/api/breeds/list/all'

const compare = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b)

const useFavoriteDogImage = (breed: string) => {
	const key = `https://dog.ceo/api/breed/${breed}/images/random`
	const image = useStore(x => x.swr?.[key], compare)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch({ type: 'SWR:FETCH_URL', payload: [key] })
	}, [dispatch, key])

	return image?.data?.message as string | undefined
}

const FavoriteDog = ({ breed }: { breed: string }) => {
	const image = useFavoriteDogImage(breed)
	if (!image) return null
	return (
		<img alt={breed} style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={image} />
	)
}

const useAllBreeds = () => {
	const allBreeds = useStore(x => x.swr?.[ALL_BREEDS_ENDPOINT], compare)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch({
			type: 'SWR:FETCH_URL',
			payload: [ALL_BREEDS_ENDPOINT, { revalidateOn: [] }],
		})
	}, [dispatch])

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
