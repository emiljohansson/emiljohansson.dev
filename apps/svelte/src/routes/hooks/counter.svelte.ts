import { clamp } from '@repo/lib/utils/number'

export function createCounter(
	initialValue = 0,
	options?: Partial<{
		min: number
		max: number
	}>,
) {
	const { min, max } = { min: -Infinity, max: Infinity, ...options }
	let count = $state(clamp(initialValue, min, max))

	return {
		get count() {
			return count
		},
		increment() {
			count = clamp(count + 1, min, max)
		},
		decrement() {
			count = clamp(count - 1, min, max)
		},
		reset() {
			count = clamp(initialValue, min, max)
		},
		set(newValue: number) {
			count = clamp(newValue, min, max)
		},
	} as const
}
