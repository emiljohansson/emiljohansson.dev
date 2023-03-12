import { useEffect, useRef } from 'react'

export function useEventListener<T extends HTMLElement>(
	eventName: string,
	handler: (event: Event) => void,
) {
	const ref = useRef<T>(null)

	useEffect(() => {
		if (ref.current) {
			ref.current.addEventListener(eventName, handler)
			return () => {
				ref.current?.removeEventListener(eventName, handler)
			}
		}
	}, [eventName, handler])

	return ref
}
