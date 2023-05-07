'use client'

import { useState } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'

export function ClickOutsideExample() {
	const [isWithin, setWithin] = useState(false)
	const ref = useClickOutside<HTMLButtonElement>(() => {
		setWithin(false)
	})

	return (
		<article>
			<h2>Click Outside</h2>
			<button className="btn-primary" onClick={() => setWithin(true)} ref={ref}>
				{isWithin ? 'Within' : 'Outside'}
			</button>
		</article>
	)
}
