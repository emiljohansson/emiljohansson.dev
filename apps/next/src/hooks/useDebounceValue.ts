import { useEffect, useState } from 'react'

export const useDebounceValue = <T>(value: T, delay = 300) => {
	const [debouncedValue, setDebouncedValue] = useState(value)
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)
		return () => {
			clearTimeout(handler)
		}
	}, [value, delay])
	return [debouncedValue]
}
