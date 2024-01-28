import { useEffect, useState } from 'react'

export function useComputed<T>(fn: () => T, deps: unknown[] = []) {
	const [value, setValue] = useState<T>(fn())

	useEffect(() => {
		setValue(fn())
	}, deps)

	return value
}
