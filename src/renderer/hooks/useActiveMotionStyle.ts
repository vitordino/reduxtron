import { MotionValue, useMotionValue } from 'framer-motion'
import { useEffect } from 'react'

type UseActiveMotionValue = {
	<T>(inputValue: MotionValue<number>, inactiveValue: T, activeValue: T): MotionValue<T>
}

const useActiveMotionValue: UseActiveMotionValue = (inputValue, inactiveValue, activeValue) => {
	const output = useMotionValue(inactiveValue)

	useEffect(() => {
		inputValue.on('change', x => output.set(x ? activeValue : inactiveValue))
	}, [activeValue, inactiveValue])

	return output
}

export default useActiveMotionValue
