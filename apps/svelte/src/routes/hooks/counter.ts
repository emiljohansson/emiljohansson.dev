import { clamp } from '@repo/lib/utils/number'
import { writable } from 'svelte/store'

export function createCounter(
	initialValue = 0,
	options?: Partial<{
		min: number
		max: number
	}>,
) {
	const { min, max } = { min: -Infinity, max: Infinity, ...options }
	const count = writable(clamp(initialValue, min, max))

	const increment = () => count.update((v) => clamp(v + 1, min, max))
	const decrement = () => count.update((v) => clamp(v - 1, min, max))
	const reset = () => count.set(clamp(initialValue, min, max))
	const set = (newValue: number) => count.set(clamp(newValue, min, max))

	return { count, increment, decrement, reset, set } as const
}
