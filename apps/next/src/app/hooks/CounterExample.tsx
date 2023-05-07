'use client'

import { useCounter } from '@/hooks/useCounter'

export function CounterExample() {
	const [count, increment, decrement, reset, set] = useCounter(0, {
		min: 0,
		max: 10,
	})

	return (
		<article>
			<h2>Counter</h2>
			<p>Count: {count}</p>
			<div className="flex">
				<button className="btn-secondary" onClick={() => increment()}>
					Increment
				</button>
				<button className="btn-secondary" onClick={() => decrement()}>
					Decrement
				</button>
				<button className="btn-secondary" onClick={() => reset()}>
					Reset
				</button>
				<button className="btn-secondary" onClick={() => set(5)}>
					Set 5
				</button>
			</div>
		</article>
	)
}
