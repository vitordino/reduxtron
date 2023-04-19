import { useEffect, useState } from 'react'
import type { MotionValue } from 'framer-motion'

const useIsAnimating = (input: MotionValue<number>) => {
	const [state, setState] = useState(false)
	useEffect(() => input.on('change', value => setState(!!value)), [input, setState])
	return state
}

export default useIsAnimating
