import { MenuItemConstructorOptions } from 'electron'
import type { Dispatch, State } from 'shared/reducers'

const ALL_BREEDS_ENDPOINT = 'https://dog.ceo/api/breeds/list/all'

const TrayDog = (state: Partial<State>, dispatch: Dispatch): MenuItemConstructorOptions => {
	const breedsSWR = state?.swr?.[ALL_BREEDS_ENDPOINT]
	const status = breedsSWR?.state || 'unknown'
	// @ts-expect-error response might be a different shape
	const breeds = Object.keys(breedsSWR?.data?.message || {})
	const favorite = state?.dog?.favorite
	if (!breedsSWR) dispatch({ type: 'SWR:FETCH_URL', payload: [ALL_BREEDS_ENDPOINT] })
	return {
		label: 'dog',
		type: 'submenu',
		submenu: [
			{
				label: favorite ? `favorite: ${favorite}` : 'no favorite dog ):',
				type: 'normal',
			},
			{
				type: 'separator',
			},
			breeds.length
				? {
						label: 'pick one',
						type: 'submenu',
						submenu: breeds?.map(label => ({
							label,
							type: 'radio',
							checked: label === favorite,
							click: () =>
								dispatch({
									type: 'DOG:SELECT_FAVORITE_BREED',
									payload: label,
								}),
						})),
				  }
				: {
						label: `no breeds: ${status}`,
				  },
		],
	}
}

export default TrayDog
