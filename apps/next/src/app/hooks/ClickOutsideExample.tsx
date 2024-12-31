'use client'

import { useState } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { Button } from '@/components/ui/button'

export function ClickOutsideExample() {
	const [isWithin, setWithin] = useState(false)
	const ref = useClickOutside<HTMLButtonElement>(() => {
		setWithin(false)
	})

	return (
		<article>
			<h2 className="heading2">Click Outside</h2>
			<Button onClick={() => setWithin(true)} ref={ref}>
				{isWithin ? 'Within' : 'Outside'}
			</Button>
		</article>
	)
}
