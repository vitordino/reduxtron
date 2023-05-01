import type { Middleware } from 'redux'
import { app } from 'electron'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { join } from 'path'

const folder = join(app.getPath('appData'), 'redux-backend')
const path = join(folder, 'redux-state.json')
const options = { encoding: 'utf-8' } as const
const fallbackState = {}

export const getPreloadedState = async () => {
	try {
		const data = await readFile(path, options)
		const result = JSON.parse(data)
		return result
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error(`[persistance middleware] couldn’t get state from ${path}`)
		// eslint-disable-next-line no-console
		console.error(e)
		return fallbackState
	}
}

const saveData = async (data: Record<string, unknown>) => {
	try {
		await mkdir(folder, { recursive: true })
		const stringified = JSON.stringify(data, null, 2)
		await writeFile(path, stringified, options)
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error(e)
	}
}

export const persistanceMiddleware: Middleware = store => next => async action => {
	if (action.type === 'GET_STATE_FROM_PERSISTANCE_MIDDLEWARE') {
		const payload = await getPreloadedState()
		return next({ type: 'GLOBAL:SET', payload })
	}
	const result = next(action)
	await saveData(store.getState())
	return result
}
