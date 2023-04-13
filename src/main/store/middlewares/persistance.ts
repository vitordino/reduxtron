import type { Middleware } from '@reduxjs/toolkit'
import { app } from 'electron'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { join } from 'path'

const folder = join(app.getPath('appData'), 'redux-backend')
const path = join(folder, 'redux-state.json')
const options = { encoding: 'utf-8' } as const
const fallbackState = {}

export const getPreloadedState = async () => {
	try {
		console.log(`[persistance middleware] getting preloaded state from ${path}`)
		const data = await readFile(path, options)
		const result = JSON.parse(data)
		console.log(`[persistance middleware] got preloaded state`)
		return result
	} catch (e) {
		console.error(`[persistance middleware] couldn’t get state from ${path}`)
		console.error(e)
		return fallbackState
	}
}

const saveData = async (data: Record<string, unknown>) => {
	await mkdir(folder, { recursive: true })
	console.log(`[persistance middleware] saving data on ${path}`)
	const stringified = JSON.stringify(data, null, 2)
	await writeFile(path, stringified, options)
	console.log(`[persistance middleware] data saved on ${path}`)
}

const persistanceMiddleware: Middleware = store => next => async action => {
	if (action.type === 'GET_STATE_FROM_PERSISTANCE_MIDDLEWARE') {
		const payload = await getPreloadedState()
		return next({ type: 'GLOBAL:SET', payload })
	}
	const result = next(action)
	await saveData(store.getState())
	return result
}

export default persistanceMiddleware
