'use client'

import { useEffect, useState } from 'react'

export default function Page() {
	const [fps, setFps] = useState(0)

	useEffect(() => {
		const times: number[] = []

		function refreshLoop() {
			window.requestAnimationFrame(() => {
				const now = performance.now()
				while (times.length > 0 && times[0] <= now - 1000) {
					times.shift()
				}
				times.push(now)
				setFps(times.length > 60 ? 60 : times.length)
				refreshLoop()
			})
		}

		refreshLoop()
	}, [])

	return (
		<>
			<h1>FPS</h1>
			<p>FPS: {fps}</p>
		</>
	)
}
