import { useEffect, useRef } from 'react'
import noop from '../utils/noop'

function useInterval(callback: () => void, delay: number | null) {
	const savedCallback = useRef(noop)

	useEffect(() => {
		savedCallback.current = callback
	})

	useEffect(() => {
		if (delay === null) return
		function tick() {
			savedCallback.current()
		}
		const id = setInterval(tick, delay)
		return () => clearInterval(id)
	}, [delay])
}

export default useInterval
