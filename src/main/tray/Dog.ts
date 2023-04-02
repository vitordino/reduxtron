import { MenuItemConstructorOptions } from 'electron'
import type { State } from '../../shared/reducers'
import store from '../store'

const ALL_BREEDS_ENDPOINT = 'https://dog.ceo/api/breeds/list/all'

const TrayDog = (state: State): MenuItemConstructorOptions => {
	const breedsSWR = state?.swr?.[ALL_BREEDS_ENDPOINT]
	const status = breedsSWR?.state || 'unknown'
	const breeds = Object.keys(breedsSWR?.data?.message || {})
	const favorite = state?.dog?.favorite
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
								store.dispatch({
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
