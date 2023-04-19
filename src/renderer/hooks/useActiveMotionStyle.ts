import { MotionValue, useMotionValue } from 'framer-motion'
import { useEffect } from 'react'

const useActiveMotionValue = (
	inputValue: MotionValue<number>,
	inactiveValue: unknown,
	activeValue: unknown,
) => {
	const output = useMotionValue(inactiveValue)

	useEffect(() => {
		inputValue.on('change', x => output.set(x ? activeValue : inactiveValue))
	}, [activeValue, inactiveValue])

	return output
}

export default useActiveMotionValue
