import { Reducer } from 'redux'

export type Dog = {
	favorite?: string
}

export type DogAction = { type: 'DOG:SELECT_FAVORITE_BREED'; payload: string }

export const dogReducer: Reducer<Dog | undefined, DogAction> = (state, action) => {
	if (!state) return { favorite: undefined }
	switch (action.type) {
		case 'DOG:SELECT_FAVORITE_BREED':
			return { ...state, favorite: action.payload }
		default:
			return state
	}
}
