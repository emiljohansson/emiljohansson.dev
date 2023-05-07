import { useState } from 'react'
import { clamp } from 'lib/utils/number'

export const useCounter = (
	initialValue = 0,
	options?: Partial<{
		min: number
		max: number
	}>,
) => {
	const { min, max } = { min: -Infinity, max: Infinity, ...options }
	const [count, setCount] = useState(clamp(initialValue, min, max))

	const increment = () => setCount(clamp(count + 1, min, max))
	const decrement = () => setCount(clamp(count - 1, min, max))
	const reset = () => setCount(clamp(initialValue, min, max))
	const set = (newValue: number) => setCount(clamp(newValue, min, max))

	return [count, increment, decrement, reset, set] as const
}
