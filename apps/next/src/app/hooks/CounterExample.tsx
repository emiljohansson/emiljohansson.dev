'use client'

import { Button } from '@repo/ui/button'
import { useCounter } from '@/hooks/useCounter'

export function CounterExample() {
	const [count, increment, decrement, reset, set] = useCounter(0, {
		min: 0,
		max: 10,
	})

	return (
		<article>
			<h2 className="heading2">Counter</h2>
			<p>Count: {count}</p>
			<div className="flex">
				<Button variant="outline" onClick={() => increment()}>
					Increment
				</Button>
				<Button variant="outline" onClick={() => decrement()}>
					Decrement
				</Button>
				<Button variant="outline" onClick={() => reset()}>
					Reset
				</Button>
				<Button variant="outline" onClick={() => set(5)}>
					Set 5
				</Button>
			</div>
		</article>
	)
}
