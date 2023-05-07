'use client'

import { useCounter } from '@/hooks/useCounter'
import { useEventListener } from '@/hooks/useEventListener'

export function EventListenerExample() {
	const [count, increment] = useCounter(0, {
		min: 0,
		max: 10,
	})
	const listenerExampleRef = useEventListener<HTMLButtonElement>(
		'click',
		increment,
	)

	return (
		<article>
			<h2>Event Listener</h2>
			<button className="btn-primary" ref={listenerExampleRef}>
				Increment {count}
			</button>
		</article>
	)
}
