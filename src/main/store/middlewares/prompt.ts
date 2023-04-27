import { Middleware } from 'shared/reducers'
import nativePrompt from 'native-prompt'

const promptMiddleware: Middleware = _store => next => async action => {
	if (action.type !== 'PROMPT:OPEN') return next(action)
	// get to initial loading state
	next(action)
	try {
		const [key, { title, description, defaultText }] = action.payload
		const value = await nativePrompt(title, description, { defaultText })
		if (!value) return next({ type: 'PROMPT:OPEN@ERROR', payload: [key, 'empty value'] })
		return next({ type: 'PROMPT:OPEN@LOADED', payload: [key, value] })
	} catch (e) {
		return next({
			type: 'PROMPT:OPEN@ERROR',
			payload: [action.payload?.[0], e?.toString?.() || 'unknown error'],
		})
	}
}

export default promptMiddleware
