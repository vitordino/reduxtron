import type { Middleware } from 'redux'

const logger: Middleware = store => next => action => {
	// eslint-disable-next-line no-console
	console.log('dispatching', { action, state: store.getState() })
	const result = next(action)
	// eslint-disable-next-line no-console
	console.log('next state', store.getState())
	return result
}

export default logger
