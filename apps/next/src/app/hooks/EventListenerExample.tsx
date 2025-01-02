'use client'

import { Button } from '@repo/ui/button'
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
			<h2 className="heading2">Event Listener</h2>
			<Button ref={listenerExampleRef}>Increment {count}</Button>
		</article>
	)
}
