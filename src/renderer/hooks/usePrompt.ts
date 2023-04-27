import { PromptEntry, PromptAction } from 'shared/reducers/prompt'
import useStore from 'renderer/hooks/useStore'
import useDispatch from 'renderer/hooks/useDispatch'

type PromptParameters = Extract<PromptAction, { type: 'PROMPT:OPEN' }>['payload'][1]

type UsePrompt = (
	key: string,
) => [state: PromptEntry | undefined, openPrompt: (parameters: PromptParameters) => void]

export const usePrompt: UsePrompt = key => {
	const state = useStore(x => x.prompt?.[key])
	const dispatch = useDispatch()
	const openPrompt = (parameters: PromptParameters) =>
		dispatch({ type: 'PROMPT:OPEN', payload: [key, parameters] })
	return [state, openPrompt]
}
